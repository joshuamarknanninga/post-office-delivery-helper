// src/components/LabelGenerator.js
import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import jsPDF from 'jspdf';

const LabelGenerator = () => {
  const generateLabels = async () => {
    const routeDoc = doc(db, 'routes', 'route10');
    const docSnap = await getDoc(routeDoc);
    if (docSnap.exists()) {
      const deliveries = docSnap.data().deliveries.filter((d) => d.status === 'pending');
      if (deliveries.length === 0) {
        alert('No pending deliveries to generate labels.');
        return;
      }
      const pdf = new jsPDF();
      deliveries.forEach((delivery, index) => {
        pdf.setFontSize(16);
        pdf.text(`Delivery ID: ${delivery.id}`, 10, 20 + index * 30);
        pdf.text(`Address: ${delivery.address}`, 10, 30 + index * 30);
        if ((index + 1) % 3 === 0 && index !== deliveries.length - 1) {
          pdf.addPage();
        }
      });
      pdf.save('Pending_Delivery_Labels.pdf');
    } else {
      alert('Route not found.');
    }
  };

  return (
    <article>
      <h3>Generate Labels</h3>
      <button type="button" onClick={generateLabels}>
        Download Labels
      </button>
    </article>
  );
};

export default LabelGenerator;
