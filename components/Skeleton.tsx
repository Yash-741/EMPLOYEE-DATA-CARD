'use client';

import React from 'react';

interface SkeletonProps {
    width?: string;
    height?: string;
    circle?: boolean;
    className?: string;
    count?: number;
}

export default function Skeleton({
    width = '100%',
    height = '20px',
    circle = false,
    className = '',
    count = 1
}: SkeletonProps) {
    const skeletons = Array.from({ length: count }, (_, i) => i);

    return (
        <>
            {skeletons.map((_, index) => (
                <div
                    key={index}
                    className={`skeleton ${circle ? 'skeleton-circle' : ''} ${className}`}
                    style={{
                        width,
                        height,
                        marginBottom: count > 1 ? '8px' : '0'
                    }}
                />
            ))}
        </>
    );
}
