// src/components/AddRoute.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AddRoute = () => {
  const [routeName, setRouteName] = useState('');
  const [coordinates, setCoordinates] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (routeName.trim() === '' || coordinates.trim() === '') {
      alert('Please provide both Route Name and Coordinates.');
      return;
    }

    const parsedCoordinates = coordinates
      .split(';')
      .map((coord) => {
        const [lat, lng] = coord.split(',').map(Number);
        return { lat, lng };
      })
      .filter((coord) => !isNaN(coord.lat) && !isNaN(coord.lng));

    if (parsedCoordinates.length === 0) {
      alert('Please provide valid coordinates.');
      return;
    }

    try {
      await addDoc(collection(db, 'routes'), {
        name: routeName.trim(),
        coordinates: parsedCoordinates,
        deliveries: [],
      });
      alert(`Route "${routeName}" added successfully.`);
      setRouteName('');
      setCoordinates('');
    } catch (error) {
      console.error('Error adding route: ', error);
      alert('Failed to add route.');
    }
  };

  return (
    <article>
      <h3>Add New Route</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="route-name">Route Name:</label>
          <input
            type="text"
            id="route-name"
            name="routeName"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            placeholder="Route Name"
            required
          />
        </div>
        <div>
          <label htmlFor="route-coordinates">Coordinates:</label>
          <textarea
            id="route-coordinates"
            name="coordinates"
            value={coordinates}
            onChange={(e) => setCoordinates(e.target.value)}
            placeholder="Enter coordinates as lat,lng;lat,lng;..."
            required
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <button type="submit">Add Route</button>
      </form>
      <p>Example: 29.3562,-98.1153;29.3570,-98.1160;29.3580,-98.1170</p>
    </article>
  );
};

export default AddRoute;
