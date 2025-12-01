'use client';

import { useEffect, useState } from 'react';
import { EmployeeProfile, VerificationStatus } from '@/types';
import { getEmployeeProfile, updateEmployeeProfile } from '@/services/edcService';
import BackgroundVerification from '@/components/BackgroundVerification';
import CriminalRecordCheck from '@/components/CriminalRecordCheck';

export default function Verification() {
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

    const handleVerificationUpdate = async (status: VerificationStatus) => {
        if (!profile) return;
        const result = await updateEmployeeProfile({ verificationStatus: status });
        if (result.success && result.data) {
            setProfile(result.data);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading verification status...</p>
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
                            Verification Hub
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Please create your profile first to access verification services.
                        </p>
                        <a href="/profile" className="edc-button edc-button-primary text-lg">
                            Create Profile
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    const verificationItems = [
        {
            name: 'Background Check',
            status: profile.verificationStatus.backgroundCheck.status,
            description: 'Verify employment history and credentials',
        },
        {
            name: 'Criminal Record',
            status: profile.verificationStatus.criminalRecord.status,
            description: 'Police verification and criminal record check',
        },
        {
            name: 'Document Verification',
            status: profile.verificationStatus.documentVerification.status,
            description: 'Validate educational and professional certificates',
        },
    ];

    const getStatusColor = (status: string) => {
        if (status === 'verified' || status === 'clear') return 'var(--edc-success)';
        if (status === 'in-progress') return 'var(--edc-info)';
        if (status === 'failed' || status === 'issues-found') return 'var(--edc-error)';
        return 'var(--edc-gray-400)';
    };

    return (
        <div className="min-h-screen py-8">
            <div className="edc-container">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--edc-primary)' }}>
                        Verification Hub
                    </h1>
                    <p className="text-gray-600">
                        Complete all verifications to build trust with employers
                    </p>
                </div>

                {/* Verification Overview */}
                <div className="edc-paper mb-8">
                    <h2 className="text-2xl font-bold mb-6">Verification Status Overview</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {verificationItems.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 border-2 rounded-lg"
                                style={{ borderColor: getStatusColor(item.status) }}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: getStatusColor(item.status) }}
                                    />
                                    <h3 className="font-bold">{item.name}</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                <span
                                    className={`edc-badge ${item.status === 'verified' || item.status === 'clear'
                                            ? 'edc-badge-success'
                                            : item.status === 'in-progress'
                                                ? 'edc-badge-info'
                                                : item.status === 'failed' || item.status === 'issues-found'
                                                    ? 'edc-badge-error'
                                                    : 'edc-badge-pending'
                                        }`}
                                >
                                    {item.status === 'verified' || item.status === 'clear'
                                        ? '✓ Complete'
                                        : item.status === 'in-progress'
                                            ? 'In Progress'
                                            : 'Pending'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Background Verification */}
                <div className="mb-8">
                    <BackgroundVerification
                        verificationStatus={profile.verificationStatus}
                        onUpdate={handleVerificationUpdate}
                    />
                </div>

                {/* Criminal Record Check */}
                <div className="mb-8">
                    <CriminalRecordCheck
                        verificationStatus={profile.verificationStatus}
                        onUpdate={handleVerificationUpdate}
                    />
                </div>

                {/* Document Verification */}
                <div className="edc-paper">
                    <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--edc-primary)' }}>
                        Document Verification
                    </h3>
                    <div className="space-y-4">
                        <div className="border-l-4 pl-4" style={{ borderColor: 'var(--edc-info)' }}>
                            <p className="text-sm text-gray-600 mb-2">
                                Upload your educational certificates, experience letters, and other supporting
                                documents for verification by employers.
                            </p>
                        </div>

                        <div className="border-2 border-dashed rounded-lg p-8 text-center"
                            style={{ borderColor: 'var(--edc-gray-300)' }}>
                            <svg
                                className="mx-auto h-16 w-16 text-gray-400 mb-4"
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
                            <p className="text-lg font-semibold mb-2">Upload Documents</p>
                            <p className="text-sm text-gray-600 mb-4">
                                Drag and drop files here, or click to browse
                            </p>
                            <button className="edc-button edc-button-primary">
                                Select Files
                            </button>
                            <p className="text-xs text-gray-500 mt-4">
                                Supported formats: PDF, JPG, PNG (Max 5MB per file)
                            </p>
                        </div>

                        {profile.verificationStatus.documentVerification.verifiedDocuments.length > 0 && (
                            <div>
                                <h4 className="font-semibold mb-3">Verified Documents</h4>
                                <div className="space-y-2">
                                    {profile.verificationStatus.documentVerification.verifiedDocuments.map(
                                        (doc, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <svg
                                                        className="w-5 h-5 text-green-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    <span className="text-sm font-medium">{doc}</span>
                                                </div>
                                                <span className="edc-badge edc-badge-success">Verified</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
