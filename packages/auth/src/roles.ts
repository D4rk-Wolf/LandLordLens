export type UserRole = 'landlord' | 'admin' | 'tenant'

export function isAdmin(role: UserRole | null | undefined): boolean {
  return role === 'admin'
}

export function isLandlord(role: UserRole | null | undefined): boolean {
  return role === 'landlord' || role === 'admin'
}
