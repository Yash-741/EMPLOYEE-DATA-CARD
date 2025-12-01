'use client';

import { useState } from 'react';
import { EPFDetails } from '@/types';
import { fetchEPFDetails } from '@/services/epfService';

interface EPFIntegrationProps {
    epfDetails?: EPFDetails;
    onUpdate: (details: EPFDetails) => void;
}

export default function EPFIntegration({ epfDetails, onUpdate }: EPFIntegrationProps) {
    const [uanNumber, setUanNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchEPF = async () => {
        setLoading(true);
        setError('');

        const result = await fetchEPFDetails(uanNumber);

        if (result.success && result.data) {
            onUpdate(result.data);
        } else {
            setError(result.error || 'Failed to fetch EPF details');
        }

        setLoading(false);
    };

    return (
        <div className="edc-paper">
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--edc-primary)' }}>
                EPF Integration
            </h3>

            {!epfDetails ? (
                <div className="space-y-6">
                    <div>
                        <label className="edc-label">Enter UAN (Universal Account Number)</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={uanNumber}
                                onChange={(e) => setUanNumber(e.target.value)}
                                className="edc-input flex-1"
                                placeholder="12-digit UAN number"
                                maxLength={12}
                            />
                            <button
                                onClick={handleFetchEPF}
                                disabled={loading || uanNumber.length !== 12}
                                className="edc-button edc-button-primary"
                            >
                                {loading ? 'Fetching...' : 'Fetch EPF Details'}
                            </button>
                        </div>
                        {error && <p className="edc-error-message">{error}</p>}
                    </div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">About EPF Integration</h4>
                        <p className="text-sm text-blue-800">
                            Enter your Universal Account Number (UAN) to automatically fetch and verify your EPF
                            (Employee Provident Fund) details. This helps employers verify your previous
                            employment and PF contributions.
                        </p>
                        <p className="text-sm text-blue-800 mt-2">
                            <strong>Demo Mode:</strong> Since this is a prototype, it will return mock data. In
                            production, this would connect to the EPFO API.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* EPF Details Display */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <svg
                                className="w-6 h-6 text-green-600"
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
                            <span className="font-semibold text-green-900">EPF Details Verified</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">UAN Number</p>
                            <p className="text-lg font-bold font-mono">{epfDetails.uanNumber}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">PF Account Number</p>
                            <p className="text-base font-mono">{epfDetails.pfAccountNumber || 'N/A'}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">Employee Name</p>
                            <p className="text-base font-medium">{epfDetails.employeeName}</p>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">PF Balance</p>
                            <p className="text-lg font-bold" style={{ color: 'var(--edc-primary)' }}>
                                ₹{epfDetails.pfBalance?.toLocaleString('en-IN') || 'N/A'}
                            </p>
                        </div>

                        {epfDetails.previousEmployer && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm font-semibold text-gray-500">Previous Employer</p>
                                <p className="text-base font-medium">{epfDetails.previousEmployer}</p>
                            </div>
                        )}

                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-500">Last Updated</p>
                            <p className="text-base">
                                {new Date(epfDetails.lastUpdated).toLocaleDateString('en-IN')}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => onUpdate({} as EPFDetails)}
                        className="edc-button edc-button-secondary"
                    >
                        Update UAN
                    </button>
                </div>
            )}
        </div>
    );
}
