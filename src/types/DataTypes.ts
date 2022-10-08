export interface User {
  readonly id?: number
  name: string
  email: string
  password: string
  avatarUrl?: string
  readonly role: string
  readonly createdAt: string
  readonly updatedAt: string
}

export interface Image {
  byteSize: number
  url: string
  name: string
}

export interface Complaint {
  readonly id?: number
  readonly userId?: number
  severity: number
  details?: string
  kind: number
  incidentId?: number
  latitude: number
  longitude: number
  image?: Image
  readonly createdAt?: string
  readonly updatedAt?: string
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
  readonly createdAt?: string
  readonly updatedAt?: string
}

export interface Incident {
  readonly id?: number
  readonly title: string
  readonly severity: number
  readonly kind: number
  readonly details: string
  readonly location: Location
  readonly createdAt?: string
  readonly updatedAt?: string
}
