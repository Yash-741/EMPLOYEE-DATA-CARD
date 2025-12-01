import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// In-memory OTP store (replace with Redis/Database in production)
// Map<phoneNumber, { otp: string, expires: number }>
export const otpStore = new Map<string, { otp: string, expires: number }>();

export async function POST(request: Request) {
    try {
        const { phoneNumber } = await request.json();

        if (!phoneNumber) {
            return NextResponse.json(
                { success: false, error: 'Phone number is required' },
                { status: 400 }
            );
        }

        // Validate phone number format (basic check)
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        if (cleanNumber.length < 10) {
            return NextResponse.json(
                { success: false, error: 'Invalid phone number' },
                { status: 400 }
            );
        }

        // Format for Twilio (assuming India +91 for now based on context)
        const formattedNumber = `+91${cleanNumber.slice(-10)}`;

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store OTP with 5-minute expiration
        otpStore.set(cleanNumber.slice(-10), {
            otp,
            expires: Date.now() + 5 * 60 * 1000
        });

        // Send SMS via Twilio
        if (process.env.TWILIO_ACCOUNT_SID) {
            await client.messages.create({
                body: `Your Employee Data Card verification code is: ${otp}. Valid for 5 minutes.`,
                from: twilioPhoneNumber,
                to: formattedNumber
            });
            console.log(`[Twilio] SMS sent to ${formattedNumber}`);
        } else {
            console.warn('[Twilio] Credentials missing, skipping SMS send. OTP:', otp);
            // For dev without keys, we might want to return the OTP or just log it
            // returning it in response for dev convenience if keys are missing
            return NextResponse.json({
                success: true,
                message: 'OTP generated (Dev Mode: Check console)',
                devOtp: otp
            });
        }

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully'
        });

    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send OTP' },
            { status: 500 }
        );
    }
}
