import { useForm } from '../hooks/useForm'
import { authLogin } from '../services/auth'
import { Notification } from './Notify'

const initialFormState = {
  username: '',
  password: ''
}

export const LoginForm = ({ notification, handleNotification, handleSetUser }) => {
  const { formState, resetForm, handleInputChange } = useForm(initialFormState)

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    try {
      const userData = await authLogin(formState)

      handleSetUser(userData)

      resetForm()
    } catch (error) {
      handleNotification({ typeNotification: 'error', message: error.response.data.error })
    }
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <h1 title='Hola aqui puedes hacer clilck'>Log in to application</h1>
      <Notification {...notification} handleNotification={handleNotification} />

      <div>
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  )
}
