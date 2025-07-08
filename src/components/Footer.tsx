import { Facebook, Instagram, Youtube } from "lucide-react"

export default function AesopRockPage() {
    return (
        <footer className="bg-sky-300 flex flex-col">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto w-full gap-8">
                <div className="flex-shrink-0 mb-6 md:mb-0 flex justify-center md:justify-start w-full md:w-auto">
                    <img
                        src="/logo.png"
                        alt="Aesop Rock logo with Black Blue Skelethon in graffiti style"
                        className="w-48 md:w-80 h-auto"
                    />
                </div>

                <nav className="flex flex-col items-center md:items-end space-y-2 text-center md:text-right w-full md:w-auto">
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        SEARCH
                    </a>
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        FAQa
                    </a>
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        PRIVACY POLICY
                    </a>
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        CONTACT
                    </a>
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        SHOP
                    </a>
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        LISTEN
                    </a>
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        TERMS OF SERVICE
                    </a>
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        REFUND POLICY
                    </a>
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        DO NOT SELL MY PERSONAL INFORMATION
                    </a>
                    <a className="text-gray-800 hover:text-gray-600 font-medium text-lg">
                        LICENSE AESOP ROCK MUSIC
                    </a>
                </nav>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
                <a href="#" className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors flex items-center justify-center">
                    <Facebook className="w-8 h-8 text-gray-800" />
                    <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="sr-only">X (Twitter)</span>
                </a>
                <a href="#" className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-gray-800" />
                    <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors flex items-center justify-center">
                    <Youtube className="w-8 h-8 text-gray-800" />
                    <span className="sr-only">YouTube</span>
                </a>
                <a href="#" className="bg-white rounded-full p-4 hover:bg-gray-100 transition-colors flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                    <span className="sr-only">TikTok</span>
                </a>
            </div>

            <div className="px-4 md:px-8 pb-8 max-w-4xl mx-auto">
                <p className="text-gray-800 text-sm text-center leading-relaxed">
                    Aesop Rock's website is committed to keeping our site accessible to everyone. We welcome feedback on ways to
                    improve this site's accessibility. If you are having issues making a purchase or navigating our site, please
                    contact us at: orders@aesoprock.com.
                </p>
            </div>
        </footer>
    )
}
















