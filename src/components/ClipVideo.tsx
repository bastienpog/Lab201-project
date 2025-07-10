const FullWidthBannerVideo = () => {
    return (
        <div className="relative w-full h-[60vh] overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/movie480_vp9.webm"
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="absolute bottom-6 left-6 text-white z-10">
                <h2 className="text-xl md:text-2xl font-semibold drop-shadow-md">Black Hole Superette</h2>
                <button className="mt-4 px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition">
                    Ecouter Maintenant
                </button>
            </div>
        </div>
    );
};

export default FullWidthBannerVideo;
