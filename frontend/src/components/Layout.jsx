import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ParticlesBackground from './ParticlesBackground';

export default function Layout() {
    return (
        <>
            <ParticlesBackground />
            <Navbar />
            <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
