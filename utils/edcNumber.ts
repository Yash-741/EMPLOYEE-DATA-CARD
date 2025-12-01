/**
 * EDC Number Generation Utility
 * Format: EDC-YYYY-XXXXXXXX
 * Example: EDC-2024-12345678
 */

export function generateEDCNumber(): string {
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    return `EDC-${year}-${randomNumber}`;
}

/**
 * Validate EDC Number Format
 */
export function validateEDCNumber(edcNumber: string): boolean {
    const pattern = /^EDC-\d{4}-\d{8}$/;
    return pattern.test(edcNumber);
}

/**
 * Format EDC Number for display
 */
export function formatEDCNumber(edcNumber: string): string {
    if (!edcNumber) return '';

    // Add spacing for better readability: EDC-2024-1234 5678
    const match = edcNumber.match(/^(EDC-\d{4}-\d{4})(\d{4})$/);
    if (match) {
        return `${match[1]} ${match[2]}`;
    }

    return edcNumber;
}

/**
 * Calculate check digit for additional validation
 */
export function calculateCheckDigit(baseNumber: string): number {
    let sum = 0;
    for (let i = 0; i < baseNumber.length; i++) {
        const digit = parseInt(baseNumber[i]);
        if (!isNaN(digit)) {
            sum += digit * (i + 1);
        }
    }
    return sum % 10;
}
