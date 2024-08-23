import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataBlock from '../components/Data/DataBlock';

const Data = () => {
    const { eventId } = useParams();
    const [scoutingData, setScoutingData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScoutingData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/data/${eventId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch scouting data');
                }
                const data = await response.json();
                console.log(data)
                setScoutingData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchScoutingData();
    }, [eventId]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold text-white text-center">Scouting Data for Event ID: {eventId}</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                {error && <p className="text-red-500 text-center">{error}</p>}
                {scoutingData.map((data, index) => (
                    <DataBlock key={index} data={data} />
                ))}
            </div>
        </div>
    );
};

export default Data;