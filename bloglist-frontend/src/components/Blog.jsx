import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user = {}, handleDeleteBlog }) => {
  const [show, setShow] = useState(false)
  const [likeCounter, setLikeCounter] = useState(blog.likes || 0)

  const handleIncreaseLike = async (id) => {
    try {
      await blogService.updateLike(user, blog.likes, id)
      setLikeCounter((prev) => prev + 1)
    } catch (error) {

    }
  }

  const handleDeleteBlogById = async (id) => {
    await blogService.deleteBlog(user, id)
    handleDeleteBlog(id)
  }

  const blogStyle = {
    padding: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        <span role="title">{blog.title} - <strong>{blog.author}</strong></span>
        <button onClick={() => setShow((prev) => !prev)}>{show ? 'hidden' : 'show'}</button>
      </div>

      <div style={{ display: show ? 'block' : 'none' }} className="details">
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>

        <div>
          <span data-testid="countLike"> likes {likeCounter}</span>
          <button data-testid="like" onClick={() => handleIncreaseLike(blog.id)}>
            like
          </button>
        </div>

        <div>
          <span>{blog.author}</span>
        </div>

        <button onClick={() => handleDeleteBlogById(blog.id)}>delete</button>
      </div>
    </div>
  )
}

export default Blog