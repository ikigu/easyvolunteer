import DashboardHeader from '../DashboardHeader';
import DashboardMain from '../DashboardMain/DashboardMain';
import DashboardNavigation from '../DashboardNavigation/DashboardNavigation';
import './Dashboard.css';
import { useState } from 'react';

const Dashboard = () => {
    const [selectedNavButton, setSelectedNavButton] = useState('Events');

    const handleNavChange = (event: any) => {
        setSelectedNavButton(event.target.innerText);
    };

    return (
        <>
            <DashboardHeader firstName="George" lastName="Ikigu" />
            <section className="dashboard-body">
                <DashboardNavigation
                    selectedNavButton={selectedNavButton}
                    handleNavChange={handleNavChange}
                />
                <DashboardMain selectedNavButton={selectedNavButton} />
            </section>
        </>
    );
};

export default Dashboard;
