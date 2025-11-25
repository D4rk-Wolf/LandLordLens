import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Home, Users, PoundSterling, MapPin, Edit } from "lucide-react";
import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { getTenantPrismaClient } from "@/lib/tenant-prisma";

export default async function PropertiesPage() {
  const user = await requireUser();
  const tenantClient = user.tenantDatabaseUrl
    ? getTenantPrismaClient(user.tenantDatabaseUrl)
    : null;

  const properties = tenantClient
    ? await tenantClient.property.findMany({ orderBy: { createdAt: "desc" } })
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties</h1>
            <p className="text-gray-600">Manage your property portfolio</p>
          </div>
          <Button asChild>
            <Link href="/properties/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Link>
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search properties..." className="pl-10" disabled />
              </div>
              <Button variant="outline" disabled>
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {properties.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              Add your first property to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Home className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{property.address}</CardTitle>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                        <MapPin className="h-3 w-3" />
                        {property.city}, {property.postcode}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {property.propertyType && (
                          <Badge variant="outline">{property.propertyType}</Badge>
                        )}
                        {typeof property.bedrooms === "number" && (
                          <Badge variant="outline">{property.bedrooms} bed</Badge>
                        )}
                        {typeof property.bathrooms === "number" && (
                          <Badge variant="outline">{property.bathrooms} bath</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Tenancies</span>
                      </div>
                      <span className="font-medium">View details</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <PoundSterling className="h-4 w-4" />
                        <span>Monthly Rent</span>
                      </div>
                      <span className="font-semibold text-lg">Set per tenancy</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/properties/${property.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" size="icon" disabled>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
