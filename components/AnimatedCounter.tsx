'use client';

import React from 'react';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export default function AnimatedCounter({
    end,
    duration = 2000,
    suffix = '',
    prefix = '',
    className = ''
}: AnimatedCounterProps) {
    const [count, setCount] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);
    const ref = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [isVisible]);

    React.useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const easeOutQuart = (x: number): number => {
            return 1 - Math.pow(1 - x, 4);
        };

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(end * easeOutQuart(progress)));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}
