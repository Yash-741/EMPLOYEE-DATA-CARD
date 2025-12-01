'use client';

import { EmployeeProfile } from '@/types';
import { formatEDCNumber } from '@/utils/edcNumber';

interface EDCCardProps {
    profile: EmployeeProfile;
    variant?: 'full' | 'preview';
}

export default function EDCCard({ profile, variant = 'full' }: EDCCardProps) {
    const { personalDetails } = profile;
    const edcNumber = personalDetails.edcNumber || 'EDC-XXXX-XXXXXXXX';

    return (
        <div className="edc-card">
            {/* Header with emblem */}
            <div className="edc-card-header">
                <div className="edc-emblem">EDC</div>
                <div>
                    <h2 className="edc-title">Employee Data Card</h2>
                    <p className="edc-subtitle">Government of India | Digital Identity</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-6">
                {/* Photo Section */}
                <div className="flex-shrink-0">
                    <div
                        className="w-32 h-40 rounded-lg overflow-hidden border-2 shadow-md"
                        style={{ borderColor: 'var(--edc-gold)' }}
                    >
                        {personalDetails.photo ? (
                            <img
                                src={personalDetails.photo}
                                alt={`${personalDetails.firstName} ${personalDetails.lastName}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <svg
                                    className="w-16 h-16 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Name</p>
                            <p className="text-lg font-bold" style={{ color: 'var(--edc-primary)' }}>
                                {personalDetails.firstName} {personalDetails.lastName}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-500">EDC Number</p>
                            <p className="text-lg font-bold font-mono" style={{ color: 'var(--edc-gold-dark)' }}>
                                {formatEDCNumber(edcNumber)}
                            </p>
                        </div>

                        {variant === 'full' && (
                            <>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Date of Birth</p>
                                    <p className="text-base font-medium">{personalDetails.dateOfBirth || 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Gender</p>
                                    <p className="text-base font-medium">{personalDetails.gender || 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Email</p>
                                    <p className="text-base font-medium">{personalDetails.email || 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Phone</p>
                                    <p className="text-base font-medium">{personalDetails.phone || 'N/A'}</p>
                                </div>

                                {personalDetails.aadhaarNumber && (
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500">Aadhaar</p>
                                        <p className="text-base font-medium font-mono">
                                            {personalDetails.aadhaarNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Address */}
                    {variant === 'full' && personalDetails.address?.city && (
                        <div className="mt-4">
                            <p className="text-sm font-semibold text-gray-500">Address</p>
                            <p className="text-base">
                                {personalDetails.address.street && `${personalDetails.address.street}, `}
                                {personalDetails.address.city}, {personalDetails.address.state}{' '}
                                {personalDetails.address.pinCode}
                            </p>
                        </div>
                    )}
                </div>

                {/* QR Code Section */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="w-24 h-24 bg-white border-2 rounded-lg flex items-center justify-center edc-holographic">
                        <div className="text-xs text-center font-bold" style={{ color: 'var(--edc-primary)' }}>
                            QR Code
                            <br />
                            Blockchain
                            <br />
                            Verified
                        </div>
                    </div>
                    {profile.blockchainRecord && (
                        <div className="text-xs text-center">
                            <p className="font-semibold text-green-600">✓ Verified</p>
                            <p className="text-gray-500">on Blockchain</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer with verification status */}
            <div className="mt-6 pt-4 border-t-2" style={{ borderColor: 'var(--edc-gold)' }}>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <span
                                className={`edc-status-indicator ${profile.verificationStatus.backgroundCheck.status === 'verified'
                                        ? 'edc-status-verified'
                                        : 'edc-status-pending'
                                    }`}
                            />
                            <span className="text-sm">Background Check</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`edc-status-indicator ${profile.verificationStatus.criminalRecord.status === 'clear'
                                        ? 'edc-status-verified'
                                        : 'edc-status-pending'
                                    }`}
                            />
                            <span className="text-sm">Criminal Record</span>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-gray-500">Profile Completion</p>
                        <p className="text-lg font-bold" style={{ color: 'var(--edc-primary)' }}>
                            {profile.profileCompletion}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
