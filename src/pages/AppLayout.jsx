import Map from '../components/Map'
import Sidebar from '../components/Sidebar'
import User from '../components/User'
import styles from './AppLayout.module.css'

function AppLayout() {
  return (
    <div className={styles.app}>
      {/* User info component after login */}
      <User />
      {/* List of cities and countries (nested routes)*/}
      <Sidebar />
      <Map />
    </div>
  )
}

export default AppLayout
