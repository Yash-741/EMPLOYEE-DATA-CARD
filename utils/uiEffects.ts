/**
 * Advanced UI Animations and Interactions
 */

// Animated Counter Hook
export function useAnimatedCounter(end: number, duration: number = 2000) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
                setCount(Math.floor(end * easeOutQuart(progress)));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return count;
}

// Easing function
function easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4);
}

// Particle System Class
export class ParticleSystem {
    private particles: Particle[] = [];
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animationFrame: number | null = null;

    constructor(canvas: HTMLCanvasElement, particleCount: number = 50) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.resize();
        this.createParticles(particleCount);
        window.addEventListener('resize', () => this.resize());
    }

    private resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    private createParticles(count: number) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
    }

    start() {
        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach(particle => {
                particle.update();
                particle.draw(this.ctx);
            });

            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    canvasWidth: number;
    canvasHeight: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;

        const colors = ['rgba(59, 130, 246, 0.3)', 'rgba(251, 191, 36, 0.3)', 'rgba(16, 185, 129, 0.3)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Skeleton Loader Component Props
export interface SkeletonProps {
    width?: string;
    height?: string;
    circle?: boolean;
    className?: string;
}

// Intersection Observer Hook for Animations
export function useInView(options?: IntersectionObserverInit) {
    const [isInView, setIsInView] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return [ref, isInView] as const;
}

// Ripple Effect
export function createRipple(event: React.MouseEvent<HTMLElement>) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

import React from 'react';
