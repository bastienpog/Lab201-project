"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { collection, onSnapshot, type DocumentData } from "firebase/firestore"
import { db } from "../services/firebase"
import ConcertList from "../components/ConcertList"
import ConcertForm from "../components/ConcertForm"
import NewsList from "../components/NewsList"
import NewsForm from "../components/NewsForm"
import { signOut } from "firebase/auth"
import { auth } from "../services/firebase"
import { useNavigate } from "react-router-dom"
import EditConcertModal from "@/components/EditConcertModal"
import EditNewsModal from "@/components/EditNewsModal"

export interface Concert extends DocumentData {
    id: string
    date: string
    city: string
    country: string
    venue: string
    isSoldOut: boolean
}

export interface News extends DocumentData {
    id: string
    title: string
    description: string
    image: string
    createdAt: any
}

type ActiveSection = "concerts" | "news"

const Admin: React.FC = () => {
    const [concerts, setConcerts] = useState<Concert[]>([])
    const [news, setNews] = useState<News[]>([])
    const [activeSection, setActiveSection] = useState<ActiveSection>("concerts")
    const [editingConcert, setEditingConcert] = useState<Concert | null>(null)
    const [editingNews, setEditingNews] = useState<News | null>(null)
    const [showConcertForm, setShowConcertForm] = useState(false)
    const [showNewsForm, setShowNewsForm] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubConcerts = onSnapshot(collection(db, "concerts"), (snapshot) => {
            const data: Concert[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Concert[]
            setConcerts(data)
        })

        const unsubNews = onSnapshot(collection(db, "news"), (snapshot) => {
            const data: News[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as News[]
            data.sort((a, b) => {
                if (!a.createdAt || !b.createdAt) return 0
                return b.createdAt.toMillis() - a.createdAt.toMillis()
            })
            setNews(data)
        })

        return () => {
            unsubConcerts()
            unsubNews()
        }
    }, [])

    const handleLogout = async () => {
        await signOut(auth)
        navigate("/login")
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Backoffice Admin Aesop Rock</h2>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                    Se déconnecter
                </button>
            </div>

            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveSection("concerts")}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeSection === "concerts"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Concerts ({concerts.length})
                </button>
                <button
                    onClick={() => setActiveSection("news")}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeSection === "news"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                >
                    Actualités ({news.length})
                </button>
            </div>

            {activeSection === "concerts" && (
                <div>
                    <div>
                        <button
                            onClick={() => setShowConcertForm((v) => !v)}
                            className="flex items-center gap-2 font-semibold text-gray-700"
                        >
                            <span className={`${showConcertForm ? "mb-4" : ""}`}>{showConcertForm ? "Masquer le formulaire" : "Ajouter un concert"}</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform duration-300 ${showConcertForm ? "rotate-180" : "rotate-0"}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`transition-all duration-300 overflow-hidden ${showConcertForm ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                            <ConcertForm />
                        </div>
                    </div>
                    <hr className="my-8 border-gray-300" />
                    <ConcertList concerts={concerts} onEdit={setEditingConcert} />
                    {editingConcert && (
                        <EditConcertModal
                            concert={editingConcert}
                            onClose={() => setEditingConcert(null)}
                        />
                    )}
                </div>
            )}

            {activeSection === "news" && (
                <div>
                    <div className="mb-6">
                        <button
                            onClick={() => setShowNewsForm((v) => !v)}
                            className="flex items-center gap-2 font-semibold text-gray-700"
                        >
                            <span className={`${showNewsForm ? "mb-4" : ""}`}>{showNewsForm ? "Masquer le formulaire" : "Ajouter une actualité"}</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform duration-300 ${showNewsForm ? "rotate-180" : "rotate-0"}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <div className={`transition-all duration-300 overflow-hidden ${showNewsForm ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                            <NewsForm />
                        </div>
                    </div>
                    <hr className="my-8 border-gray-300" />
                    <NewsList news={news} onEdit={setEditingNews} />
                    {editingNews && (
                        <EditNewsModal
                            news={editingNews}
                            onClose={() => setEditingNews(null)}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default Admin
