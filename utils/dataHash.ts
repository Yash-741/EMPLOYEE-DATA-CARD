/**
 * Data Hashing Utility for Blockchain Integration
 * Uses SHA-256 for creating cryptographic hashes
 */

import { EmployeeProfile } from '@/types';

/**
 * Simple SHA-256 implementation for browser
 */
export async function generateDataHash(data: any): Promise<string> {
    const jsonString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(jsonString);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

/**
 * Generate hash specifically for employee profile
 */
export async function generateProfileHash(profile: EmployeeProfile): Promise<string> {
    // Create a normalized version of the profile for consistent hashing
    const normalizedProfile = {
        personalDetails: profile.personalDetails,
        workExperience: profile.workExperience,
        education: profile.education,
        // Don't include salary in hash for privacy
        verificationStatus: profile.verificationStatus,
    };

    return generateDataHash(normalizedProfile);
}

/**
 * Verify data integrity by comparing hashes
 */
export async function verifyDataIntegrity(
    data: any,
    expectedHash: string
): Promise<boolean> {
    const actualHash = await generateDataHash(data);
    return actualHash === expectedHash;
}

/**
 * Create a Merkle root from multiple hashes (for batch verification)
 */
export async function createMerkleRoot(hashes: string[]): Promise<string> {
    if (hashes.length === 0) return '';
    if (hashes.length === 1) return hashes[0];

    const combined = hashes.join('');
    return generateDataHash(combined);
}
