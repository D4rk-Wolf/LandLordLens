import { redirect } from 'next/navigation'
import { getCurrentUser } from '@landlordlens/auth'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@landlordlens/ui'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  const role = user.app_metadata?.['role'] as string | undefined
  if (!isAdmin(role as Parameters<typeof isAdmin>[0])) redirect('/dashboard')

  const caller = await createServerCaller()
  const [users, auditLog] = await Promise.all([
    caller.admin.listUsers(),
    caller.admin.getAuditLog(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Platform administration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{u.name ?? 'No name'}</p>
                    <p className="text-xs text-gray-400 capitalize">
                      {u.role} · {u.subscription}
                    </p>
                  </div>
                  <span className={`text-xs ${u.isActive ? 'text-green-600' : 'text-red-500'}`}>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent audit log</CardTitle>
          </CardHeader>
          <CardContent>
            {auditLog.length === 0 ? (
              <p className="text-sm text-gray-500">No audit events</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {auditLog.slice(0, 50).map((entry) => (
                  <div key={entry.id} className="text-sm py-2 border-b border-gray-100 last:border-0">
                    <p className="font-medium text-gray-900">{entry.action}</p>
                    <p className="text-xs text-gray-400">
                      {entry.resourceType && `${entry.resourceType} · `}
                      {new Date(entry.createdAt).toLocaleString('en-GB')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
