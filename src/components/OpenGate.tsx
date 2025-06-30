import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function OpenGate() {
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        if (opened) {
            const timeout = setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 1200);

            return () => clearTimeout(timeout);
        }
    }, [opened]);

    return (
        <div className="relative h-screen overflow-hidden">
            <div className="relative z-10 p-10 text-center">
                <h1 className="text-4xl font-bold">Bienvenue</h1>
            </div>

            <motion.img
                src="/stickers-rideau-metallique.jpg.jpg"
                alt="Grille métallique"
                className="absolute top-0 left-0 w-full h-full object-cover z-50 cursor-pointer"
                initial={{ y: 0 }}
                animate={{ y: opened ? '-100%' : 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                onClick={() => setOpened(true)}
            />
        </div>
    );
}
