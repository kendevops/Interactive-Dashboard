// components/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { FaList, FaCalendarAlt } from 'react-icons/fa';
import styles from '../styles/Sidebar.module.css'; // Import the CSS module

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.menu}>
        <ul>
          <li>
            <NavLink to="/list-view" className={({ isActive }) => (isActive ? styles.activeLink : '')}>
              <FaList /> List View
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" className={({ isActive }) => (isActive ? styles.activeLink : '')}>
              <FaCalendarAlt /> Calendar View
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
