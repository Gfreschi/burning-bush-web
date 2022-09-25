import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { Incident } from 'src/types/DataTypes'
import { api } from 'src/services/api'

type IncidentsContextType = {
  children?: ReactNode
  initialOptions?: {
    userCoordinates?: [number, number]
  }
  incidentCollection: Incident[]
  hasIncidents: boolean
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
    userCoordinates: [-47.57, -22.41],
  },
}: IncidentsContextType) {
  const [incidentCollection, setIncidentCollection] = useState<Incident[]>([])

  const { userCoordinates } = initialOptions

  const hasIncidents = !!incidentCollection

  // update the incident collection when the user coordinates change
  useEffect(() => {
    // console.log(userCoordinates)
    getIncidents()
  }, [])

  // use when the user coordinates change
  // const updateIncidents = useCallback(async () => {
  //   getIncidents()
  // }, [])

  // passar localicação do usuário para o contexto buscas incidentes na area do usuario
  async function getIncidents() {
    try {
      // create a api call to get the incidents
      await api.get('/api/v1/web/incidents').then(response => {
        setIncidentCollection(response.data)
      })
    } catch (error) {
      alert('Erro ao buscar incidentes')
    }
  }

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
    <IncidentsContext.Provider value={contextValue}>
      {children}
    </IncidentsContext.Provider>
  )
}

export { IncidentsProvider, useIncidentsContext }
