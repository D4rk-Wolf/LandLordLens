"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewTenancyPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/properties/${params.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Property
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">New Tenancy</h1>
          <p className="text-gray-600">Create a new tenancy agreement</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tenancy Information</CardTitle>
            <CardDescription>Enter details for the new tenancy</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tenantName">Tenant Name</Label>
                <Input id="tenantName" placeholder="John Smith" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenantEmail">Tenant Email</Label>
                <Input id="tenantEmail" type="email" placeholder="tenant@example.com" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly Rent (£)</Label>
                  <Input id="monthlyRent" type="number" min="0" placeholder="1500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit">Deposit (£)</Label>
                  <Input id="deposit" type="number" min="0" placeholder="2250" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="depositScheme">Deposit Protection Scheme</Label>
                <select
                  id="depositScheme"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option>Select scheme</option>
                  <option>Deposit Protection Service (DPS)</option>
                  <option>MyDeposits</option>
                  <option>Tenancy Deposit Scheme (TDS)</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Create Tenancy
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={`/properties/${params.id}`}>Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
