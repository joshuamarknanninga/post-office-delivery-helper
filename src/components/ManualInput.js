// src/components/ManualInput.js
import React, { useState } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ManualInput = () => {
  const [deliveryId, setDeliveryId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (deliveryId.trim() === '') {
      alert('Please enter a valid Delivery ID.');
      return;
    }

    const routeDoc = doc(db, 'routes', 'route10');
    const docSnap = await getDoc(routeDoc);
    if (docSnap.exists()) {
      const deliveries = docSnap.data().deliveries;
      const updatedDeliveries = deliveries.map((delivery) => {
        if (delivery.id === deliveryId.trim()) {
          return { ...delivery, status: 'delivered' };
        }
        return delivery;
      });
      await updateDoc(routeDoc, { deliveries: updatedDeliveries });
      alert(`Delivery ${deliveryId} marked as delivered.`);
      setDeliveryId('');
    } else {
      alert('Route not found.');
    }
  };

  return (
    <article>
      <h3>Manual Input</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="delivery-id-input">Delivery ID:</label>
        <input
          type="text"
          id="delivery-id-input"
          name="deliveryId"
          value={deliveryId}
          onChange={(e) => setDeliveryId(e.target.value)}
          placeholder="Enter Delivery ID"
          required
        />
        <button type="submit">Update Status</button>
      </form>
    </article>
  );
};

export default ManualInput;
