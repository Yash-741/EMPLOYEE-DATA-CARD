'use client';

import { useState } from 'react';
import { PersonalDetails } from '@/types';

interface PersonalDetailsFormProps {
    initialData?: Partial<PersonalDetails>;
    onSubmit: (data: PersonalDetails) => void;
    onCancel?: () => void;
}

export default function PersonalDetailsForm({
    initialData,
    onSubmit,
    onCancel,
}: PersonalDetailsFormProps) {
    const [formData, setFormData] = useState<PersonalDetails>({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        dateOfBirth: initialData?.dateOfBirth || '',
        gender: initialData?.gender || 'Male',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        address: initialData?.address || {
            street: '',
            city: '',
            state: '',
            pinCode: '',
            country: 'India',
        },
        aadhaarNumber: initialData?.aadhaarNumber || '',
        panNumber: initialData?.panNumber || '',
        photo: initialData?.photo || '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData({
                ...formData,
                address: { ...formData.address, [addressField]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Phone number must be 10 digits';
        }
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of birth is required';
        }
        if (formData.aadhaarNumber && !/^\d{12}$/.test(formData.aadhaarNumber.replace(/\s/g, ''))) {
            newErrors.aadhaarNumber = 'Aadhaar must be 12 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edc-paper">
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--edc-primary)' }}>
                Personal Details
            </h3>

            {/* Photo Upload */}
            <div className="edc-form-group">
                <label className="edc-label">Profile Photo</label>
                <div className="flex items-center gap-4">
                    {formData.photo && (
                        <img
                            src={formData.photo}
                            alt="Profile"
                            className="w-24 h-24 rounded-lg object-cover border-2"
                            style={{ borderColor: 'var(--edc-gold)' }}
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="edc-input"
                    />
                </div>
            </div>

            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="edc-form-group">
                    <label className="edc-label">First Name *</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`edc-input ${errors.firstName ? 'edc-input-error' : ''}`}
                        placeholder="Enter first name"
                    />
                    {errors.firstName && <p className="edc-error-message">{errors.firstName}</p>}
                </div>

                <div className="edc-form-group">
                    <label className="edc-label">Last Name *</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`edc-input ${errors.lastName ? 'edc-input-error' : ''}`}
                        placeholder="Enter last name"
                    />
                    {errors.lastName && <p className="edc-error-message">{errors.lastName}</p>}
                </div>
            </div>

            {/* DOB and Gender */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="edc-form-group">
                    <label className="edc-label">Date of Birth *</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`edc-input ${errors.dateOfBirth ? 'edc-input-error' : ''}`}
                    />
                    {errors.dateOfBirth && <p className="edc-error-message">{errors.dateOfBirth}</p>}
                </div>

                <div className="edc-form-group">
                    <label className="edc-label">Gender *</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="edc-select"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="edc-form-group">
                    <label className="edc-label">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`edc-input ${errors.email ? 'edc-input-error' : ''}`}
                        placeholder="email@example.com"
                    />
                    {errors.email && <p className="edc-error-message">{errors.email}</p>}
                </div>

                <div className="edc-form-group">
                    <label className="edc-label">Phone Number *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`edc-input ${errors.phone ? 'edc-input-error' : ''}`}
                        placeholder="+91 XXXXXXXXXX"
                    />
                    {errors.phone && <p className="edc-error-message">{errors.phone}</p>}
                </div>
            </div>

            {/* Address */}
            <div className="edc-form-group">
                <label className="edc-label">Street Address</label>
                <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="edc-input"
                    placeholder="Street address"
                />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <div className="edc-form-group">
                    <label className="edc-label">City</label>
                    <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleChange}
                        className="edc-input"
                        placeholder="City"
                    />
                </div>

                <div className="edc-form-group">
                    <label className="edc-label">State</label>
                    <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleChange}
                        className="edc-input"
                        placeholder="State"
                    />
                </div>

                <div className="edc-form-group">
                    <label className="edc-label">PIN Code</label>
                    <input
                        type="text"
                        name="address.pinCode"
                        value={formData.address.pinCode}
                        onChange={handleChange}
                        className="edc-input"
                        placeholder="PIN Code"
                    />
                </div>
            </div>

            {/* Government IDs */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="edc-form-group">
                    <label className="edc-label">Aadhaar Number</label>
                    <input
                        type="text"
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        className={`edc-input ${errors.aadhaarNumber ? 'edc-input-error' : ''}`}
                        placeholder="XXXX XXXX XXXX"
                        maxLength={12}
                    />
                    {errors.aadhaarNumber && <p className="edc-error-message">{errors.aadhaarNumber}</p>}
                </div>

                <div className="edc-form-group">
                    <label className="edc-label">PAN Number</label>
                    <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        className="edc-input"
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        style={{ textTransform: 'uppercase' }}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
                <button type="submit" className="edc-button edc-button-primary">
                    Save Personal Details
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="edc-button edc-button-secondary"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
