// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { EventProvider } from './contexts/EventContext';
import DashboardLayout from './components/DashboardLayout';
import ListView from './components/ListView';
import CalendarView from './components/CalendarView';

function App() {
  return (
    <EventProvider>
      <Router>
        <DashboardLayout>
          <Routes>
            <Route path="/list-view" element={<ListView />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="*" element={<Navigate to="/list-view" />} />
          </Routes>
        </DashboardLayout>
      </Router>
    </EventProvider>
  );
}

export default App;
