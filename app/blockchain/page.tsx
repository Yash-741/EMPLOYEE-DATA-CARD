'use client';

import { useEffect, useState } from 'react';
import { EmployeeProfile, BlockchainRecord } from '@/types';
import { getEmployeeProfile, updateEmployeeProfile } from '@/services/edcService';
import BlockchainInterface from '@/components/BlockchainInterface';

export default function Blockchain() {
    const [profile, setProfile] = useState<EmployeeProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = () => {
            const data = getEmployeeProfile();
            setProfile(data);
            setLoading(false);
        };

        loadProfile();
    }, []);

    const handleBlockchainUpdate = async (blockchainRecord: BlockchainRecord) => {
        if (!profile) return;
        const result = await updateEmployeeProfile({ blockchainRecord });
        if (result.success && result.data) {
            setProfile(result.data);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading blockchain status...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen py-12">
                <div className="edc-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--edc-primary)' }}>
                            Blockchain Integration
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Please create your profile first to access blockchain features.
                        </p>
                        <a href="/profile" className="edc-button edc-button-primary text-lg">
                            Create Profile
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="edc-container max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--edc-primary)' }}>
                        Blockchain Integration
                    </h1>
                    <p className="text-gray-600">
                        Secure your employee data with blockchain technology
                    </p>
                </div>

                {/* Blockchain Info Banner */}
                <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Why Blockchain?</h3>
                            <p className="text-white/90 text-sm">
                                Blockchain technology creates an immutable, transparent, and tamper-proof record of
                                your employment credentials. Once stored, your data cannot be altered, providing
                                ultimate trust and verification for employers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Blockchain Features */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="edc-paper">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, var(--edc-primary), var(--edc-primary-light))' }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Immutable Records</h4>
                                <p className="text-sm text-gray-600">
                                    Once stored, your data cannot be changed or deleted, ensuring permanent proof of
                                    your credentials.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="edc-paper">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, var(--edc-gold-dark), var(--edc-gold))' }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Decentralized Storage</h4>
                                <p className="text-sm text-gray-600">
                                    Your data is stored across a distributed network, not controlled by any single
                                    entity.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="edc-paper">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, var(--edc-success), #27ae60)' }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Instant Verification</h4>
                                <p className="text-sm text-gray-600">
                                    Employers can instantly verify your credentials without lengthy background checks.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="edc-paper">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, var(--edc-info), #3498db)' }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Complete Transparency</h4>
                                <p className="text-sm text-gray-600">
                                    All transactions are publicly verifiable while maintaining your data privacy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Blockchain Interface */}
                <BlockchainInterface
                    blockchainRecord={profile.blockchainRecord}
                    onUpdate={handleBlockchainUpdate}
                />

                {/* Additional Info */}
                <div className="mt-8 edc-paper bg-gray-50">
                    <h4 className="font-bold text-lg mb-3">Frequently Asked Questions</h4>
                    <div className="space-y-4">
                        <div>
                            <h5 className="font-semibold mb-1">What data is stored on the blockchain?</h5>
                            <p className="text-sm text-gray-600">
                                A cryptographic hash (fingerprint) of your data is stored, not the actual data
                                itself. This ensures privacy while maintaining verifiability.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-1">Is my data safe?</h5>
                            <p className="text-sm text-gray-600">
                                Yes! Blockchain uses advanced cryptography to secure your data. The distributed
                                nature of blockchain makes it virtually impossible to hack or tamper with.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-1">Can I delete my data from the blockchain?</h5>
                            <p className="text-sm text-gray-600">
                                No, blockchain records are permanent. However, only a hash is stored, and you
                                control who has access to your actual profile data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
