import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Odds {
    _id: string;
    market: string;
    odds: number;
    timestamp: string;
}

const OddsList: React.FC<{ eventId: string }> = ({ eventId }) => {
    const [odds, setOdds] = useState<Odds[]>([]);

    useEffect(() => {
        const fetchOdds = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/odds/fetch-odds/${eventId}`);
                setOdds(response.data);
            } catch (error) {
                console.error('Error fetching odds:', error);
            }
        };

        fetchOdds();
    }, [eventId]);

    return (
        <div>
            <h1>Odds</h1>
            <ul>
                {odds.map((odd) => (
                    <li key={odd._id}>
                        {odd.market}: {odd.odds} (Updated: {new Date(odd.timestamp).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OddsList;