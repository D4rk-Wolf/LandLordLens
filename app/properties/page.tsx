"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Home, 
  Users, 
  PoundSterling,
  MapPin,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockProperties = [
  {
    id: 1,
    address: "123 High Street",
    city: "London",
    postcode: "SW1A 1AA",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    monthlyRent: 1850,
    status: "occupied",
    tenants: 2,
    complianceStatus: "good",
  },
  {
    id: 2,
    address: "45 Park Avenue",
    city: "Manchester",
    postcode: "M1 1AA",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    monthlyRent: 1200,
    status: "occupied",
    tenants: 1,
    complianceStatus: "warning",
  },
  {
    id: 3,
    address: "78 Oak Road",
    city: "Birmingham",
    postcode: "B1 1AA",
    type: "Flat",
    bedrooms: 1,
    bathrooms: 1,
    monthlyRent: 950,
    status: "vacant",
    tenants: 0,
    complianceStatus: "good",
  },
  {
    id: 4,
    address: "12 Victoria Street",
    city: "Bristol",
    postcode: "BS1 1AA",
    type: "House",
    bedrooms: 4,
    bathrooms: 2,
    monthlyRent: 2100,
    status: "occupied",
    tenants: 4,
    complianceStatus: "critical",
  },
  {
    id: 5,
    address: "56 King's Road",
    city: "Leeds",
    postcode: "LS1 1AA",
    type: "Flat",
    bedrooms: 2,
    bathrooms: 1,
    monthlyRent: 1100,
    status: "occupied",
    tenants: 2,
    complianceStatus: "good",
  },
  {
    id: 6,
    address: "89 Church Lane",
    city: "Liverpool",
    postcode: "L1 1AA",
    type: "House",
    bedrooms: 3,
    bathrooms: 1,
    monthlyRent: 1350,
    status: "vacant",
    tenants: 0,
    complianceStatus: "warning",
  },
];

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties by address, postcode, or city..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
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
                      <Badge variant="outline">{property.type}</Badge>
                      <Badge variant="outline">{property.bedrooms} bed</Badge>
                      <Badge
                        variant={
                          property.complianceStatus === "critical"
                            ? "destructive"
                            : property.complianceStatus === "warning"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {property.complianceStatus}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Tenants</span>
                    </div>
                    <span className="font-medium">
                      {property.tenants} {property.tenants === 1 ? "tenant" : "tenants"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <PoundSterling className="h-4 w-4" />
                      <span>Monthly Rent</span>
                    </div>
                    <span className="font-semibold text-lg">£{property.monthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <Badge
                      variant={property.status === "occupied" ? "default" : "secondary"}
                      className="w-full justify-center"
                    >
                      {property.status === "occupied" ? "Occupied" : "Vacant"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
