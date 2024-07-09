import './DashboardMain.css';
import Events from '../Events';
import Organizations from '../Organizations/Organizations';

interface Props {
    selectedNavButton: string;
}

const DashboardMain = ({ selectedNavButton }: Props) => {
    const renderComponent = (selectedNavButton: string) => {
        switch (selectedNavButton) {
            case 'Events':
                return <Events />;
            case 'Organizations':
                return <Organizations />;
        }
    };

    return (
        <div className="dashboard-main">
            {renderComponent(selectedNavButton)}
        </div>
    );
};

export default DashboardMain;
