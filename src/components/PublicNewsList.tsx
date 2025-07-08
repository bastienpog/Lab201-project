import { useEffect, useState } from "react"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { db } from "../services/firebase"
import { Calendar, X } from "lucide-react"

type News = {
    id: string
    title: string
    description: string
    image?: string
    createdAt: any
}

export default function NewsCarousel() {
    const [news, setNews] = useState<News[]>([])
    const [loading, setLoading] = useState(true)
    const [startIndex, setStartIndex] = useState(0)

    const [showModal, setShowModal] = useState(false)
    const [selectedNews, setSelectedNews] = useState<News | null>(null)

    const visibleCount = 3

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const q = query(collection(db, "news"), orderBy("createdAt", "desc"))
                const querySnapshot = await getDocs(q)
                const newsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as News[]
                setNews(newsData)
            } catch (error) {
                console.error("Erreur lors du chargement des actualités :", error)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])


    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [showModal])

    const handlePrev = () => {
        setStartIndex((prev) => (prev - visibleCount + news.length) % news.length)
    }

    const handleNext = () => {
        setStartIndex((prev) => (prev + visibleCount) % news.length)
    }

    const handleOpenModal = (item: News) => {
        setSelectedNews(item)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedNews(null)
    }

    const visibleNews = news.slice(startIndex, startIndex + visibleCount)
    const fillCount = visibleCount - visibleNews.length
    const filledNews = visibleNews.concat(news.slice(0, fillCount))

    if (loading) {
        return <p className="text-white text-center py-10">Chargement...</p>
    }

    return (
        <div className="py-12 px-4 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold" style={{ fontFamily: "DotMatrix, sans-serif" }}>
                        Dernières actualités
                    </h2>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
                        {filledNews.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleOpenModal(item)}
                                className="bg-gray-900 cursor-pointer rounded-lg shadow hover:shadow-lg transition"
                            >
                                {item.image && (
                                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                                )}
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-t border-gray-700 pt-3 mt-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} />
                                            <span>{new Date(item.createdAt.toDate()).toLocaleDateString("fr-FR")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {news.length > visibleCount && (
                        <div className="flex justify-between mt-8">
                            <button onClick={handlePrev} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded">
                                ← Précédent
                            </button>
                            <button onClick={handleNext} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded">
                                Suivant →
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showModal && selectedNews && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-lg max-w-xl w-full p-6 relative">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>

                        {selectedNews.image && (
                            <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                        )}

                        <h2 className="text-2xl font-bold mb-2">{selectedNews.title}</h2>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <Calendar size={16} className="mr-1" />
                            {new Date(selectedNews.createdAt.toDate()).toLocaleDateString("fr-FR")}
                        </div>
                        <p className="text-gray-300">{selectedNews.description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
