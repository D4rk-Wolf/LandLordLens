"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, DollarSign, Download, Filter } from "lucide-react";

// Mock payment data
const mockPayments = [
  {
    id: "1",
    user: "John Smith",
    email: "john@example.com",
    amount: 25,
    currency: "GBP",
    plan: "pro",
    status: "succeeded",
    date: "2024-02-10",
    stripePaymentId: "pi_1234567890",
  },
  {
    id: "2",
    user: "Jane Doe",
    email: "jane@example.com",
    amount: 25,
    currency: "GBP",
    plan: "pro",
    status: "succeeded",
    date: "2024-02-09",
    stripePaymentId: "pi_0987654321",
  },
  {
    id: "3",
    user: "Bob Johnson",
    email: "bob@example.com",
    amount: 0,
    currency: "GBP",
    plan: "free",
    status: "active",
    date: "2024-02-08",
    stripePaymentId: null,
  },
];

export default function AdminPaymentsPage() {
  const totalRevenue = mockPayments
    .filter(p => p.status === "succeeded")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Management</h1>
          <p className="text-gray-600">View and track all subscription payments</p>
        </div>

        {/* Revenue Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">£{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">£{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">February 2024</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockPayments.filter(p => p.plan === "pro" && p.status === "succeeded").length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Pro plan users</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search payments by user or email..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payments List */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>{mockPayments.length} total payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{payment.user}</h4>
                      <Badge variant={payment.plan === "pro" ? "default" : "secondary"}>
                        {payment.plan}
                      </Badge>
                      <Badge
                        variant={payment.status === "succeeded" ? "default" : "outline"}
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{payment.email}</span>
                      {payment.stripePaymentId && (
                        <span className="text-xs">ID: {payment.stripePaymentId}</span>
                      )}
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">£{payment.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{payment.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

