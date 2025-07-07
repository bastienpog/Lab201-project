import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Accueil', href: '#home' },
        { name: 'À propos', href: '#about' },
        { name: 'Écouter', href: '#listen' },
        { name: 'Clips', href: '#videos' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <header className="relative bg-black border-b-4 border-cyan-400 overflow-hidden">
            <nav className="relative z-10 container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-magenta-400 transform -skew-x-12 hover:skew-x-0 transition-transform duration-300">
                                BLACK HOLE
                            </h1>
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-magenta-400 transform skew-x-12 hover:skew-x-0 transition-transform duration-300">
                            SUPERETTE
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="relative text-white hover:text-cyan-400 font-bold uppercase tracking-wider transition-all duration-300 group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-magenta-400 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white hover:text-cyan-400 transition-colors duration-300"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-md border-t border-cyan-400 z-50">
                        <div className="container mx-auto px-4 py-6">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="block py-3 text-white hover:text-cyan-400 font-bold uppercase tracking-wider transition-colors duration-300 border-b border-gray-800 last:border-b-0"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};