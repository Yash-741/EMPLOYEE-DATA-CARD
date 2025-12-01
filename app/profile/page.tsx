'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmployeeProfile, PersonalDetails } from '@/types';
import { getEmployeeProfile, createEDCCard, updateEmployeeProfile } from '@/services/edcService';
import PersonalDetailsForm from '@/components/PersonalDetailsForm';
import WorkExperienceSection from '@/components/WorkExperienceSection';
import EducationSection from '@/components/EducationSection';
import EPFIntegration from '@/components/EPFIntegration';

export default function Profile() {
    const router = useRouter();
    const [profile, setProfile] = useState<EmployeeProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'personal' | 'work' | 'education' | 'epf'>('personal');

    useEffect(() => {
        const loadProfile = () => {
            const data = getEmployeeProfile();
            setProfile(data);
            setLoading(false);
        };

        loadProfile();
    }, []);

    const handlePersonalDetailsSubmit = async (details: PersonalDetails) => {
        if (!profile) {
            // Create new profile
            const result = await createEDCCard(details);
            if (result.success && result.data) {
                setProfile(result.data);
                alert('EDC Card created successfully!');
                router.push('/dashboard');
            }
        } else {
            // Update existing profile
            const result = await updateEmployeeProfile({
                personalDetails: details,
            });
            if (result.success && result.data) {
                setProfile(result.data);
                alert('Profile updated successfully!');
            }
        }
    };

    const handleWorkExperienceUpdate = async (workExperience: any[]) => {
        if (!profile) return;
        const result = await updateEmployeeProfile({ workExperience });
        if (result.success && result.data) {
            setProfile(result.data);
        }
    };

    const handleEducationUpdate = async (education: any[]) => {
        if (!profile) return;
        const result = await updateEmployeeProfile({ education });
        if (result.success && result.data) {
            setProfile(result.data);
        }
    };

    const handleEPFUpdate = async (epfDetails: any) => {
        if (!profile) return;
        const result = await updateEmployeeProfile({ epfDetails });
        if (result.success && result.data) {
            setProfile(result.data);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'personal', label: 'Personal Details', icon: '👤' },
        { id: 'work', label: 'Work Experience', icon: '💼' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'epf', label: 'EPF Integration', icon: '🏦' },
    ];

    return (
        <div className="min-h-screen py-8">
            <div className="edc-container">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--edc-primary)' }}>
                        {profile ? 'Edit Profile' : 'Create Your Profile'}
                    </h1>
                    <p className="text-gray-600">
                        {profile
                            ? 'Update your employee information and credentials'
                            : 'Fill out your details to create your Employee Data Card'}
                    </p>
                </div>

                {/* Progress Indicator */}
                {profile && (
                    <div className="mb-8 edc-paper">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">Profile Completion</span>
                            <span className="font-bold" style={{ color: 'var(--edc-primary)' }}>
                                {profile.profileCompletion}%
                            </span>
                        </div>
                        <div className="edc-progress-container">
                            <div
                                className="edc-progress-bar"
                                style={{ width: `${profile.profileCompletion}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="mb-6 border-b-2 overflow-x-auto">
                    <div className="flex gap-1 min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-6 py-3 font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-b-4 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                style={{
                                    borderColor: activeTab === tab.id ? 'var(--edc-primary)' : 'transparent',
                                }}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'personal' && (
                        <PersonalDetailsForm
                            initialData={profile?.personalDetails}
                            onSubmit={handlePersonalDetailsSubmit}
                        />
                    )}

                    {activeTab === 'work' && profile && (
                        <WorkExperienceSection
                            experiences={profile.workExperience}
                            onUpdate={handleWorkExperienceUpdate}
                        />
                    )}

                    {activeTab === 'education' && profile && (
                        <EducationSection
                            education={profile.education}
                            onUpdate={handleEducationUpdate}
                        />
                    )}

                    {activeTab === 'epf' && profile && (
                        <EPFIntegration
                            epfDetails={profile.epfDetails}
                            onUpdate={handleEPFUpdate}
                        />
                    )}

                    {!profile && activeTab !== 'personal' && (
                        <div className="edc-paper text-center py-12">
                            <p className="text-gray-600 mb-4">
                                Please complete your personal details first
                            </p>
                            <button
                                onClick={() => setActiveTab('personal')}
                                className="edc-button edc-button-primary"
                            >
                                Go to Personal Details
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
