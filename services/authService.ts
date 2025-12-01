/**
 * Authentication Service
 * Handles employee login, OTP verification, and session management
 */

const AUTH_SESSION_KEY = 'edc_auth_session';

export interface AuthSession {
    phoneNumber: string;
    isLoggedIn: boolean;
    loginTime: string;
}

/**
 * Send OTP to the provided phone number via API
 */
export async function sendOTP(phoneNumber: string): Promise<{ success: boolean; message?: string; devOtp?: string }> {
    try {
        const response = await fetch('/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber }),
        });

        const data = await response.json();

        if (data.devOtp) {
            console.log(`[Dev Mode] OTP: ${data.devOtp}`);
        }

        return data;
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false, message: 'Network error' };
    }
}

/**
 * Verify the OTP entered by the user via API
 */
export async function verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
    try {
        const response = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber, otp }),
        });

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
    }
}

/**
 * Create a user session after successful verification
 */
export function loginUser(phoneNumber: string): void {
    const session: AuthSession = {
        phoneNumber,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

/**
 * Clear user session
 */
export function logoutUser(): void {
    localStorage.removeItem(AUTH_SESSION_KEY);
}

/**
 * Check if user is currently authenticated
 */
export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const sessionStr = localStorage.getItem(AUTH_SESSION_KEY);
        if (!sessionStr) return false;

        const session: AuthSession = JSON.parse(sessionStr);
        return session.isLoggedIn;
    } catch {
        return false;
    }
}

/**
 * Get current user session details
 */
export function getAuthSession(): AuthSession | null {
    if (typeof window === 'undefined') return null;

    try {
        const sessionStr = localStorage.getItem(AUTH_SESSION_KEY);
        if (!sessionStr) return null;

        return JSON.parse(sessionStr);
    } catch {
        return null;
    }
}
