/**
 * @module auth/roles
 * Role type and predicate helpers.
 *
 * The canonical role value lives in `profiles.role` (the database).
 * These helpers are used in server-side checks — the `adminProcedure`
 * in tRPC reads `ctx.profile.role` directly for performance, but these
 * predicates are available for layout-level UI guards.
 */

/** Platform roles available to authenticated users. */
export type UserRole = 'landlord' | 'admin' | 'tenant'

/** Returns true only for the `admin` role. */
export function isAdmin(role: UserRole | null | undefined): boolean {
  return role === 'admin'
}

/** Returns true for `landlord` and `admin` — admins can do everything landlords can. */
export function isLandlord(role: UserRole | null | undefined): boolean {
  return role === 'landlord' || role === 'admin'
}
