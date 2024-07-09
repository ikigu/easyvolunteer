import './OrganizationCard.css';

import { SlTarget } from 'react-icons/sl';
import { TfiLocationPin } from 'react-icons/tfi';

interface Props {
    name: string;
    town: string;
    industry: string;
}

const OrganizationCard = ({ name, town, industry }: Props) => {
    return (
        <div className="event-card">
            <h3>{name}</h3>
            <p className="icon-with-text">
                <TfiLocationPin />
                {town}
            </p>
            <p className="icon-with-text">
                <SlTarget /> {industry}
            </p>
            <a className="register-btn">
                <strong>View Events →</strong>
            </a>
        </div>
    );
};

export default OrganizationCard;
