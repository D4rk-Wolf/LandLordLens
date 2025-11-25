import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, CheckCircle2, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">LandlordLens</span>
            </div>
            <CardTitle className="text-2xl">Welcome to LandlordLens!</CardTitle>
            <CardDescription>Let&apos;s get you set up in just a few steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Add Your First Property</h3>
                    <p className="text-sm text-gray-600">
                      Start by adding your first property to your portfolio. You can add more later.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Set Up Compliance Tracking</h3>
                    <p className="text-sm text-gray-600">
                      Add compliance requirements like gas safety certificates and EPC documents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Add Tenancies</h3>
                    <p className="text-sm text-gray-600">
                      Create tenancy agreements and manage your tenants.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/properties/new">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full mt-2" asChild>
                  <Link href="/dashboard">Skip for now</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
