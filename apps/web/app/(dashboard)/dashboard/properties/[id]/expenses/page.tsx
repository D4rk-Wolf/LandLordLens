import { notFound } from 'next/navigation'
import { createServerCaller } from '@/lib/trpc/server'
import { Card, CardContent } from '@landlordlens/ui'

export const dynamic = 'force-dynamic'

export default async function PropertyExpensesPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caller = await createServerCaller()

  let expenseList
  try {
    expenseList = await caller.expenses.getByProperty({ propertyId: id })
  } catch {
    notFound()
  }

  const total = Math.round(expenseList.reduce((sum, e) => sum + Number(e.amount), 0) * 100) / 100

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Expenses</h2>
        {expenseList.length > 0 && (
          <span className="text-sm text-gray-500">
            Total: <strong className="text-gray-900">£{total.toLocaleString()}</strong>
          </span>
        )}
      </div>

      {expenseList.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 text-sm">No expenses recorded for this property</p>
        </div>
      ) : (
        <div className="space-y-2">
          {expenseList.map((expense) => (
            <Card key={expense.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{expense.description}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {expense.category} · {expense.date}
                    {expense.isTaxDeductible && (
                      <span className="ml-2 text-green-600">Tax deductible</span>
                    )}
                  </p>
                </div>
                <p className={`font-semibold ${expense.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                  {expense.type === 'income' ? '+' : ''}£{Number(expense.amount).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
