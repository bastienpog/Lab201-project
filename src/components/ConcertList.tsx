import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Concert } from "@/pages/Admin";

export default function ConcertList({ concerts }: { concerts: Concert[] }) {
    const handleDelete = async (id: string) => {
        await deleteDoc(doc(db, "concerts", id));
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
                            onClick={() => handleDelete(concert.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium self-start md:self-center"
                        >
                            🗑 Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
