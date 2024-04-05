import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetNotification } from '../store/slices/notificationSlice'

export const Notification = () => {
  const dispatch = useDispatch()
  const { typeNotification, message } = useSelector(
    (state) => state.notification
  )

  useEffect(() => {
    const disconnect = setInterval(() => {
      dispatch(resetNotification())
    }, 5000)

    return () => clearInterval(disconnect)
  }, [message])

  const styles = {
    border: '1px solid',
    borderColor: typeNotification === 'success' ? 'green' : 'red',
    backgroundColor: 'white',
    color: typeNotification === 'success' ? 'green' : 'red',
    padding: '5px',
    borderRadius: '5px',
  }

  if (!message) return null

  return <div style={styles}>{message}</div>
}
