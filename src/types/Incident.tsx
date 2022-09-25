export interface Incident {
  id: number
  title: string
  severity: number
  details: string
  kind: number
  createdAt: string
  updatedAt: string
  location: {
    longitude: number
    latitude: number
  }
}
