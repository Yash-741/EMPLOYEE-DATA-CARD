'use client';

import { useState } from 'react';
import { Education } from '@/types';

interface EducationSectionProps {
    education: Education[];
    onUpdate: (education: Education[]) => void;
}

export default function EducationSection({ education, onUpdate }: EducationSectionProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Education>({
        id: '',
        institutionName: '',
        degree: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: '',
        percentage: undefined,
        grade: '',
    });

    const handleAdd = () => {
        setFormData({
            id: Date.now().toString(),
            institutionName: '',
            degree: '',
            fieldOfStudy: '',
            startYear: '',
            endYear: '',
            percentage: undefined,
            grade: '',
        });
        setIsAdding(true);
        setEditingId(null);
    };

    const handleEdit = (edu: Education) => {
        setFormData(edu);
        setEditingId(edu.id);
        setIsAdding(false);
    };

    const handleSave = () => {
        if (editingId) {
            onUpdate(education.map((edu) => (edu.id === editingId ? formData : edu)));
        } else {
            onUpdate([...education, formData]);
        }
        setIsAdding(false);
        setEditingId(null);
    };

    const handleDelete = (id: string) => {
        onUpdate(education.filter((edu) => edu.id !== id));
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    return (
        <div className="edc-paper">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--edc-primary)' }}>
                    Education
                </h3>
                {!isAdding && !editingId && (
                    <button onClick={handleAdd} className="edc-button edc-button-primary">
                        + Add Education
                    </button>
                )}
            </div>

            {/* Education List */}
            {education.length > 0 && !isAdding && !editingId && (
                <div className="space-y-4">
                    {education.map((edu) => (
                        <div
                            key={edu.id}
                            className="p-4 border-2 rounded-lg"
                            style={{ borderColor: 'var(--edc-gray-300)' }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-lg">{edu.degree}</h4>
                                    <p className="text-gray-600">
                                        {edu.fieldOfStudy} - {edu.institutionName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {edu.startYear} - {edu.endYear || 'Present'}
                                    </p>
                                    {(edu.percentage || edu.grade) && (
                                        <p className="text-sm font-medium mt-1" style={{ color: 'var(--edc-primary)' }}>
                                            {edu.percentage && `${edu.percentage}%`}
                                            {edu.grade && ` (${edu.grade})`}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(edu)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(edu.id)}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
                <div className="border-2 rounded-lg p-6" style={{ borderColor: 'var(--edc-primary)' }}>
                    <div className="edc-form-group">
                        <label className="edc-label">Institution Name *</label>
                        <input
                            type="text"
                            value={formData.institutionName}
                            onChange={(e) =>
                                setFormData({ ...formData, institutionName: e.target.value })
                            }
                            className="edc-input"
                            placeholder="University or School name"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="edc-form-group">
                            <label className="edc-label">Degree *</label>
                            <input
                                type="text"
                                value={formData.degree}
                                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                                className="edc-input"
                                placeholder="B.Tech, MBA, etc."
                            />
                        </div>

                        <div className="edc-form-group">
                            <label className="edc-label">Field of Study *</label>
                            <input
                                type="text"
                                value={formData.fieldOfStudy}
                                onChange={(e) =>
                                    setFormData({ ...formData, fieldOfStudy: e.target.value })
                                }
                                className="edc-input"
                                placeholder="Computer Science, Business, etc."
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="edc-form-group">
                            <label className="edc-label">Start Year *</label>
                            <input
                                type="text"
                                value={formData.startYear}
                                onChange={(e) =>
                                    setFormData({ ...formData, startYear: e.target.value })
                                }
                                className="edc-input"
                                placeholder="2019"
                                maxLength={4}
                            />
                        </div>

                        <div className="edc-form-group">
                            <label className="edc-label">End Year</label>
                            <input
                                type="text"
                                value={formData.endYear || ''}
                                onChange={(e) =>
                                    setFormData({ ...formData, endYear: e.target.value })
                                }
                                className="edc-input"
                                placeholder="2023"
                                maxLength={4}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="edc-form-group">
                            <label className="edc-label">Percentage / CGPA</label>
                            <input
                                type="number"
                                value={formData.percentage || ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        percentage: e.target.value ? parseFloat(e.target.value) : undefined,
                                    })
                                }
                                className="edc-input"
                                placeholder="85.5"
                                step="0.01"
                                min="0"
                                max="100"
                            />
                        </div>

                        <div className="edc-form-group">
                            <label className="edc-label">Grade</label>
                            <input
                                type="text"
                                value={formData.grade || ''}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                className="edc-input"
                                placeholder="A+, First Class, etc."
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={handleSave} className="edc-button edc-button-primary">
                            {editingId ? 'Update' : 'Add'} Education
                        </button>
                        <button onClick={handleCancel} className="edc-button edc-button-secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {education.length === 0 && !isAdding && (
                <p className="text-center text-gray-500 py-8">
                    No education records added yet. Click "Add Education" to get started.
                </p>
            )}
        </div>
    );
}
