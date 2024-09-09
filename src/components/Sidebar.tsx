import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><NavLink to="/list-view" activeClassName="active">List View</NavLink></li>
          <li><NavLink to="/calendar" activeClassName="active">Calendar</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
