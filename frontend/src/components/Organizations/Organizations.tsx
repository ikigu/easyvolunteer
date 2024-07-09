import OrganizationCard from '../OrganizationCard';
import './Organizations.css';
import { useState, useEffect } from 'react';

const Organizations = () => {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/organizations')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setOrganizations(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    return (
        <>
            <h3>All Organizations</h3>
            <div className="organizations">
                {organizations.length > 0 ? (
                    organizations.map((organization: any) => (
                        <OrganizationCard
                            key={organization.id}
                            name={organization.name}
                            town={organization.town}
                            industry={organization.industry}
                        />
                    ))
                ) : (
                    <p>No organizations available</p>
                )}
            </div>
        </>
    );
};

export default Organizations;
