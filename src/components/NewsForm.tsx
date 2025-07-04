import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../services/firebase"

export default function NewsForm() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, "news"), {
                ...form,
                createdAt: serverTimestamp(),
            })
            setForm({ title: "", description: "", image: "" })
        } catch (err) {
            console.error("Erreur d'ajout", err)
        }
    }

    const { title, description, image } = form

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
            <input
                type="text"
                placeholder="Titre de l'actualité"
                value={title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="px-3 py-2 rounded-md border border-gray-300"
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={4}
                className="px-3 py-2 rounded-md border border-gray-300 resize-vertical"
            />

            <input
                type="url"
                placeholder="URL de l'image"
                value={image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
                className="px-3 py-2 rounded-md border border-gray-300"
            />

            <button
                type="submit"
                className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
                Ajouter l'actualité
            </button>
        </form>
    )
}
