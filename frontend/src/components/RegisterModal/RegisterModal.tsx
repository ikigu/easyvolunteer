import { forwardRef, useEffect, useState } from 'react';
import './RegisterModal.css';
import { CiCalendar } from 'react-icons/ci';
import { IoPricetagsOutline } from 'react-icons/io5';
import { SlLocationPin } from 'react-icons/sl';

interface Event {
    title: string;
    id: string;
    poster: string;
    description: string;
    startTime: string;
    endTime: string;
    cost: number;
    organization: {
        name: string;
    };
    eventAttendeeRoles: [
        {
            type: 'Volunteer' | 'Participant';
            title: string;
            description: string;
            id: string;
        }
    ];
}

interface Props {
    event: Event;
    onClose: (event: any) => void;
}

const RegisterModal = forwardRef(({ event, onClose }: Props, ref: any) => {
    const startTime = new Date(event.startTime).toLocaleString('default', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    const endTime = new Date(event.endTime).toLocaleString('default', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    const [roleType, setRoleType] = useState('');

    const handleChangeRoleType = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRoleType(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const roleType = event.target.elements.roleType.value;
        const roleId = event.target.elements.rolePicked.value;
        const eventId = event.target.elements.eventId.value;
        const userId = event.target.elements.userId.value;

        useEffect(() => {
            fetch('http://localhost:5001/event_attendees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roleType: roleType,
                    eventId: eventId,
                    userId: userId,
                    roleId: roleId
                })
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Something went wrong');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.id) {
                        alert("You've registered successfully");
                    }
                });
        }, []);
    };

    return (
        <>
            <dialog ref={ref}>
                <div className="close-btn" onClick={onClose}>
                    x
                </div>
                <img src={event.poster} alt="" />
                <h3>{event.title}</h3>
                <p className="description">{event.description}</p>
                <p className="icon-with-text">
                    <CiCalendar size={18} />
                    {startTime} to {endTime}
                </p>
                <p className="icon-with-text">
                    <SlLocationPin />
                    {event.organization.name}
                </p>
                <p className="icon-with-text">
                    <IoPricetagsOutline />
                    Kshs. {event.cost.toLocaleString()} (free for volunteers)
                </p>
                <form onSubmit={handleSubmit}>
                    <h4>Register</h4>
                    <p>What would you like to register as?</p>
                    <div className="selection-group">
                        <input type="hidden" name="eventId" value={event.id} />
                        <input
                            type="hidden"
                            name="userId"
                            value="b990b081-76ec-4b7f-9e7f-09ef3947acc8"
                        />
                        <input
                            id="volunteer"
                            type="radio"
                            value={'Volunteer'}
                            name="roleType"
                            onChange={handleChangeRoleType}
                        />
                        <label htmlFor="volunteer">Volunteer</label>
                    </div>
                    <div className="selection-group">
                        <input
                            id="participant"
                            type="radio"
                            value={'Participant'}
                            name="roleType"
                            onChange={handleChangeRoleType}
                        ></input>
                        <label htmlFor="participant">Participant</label>
                    </div>
                    {roleType && (
                        <div>
                            {roleType === 'Volunteer' ? (
                                <>
                                    <h4>Volunteer Roles</h4>
                                    {event.eventAttendeeRoles
                                        .sort((a, b) => {
                                            if (a.title > b.title) {
                                                return 1;
                                            } else if (a.title < b.title) {
                                                return -1;
                                            }

                                            return 0;
                                        })
                                        .filter(
                                            (role) => role.type === 'Volunteer'
                                        )
                                        .map((role) => (
                                            <div
                                                className="selection-group"
                                                key={role.id}
                                            >
                                                <input
                                                    type="radio"
                                                    id={role.title}
                                                    name="rolePicked"
                                                    value={role.id}
                                                />
                                                <label htmlFor={role.title}>
                                                    {role.title}
                                                </label>
                                            </div>
                                        ))}
                                </>
                            ) : (
                                <>
                                    <h4>Participant Roles</h4>
                                    {event.eventAttendeeRoles
                                        .sort((a, b) => {
                                            if (a.title > b.title) {
                                                return 1;
                                            } else if (a.title < b.title) {
                                                return -1;
                                            }

                                            return 0;
                                        })
                                        .filter(
                                            (role) =>
                                                role.type === 'Participant'
                                        )
                                        .map((role) => (
                                            <div
                                                className="selection-group"
                                                key={role.id}
                                            >
                                                <input
                                                    type="radio"
                                                    id={role.title}
                                                    name="rolePicked"
                                                    value={role.id}
                                                />
                                                <label htmlFor={role.title}>
                                                    {role.title}
                                                </label>
                                            </div>
                                        ))}
                                </>
                            )}
                        </div>
                    )}
                    <button type="submit">Register</button>
                </form>
            </dialog>
        </>
    );
});

export default RegisterModal;
