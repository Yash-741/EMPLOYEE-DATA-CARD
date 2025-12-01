// Admin-specific types

export interface AdminUser {
    id: string;
    username: string;
    email: string;
    role: 'super-admin' | 'admin' | 'verifier';
    createdAt: string;
}

export interface VerificationRequest {
    id: string;
    employeeId: string;
    employeeName: string;
    edcNumber: string;
    type: 'background' | 'criminal' | 'document';
    status: 'pending' | 'approved' | 'rejected';
    requestedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    remarks?: string;
}

export interface AdminStats {
    totalEmployees: number;
    pendingVerifications: number;
    approvedVerifications: number;
    rejectedVerifications: number;
    newRegistrationsToday: number;
    newRegistrationsThisWeek: number;
    blockchainRecords: number;
}

export interface EmployeeListItem {
    edcNumber: string;
    name: string;
    email: string;
    profileCompletion: number;
    verificationStatus: 'pending' | 'partial' | 'complete';
    createdAt: string;
    lastActive: string;
}
