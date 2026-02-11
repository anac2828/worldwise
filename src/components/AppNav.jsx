import { NavLink } from 'react-router-dom'
import styles from './AppNav.module.css'

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {/* Displays cities component */}
          <NavLink to='cities'>Cities</NavLink>
        </li>
        <li>
          {/* Displays countries component */}
          <NavLink to='countries'>Countries</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AppNav
