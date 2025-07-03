import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Concert } from "@/pages/Admin";
import { db } from "@/services/firebase";

export default function PublicConcertList({ concerts }: { concerts: Concert[] }) {
    const [ConcertDates, setConcertDates] = useState<Concert[]>(concerts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConcertDates = async () => {
            try {
                const q = query(collection(db, "concerts"), orderBy("date", "asc"));
                const querySnapshot = await getDocs(q);

                const dates: Concert[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Concert[];

                setConcertDates(dates);
            } catch (error) {
                console.error("Erreur lors du chargement :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConcertDates();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500 py-6">Chargement des dates...</div>;
    }

    if (ConcertDates.length === 0) {
        return <div className="text-center text-gray-500 py-6">Aucune date de concert prévue.</div>;
    }

    return (
        <section className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Dates de concert – Aesop Rock</h2>
            <ul className="space-y-4">
                {ConcertDates.map(({ id, date, city, venue, country }) => {
                    return (
                        <li key={id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
                            <p className="text-lg font-semibold text-gray-800">{date}</p>
                            <p className="text-gray-600">
                                {city} — {venue} ({country})
                            </p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

