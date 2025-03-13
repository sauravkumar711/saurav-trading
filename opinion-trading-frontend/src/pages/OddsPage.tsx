import React from 'react';
import OddsList from '../components/Odds/OddsList';

const OddsPage: React.FC = () => {
    const eventId = 'some-event-id'; // Replace with actual event ID

    return (
        <div>
            <h1>Odds Page</h1>
            <OddsList eventId={eventId} />
        </div>
    );
};

export default OddsPage;