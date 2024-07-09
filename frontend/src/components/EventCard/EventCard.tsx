import './EventCard.css';
import { CiCalendar } from 'react-icons/ci';
import { GoOrganization } from 'react-icons/go';
import { IoPricetagsOutline } from 'react-icons/io5';

interface Organization {
    name: string;
}

interface Event {
    title: string;
    startTime: Date;
    organization: Organization;
    cost: number;
    poster: string;
    id: string;
}

interface Props {
    event: Event;
    onButtonClick: (event: any) => void;
    index: number;
}

const EventCard = ({ event, onButtonClick, index }: Props) => {
    const startTime = new Date(event.startTime);

    return (
        <div className="event-card">
            <img src={event.poster} alt="" />
            <h3>{event.title}</h3>
            <p className="icon-with-text">
                <CiCalendar size={18} />
                {startTime.toLocaleString('default', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                })}
            </p>
            <p className="icon-with-text">
                <GoOrganization />
                {event.organization.name}
            </p>
            <p className="icon-with-text">
                <IoPricetagsOutline />
                Kshs. {event.cost.toLocaleString()}
            </p>
            <a className="register-btn" onClick={onButtonClick}>
                <strong data-eventindex={index}>See details →</strong>
            </a>
        </div>
    );
};

export default EventCard;
