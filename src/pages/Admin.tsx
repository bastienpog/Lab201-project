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
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-4">Ajouter un concert</h3>
                        <ConcertForm />
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
                        <h3 className="text-lg font-semibold mb-4">Ajouter une actualité</h3>
                        <NewsForm />
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
