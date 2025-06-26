import { useEffect, useState } from "react";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../services/firebase";
import ConcertList from "../components/ConcertList";
import ConcertForm from "../components/ConcertForm";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";


export interface Concert extends DocumentData {
    id: string;
    date: string;
    city: string;
    country: string;
    venue: string;
    isSoldOut: boolean;
}

const Admin: React.FC = () => {
    const [concerts, setConcerts] = useState<Concert[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "concerts"), (snapshot) => {
            const data: Concert[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Concert[];
            setConcerts(data);
        });

        return () => unsub();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-md">
            <h2 className="text-center text-2xl font-semibold mb-8">🎤 Backoffice – Dates de la tournée</h2>
            <ConcertForm />
            <hr className="my-8 border-gray-300" />
            <ConcertList concerts={concerts} />
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
};

export default Admin;
