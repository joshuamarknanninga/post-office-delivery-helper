// src/App.js
import React from 'react';
import MapComponent from './components/MapComponent';
import Scanner from './components/Scanner';
import ManualInput from './components/ManualInput';
import FileUpload from './components/FileUpload';
import LabelGenerator from './components/LabelGenerator';
import AddRoute from './components/AddRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <header role="banner">
        <h1>Post Office Delivery Helper</h1>
      </header>
      <main>
        <section aria-labelledby="map-section">
          <h2 id="map-section">Delivery Route Map</h2>
          <MapComponent />
        </section>
        <section aria-labelledby="update-deliveries">
          <h2 id="update-deliveries">Update Deliveries</h2>
          <Scanner />
          <ManualInput />
          <FileUpload />
        </section>
        <section aria-labelledby="manage-labels">
          <h2 id="manage-labels">Manage Labels</h2>
          <LabelGenerator />
        </section>
        <section aria-labelledby="route-management">
          <h2 id="route-management">Route Management</h2>
          <AddRoute />
        </section>
      </main>
      <footer role="contentinfo">
        <p>&copy; {new Date().getFullYear()} Post Office Delivery Helper</p>
      </footer>
    </div>
  );
}

export default App;
