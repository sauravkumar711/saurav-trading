import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
    _id: string;
    name: string;
    sport: string;
    odds: number;
    status: string;
}

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>
                        {event.name} - {event.sport} - {event.odds} - {event.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;