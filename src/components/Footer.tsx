import { Instagram, Youtube, Volume2, Mail, Zap } from 'lucide-react';

export default function Footer() {
    const socialLinks = [
        { icon: Youtube, href: '#youtube', label: 'YouTube' },
        { icon: Volume2, href: '#spotify', label: 'Spotify' },
        { icon: Instagram, href: '#instagram', label: 'Instagram' },
        { icon: Mail, href: '#email', label: 'Email' },
    ];

    return (
        <footer className="relative bg-black border-t-4 border-cyan-400 overflow-hidden">
            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    {/* Logo Section */}
                    <div className="text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start space-y-2">
                            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 transform -skew-x-6">
                                BLACK HOLE
                            </div>
                            <div className="text-lg font-bold text-magenta-400 transform skew-x-6">
                                SUPERETTE
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-6">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="group relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full hover:from-cyan-400 hover:to-magenta-400 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                                aria-label={link.label}
                            >
                                <link.icon size={24} className="text-white group-hover:text-black transition-colors duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-magenta-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-center md:text-right">
                        <div className="space-y-2">
                            <div className="text-sm text-gray-400 font-mono">
                                © 2024 BLACK HOLE SUPERETTE
                            </div>
                            <div className="text-xs text-gray-500 font-mono tracking-wider">
                                UNDERGROUND SOUND SYSTEM
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom distortion effect */}
                <div className="mt-8 pt-4 border-t border-gray-800">
                    <div className="flex items-center justify-center space-x-4">
                        <Zap size={16} className="text-cyan-400 animate-pulse" />
                        <div className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                            Distorted Reality
                        </div>
                        <Zap size={16} className="text-magenta-400 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Glitch effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 pointer-events-none"></div>
        </footer>
    );
};