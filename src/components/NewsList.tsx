import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../services/firebase"
import type { News } from "@/pages/Admin"
import { useState } from "react"

export default function NewsList({ news, onEdit }: { news: News[]; onEdit: (news: News) => void }) {
    const [toDelete, setToDelete] = useState<string | null>(null);

    const confirmDelete = async () => {
        if (!toDelete) return;
        await deleteDoc(doc(db, "news", toDelete));
        setToDelete(null);
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return "Date inconnue"

        if (timestamp.toDate) {
            return timestamp.toDate().toLocaleDateString("fr-FR")
        }
        if (timestamp instanceof Date) {
            return timestamp.toLocaleDateString("fr-FR")
        }

        return "Date inconnue"
    }

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Liste des actualités</h3>
            <div className="flex flex-col gap-4">
                {news.map((newsItem) => (
                    <div key={newsItem.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-4">
                            {newsItem.image && (
                                <img
                                    src={newsItem.image || "/placeholder.svg"}
                                    alt={newsItem.title}
                                    className="w-full md:w-32 h-32 object-cover rounded-md"
                                />
                            )}

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-lg text-gray-800 max-w-3/5">{newsItem.title}</h4>
                                    <div className="space-x-4">
                                        <button
                                            onClick={() => setToDelete(newsItem.id)}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium ml-4"
                                        >
                                            Supprimer
                                        </button>
                                        <button
                                            onClick={() => onEdit(newsItem)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        >
                                            Modifier
                                        </button>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-2 text-sm">{newsItem.description}</p>

                                <div className="text-xs text-gray-500">
                                    <span className="font-medium">Créé le:</span> {formatDate(newsItem.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {news.length === 0 && <p className="text-gray-500 text-center py-8">Aucune actualité pour le moment</p>}
            </div>
            {toDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
                        <h4 className="text-lg font-semibold mb-4">Confirmer la suppression</h4>
                        <p className="mb-6 text-gray-700">Voulez-vous vraiment supprimer ce concert ?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setToDelete(null)}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"                         >
                                Annuler
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
