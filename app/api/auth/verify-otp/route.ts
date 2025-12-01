import { NextResponse } from 'next/server';
import { otpStore } from '../send-otp/route'; // Sharing in-memory store for prototype

export async function POST(request: Request) {
    try {
        const { phoneNumber, otp } = await request.json();

        if (!phoneNumber || !otp) {
            return NextResponse.json(
                { success: false, error: 'Phone number and OTP are required' },
                { status: 400 }
            );
        }

        const cleanNumber = phoneNumber.replace(/\D/g, '').slice(-10);
        const storedData = otpStore.get(cleanNumber);

        if (!storedData) {
            return NextResponse.json(
                { success: false, error: 'OTP expired or not found' },
                { status: 400 }
            );
        }

        if (Date.now() > storedData.expires) {
            otpStore.delete(cleanNumber);
            return NextResponse.json(
                { success: false, error: 'OTP expired' },
                { status: 400 }
            );
        }

        if (storedData.otp !== otp) {
            return NextResponse.json(
                { success: false, error: 'Invalid OTP' },
                { status: 400 }
            );
        }

        // OTP is valid
        otpStore.delete(cleanNumber); // Clear used OTP

        return NextResponse.json({
            success: true,
            message: 'OTP verified successfully'
        });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        return NextResponse.json(
            { success: false, error: 'Verification failed' },
            { status: 500 }
        );
    }
}
