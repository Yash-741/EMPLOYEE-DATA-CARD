'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminLoggedIn, getAllEmployees, searchEmployees } from '@/services/adminService';
import { EmployeeListItem } from '@/types/admin';

export default function AdminEmployees() {
    const router = useRouter();
    const [employees, setEmployees] = useState<EmployeeListItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAdminLoggedIn()) {
            router.push('/admin');
            return;
        }

        setEmployees(getAllEmployees());
        setLoading(false);
    }, [router]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            setEmployees(searchEmployees(query));
        } else {
            setEmployees(getAllEmployees());
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'complete': return 'edc-badge-success';
            case 'partial': return 'edc-badge-warning';
            default: return 'edc-badge-pending';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading employees...</p>
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
                            Employee Management
                        </h1>
                        <p className="text-gray-600">View and manage all registered employees</p>
                    </div>
                    <a href="/admin/dashboard" className="edc-button edc-button-secondary">
                        ← Back to Dashboard
                    </a>
                </div>

                {/* Search Bar */}
                <div className="edc-paper mb-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="edc-input"
                                placeholder="Search by name, email, or EDC number..."
                            />
                        </div>
                        <button className="edc-button edc-button-primary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="edc-paper">
                        <p className="text-gray-600 text-sm mb-1">Total Employees</p>
                        <p className="text-3xl font-bold" style={{ color: 'var(--edc-primary)' }}>
                            {employees.length}
                        </p>
                    </div>
                    <div className="edc-paper">
                        <p className="text-gray-600 text-sm mb-1">Fully Verified</p>
                        <p className="text-3xl font-bold text-green-600">
                            {employees.filter(e => e.verificationStatus === 'complete').length}
                        </p>
                    </div>
                    <div className="edc-paper">
                        <p className="text-gray-600 text-sm mb-1">Pending Verification</p>
                        <p className="text-3xl font-bold text-yellow-600">
                            {employees.filter(e => e.verificationStatus === 'pending').length}
                        </p>
                    </div>
                </div>

                {/* Employee List */}
                <div className="edc-paper">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--edc-primary)' }}>
                        All Employees
                    </h2>

                    {employees.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2" style={{ borderColor: 'var(--edc-primary)' }}>
                                        <th className="text-left py-3 px-4 font-semibold">EDC Number</th>
                                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                                        <th className="text-left py-3 px-4 font-semibold">Profile</th>
                                        <th className="text-left py-3 px-4 font-semibold">Verification</th>
                                        <th className="text-left py-3 px-4 font-semibold">Registered</th>
                                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="py-4 px-4 font-mono text-sm">{employee.edcNumber}</td>
                                            <td className="py-4 px-4 font-medium">{employee.name}</td>
                                            <td className="py-4 px-4 text-sm text-gray-600">{employee.email}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="h-2 rounded-full"
                                                            style={{
                                                                width: `${employee.profileCompletion}%`,
                                                                background: 'linear-gradient(90deg, var(--edc-primary), var(--edc-primary-light))',
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-semibold">{employee.profileCompletion}%</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`edc-badge ${getStatusColor(employee.verificationStatus)}`}>
                                                    {employee.verificationStatus}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-600">
                                                {new Date(employee.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-4">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <p>No employees found{searchQuery && ' matching your search'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
