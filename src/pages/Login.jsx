import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

import PageNav from '../components/PageNav'
import styles from './Login.module.css'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('jack@example.com')
  const [password, setPassword] = useState('qwerty')

  function handleOnSubmit(e) {
    e.preventDefault()

    // Checks if the email and password are correct. If so, isAuthenticated will return true
    if (email && password) login(email, password)
  }

  // On first render isAuthenticated will be false. When the login form is submitted, isAuthencitated will change to true
  // useEffect will run when isAuthenticated changes and the Login component will re-render
  useEffect(() => {
    //If true go to '/app'. Use replace: true to avoid going back to the login page once a user is logged in and avoid a bug.
    if (isAuthenticated) navigate('/app', { replace: true })
  }, [isAuthenticated, navigate])

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={'primary'}> Login</Button>
        </div>
      </form>
    </main>
  )
}
