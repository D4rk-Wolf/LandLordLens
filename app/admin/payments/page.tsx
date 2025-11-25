import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, DollarSign, Download, Filter } from "lucide-react";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

async function getPayments() {
  const payments = await prisma.payment.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  }).catch(() => []);

  const totalRevenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount ?? 0),
    0
  );

  const monthlyRevenue = payments
    .filter((payment) => {
      const paymentDate = new Date(payment.createdAt);
      const now = new Date();
      return (
        paymentDate.getMonth() === now.getMonth() &&
        paymentDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);

  const activeSubscriptions = await prisma.user.count({
    where: {
      currentPlan: {
        not: "free",
      },
    },
  });

  return {
    payments,
    summary: {
      totalRevenue,
      monthlyRevenue,
      activeSubscriptions,
      totalPayments: payments.length,
    },
  };
}

export default async function AdminPaymentsPage() {
  await requireAdmin();
  const { payments, summary } = await getPayments();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Management</h1>
          <p className="text-gray-600">View and track all subscription payments</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">£{summary.totalRevenue.toLocaleString("en-GB")}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">£{summary.monthlyRevenue.toLocaleString("en-GB")}</div>
              <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{summary.activeSubscriptions}</div>
              <p className="text-xs text-gray-500 mt-1">Pro plan users</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search payments by user or email..." className="pl-10" disabled />
              </div>
              <Button variant="outline" disabled>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" disabled>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>{summary.totalPayments} total payments</CardDescription>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <p className="text-sm text-gray-500 py-8 text-center">No payments found.</p>
            ) : (
              <div className="space-y-4">
                {payments.map((payment: any) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{payment.user?.name || "Unknown"}</h4>
                        <Badge variant={payment.plan === "pro" ? "default" : "secondary"}>
                          {payment.plan || "free"}
                        </Badge>
                        <Badge variant={payment.status === "succeeded" ? "default" : "outline"}>
                          {payment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{payment.user?.email || "No email"}</span>
                        {payment.stripePaymentId && (
                          <span className="text-xs">ID: {payment.stripePaymentId}</span>
                        )}
                        <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">£{Number(payment.amount || 0).toLocaleString("en-GB")}</p>
                      <p className="text-xs text-gray-500">{payment.currency || "GBP"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
