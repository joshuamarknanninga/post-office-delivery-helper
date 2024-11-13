import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Button, Table } from 'semantic-ui-react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '600px',
};

const center = {
    lat: 39.8283, // Center of USA
    lng: -98.5795,
};

const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const [deliveries, setDeliveries] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
    });

    useEffect(() => {
        const fetchDeliveries = async () => {
            const res = await axios.get('/api/deliveries', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDeliveries(res.data);
        };
        fetchDeliveries();
    }, [token]);

    const markAsDelivered = async (id) => {
        try {
            const res = await axios.put(
                `/api/deliveries/${id}`,
                { status: 'delivered' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setDeliveries(deliveries.map(delivery => delivery._id === id ? res.data : delivery));
            // Optionally trigger spreadsheet update here
        } catch(err) {
            alert('Error updating delivery');
        }
    };

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps';

    return (
        <Container>
            <Header as="h2">Delivery Dashboard</Header>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={4}
                center={center}
            >
                {deliveries.map(delivery => (
                    <Marker
                        key={delivery._id}
                        position={{
                            lat: delivery.coordinates.lat,
                            lng: delivery.coordinates.lng,
                        }}
                        icon={{
                            url: delivery.status === 'delivered' ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        }}
                        onClick={() => setSelectedDelivery(delivery)}
                    />
                ))}
            </GoogleMap>

            {selectedDelivery && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Delivery Details</h3>
                    <p><strong>House Number:</strong> {selectedDelivery.houseNumber}</p>
                    <p><strong>Address:</strong> {selectedDelivery.address}</p>
                    <p><strong>Status:</strong> {selectedDelivery.status}</p>
                    {selectedDelivery.status !== 'delivered' && (
                        <Button color="green" onClick={() => markAsDelivered(selectedDelivery._id)}>
                            Mark as Delivered
                        </Button>
                    )}
                    <Button onClick={() => setSelectedDelivery(null)}>Close</Button>
                </div>
            )}

            <Header as="h3" style={{ marginTop: '40px' }}>Deliveries</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>House Number</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {deliveries.map(delivery => (
                        <Table.Row key={delivery._id} positive={delivery.status === 'delivered'}>
                            <Table.Cell>{delivery.houseNumber}</Table.Cell>
                            <Table.Cell>{delivery.address}</Table.Cell>
                            <Table.Cell>
                                <span style={{ color: delivery.status === 'delivered' ? 'green' : 'red' }}>
                                    {delivery.status}
                                </span>
                            </Table.Cell>
                            <Table.Cell>
                                {delivery.status !== 'delivered' && (
                                    <Button color="green" onClick={() => markAsDelivered(delivery._id)}>
                                        Deliver
                                    </Button>
                                )}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    );
};

export default Dashboard;
