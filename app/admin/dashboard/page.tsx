'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdminLoggedIn, getAdminSession, adminLogout, getAdminStats, getPendingVerifications } from '@/services/adminService';
import { AdminStats, VerificationRequest } from '@/types/admin';

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [pendingRequests, setPendingRequests] = useState<VerificationRequest[]>([]);
    const [adminSession, setAdminSession] = useState<any>(null);

    useEffect(() => {
        if (!isAdminLoggedIn()) {
            router.push('/admin');
            return;
        }

        setAdminSession(getAdminSession());
        setStats(getAdminStats());
        setPendingRequests(getPendingVerifications());
    }, [router]);

    const handleLogout = () => {
        adminLogout();
        router.push('/admin');
    };

    if (!stats) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Header */}
            <div className="edc-glass-surface shadow-md border-b-4 sticky top-0 z-50" style={{ borderColor: 'var(--edc-gold)' }}>
                <div className="edc-container">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="edc-emblem" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                                EDC
                            </div>
                            <div>
                                <div className="font-bold text-lg" style={{ color: 'var(--edc-primary)' }}>
                                    Admin Portal
                                </div>
                                <div className="text-xs text-gray-500">Employee Data Card System</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-sm text-right">
                                <div className="font-semibold">{adminSession?.username}</div>
                                <div className="text-gray-500">{adminSession?.role}</div>
                            </div>
                            <button onClick={handleLogout} className="edc-button edc-button-secondary">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="edc-container py-8">
                <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--edc-primary)' }}>
                    Dashboard Overview
                </h1>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="edc-paper bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm mb-1">Total Employees</p>
                                <p className="text-4xl font-bold">{stats.totalEmployees}</p>
                            </div>
                            <svg className="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="edc-paper bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-yellow-100 text-sm mb-1">Pending Verifications</p>
                                <p className="text-4xl font-bold">{stats.pendingVerifications}</p>
                            </div>
                            <svg className="w-12 h-12 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="edc-paper bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm mb-1">Approved</p>
                                <p className="text-4xl font-bold">{stats.approvedVerifications}</p>
                            </div>
                            <svg className="w-12 h-12 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="edc-paper bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm mb-1">Blockchain Records</p>
                                <p className="text-4xl font-bold">{stats.blockchainRecords}</p>
                            </div>
                            <svg className="w-12 h-12 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Link href="/admin/employees" className="edc-paper hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Manage Employees</h3>
                                <p className="text-sm text-gray-600">View and search all employees</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/admin/verifications" className="edc-paper hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Verifications</h3>
                                <p className="text-sm text-gray-600">Approve/reject requests</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/admin/analytics" className="edc-paper hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Analytics</h3>
                                <p className="text-sm text-gray-600">View reports and insights</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Pending Verification Requests */}
                <div className="edc-paper">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--edc-primary)' }}>
                        Pending Verification Requests
                    </h2>

                    {pendingRequests.length > 0 ? (
                        <div className="space-y-3">
                            {pendingRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-blue-300 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                            <span className="font-bold text-yellow-700">
                                                {request.type === 'background' ? 'BG' : request.type === 'criminal' ? 'CR' : 'DOC'}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{request.employeeName}</h4>
                                            <p className="text-sm text-gray-600">EDC: {request.edcNumber}</p>
                                            <p className="text-sm text-gray-500">
                                                Requested: {new Date(request.requestedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="edc-badge edc-badge-warning mr-2">{request.type}</span>
                                        <Link
                                            href={`/admin/verifications`}
                                            className="edc-button edc-button-primary"
                                        >
                                            Review
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>No pending verification requests</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
