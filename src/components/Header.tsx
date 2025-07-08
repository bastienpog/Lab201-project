export default function Header() {
    return (
        <header className="bg-black border-b-4 border-cyan-400 relative overflow-visible">
            <nav className="container mx-auto px-4 py-4 flex justify-center items-center relative">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-20 md:h-28 -my-4"
                    style={{ maxHeight: 80 }}
                />
            </nav>
        </header>
    );
}
