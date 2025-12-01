'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { EmployeeProfile } from '@/types';
import { getEmployeeProfile } from '@/services/edcService';
import EDCCard from '@/components/EDCCard';

export default function Dashboard() {
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen py-12">
                <div className="edc-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="edc-emblem mx-auto mb-6" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                            EDC
                        </div>
                        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--edc-primary)' }}>
                            Welcome to Employee Data Card
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Create your digital identity to get started with verified employee credentials.
                        </p>
                        <Link href="/profile" className="edc-button edc-button-primary text-lg">
                            Create Your Profile
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const verificationCount = [
        profile.verificationStatus.backgroundCheck.status === 'verified',
        profile.verificationStatus.criminalRecord.status === 'clear',
        profile.verificationStatus.documentVerification.status === 'verified',
    ].filter(Boolean).length;

    return (
        <div className="min-h-screen py-8">
            <div className="edc-container">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--edc-primary)' }}>
                        Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Welcome back, {profile.personalDetails.firstName}!
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="edc-paper text-center">
                        <div className="text-3xl font-bold mb-2" style={{ color: 'var(--edc-primary)' }}>
                            {profile.profileCompletion}%
                        </div>
                        <p className="text-gray-600">Profile Complete</p>
                        <div className="edc-progress-container mt-3">
                            <div
                                className="edc-progress-bar"
                                style={{ width: `${profile.profileCompletion}%` }}
                            />
                        </div>
                    </div>

                    <div className="edc-paper text-center">
                        <div className="text-3xl font-bold mb-2" style={{ color: 'var(--edc-success)' }}>
                            {verificationCount}/3
                        </div>
                        <p className="text-gray-600">Verifications Complete</p>
                    </div>

                    <div className="edc-paper text-center">
                        <div className="text-3xl font-bold mb-2" style={{ color: 'var(--edc-gold-dark)' }}>
                            {profile.workExperience.length}
                        </div>
                        <p className="text-gray-600">Work Experiences</p>
                    </div>

                    <div className="edc-paper text-center">
                        <div className="text-3xl font-bold mb-2" style={{ color: 'var(--edc-info)' }}>
                            {profile.education.length}
                        </div>
                        <p className="text-gray-600">Education Records</p>
                    </div>
                </div>

                {/* EDC Card Preview */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold" style={{ color: 'var(--edc-primary)' }}>
                            Your EDC Card
                        </h2>
                        <button
                            onClick={() => window.print()}
                            className="edc-button edc-button-secondary"
                        >
                            Print Card
                        </button>
                    </div>
                    <EDCCard profile={profile} />
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--edc-primary)' }}>
                        Quick Actions
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link href="/profile" className="edc-paper hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, var(--edc-primary), var(--edc-primary-light))' }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold">Update Profile</h3>
                                    <p className="text-sm text-gray-600">Edit your information</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/verification" className="edc-paper hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, var(--edc-success), #27ae60)' }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold">Get Verified</h3>
                                    <p className="text-sm text-gray-600">Complete verifications</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/blockchain" className="edc-paper hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, var(--edc-gold-dark), var(--edc-gold))' }}
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold">Blockchain</h3>
                                    <p className="text-sm text-gray-600">Store on blockchain</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--edc-primary)' }}>
                        Recent Activity
                    </h2>
                    <div className="edc-paper">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 pb-4 border-b">
                                <span className="edc-status-indicator edc-status-verified mt-1" />
                                <div>
                                    <p className="font-medium">Profile Created</p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                            {profile.updatedAt !== profile.createdAt && (
                                <div className="flex items-start gap-3">
                                    <span className="edc-status-indicator edc-status-verified mt-1" />
                                    <div>
                                        <p className="font-medium">Profile Updated</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(profile.updatedAt).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
