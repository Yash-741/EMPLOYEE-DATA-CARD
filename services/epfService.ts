/**
 * EPF Service - Mock Implementation
 * This is a demo implementation. Replace with actual EPF API integration in production.
 */

import { EPFDetails, ApiResponse } from '@/types';

/**
 * Fetch EPF details using UAN (Universal Account Number)
 * Mock implementation - replace with actual API call
 */
export async function fetchEPFDetails(uanNumber: string): Promise<ApiResponse<EPFDetails>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Validate UAN format (12 digits)
    if (!/^\d{12}$/.test(uanNumber)) {
        return {
            success: false,
            error: 'Invalid UAN number format. UAN should be 12 digits.',
        };
    }

    // Mock data - In production, this would be an actual API call
    const mockEPFData: EPFDetails = {
        uanNumber: uanNumber,
        pfAccountNumber: `MH/MUM/0${uanNumber.substring(0, 6)}/${uanNumber.substring(6)}`,
        employeeName: 'Sample Employee', // Would come from actual EPF database
        dateOfJoining: '2020-01-15',
        previousEmployer: 'Previous Company Ltd.',
        pfBalance: 125000,
        isVerified: true,
        lastUpdated: new Date().toISOString(),
    };

    return {
        success: true,
        data: mockEPFData,
        message: 'EPF details fetched successfully (Mock Data)',
    };
}

/**
 * Verify EPF details with EPFO database
 * Mock implementation
 */
export async function verifyEPFDetails(
    uanNumber: string,
    employeeName: string
): Promise<ApiResponse<boolean>> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock verification - always returns true for demo
    return {
        success: true,
        data: true,
        message: 'EPF details verified successfully (Mock)',
    };
}

/**
 * Get EPF contribution history
 * Mock implementation
 */
export async function getEPFContributionHistory(uanNumber: string) {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const mockHistory = [
        {
            month: 'November 2024',
            employeeContribution: 1800,
            employerContribution: 1800,
            pensionContribution: 1250,
            total: 4850,
        },
        {
            month: 'October 2024',
            employeeContribution: 1800,
            employerContribution: 1800,
            pensionContribution: 1250,
            total: 4850,
        },
        {
            month: 'September 2024',
            employeeContribution: 1800,
            employerContribution: 1800,
            pensionContribution: 1250,
            total: 4850,
        },
    ];

    return {
        success: true,
        data: mockHistory,
        message: 'EPF contribution history fetched (Mock Data)',
    };
}
