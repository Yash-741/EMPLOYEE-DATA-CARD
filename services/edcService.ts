/**
 * EDC Service - Employee Data Card Management
 */

import { EmployeeProfile, PersonalDetails, ApiResponse } from '@/types';
import { generateEDCNumber } from '@/utils/edcNumber';
import { storeEmployeeDataOnBlockchain } from './blockchainAdapter';

const STORAGE_KEY = 'edc_employee_profile';

/**
 * Create new EDC card
 */
export async function createEDCCard(
    personalDetails: PersonalDetails
): Promise<ApiResponse<EmployeeProfile>> {
    try {
        // Generate EDC number
        const edcNumber = generateEDCNumber();

        const newProfile: EmployeeProfile = {
            personalDetails: {
                ...personalDetails,
                edcNumber,
            },
            workExperience: [],
            education: [],
            salaryHistory: [],
            verificationStatus: {
                backgroundCheck: { status: 'pending' },
                criminalRecord: { status: 'pending' },
                documentVerification: { status: 'pending', verifiedDocuments: [] },
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            profileCompletion: calculateProfileCompletion({
                personalDetails: { ...personalDetails, edcNumber },
                workExperience: [],
                education: [],
                salaryHistory: [],
                verificationStatus: {
                    backgroundCheck: { status: 'pending' },
                    criminalRecord: { status: 'pending' },
                    documentVerification: { status: 'pending', verifiedDocuments: [] },
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                profileCompletion: 0,
            }),
        };

        // Store in localStorage (replace with actual database in production)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));

        return {
            success: true,
            data: newProfile,
            message: 'EDC Card created successfully',
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Get employee profile
 */
export function getEmployeeProfile(): EmployeeProfile | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        return JSON.parse(stored) as EmployeeProfile;
    } catch {
        return null;
    }
}

/**
 * Update employee profile
 */
export async function updateEmployeeProfile(
    updates: Partial<EmployeeProfile>
): Promise<ApiResponse<EmployeeProfile>> {
    try {
        const currentProfile = getEmployeeProfile();
        if (!currentProfile) {
            return {
                success: false,
                error: 'No profile found. Please create a profile first.',
            };
        }

        const updatedProfile: EmployeeProfile = {
            ...currentProfile,
            ...updates,
            updatedAt: new Date().toISOString(),
            profileCompletion: calculateProfileCompletion({
                ...currentProfile,
                ...updates,
            }),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));

        return {
            success: true,
            data: updatedProfile,
            message: 'Profile updated successfully',
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

/**
 * Calculate profile completion percentage
 */
export function calculateProfileCompletion(profile: EmployeeProfile): number {
    let completed = 0;
    let total = 0;

    // Personal details (40%)
    total += 40;
    if (profile.personalDetails.firstName) completed += 5;
    if (profile.personalDetails.lastName) completed += 5;
    if (profile.personalDetails.dateOfBirth) completed += 5;
    if (profile.personalDetails.email) completed += 5;
    if (profile.personalDetails.phone) completed += 5;
    if (profile.personalDetails.address?.city) completed += 5;
    if (profile.personalDetails.aadhaarNumber) completed += 5;
    if (profile.personalDetails.photo) completed += 5;

    // Work experience (20%)
    total += 20;
    if (profile.workExperience.length > 0) completed += 20;

    // Education (20%)
    total += 20;
    if (profile.education.length > 0) completed += 20;

    // EPF Details (10%)
    total += 10;
    if (profile.epfDetails?.isVerified) completed += 10;

    // Verification (10%)
    total += 10;
    if (profile.verificationStatus.backgroundCheck.status === 'verified') completed += 5;
    if (profile.verificationStatus.criminalRecord.status === 'clear') completed += 5;

    return Math.round((completed / total) * 100);
}

/**
 * Export profile data
 */
export function exportProfileData(format: 'json' | 'pdf' = 'json'): string | null {
    const profile = getEmployeeProfile();
    if (!profile) return null;

    if (format === 'json') {
        return JSON.stringify(profile, null, 2);
    }

    // PDF export would require a library like jsPDF
    return null;
}

/**
 * Store profile on blockchain
 */
export async function saveToBlockchain(): Promise<ApiResponse<any>> {
    const profile = getEmployeeProfile();
    if (!profile) {
        return {
            success: false,
            error: 'No profile found',
        };
    }

    return storeEmployeeDataOnBlockchain(profile);
}
