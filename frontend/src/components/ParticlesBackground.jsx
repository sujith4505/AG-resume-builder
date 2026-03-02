import { useEffect, useState, useContext } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { ThemeContext } from '../context/ThemeContext';

export default function ParticlesBackground() {
    const { theme } = useContext(ThemeContext);
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (theme === 'white' || !init) return null;

    const color = theme === 'dark' ? '#E2E8F0' : '#F8FAFC';

    return (
        <Particles
            id="tsparticles"
            options={{
                background: { color: { value: 'transparent' } },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: 'push' },
                        onHover: { enable: true, mode: 'repulse' },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 2 },
                        repulse: { distance: 100, duration: 0.4 },
                    },
                },
                particles: {
                    color: { value: color },
                    links: {
                        color: color,
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    collisions: { enable: false },
                    move: {
                        directions: 'none',
                        enable: true,
                        outModes: { default: 'bounce' },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 40,
                    },
                    opacity: { value: 0.5 },
                    shape: { type: 'circle' },
                    size: { value: { min: 1, max: 2 } },
                },
                detectRetina: true,
            }}
            className="particle-container"
        />
    );
}
