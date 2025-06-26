import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function ConcertForm() {
    const [form, setForm] = useState({
        date: "",
        city: "",
        country: "",
        venue: "",
        isSoldOut: false,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "concerts"), form);
            setForm({ date: "", city: "", country: "", venue: "", isSoldOut: false });
        } catch (err) {
            console.error("Erreur d'ajout", err);
        }
    };

    const { date, city, country, venue, isSoldOut } = form;

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-wrap items-center gap-4 mb-6"
        >
            <input
                type="date"
                value={date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="flex-1 min-w-[120px] px-3 py-2 rounded-md border border-gray-300"
            />
            <input
                type="text"
                placeholder="Ville"
                value={city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
                className="flex-[2] min-w-[120px] px-3 py-2 rounded-md border border-gray-300"
            />
            <input
                type="text"
                placeholder="Pays"
                value={country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                required
                className="flex-1 min-w-[100px] px-3 py-2 rounded-md border border-gray-300"
            />
            <input
                type="text"
                placeholder="Salle"
                value={venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                required
                className="flex-[2] min-w-[120px] px-3 py-2 rounded-md border border-gray-300"
            />
            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={isSoldOut}
                    onChange={(e) => setForm({ ...form, isSoldOut: e.target.checked })}
                    className="accent-blue-600"
                />
                Complet
            </label>
            <button
                type="submit"
                className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
                Ajouter
            </button>
        </form>
    );
}
