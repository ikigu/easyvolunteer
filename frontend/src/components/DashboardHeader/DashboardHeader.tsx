import './DashboardHeader.css';

interface Props {
    firstName: string;
    lastName: string;
}

const DashboardHeader = ({ firstName, lastName }: Props) => {
    const firstNameInitial = firstName.substring(0, 1);
    const lastNameInitial = lastName.substring(0, 1);

    return (
        <div className="header">
            <h4>EasyVolunteer</h4>
            <h5 className="avatar">{firstNameInitial + lastNameInitial}</h5>
        </div>
    );
};

export default DashboardHeader;
