import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";

export default function TenantInvitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Home className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-gray-900">LandlordLens</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Tenant Invitation</CardTitle>
            <CardDescription>Invite a tenant to join the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Tenant Email</Label>
                <Input id="email" type="email" placeholder="tenant@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="property">Property</Label>
                <select
                  id="property"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option>Select a property</option>
                  <option>123 High Street, London</option>
                  <option>45 Park Avenue, Manchester</option>
                </select>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send Invitation
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <Link href="/dashboard" className="text-primary hover:underline font-medium">
                Back to Dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
