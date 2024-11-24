// src/hooks/useDeliveries.js
import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Custom hook to fetch deliveries and route coordinates for a given route.
 * @param {string} routeId - The ID of the route document in Firestore.
 * @returns {Object} - An object containing deliveries and routeCoordinates.
 */
const useDeliveries = (routeId = 'route10') => {
  const [deliveries, setDeliveries] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    const routeDoc = doc(collection(db, 'routes'), routeId);

    const unsubscribe = onSnapshot(routeDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setDeliveries(data.deliveries || []);
        setRouteCoordinates(data.coordinates || []);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [routeId]);

  return { deliveries, routeCoordinates };
};

export default useDeliveries;
