'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sendOTP, verifyOTP, loginUser } from '@/services/authService';

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!phoneNumber || phoneNumber.length < 10) {
            setError('Please enter a valid mobile number');
            return;
        }

        setLoading(true);
        try {
            const response = await sendOTP(phoneNumber);
            if (response.success) {
                setStep('otp');
                if (response.devOtp) {
                    // Show OTP in UI for dev mode/testing without SMS credits
                    alert(`[DEV MODE] Your OTP is: ${response.devOtp}`);
                }
            } else {
                setError(response.message || 'Failed to send OTP. Please check the number and try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const isValid = await verifyOTP(phoneNumber, otp);
            if (isValid) {
                loginUser(phoneNumber);
                router.push('/dashboard');
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="edc-emblem mx-auto mb-6" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                        EDC
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Employee Login
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Secure access to your digital credentials
                    </p>
                </div>

                <div className="edc-glass-card p-8 rounded-2xl shadow-xl">
                    {step === 'phone' ? (
                        <form className="space-y-6" onSubmit={handleSendOTP}>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Mobile Number
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">+91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        className="edc-input pl-12 block w-full sm:text-sm rounded-md"
                                        placeholder="98765 43210"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                                        maxLength={10}
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                {loading ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </form>
                    ) : (
                        <form className="space-y-6" onSubmit={handleVerifyOTP}>
                            <div className="text-center mb-4">
                                <p className="text-sm text-gray-600">
                                    OTP sent to +91 {phoneNumber}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStep('phone')}
                                    className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                                >
                                    Change Number
                                </button>
                            </div>

                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                    Enter OTP
                                </label>
                                <input
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    className="edc-input mt-1 block w-full text-center tracking-widest text-2xl"
                                    placeholder="• • • • • •"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>

                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={handleSendOTP}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                    disabled={loading}
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="text-center">
                    <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
