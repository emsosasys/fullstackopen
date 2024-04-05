import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { deleteBlogById, updateBlogLikeById } from '../store/thunks/blogsThunks'

const Blog = ({ blog, user = {} }) => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

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
        <span role="title">
          {blog.title} - <strong>{blog.author}</strong>
        </span>
        <button onClick={() => setShow((prev) => !prev)}>
          {show ? 'hidden' : 'show'}
        </button>
      </div>

      <div style={{ display: show ? 'block' : 'none' }} className="details">
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>

        <div>
          <span data-testid="countLike"> likes {blog.likes}</span>
          <button
            data-testid="like"
            onClick={() =>
              dispatch(updateBlogLikeById(user, blog.likes, blog.id))
            }
          >
            like
          </button>
        </div>

        <div>
          <span>{blog.author}</span>
        </div>

        <button onClick={() => dispatch(deleteBlogById(user, blog.id))}>
          delete
        </button>
      </div>
    </div>
  )
}

export default Blog
