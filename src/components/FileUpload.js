// src/components/FileUpload.js
import React from 'react';
import Papa from 'papaparse';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const FileUpload = () => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async function (results) {
          const updates = results.data;
          const routeDoc = doc(db, 'routes', 'route10');
          const docSnap = await getDoc(routeDoc);
          if (docSnap.exists()) {
            let deliveries = docSnap.data().deliveries;
            updates.forEach((update) => {
              const { id, status } = update;
              deliveries = deliveries.map((delivery) => {
                if (delivery.id === id.trim()) {
                  return {
                    ...delivery,
                    status: status.trim().toLowerCase() === 'delivered' ? 'delivered' : 'pending',
                  };
                }
                return delivery;
              });
            });
            await updateDoc(routeDoc, { deliveries });
            alert('Delivery statuses updated successfully.');
          } else {
            alert('Route not found.');
          }
        },
        error: function (error) {
          console.error(error);
          alert('Error parsing CSV file.');
        },
      });
    }
  };

  return (
    <article>
      <h3>Upload Delivery Status</h3>
      <form>
        <label htmlFor="file-upload">Choose CSV File:</label>
        <input
          type="file"
          id="file-upload"
          accept=".csv"
          onChange={handleFileUpload}
        />
        <p>CSV format should include 'id' and 'status' columns.</p>
      </form>
    </article>
  );
};

export default FileUpload;
