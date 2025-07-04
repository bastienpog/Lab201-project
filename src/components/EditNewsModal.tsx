import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../services/firebase"

type News = {
    id: string
    title: string
    description: string
    image: string
}

const EditNewsModal = ({ news, onClose }: { news: News; onClose: () => void }) => {
    const [form, setForm] = useState({
        title: news.title,
        description: news.description,
        image: news.image,
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            await updateDoc(doc(db, "news", news.id), form)
            onClose()
        } catch (err) {
            console.error("Erreur lors de la mise à jour de l'actualité :", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                    aria-label="Fermer"
                >
                    ×
                </button>
                <h3 className="text-lg font-semibold mb-4">Modifier l'actualité</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Titre de l'actualité"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 rounded-md border border-gray-300"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="px-3 py-2 rounded-md border border-gray-300 resize-vertical"
                    />

                    <input
                        type="url"
                        name="image"
                        placeholder="URL de l'image"
                        value={form.image}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 rounded-md border border-gray-300"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Enregistrement..." : "Enregistrer"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditNewsModal
