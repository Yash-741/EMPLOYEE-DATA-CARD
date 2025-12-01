'use client';

import { useState } from 'react';
import { WorkExperience } from '@/types';

interface WorkExperienceSectionProps {
    experiences: WorkExperience[];
    onUpdate: (experiences: WorkExperience[]) => void;
}

export default function WorkExperienceSection({
    experiences,
    onUpdate,
}: WorkExperienceSectionProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<WorkExperience>({
        id: '',
        companyName: '',
        designation: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        responsibilities: '',
        achievements: '',
    });

    const handleAdd = () => {
        setFormData({
            id: Date.now().toString(),
            companyName: '',
            designation: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            responsibilities: '',
            achievements: '',
        });
        setIsAdding(true);
        setEditingId(null);
    };

    const handleEdit = (experience: WorkExperience) => {
        setFormData(experience);
        setEditingId(experience.id);
        setIsAdding(false);
    };

    const handleSave = () => {
        if (editingId) {
            onUpdate(experiences.map((exp) => (exp.id === editingId ? formData : exp)));
        } else {
            onUpdate([...experiences, formData]);
        }
        setIsAdding(false);
        setEditingId(null);
    };

    const handleDelete = (id: string) => {
        onUpdate(experiences.filter((exp) => exp.id !== id));
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    return (
        <div className="edc-paper">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--edc-primary)' }}>
                    Work Experience
                </h3>
                {!isAdding && !editingId && (
                    <button onClick={handleAdd} className="edc-button edc-button-primary">
                        + Add Experience
                    </button>
                )}
            </div>

            {/* Experience List */}
            {experiences.length > 0 && !isAdding && !editingId && (
                <div className="space-y-4">
                    {experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="p-4 border-2 rounded-lg"
                            style={{ borderColor: 'var(--edc-gray-300)' }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-lg">{exp.designation}</h4>
                                    <p className="text-gray-600">{exp.companyName}</p>
                                    <p className="text-sm text-gray-500">
                                        {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(exp)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(exp.id)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {exp.responsibilities && (
                                <div className="mt-2">
                                    <p className="text-sm font-semibold text-gray-700">Responsibilities:</p>
                                    <p className="text-sm text-gray-600">{exp.responsibilities}</p>
                                </div>
                            )}
                            {exp.achievements && (
                                <div className="mt-2">
                                    <p className="text-sm font-semibold text-gray-700">Achievements:</p>
                                    <p className="text-sm text-gray-600">{exp.achievements}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <div className="border-2 rounded-lg p-6" style={{ borderColor: 'var(--edc-primary)' }}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="edc-form-group">
                            <label className="edc-label">Company Name *</label>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) =>
                                    setFormData({ ...formData, companyName: e.target.value })
                                }
                                className="edc-input"
                                placeholder="Company name"
                            />
                        </div>

                        <div className="edc-form-group">
                            <label className="edc-label">Designation *</label>
                            <input
                                type="text"
                                value={formData.designation}
                                onChange={(e) =>
                                    setFormData({ ...formData, designation: e.target.value })
                                }
                                className="edc-input"
                                placeholder="Job title"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="edc-form-group">
                            <label className="edc-label">Start Date *</label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, startDate: e.target.value })
                                }
                                className="edc-input"
                            />
                        </div>

                        <div className="edc-form-group">
                            <label className="edc-label">End Date</label>
                            <input
                                type="date"
                                value={formData.endDate || ''}
                                onChange={(e) =>
                                    setFormData({ ...formData, endDate: e.target.value })
                                }
                                className="edc-input"
                                disabled={formData.currentlyWorking}
                            />
                        </div>
                    </div>

                    <div className="edc-form-group">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.currentlyWorking}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        currentlyWorking: e.target.checked,
                                        endDate: e.target.checked ? '' : formData.endDate,
                                    })
                                }
                                className="w-4 h-4"
                            />
                            <span className="edc-label mb-0">I currently work here</span>
                        </label>
                    </div>

                    <div className="edc-form-group">
                        <label className="edc-label">Responsibilities</label>
                        <textarea
                            value={formData.responsibilities}
                            onChange={(e) =>
                                setFormData({ ...formData, responsibilities: e.target.value })
                            }
                            className="edc-textarea"
                            placeholder="Describe your key responsibilities..."
                        />
                    </div>

                    <div className="edc-form-group">
                        <label className="edc-label">Achievements</label>
                        <textarea
                            value={formData.achievements || ''}
                            onChange={(e) =>
                                setFormData({ ...formData, achievements: e.target.value })
                            }
                            className="edc-textarea"
                            placeholder="Notable achievements and accomplishments..."
                        />
                    </div>

                    <div className="flex gap-4">
                        <button onClick={handleSave} className="edc-button edc-button-primary">
                            {editingId ? 'Update' : 'Add'} Experience
                        </button>
                        <button onClick={handleCancel} className="edc-button edc-button-secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {experiences.length === 0 && !isAdding && (
                <p className="text-center text-gray-500 py-8">
                    No work experience added yet. Click "Add Experience" to get started.
                </p>
            )}
        </div>
    );
}
