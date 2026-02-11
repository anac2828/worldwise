import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      {/* Cities and countries */}
      <AppNav />
      {/* Outlet is used to display components of rested routes. The cities component will be render as default component when user goes to /app */}
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  )
}

export default Sidebar
