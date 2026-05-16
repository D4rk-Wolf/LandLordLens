export interface Address {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
}

export interface User {
    _id: string;
    email: string;
    name: string;
    role: 'landlord' | 'tenant' | 'admin' | 'contractor';
    subscription?: 'free' | 'starter' | 'professional' | 'business' | 'enterprise';
    subscriptionStatus?: 'active' | 'inactive' | 'cancelled' | 'past_due';
}

export interface Property {
    _id: string;
    address: Address;
    propertyType: 'apartment' | 'house' | 'commercial' | 'hmo' | 'flat' | 'bungalow' | 'other';
    status: 'occupied' | 'vacant' | 'maintenance' | 'active' | 'inactive'; // broadened to cover potentially other uses or fix generic status
    availabilityStatus?: 'free' | 'for_sale' | 'ready_for_rent' | 'rented' | 'not_available';
    purchasePrice?: number;
    purchaseDate?: string;
    currentValue?: number;
    bedrooms?: number;
    bathrooms?: number;
    epcRating?: string;
    rentAmount?: number;
    images: string[];
    landlordId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Tenancy {
    _id: string;
    propertyId: string | Property;
    userId: string;
    tenantName: string;
    tenantEmail: string;
    tenantPhone?: string;
    startDate: string;
    endDate?: string;
    monthlyRent: number;
    deposit?: number;
    depositProtected?: boolean;
    tenancyType?: 'assured_shorthold' | 'assured' | 'short_assured' | 'fixed_term' | 'protected';
    status: 'active' | 'pending' | 'ended';
    notes?: string;
}

export interface ComplianceRecord {
    _id: string;
    propertyId: string;
    complianceType: 'gas_safety' | 'eicr' | 'epc' | 'insurance' | 'fire_safety';
    status: 'valid' | 'expired' | 'pending';
    expiryDate: string;
    certificateUrl?: string;
    contractorId?: string;
}

export interface MaintenanceRequest {
    _id: string;
    propertyId: string;
    tenantId?: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'new' | 'in_progress' | 'completed' | 'cancelled';
    images?: string[];
    assignedTo?: string; // Contractor ID
    createdAt: string;
}

export interface Expense {
    _id: string;
    propertyId?: string; // Optional as some expenses are general
    date: string;
    amount: number;
    category: string; // e.g., 'maintenance', 'mortgage', 'management'
    description?: string;
    isTaxDeductible: boolean;
    receiptUrl?: string;
}

export interface DashboardStats {
    totalProperties: number;
    activeTenancies: number;
    pendingMaintenance: number;
    expiringCompliance: number;
}

export interface DepositProtection {
    _id: string;
    tenancyId: string;
    depositAmount: number;
    scheme: string;
    protectionReference: string;
    protectedDate: string;
    status: 'protected' | 'returned' | 'disputed' | 'forfeited';
    notes?: string;
}

export interface PropertyDetailResponse {
    property: Property;
    tenancies: Tenancy[];
    complianceRecords: ComplianceRecord[];
    maintenanceTickets: MaintenanceRequest[];
    notes?: string;
}

export interface Inventory {
    _id: string;
    type: 'check_in' | 'check_out' | 'interim';
    date: string;
    conductedBy: string;
    tenantPresent: boolean;
    overallCondition?: string;
    items?: { name: string; room: string; condition: string }[];
    notes?: string;
}

export interface RightToRentCheck {
    _id: string;
    tenantName: string;
    tenantDateOfBirth: string;
    documentType: string;
    documentNumber: string;
    checkDate: string;
    expiryDate?: string;
    status: 'passed' | 'failed' | 'expired' | 'pending';
    notes?: string;
}

export interface TenantBackgroundCheck {
    _id: string;
    tenancyId: string;
    overallStatus: 'approved' | 'rejected' | 'conditional' | 'pending';
    creditCheck?: {
        performed: boolean;
        provider?: string;
        score?: string;
        status: 'passed' | 'failed' | 'conditional' | 'pending';
    };
    employmentCheck?: {
        performed: boolean;
        employerName?: string;
        employerContact?: string;
        position?: string;
        salary?: string;
        status: 'passed' | 'failed' | 'conditional' | 'pending';
    };
    previousLandlordReference?: {
        performed: boolean;
        landlordName?: string;
        landlordContact?: string;
        propertyAddress?: string;
        rentPaidOnTime?: boolean;
        propertyMaintained?: boolean;
        wouldRentAgain?: boolean;
        status: 'passed' | 'failed' | 'conditional' | 'pending';
    };
    criminalRecordCheck?: {
        performed: boolean;
        status: 'clear' | 'issues_found' | 'pending';
    };
    notes?: string;
}

export interface TenancyDetailResponse {
    tenancy: Tenancy;
    depositProtection?: DepositProtection;
    inventories?: Inventory[];
    rightToRent?: RightToRentCheck[];
    backgroundCheck?: TenantBackgroundCheck;
}
