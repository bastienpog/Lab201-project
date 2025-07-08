import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";

type Concert = {
    id: string;
    date: string;
    city: string;
    venue: string;
    country?: string;
};

function formatDate(input: string): string {
    const date = new Date(input);
    if (isNaN(date.getTime())) return input;
    return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
    });
}

export default function PublicConcertList() {
    const [concertDates, setConcertDates] = useState<Concert[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConcertDates = async () => {
            try {
                const q = query(collection(db, "concerts"), orderBy("date", "asc"));
                const querySnapshot = await getDocs(q);

                const dates: Concert[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Concert[];

                setConcertDates(dates);
            } catch (error) {
                console.error("Erreur lors du chargement des concerts :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConcertDates();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500 py-6">Chargement des dates...</div>;
    }

    if (concertDates.length === 0) {
        return <div className="text-center text-gray-500 py-6">Aucune date de concert prévue.</div>;
    }

    return (
        <div className="bg-black text-white p-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" style={{
                fontFamily: "DotMatrix, sans-serif",
            }}>Date de concerts</h1>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] md:grid-rows-2 gap-6">
                <div className="overflow-hidden row-span-2 md:row-span-2">
                    <img
                        src="/performer.png"
                        alt="Performer"
                        className="w-full h-full object-cover aspect-[9/10]"
                    />
                </div>
                <div className="overflow-hidden hidden md:block">
                    <img
                        src="/performer2.png"
                        alt="Black star"
                        className="w-full h-full object-cover aspect-[1/1]"
                    />
                </div>

                <div className="space-y-2 text-2xl">
                    {concertDates.map(({ id, date, city, venue }) => (
                        <div key={id} className="flex items-center space-x-8">
                            <span className="font-mono font-bold w-12">{formatDate(date)}</span>
                            <span className="font-bold">{city}</span>
                            <span className="text-gray-400" style={{
                                fontFamily: "DotMatrixBold, sans-serif",
                            }}>{venue}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
