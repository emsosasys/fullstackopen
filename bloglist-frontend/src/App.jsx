import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { LoginForm } from './components/LoginForm'
import { CreateBlog } from './components/CreateBlog'
import { Notification } from './components/Notify'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authuser')) ?? null)

  const [notification, setNotification] = useState({ message: null, typeNotification: '' })

  const [toggleCreateBlog, setToggleCreateBlog] = useState(false)

  useEffect(() => {
    localStorage.setItem('authuser', JSON.stringify(user || null))

    user && blogService.getAll(user).then(data =>
      setBlogs(data.sort((a, b) => b.likes - a.likes))
    )
  }, [user])

  const handleSetUser = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('authuser')
    setUser(null)
  }

  const handleNewBlog = (blog) => {
    setBlogs(prev => [...prev, blog])
  }

  const handleNotification = (data) => {
    setNotification(data)
  }

  const handleToggleCreateBlog = () => {
    setToggleCreateBlog((prev) => !prev)
  }


  const handleDeleteBlog = (idBlog, idUser) => {
    const result = blogs.filter((blog) => blog.id !== idBlog)

    setBlogs(result)
  }

  if (!user) {
    return (
      <LoginForm
        notification={notification}
        handleSetUser={handleSetUser}
        handleNotification={handleNotification}
        handleToggleCreateBlog={handleToggleCreateBlog}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification {...notification} handleNotification={handleNotification} />

      <span> {user.name} logged in </span>
      <button onClick={handleLogout}>logout</button>

      <hr />

      {
        toggleCreateBlog
          ? <CreateBlog
            user={user}
            handleNewBlog={handleNewBlog}
            handleNotification={handleNotification}
            handleToggleCreateBlog={handleToggleCreateBlog}
          />
          : null
      }

      {
        !toggleCreateBlog &&
        <button onClick={handleToggleCreateBlog}>
          new blog
        </button>
      }

      <hr />

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleDeleteBlog={handleDeleteBlog}
        />
      )}
    </div>
  )
}

export default App