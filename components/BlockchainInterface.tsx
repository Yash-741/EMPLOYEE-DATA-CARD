'use client';

import { useState, useEffect } from 'react';
import { BlockchainRecord } from '@/types';
import { createBlockchainAdapter } from '@/services/blockchainAdapter';
import { getEmployeeProfile } from '@/services/edcService';

interface BlockchainInterfaceProps {
    blockchainRecord?: BlockchainRecord;
    onUpdate: (record: BlockchainRecord) => void;
}

export default function BlockchainInterface({
    blockchainRecord,
    onUpdate,
}: BlockchainInterfaceProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleStoreOnBlockchain = async () => {
        setLoading(true);
        setError('');

        const profile = getEmployeeProfile();
        if (!profile) {
            setError('No profile found. Please complete your profile first.');
            setLoading(false);
            return;
        }

        const adapter = createBlockchainAdapter('mock');
        const result = await adapter.storeProfileData(profile);

        if (result.success && result.data) {
            onUpdate(result.data);
        } else {
            setError(result.error || 'Failed to store on blockchain');
        }

        setLoading(false);
    };

    return (
        <div className="edc-paper">
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--edc-primary)' }}>
                Blockchain Integration
            </h3>

            {!blockchainRecord ? (
                <div className="space-y-6">
                    <div className="border-l-4 pl-4" style={{ borderColor: 'var(--edc-info)' }}>
                        <h4 className="font-semibold mb-2">What is Blockchain Verification?</h4>
                        <p className="text-sm text-gray-600 mb-2">
                            Blockchain technology ensures the immutability and transparency of your employee data.
                            Once stored on the blockchain, your data cannot be tampered with, providing ultimate
                            trust and security.
                        </p>
                        <p className="text-sm text-gray-600">
                            Benefits include:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
                            <li>Tamper-proof record of your credentials</li>
                            <li>Instant verification by employers</li>
                            <li>Decentralized and secure storage</li>
                            <li>Permanent and transparent record</li>
                        </ul>
                    </div>

                    <div className="text-center py-8">
                        <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <svg
                                className="w-16 h-16 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                        <h4 className="text-xl font-bold mb-2">Store Your Data on Blockchain</h4>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Create an immutable record of your employee data that can be verified by anyone,
                            anywhere.
                        </p>
                        <button
                            onClick={handleStoreOnBlockchain}
                            disabled={loading}
                            className="edc-button edc-button-gold"
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Storing on Blockchain...
                                </>
                            ) : (
                                'Store on Blockchain'
                            )}
                        </button>
                        {error && <p className="edc-error-message mt-4">{error}</p>}
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                            <strong>Prototype Notice:</strong> This implementation uses a mock blockchain
                            adapter. In production, this would integrate with actual blockchain networks like
                            Ethereum, Hyperledger, or Polygon.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Success Message */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <svg
                                className="w-8 h-8 text-green-600"
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
                            <h4 className="text-xl font-bold text-green-900">
                                Successfully Stored on Blockchain!
                            </h4>
                        </div>
                        <p className="text-sm text-green-800">
                            Your employee data has been securely stored on the blockchain. The record is now
                            immutable and can be verified by employers.
                        </p>
                    </div>

                    {/* Transaction Details */}
                    <div className="bg-white border-2 rounded-lg p-6">
                        <h4 className="font-bold text-lg mb-4">Transaction Details</h4>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-semibold text-gray-500">Transaction Hash</p>
                                <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
                                    {blockchainRecord.transactionHash}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Block Number</p>
                                    <p className="text-base font-mono">{blockchainRecord.blockNumber}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Network</p>
                                    <p className="text-base">{blockchainRecord.network || 'Mock Blockchain'}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Timestamp</p>
                                    <p className="text-base">
                                        {new Date(blockchainRecord.timestamp).toLocaleString('en-IN')}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-500">Status</p>
                                    <span className="edc-badge edc-badge-success">Confirmed</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">Data Hash (SHA-256)</p>
                                <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
                                    {blockchainRecord.dataHash}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button className="edc-button edc-button-primary">
                            View on Explorer
                        </button>
                        <button className="edc-button edc-button-secondary">
                            Share Verification Link
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
