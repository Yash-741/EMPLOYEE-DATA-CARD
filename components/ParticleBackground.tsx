'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
    particleCount?: number;
    className?: string;
}

export default function ParticleBackground({
    particleCount = 50,
    className = ''
}: ParticleBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle class
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor(canvasWidth: number, canvasHeight: number) {
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 1;

                const colors = [
                    'rgba(59, 130, 246, 0.4)',
                    'rgba(251, 191, 36, 0.4)',
                    'rgba(16, 185, 129, 0.4)'
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update(canvasWidth: number, canvasHeight: number) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
                if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Create particles
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        // Animation loop
        let animationFrame: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update(canvas.width, canvas.height);
                particle.draw(ctx);
            });

            animationFrame = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', resize);
        };
    }, [particleCount]);

    return (
        <canvas
            ref={canvasRef}
            className={`particle-background ${className}`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0
            }}
        />
    );
}
