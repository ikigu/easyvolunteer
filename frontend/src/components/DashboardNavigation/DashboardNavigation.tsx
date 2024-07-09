import NavButton from '../NavButton/NavButton';
import './DashboardNavigation.css';

interface Props {
    selectedNavButton: string;
    handleNavChange: (button: string) => void;
}

const DashboardNavigation = ({ selectedNavButton, handleNavChange }: Props) => {
    return (
        <div className="navigation">
            <NavButton
                text="Events"
                selected={selectedNavButton === 'Events' ? true : false}
                handleNavChange={handleNavChange}
            />
            <NavButton
                text="Organizations"
                selected={selectedNavButton === 'Organizations' ? true : false}
                handleNavChange={handleNavChange}
            />
        </div>
    );
};

export default DashboardNavigation;
