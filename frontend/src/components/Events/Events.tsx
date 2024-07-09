import EventCard from '../EventCard';
import { useState, useEffect, useRef } from 'react';
import RegisterModal from '../RegisterModal';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(-1);

    const dialogRef: any = useRef(null);

    useEffect(() => {
        if (dialogRef.current && selectedEvent !== -1) {
            dialogRef.current.showModal();
        }
    }, [selectedEvent]);

    const handleClick = (event: any) => {
        const index = parseInt(event.target.dataset.eventindex, 10);
        if (index >= 0 && index < events.length) {
            setSelectedEvent(index);
        }
    };
    const closeModal = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    useEffect(() => {
        fetch('http://localhost:5001/api/events')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    return (
        <>
            <h3>All Events</h3>
            <div className="events">
                {events.length > 0 ? (
                    events.map((event: any, index: number) => (
                        <EventCard
                            key={event.id}
                            index={index}
                            event={event}
                            onButtonClick={handleClick}
                        />
                    ))
                ) : (
                    <p>No events available</p>
                )}
                {events.length > 0 && selectedEvent >= 0 ? (
                    <RegisterModal
                        ref={dialogRef}
                        event={events[selectedEvent]}
                        onClose={closeModal}
                    />
                ) : null}
            </div>
        </>
    );
};

export default Events;

// const [showRegisterModal, setShowRegisterModal] = useState(false);

// const handleRegisterButtonClick = () => {
// const eventId = event.target.dataset.eventid;
// const [eventParticipantRoles, setEventParticipantRoles] = useState([]);
// const [eventVolunteerRoles, setEventVolunteerRoles] = useState([]);

// useEffect(() => {
//     fetch('http://localhost:5001/api/event_attendee_roles', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             type: 'Volunteer',
//             eventId: eventId
//         })
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then((data) => setEventVolunteerRoles(data))
//         .catch((error) => console.log(error));
// });

// useEffect(() => {
//     fetch('http://localhost:5001/api/event_attendee_roles', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             type: 'Participant',
//             eventId: eventId
//         })
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then((data) => setEventParticipantRoles(data))
//         .catch((error) => console.log(error));
// });

// setShowRegisterModal(!showRegisterModal);
// };
