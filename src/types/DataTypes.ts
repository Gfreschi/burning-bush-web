/* eslint-disable camelcase */
export interface Avatar {
  byte_size: number
  url: string
  name: string
}

export interface User {
  readonly id?: number
  name: string
  email: string
  password: string
  avatar?: Avatar
  readonly role: string
  readonly created_at: string
  readonly updated_at: string
}

export interface Image {
  byte_size: number
  url: string
  name: string
}

export interface Complaint {
  readonly id?: number
  readonly user_id?: number
  severity: number
  details?: string
  kind: number
  incident_id?: number
  latitude: number
  longitude: number
  image?: Image
  associated_incident?: boolean
  readonly created_at?: string
  readonly updated_at?: string
}

export interface Location {
  readonly id?: number
  readonly incidentId?: number
  country?: string
  state?: string
  city?: string
  street?: string
  longitude: number
  latitude: number
  readonly created_at?: string
  readonly updated_at?: string
}

export interface Incident {
  readonly id?: number
  readonly title: string
  readonly severity: number
  readonly kind: number
  readonly details: string
  readonly location: Location
  readonly created_at?: string
  readonly updated_at?: string
}
