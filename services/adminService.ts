/**
 * Admin Service - Mock Implementation
 * Handles admin authentication, employee management, and verification approvals
 */

import { AdminUser, AdminStats, VerificationRequest, EmployeeListItem } from '@/types/admin';
import { getEmployeeProfile } from './edcService';

const ADMIN_STORAGE_KEY = 'edc_admin_session';
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123', // In production, use proper authentication
};

/**
 * Admin login
 */
export function adminLogin(username: string, password: string): boolean {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const session = {
            username,
            email: 'admin@edc.gov.in',
            role: 'super-admin',
            loginTime: new Date().toISOString(),
        };
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session));
        return true;
    }
    return false;
}

/**
 * Check if admin is logged in
 */
export function isAdminLoggedIn(): boolean {
    const session = localStorage.getItem(ADMIN_STORAGE_KEY);
    return !!session;
}

/**
 * Get current admin session
 */
export function getAdminSession(): any {
    const session = localStorage.getItem(ADMIN_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
}

/**
 * Admin logout
 */
export function adminLogout(): void {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
}

/**
 * Get admin dashboard statistics
 */
export function getAdminStats(): AdminStats {
    // Mock data - in production, fetch from database
    const profile = getEmployeeProfile();

    return {
        totalEmployees: profile ? 1 : 0,
        pendingVerifications: profile ? 2 : 0,
        approvedVerifications: profile ? 1 : 0,
        rejectedVerifications: 0,
        newRegistrationsToday: profile ? 1 : 0,
        newRegistrationsThisWeek: profile ? 1 : 0,
        blockchainRecords: profile?.blockchainRecord ? 1 : 0,
    };
}

/**
 * Get all employees (mock data)
 */
export function getAllEmployees(): EmployeeListItem[] {
    const profile = getEmployeeProfile();

    if (!profile) return [];

    return [
        {
            edcNumber: profile.personalDetails.edcNumber || 'N/A',
            name: `${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`,
            email: profile.personalDetails.email,
            profileCompletion: profile.profileCompletion,
            verificationStatus:
                profile.verificationStatus.backgroundCheck.status === 'verified' &&
                    profile.verificationStatus.criminalRecord.status === 'clear'
                    ? 'complete'
                    : profile.verificationStatus.backgroundCheck.status !== 'pending'
                        ? 'partial'
                        : 'pending',
            createdAt: profile.createdAt,
            lastActive: profile.updatedAt,
        },
    ];
}

/**
 * Get pending verification requests
 */
export function getPendingVerifications(): VerificationRequest[] {
    const profile = getEmployeeProfile();

    if (!profile) return [];

    const requests: VerificationRequest[] = [];

    if (profile.verificationStatus.backgroundCheck.status === 'in-progress') {
        requests.push({
            id: 'bg-1',
            employeeId: '1',
            employeeName: `${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`,
            edcNumber: profile.personalDetails.edcNumber || 'N/A',
            type: 'background',
            status: 'pending',
            requestedAt: new Date(Date.now() - 86400000).toISOString(),
        });
    }

    if (profile.verificationStatus.criminalRecord.status === 'in-progress') {
        requests.push({
            id: 'cr-1',
            employeeId: '1',
            employeeName: `${profile.personalDetails.firstName} ${profile.personalDetails.lastName}`,
            edcNumber: profile.personalDetails.edcNumber || 'N/A',
            type: 'criminal',
            status: 'pending',
            requestedAt: new Date(Date.now() - 172800000).toISOString(),
        });
    }

    return requests;
}

/**
 * Approve verification request
 */
export async function approveVerification(requestId: string, remarks?: string): Promise<boolean> {
    // Mock implementation - in production, update database
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
}

/**
 * Reject verification request
 */
export async function rejectVerification(requestId: string, remarks: string): Promise<boolean> {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
}

/**
 * Search employees
 */
export function searchEmployees(query: string): EmployeeListItem[] {
    const allEmployees = getAllEmployees();
    const lowerQuery = query.toLowerCase();

    return allEmployees.filter(
        emp =>
            emp.name.toLowerCase().includes(lowerQuery) ||
            emp.email.toLowerCase().includes(lowerQuery) ||
            emp.edcNumber.toLowerCase().includes(lowerQuery)
    );
}
