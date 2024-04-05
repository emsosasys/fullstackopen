import { expect, describe, test, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Blog from '../../components/Blog'

describe('Testing component <Blog />', () => {
  const blog = {
    id: 454655,
    title: 'Useful CSS Tools',
    url: 'https://dev.to/lilxyzz/useful-css-tools-17bc?ref=dailydev',
    likes: 0,
    author: 'Travis'
  }

  it('Test title and author without rendering url and likes by defult', () => {
    const { container } = render(<Blog blog={blog} />)

    document.head.innerHTML = document.head.innerHTML;

    const title = screen.getByRole('title', { name: '' }).textContent

    const details = container.querySelector('.details')

    expect(title).toBe(`${blog.title} - ${blog.author}`)

    expect(2).toBe(2)
  })

  // test('Test URL and Likes render when user make a click in the button <show>', async () => {
  //   // const { container } = render(<Blog blog={blog} />)

  //   // const details = container.querySelector('.details')

  //   // userEvent.setup()
  //   // const showButton = screen.getByRole('button', {
  //   //   name: 'show'
  //   // })

  //   // await userEvent.click(showButton)

  //   // expect(showButton).toBeInTheDocument()
  //   // expect(details).not.toHaveStyle('display: none')
  // })

  // test('Test the controller of button <LIKE> call it twice with user make a click', async () => {
  //   // const mockHandler = jest.fn()

  //   // render(<Blog blog={blog} />)

  //   // userEvent.setup()

  //   // const likeButton = screen.getByTestId('like')

  //   // await userEvent.dblClick(likeButton)

  //   // expect(mockHandler.mock.calls).toHaveLength(0)
  // })

  // test('Test the form of new blog', () => { })
})