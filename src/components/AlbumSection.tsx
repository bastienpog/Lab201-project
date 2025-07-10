

export default function AlbumSection() {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8">
                    <img
                        src="/album-cover.png"
                        alt="Black Hole Suprette Album Cover"
                        width={800}
                        height={800}
                        className="mx-auto shadow-2xl"
                    />
                </div>

                <h1 className="text-white text-4xl md:text-5xl font-light mb-6 tracking-wide">Black Hole Superette</h1>

                <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto font-light">
                    En franchissant les portes de Black Hole Suprette, tout bascule, les réserves sont faites de souvenirs, les
                    rayons d'émotions codées, et les interphones récitent des haïkus bizarres. C'est étrange, drôle,
                    déstabilisant, et absolument captivant.
                </p>
            </div>
        </div>
    )
}
