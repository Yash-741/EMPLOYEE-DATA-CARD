'use client';

import { useState } from 'react';
import { VerificationStatus } from '@/types';

interface CriminalRecordCheckProps {
    verificationStatus: VerificationStatus;
    onUpdate: (status: VerificationStatus) => void;
}

export default function CriminalRecordCheck({
    verificationStatus,
    onUpdate,
}: CriminalRecordCheckProps) {
    const [requesting, setRequesting] = useState(false);

    const handleRequestCheck = async () => {
        setRequesting(true);

        // Simulate API call to government database
        await new Promise((resolve) => setTimeout(resolve, 2500));

        onUpdate({
            ...verificationStatus,
            criminalRecord: {
                ...verificationStatus.criminalRecord,
                status: 'in-progress',
                remarks: 'Request submitted to National Crime Records Bureau (NCRB)',
            },
        });

        setRequesting(false);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'clear':
                return <span className="edc-badge edc-badge-success">✓ Clear</span>;
            case 'in-progress':
                return <span className="edc-badge edc-badge-info">Under Review</span>;
            case 'issues-found':
                return <span className="edc-badge edc-badge-warning">Issues Found</span>;
            default:
                return <span className="edc-badge edc-badge-pending">Not Initiated</span>;
        }
    };

    return (
        <div className="edc-paper">
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--edc-primary)' }}>
                Criminal Record Verification
            </h3>

            <div className="space-y-6">
                {/* Current Status */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Verification Status</h4>
                            {getStatusBadge(verificationStatus.criminalRecord.status)}
                        </div>
                        {verificationStatus.criminalRecord.status === 'pending' && (
                            <button
                                onClick={handleRequestCheck}
                                disabled={requesting}
                                className="edc-button edc-button-primary"
                            >
                                {requesting ? 'Submitting Request...' : 'Request Police Verification'}
                            </button>
                        )}
                    </div>

                    {verificationStatus.criminalRecord.remarks && (
                        <div className="mt-4 pt-4 border-t">
                            <p className="text-sm">
                                <strong>Status:</strong> {verificationStatus.criminalRecord.remarks}
                            </p>
                        </div>
                    )}

                    {verificationStatus.criminalRecord.verifiedDate && (
                        <div className="mt-2">
                            <p className="text-sm">
                                <strong>Verified On:</strong> {verificationStatus.criminalRecord.verifiedDate}
                            </p>
                        </div>
                    )}
                </div>

                {/* Information Alert */}
                <div className="border-l-4 pl-4" style={{ borderColor: 'var(--edc-warning)' }}>
                    <h4 className="font-semibold mb-2">Important Information</h4>
                    <p className="text-sm text-gray-600 mb-2">
                        Criminal record verification is conducted through the National Crime Records Bureau
                        (NCRB) and local police departments. This process may take 7-14 business days.
                    </p>
                    <p className="text-sm text-gray-600">
                        You will need to provide:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                        <li>Identity proof (Aadhaar / PAN)</li>
                        <li>Address proof</li>
                        <li>Recent passport-size photograph</li>
                        <li>Consent for police verification</li>
                    </ul>
                </div>

                {/* Demo Notice */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="flex gap-3">
                        <div className="text-blue-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-1">Prototype Notice</h4>
                            <p className="text-sm text-blue-800">
                                This is a prototype implementation. Actual integration with NCRB and police
                                verification systems requires official government API access and legal
                                authorization.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Results (if verified) */}
                {verificationStatus.criminalRecord.status === 'clear' && (
                    <div className="border-2 border-green-200 bg-green-50 rounded-lg p-6">
                        <div className="flex items-start gap-3">
                            <div className="text-green-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-green-900 text-lg mb-2">
                                    No Criminal Record Found
                                </h4>
                                <p className="text-sm text-green-800">
                                    Based on the verification conducted by NCRB, no criminal records were found for
                                    this individual. This verification is valid and can be trusted by employers.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
