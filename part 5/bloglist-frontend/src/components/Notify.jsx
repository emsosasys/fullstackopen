import { useEffect } from "react"


export const Notification = ({ message, typeNotification = 'success', handleNotification }) => {
  useEffect(() => {
    const desconnect = setInterval(() => {
      handleNotification({ message: null, typeNotification: '' })
    }, 5000)

    return () => clearInterval(desconnect)
  }, [message])

  const styles = {
    border: '1px solid',
    borderColor: typeNotification === 'success' ? 'green' : 'red',
    backgroundColor: 'white',
    color: typeNotification === 'success' ? 'green' : 'red',
    padding: '5px',
    borderRadius: '5px'
  }

  if (!message) return null

  return (
    <div style={styles}>
      {message}
    </div>
  )
}
