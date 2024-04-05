import { useDispatch } from 'react-redux'
import { useForm } from '../hooks/useForm'
import { setNotification } from '../store/slices/notificationSlice'
import { createNewBlog } from '../store/thunks/blogsThunks'

const initialFormState = {
  title: '',
  author: '',
  url: '',
}

export const CreateBlog = ({
  user = {},
  // handleNewBlog,
  handleToggleCreateBlog,
}) => {
  const dispatch = useDispatch()

  const { formState, resetForm, handleInputChange } = useForm(initialFormState)

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    try {
      dispatch(createNewBlog(user, formState))

      dispatch(
        setNotification({
          typeNotification: 'success',
          message: `a new blog ${formState.title} by ${formState.author}`,
        })
      )

      handleToggleCreateBlog()

      resetForm()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="title">title: </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={formState.title}
          />
        </div>

        <div>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            id="author"
            name="author"
            onChange={handleInputChange}
            value={formState.author}
          />
        </div>

        <div>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            id="url"
            name="url"
            onChange={handleInputChange}
            value={formState.url}
          />
        </div>

        <button type="submit" id="create_blog">
          create
        </button>
        <button type="button" onClick={handleToggleCreateBlog}>
          cancel
        </button>
      </form>
    </div>
  )
}
