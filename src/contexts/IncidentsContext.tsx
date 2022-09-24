import * as React from 'react'
import { Incident } from 'src/types/Incident'
import { api } from 'src/services/api'

interface IncidentsContextType {
  children?: React.ReactNode
  initialOptions?: {
    incidentCollection: Incident[]
    hasIncidents: boolean
  }
}

const IncidentsContext = React.createContext({} as IncidentsContextType)

const useIncidentsContext = () => {
  const context = React.useContext(IncidentsContext)

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
    incidentCollection: [],
    hasIncidents: false,
  },
}: IncidentsContextType) {
  const [incidentCollection, setIncidentCollection] = React.useState<
    Incident[]
  >(initialOptions.incidentCollection || [])

  const hasIncidents = !!incidentCollection

  React.useEffect(() => {
    updateIncidents()
  }, [])

  const updateIncidents = React.useCallback(async () => {
    getIncidents()
  }, [])

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
  const contextValue = React.useMemo(
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
