// src/components/Scanner.js
import React from 'react';
import QrReader from 'react-qr-reader';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const Scanner = () => {
  const handleScan = async (data) => {
    if (data) {
      const deliveryId = data.trim();
      const routeDoc = doc(db, 'routes', 'route10');
      const docSnap = await getDoc(routeDoc);
      if (docSnap.exists()) {
        const deliveries = docSnap.data().deliveries;
        const updatedDeliveries = deliveries.map((delivery) => {
          if (delivery.id === deliveryId) {
            return { ...delivery, status: 'delivered' };
          }
          return delivery;
        });
        await updateDoc(routeDoc, { deliveries: updatedDeliveries });
        alert(`Delivery ${deliveryId} marked as delivered.`);
      } else {
        alert('Route not found.');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    alert('Error scanning QR code.');
  };

  return (
    <article>
      <h3>Scan Delivery</h3>
      <div role="group" aria-label="QR Code Scanner">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
    </article>
  );
};

export default Scanner;
