import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginForm, CreateBlog, Notification, Blog } from './components'
import { getAllBlogs } from './store/thunks/blogsThunks'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authuser')) ?? null
  )

  const [toggleCreateBlog, setToggleCreateBlog] = useState(false)

  useEffect(() => {
    localStorage.setItem('authuser', JSON.stringify(user || null))

    user && dispatch(getAllBlogs(user))
  }, [user])

  const handleSetUser = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('authuser')
    setUser(null)
  }

  const handleToggleCreateBlog = () => {
    setToggleCreateBlog((prev) => !prev)
  }

  if (!user) {
    return (
      <LoginForm
        handleSetUser={handleSetUser}
        handleToggleCreateBlog={handleToggleCreateBlog}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <span> {user.name} logged in </span>
      <button onClick={handleLogout}>logout</button>

      <hr />

      {toggleCreateBlog ? (
        <CreateBlog
          user={user}
          handleToggleCreateBlog={handleToggleCreateBlog}
        />
      ) : null}

      {!toggleCreateBlog && (
        <button onClick={handleToggleCreateBlog}>new blog</button>
      )}

      <hr />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default App
