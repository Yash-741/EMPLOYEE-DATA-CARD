'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/services/adminService';

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate async login
        await new Promise(resolve => setTimeout(resolve, 500));

        const success = adminLogin(username, password);

        if (success) {
            router.push('/admin/dashboard');
        } else {
            setError('Invalid username or password');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
            <div className="max-w-md w-full mx-4">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="edc-emblem mx-auto mb-4" style={{ width: '80px', height: '80px', fontSize: '2rem', background: 'white', color: 'var(--edc-primary)' }}>
                        EDC
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-blue-200">Employee Data Card System</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--edc-primary)' }}>
                        Administrator Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="edc-label">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="edc-input"
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div>
                            <label className="edc-label">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="edc-input"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                                <p className="text-red-800 text-sm">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="edc-button edc-button-primary w-full text-lg"
                        >
                            {loading ? 'Logging in...' : 'Login to Admin Panel'}
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-900 font-semibold mb-2">Demo Credentials:</p>
                        <p className="text-sm text-blue-800">
                            <strong>Username:</strong> admin<br />
                            <strong>Password:</strong> admin123
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <a href="/" className="text-blue-200 hover:text-white transition-colors">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
