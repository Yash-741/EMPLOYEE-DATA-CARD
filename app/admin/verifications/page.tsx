'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    isAdminLoggedIn,
    getPendingVerifications,
    approveVerification,
    rejectVerification,
} from '@/services/adminService';
import { VerificationRequest } from '@/types/admin';

export default function AdminVerifications() {
    const router = useRouter();
    const [requests, setRequests] = useState<VerificationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [remarks, setRemarks] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!isAdminLoggedIn()) {
            router.push('/admin');
            return;
        }

        setRequests(getPendingVerifications());
        setLoading(false);
    }, [router]);

    const handleApprove = async (requestId: string) => {
        setActionLoading(requestId);
        const success = await approveVerification(requestId, remarks[requestId]);

        if (success) {
            setRequests(requests.filter(r => r.id !== requestId));
            alert('Verification approved successfully!');
        }

        setActionLoading(null);
    };

    const handleReject = async (requestId: string) => {
        if (!remarks[requestId]?.trim()) {
            alert('Please provide remarks for rejection');
            return;
        }

        setActionLoading(requestId);
        const success = await rejectVerification(requestId, remarks[requestId]);

        if (success) {
            setRequests(requests.filter(r => r.id !== requestId));
            alert('Verification rejected');
        }

        setActionLoading(null);
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'background': return 'Background Check';
            case 'criminal': return 'Criminal Record';
            case 'document': return 'Document Verification';
            default: return type;
        }
    };

    const getTypeBadgeColor = (type: string) => {
        switch (type) {
            case 'background': return 'bg-blue-100 text-blue-800';
            case 'criminal': return 'bg-red-100 text-red-800';
            case 'document': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading verification requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="edc-container">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold" style={{ color: 'var(--edc-primary)' }}>
                            Verification Requests
                        </h1>
                        <p className="text-gray-600">Review and approve employee verification requests</p>
                    </div>
                    <a href="/admin/dashboard" className="edc-button edc-button-secondary">
                        ← Back to Dashboard
                    </a>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="edc-paper">
                        <p className="text-gray-600 text-sm mb-1">Pending Requests</p>
                        <p className="text-3xl font-bold text-yellow-600">{requests.length}</p>
                    </div>
                    <div className="edc-paper">
                        <p className="text-gray-600 text-sm mb-1">Background Checks</p>
                        <p className="text-3xl font-bold text-blue-600">
                            {requests.filter(r => r.type === 'background').length}
                        </p>
                    </div>
                    <div className="edc-paper">
                        <p className="text-gray-600 text-sm mb-1">Criminal Records</p>
                        <p className="text-3xl font-bold text-red-600">
                            {requests.filter(r => r.type === 'criminal').length}
                        </p>
                    </div>
                </div>

                {/* Verification Requests */}
                <div className="space-y-6">
                    {requests.length > 0 ? (
                        requests.map((request) => (
                            <div key={request.id} className="edc-paper">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold">{request.employeeName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeBadgeColor(request.type)}`}>
                                                {getTypeLabel(request.type)}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">EDC Number: <span className="font-mono">{request.edcNumber}</span></p>
                                        <p className="text-sm text-gray-500">
                                            Requested on: {new Date(request.requestedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="mb-4">
                                        <label className="edc-label">Admin Remarks</label>
                                        <textarea
                                            value={remarks[request.id] || ''}
                                            onChange={(e) => setRemarks({ ...remarks, [request.id]: e.target.value })}
                                            className="edc-textarea"
                                            placeholder="Add verification notes or reasons for rejection..."
                                            rows={3}
                                        />
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleApprove(request.id)}
                                            disabled={actionLoading === request.id}
                                            className="edc-button edc-button-primary"
                                        >
                                            {actionLoading === request.id ? 'Processing...' : '✓ Approve Verification'}
                                        </button>
                                        <button
                                            onClick={() => handleReject(request.id)}
                                            disabled={actionLoading === request.id}
                                            className="edc-button"
                                            style={{ background: '#e74c3c', color: 'white' }}
                                        >
                                            {actionLoading === request.id ? 'Processing...' : '✗ Reject'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="edc-paper text-center py-12">
                            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold mb-2">No Pending Requests</h3>
                            <p className="text-gray-600">All verification requests have been processed.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
