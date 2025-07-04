import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../services/firebase"
import type { Concert } from "../pages/Admin"

const EditConcertModal = ({ concert, onClose }: { concert: Concert; onClose: () => void }) => {
    const [form, setForm] = useState({
        date: concert.date,
        city: concert.city,
        country: concert.country,
        venue: concert.venue,
        isSoldOut: concert.isSoldOut,
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        await updateDoc(doc(db, "concerts", concert.id), form)
        setLoading(false)
        onClose()
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
                <h3 className="text-lg font-semibold mb-4">Modifier le concert</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="border rounded px-3 py-2"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Ville"
                        className="border rounded px-3 py-2"
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="Pays"
                        className="border rounded px-3 py-2"
                        required
                    />
                    <input
                        type="text"
                        name="venue"
                        value={form.venue}
                        onChange={handleChange}
                        placeholder="Salle"
                        className="border rounded px-3 py-2"
                        required
                    />
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isSoldOut"
                            checked={form.isSoldOut}
                            onChange={handleChange}
                        />
                        Complet
                    </label>
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

export default EditConcertModal