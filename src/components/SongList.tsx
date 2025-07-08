import { useState } from "react"
const songs = [
    { id: "01", title: "secret knock", duration: "3:32", spotifyId: "0rnhjjdY8szBKmi6HAVDvC" },
    { id: "02", title: "checkers", duration: "3:57", spotifyId: "3NtKgLchV4vcr9f1VOT2CR" },
    { id: "03", title: "movie night", duration: "3:20", spotifyId: "4f7S6oJDZv1kUiqtIl9AZK" },
    { id: "04", title: "sur-terminal a", duration: "3:48", spotifyId: "7C0jRk7HitDq6iKvEPiNnc" },
    { id: "05", title: "1010 wins", duration: "3:55", spotifyId: "3YuM6SZXow9PyyYjY1mg4D" },
    { id: "06", title: "so be it", duration: "3:35", spotifyId: "12jk2vSaQ6aJPPuDcuvveF" },
    { id: "07", title: "send help", duration: "3:47", spotifyId: "2tJiDaFBVAoNdYYMasZ3lo" },
    { id: "08", title: "john something", duration: "4:17", spotifyId: "2JeaS6gPTmmSFzERmPr8c5" },
    { id: "09", title: "ice cold here", duration: "2:18", spotifyId: "0j53gdX1rOvzxe9D1ZCauo" },
    { id: "11", title: "costco", duration: "3:20", spotifyId: "3TYUHGgKb7aNvILaXEMXsx" },
    { id: "12", title: "bird school", duration: "3:49", spotifyId: "5mvbKVuvXfBrLVwxdWBNKS" },
    { id: "13", title: "snail zero", duration: "3:16", spotifyId: "3liBiu4qeQzZy9DCRnMyZE" },
    { id: "14", title: "charlie horse", duration: "6:04", spotifyId: "5tSwUhTFs1120hBhvmzK5W" },
    { id: "15", title: "steel wool", duration: "3:16", spotifyId: "3bwIrrMKE3FCWzdWLEnrA7" },
    { id: "16", title: "blacks plum", duration: "3:29", spotifyId: "5h6Tg2oroVh3nYxEoyI1hG" },
    { id: "17", title: "the red phone", duration: "4:18", spotifyId: "0vz6VkHxXhABplUB60MQgZ" },
    { id: "18", title: "himalayan yak chew", duration: "4:03", spotifyId: "0lVSIulurqMnMvumiB7mqN" },
    { id: "19", title: "unbelievable shenanigans", duration: "4:16", spotifyId: "0qaa7HyyV26i1x8Tsnmw6R" },
]

export default function SongList() {
    const [selectedSong, setSelectedSong] = useState<string | null>(null)

    const handleSongClick = (spotifyId: string) => {
        setSelectedSong(spotifyId)
    }

    return (
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-16 space-y-8 md:space-y-0 py-12 px-4 md:px-0">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mb-8">
                <h1 className="text-center text-2xl font-bold mb-2 tracking-wider">AESOP ROCK</h1>
                <div className="border-b-2 border-dashed border-gray-400 mb-6"></div>

                <div className="space-y-1 font-mono text-sm">
                    {songs.map((song) => (
                        <button
                            key={song.id}
                            onClick={() => handleSongClick(song.spotifyId)}
                            className="w-full text-left hover:bg-gray-100 p-1 rounded transition-colors duration-200 flex justify-between"
                        >
                            <span>
                                {song.id} {song.title}
                            </span>
                            <span>{song.duration}</span>
                        </button>
                    ))}
                </div>

                <div className="border-b-2 border-dashed border-gray-400 my-6"></div>
                <p className="text-center font-bold">Album déjà</p>
                <p className="text-center font-bold">disponible</p>
            </div>
            <div className="w-full max-w-md flex flex-col items-center">
                {selectedSong ? (
                    <>
                        <h2 className="text-white text-xl font-bold mb-4 text-center">Now Playing</h2>
                        <iframe
                            src={`https://open.spotify.com/embed/track/${selectedSong}?utm_source=generator&theme=0`}
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            className="rounded-lg shadow-lg"
                        />
                    </>
                ) : (
                    <div className="text-center text-gray-400">
                        <div className="text-4xl mb-4">🎵</div>
                        <p className="text-lg">Cliquez sur un titre</p>
                        <p className="text-lg">pour écouter la musique</p>
                    </div>
                )}
            </div>
        </div>
    )
}


