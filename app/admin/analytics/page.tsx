'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminLoggedIn, getAdminStats } from '@/services/adminService';
import { AdminStats } from '@/types/admin';

export default function AdminAnalytics() {
    const router = useRouter();
    const [stats, setStats] = useState<AdminStats | null>(null);

    useEffect(() => {
        if (!isAdminLoggedIn()) {
            router.push('/admin');
            return;
        }

        setStats(getAdminStats());
    }, [router]);

    if (!stats) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading analytics...</p>
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
                            Analytics & Reports
                        </h1>
                        <p className="text-gray-600">System insights and statistics</p>
                    </div>
                    <a href="/admin/dashboard" className="edc-button edc-button-secondary">
                        ← Back to Dashboard
                    </a>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="edc-paper text-center">
                        <p className="text-gray-600 mb-2">Total Employees</p>
                        <p className="text-4xl font-bold" style={{ color: 'var(--edc-primary)' }}>
                            {stats.totalEmployees}
                        </p>
                        <p className="text-sm text-green-600 mt-2">+{stats.newRegistrationsThisWeek} this week</p>
                    </div>

                    <div className="edc-paper text-center">
                        <p className="text-gray-600 mb-2">Verifications</p>
                        <p className="text-4xl font-bold text-green-600">{stats.approvedVerifications}</p>
                        <p className="text-sm text-gray-500 mt-2">Approved</p>
                    </div>

                    <div className="edc-paper text-center">
                        <p className="text-gray-600 mb-2">Pending Reviews</p>
                        <p className="text-4xl font-bold text-yellow-600">{stats.pendingVerifications}</p>
                        <p className="text-sm text-gray-500 mt-2">Awaiting action</p>
                    </div>

                    <div className="edc-paper text-center">
                        <p className="text-gray-600 mb-2">Blockchain</p>
                        <p className="text-4xl font-bold text-purple-600">{stats.blockchainRecords}</p>
                        <p className="text-sm text-gray-500 mt-2">Verified records</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="edc-paper">
                        <h3 className="text-xl font-bold mb-4">Verification Status</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Approved</span>
                                    <span className="font-bold text-green-600">{stats.approvedVerifications}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-green-500 h-3 rounded-full"
                                        style={{
                                            width: `${(stats.approvedVerifications / (stats.totalEmployees || 1)) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Pending</span>
                                    <span className="font-bold text-yellow-600">{stats.pendingVerifications}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-yellow-500 h-3 rounded-full"
                                        style={{
                                            width: `${(stats.pendingVerifications / (stats.totalEmployees || 1)) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">Rejected</span>
                                    <span className="font-bold text-red-600">{stats.rejectedVerifications}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-red-500 h-3 rounded-full"
                                        style={{
                                            width: `${(stats.rejectedVerifications / (stats.totalEmployees || 1)) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="edc-paper">
                        <h3 className="text-xl font-bold mb-4">Registration Trends</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                                <div>
                                    <p className="font-semibold">Today</p>
                                    <p className="text-sm text-gray-600">New registrations</p>
                                </div>
                                <span className="text-3xl font-bold text-blue-600">
                                    {stats.newRegistrationsToday}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                                <div>
                                    <p className="font-semibold">This Week</p>
                                    <p className="text-sm text-gray-600">New registrations</p>
                                </div>
                                <span className="text-3xl font-bold text-green-600">
                                    {stats.newRegistrationsThisWeek}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Health */}
                <div className="edc-paper">
                    <h3 className="text-xl font-bold mb-4">System Health</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="font-bold">Database</p>
                            <p className="text-sm text-green-600">Operational</p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="font-bold">API Services</p>
                            <p className="text-sm text-green-600">Operational</p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="font-bold">Blockchain</p>
                            <p className="text-sm text-green-600">Operational</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
