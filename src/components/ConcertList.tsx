import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Concert } from "@/pages/Admin";

export default function ConcertList({ concerts, onEdit }: { concerts: Concert[]; onEdit: (concert: Concert) => void }) {
    const [toDelete, setToDelete] = useState<string | null>(null);

    const confirmDelete = async () => {
        if (!toDelete) return;
        await deleteDoc(doc(db, "concerts", toDelete));
        setToDelete(null);
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Liste des concerts</h3>
            <div className="flex flex-col gap-4">
                {concerts.map((concert) => (
                    <div
                        key={concert.id}
                        className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100"
                    >
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                            <div>
                                <span className="font-medium text-gray-700">Date:</span> {concert.date}
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Ville:</span> {concert.city}
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Pays:</span> {concert.country}
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Salle:</span> {concert.venue}
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Complet:</span>{" "}
                                {concert.isSoldOut ? "✅" : "❌"}
                            </div>
                        </div>
                        <button
                            onClick={() => setToDelete(concert.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium self-start md:self-center"
                        >
                            Supprimer
                        </button>
                        <button
                            onClick={() => onEdit(concert)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Modifier
                        </button>
                    </div>
                ))}
            </div>

            {toDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
                        <h4 className="text-lg font-semibold mb-4">Confirmer la suppression</h4>
                        <p className="mb-6 text-gray-700">Voulez-vous vraiment supprimer ce concert ?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setToDelete(null)}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                            >
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
    );
}
