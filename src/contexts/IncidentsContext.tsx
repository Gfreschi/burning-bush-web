import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import { Incident } from 'src/types/DataTypes'
import { api } from 'src/services/api'
import { usePrevious } from 'src/hooks/usePrevious'
import { useSnackbar } from 'notistack'

type UserCoordinates = {
  latitude: number
  longitude: number
}

type IncidentsContextType = {
  children?: ReactNode
  initialOptions?: {
    userCoordinates?: UserCoordinates
  }
  incidentCollection?: Incident[]
  hasIncidents?: boolean
}

const IncidentsContext = createContext({} as IncidentsContextType)

const useIncidentsContext = () => {
  const context = useContext(IncidentsContext)

  if (context === undefined) {
    throw new Error(
      'useIncidentsContext must be used within a IncidentsProvider'
    )
  }
  return context
}

function IncidentsProvider({
  children,
  initialOptions = {
    userCoordinates: { latitude: -22.38, longitude: -47.37 },
  },
}: IncidentsContextType) {
  const [incidentCollection, setIncidentCollection] = useState<Incident[]>([])

  const [userCoordinates, setUserCoordinates] = useState<UserCoordinates>(
    initialOptions.userCoordinates
  )
  const prevUserCoordinates = usePrevious(userCoordinates)

  console.log('userCoordinates', userCoordinates)
  console.log('prevUserCoordinates', prevUserCoordinates)
  const { enqueueSnackbar } = useSnackbar()

  const hasIncidents = !!incidentCollection

  const errorAlert = () => {
    enqueueSnackbar('Erro ao carregar os incidentes', {
      variant: 'error',
    })
  }

  const initialUserCoordinates = (coordinates: UserCoordinates) => {
    setUserCoordinates(coordinates)
  }

  const shouldSendRequest = useMemo(() => {
    if (!prevUserCoordinates) return true
    // analyse if previus user coordinates are 5% different from the current user coordinates
    const isLatitudeDifferent = Math.abs(
      prevUserCoordinates?.latitude - userCoordinates?.latitude
    )
    const isLongitudeDifferent = Math.abs(
      prevUserCoordinates?.longitude - userCoordinates?.longitude
    )
    if (isLatitudeDifferent > 0.1 || isLongitudeDifferent > 0.1) {
      return true
    }
    return false
  }, [prevUserCoordinates, userCoordinates])

  // fetch incidents of user coordinates
  const getIncidents = useCallback(
    async (userCoordinates: UserCoordinates) => {
      try {
        const { data } = await api.get('/api/v1/web/near_by', {
          params: {
            latitude: userCoordinates?.latitude,
            longitude: userCoordinates?.longitude,
          },
        })

        if (data) {
          setIncidentCollection(data)
        }
      } catch (error) {
        errorAlert()
      }
    },
    [userCoordinates]
  )

  useEffect(() => {
    if (shouldSendRequest) {
      getIncidents(userCoordinates)
    }
  }, [shouldSendRequest, userCoordinates])

  // memoize the full context value
  const contextValue = useMemo(
    () => ({
      incidentCollection,
      hasIncidents,
    }),
    [incidentCollection, hasIncidents]
  )

  return (
    // the Provider gives access to the context to its children
    <IncidentsContext.Provider
      value={{ ...contextValue, initialUserCoordinates }}
    >
      {children}
    </IncidentsContext.Provider>
  )
}

export { IncidentsProvider, useIncidentsContext }
