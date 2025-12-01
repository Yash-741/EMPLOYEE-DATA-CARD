'use client';

import { useState } from 'react';
import { VerificationStatus } from '@/types';

interface BackgroundVerificationProps {
    verificationStatus: VerificationStatus;
    onUpdate: (status: VerificationStatus) => void;
}

export default function BackgroundVerification({
    verificationStatus,
    onUpdate,
}: BackgroundVerificationProps) {
    const [requesting, setRequesting] = useState(false);

    const handleRequestVerification = async () => {
        setRequesting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        onUpdate({
            ...verificationStatus,
            backgroundCheck: {
                ...verificationStatus.backgroundCheck,
                status: 'in-progress',
            },
        });

        setRequesting(false);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'verified':
                return <span className="edc-badge edc-badge-success">✓ Verified</span>;
            case 'in-progress':
                return <span className="edc-badge edc-badge-info">In Progress</span>;
            case 'failed':
                return <span className="edc-badge edc-badge-error">Failed</span>;
            default:
                return <span className="edc-badge edc-badge-pending">Pending</span>;
        }
    };

    return (
        <div className="edc-paper">
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--edc-primary)' }}>
                Background Verification
            </h3>

            <div className="space-y-6">
                {/* Current Status */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Verification Status</h4>
                            {getStatusBadge(verificationStatus.backgroundCheck.status)}
                        </div>
                        {verificationStatus.backgroundCheck.status === 'pending' && (
                            <button
                                onClick={handleRequestVerification}
                                disabled={requesting}
                                className="edc-button edc-button-primary"
                            >
                                {requesting ? 'Requesting...' : 'Request Verification'}
                            </button>
                        )}
                    </div>

                    {verificationStatus.backgroundCheck.verifiedBy && (
                        <div className="mt-4 pt-4 border-t">
                            <p className="text-sm">
                                <strong>Verified By:</strong> {verificationStatus.backgroundCheck.verifiedBy}
                            </p>
                            {verificationStatus.backgroundCheck.verifiedDate && (
                                <p className="text-sm">
                                    <strong>Date:</strong> {verificationStatus.backgroundCheck.verifiedDate}
                                </p>
                            )}
                            {verificationStatus.backgroundCheck.remarks && (
                                <p className="text-sm mt-2">
                                    <strong>Remarks:</strong> {verificationStatus.backgroundCheck.remarks}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Information */}
                <div className="border-l-4 pl-4" style={{ borderColor: 'var(--edc-info)' }}>
                    <h4 className="font-semibold mb-2">What is Background Verification?</h4>
                    <p className="text-sm text-gray-600 mb-2">
                        Background verification is a process to validate your employment history, educational
                        qualifications, and professional credentials with your previous employers and
                        institutions.
                    </p>
                    <p className="text-sm text-gray-600">
                        This typically includes verification of:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>Employment dates and job titles</li>
                        <li>Salary information (if authorized)</li>
                        <li>Reason for leaving</li>
                        <li>Professional conduct and performance</li>
                    </ul>
                </div>

                {/* Upload Documents */}
                <div>
                    <h4 className="font-semibold mb-3">Supporting Documents</h4>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center"
                        style={{ borderColor: 'var(--edc-gray-300)' }}>
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                            Upload experience letters, relieving letters, or other supporting documents
                        </p>
                        <button className="edc-button edc-button-secondary mt-4">
                            Choose Files
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
