const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./test_helper')

const blog = {
  author: 'Jane Doe',
  title: 'Mastering Distributed Systems',
  url: 'https://example.com/mastering-distributed-systems'
}

const anotherBlog = {
  author: 'Alex Nguyen',
  title: 'Event-Driven Architectures in Practice',
  url: 'https://example.com/event-driven-architectures',
  likes: 40  // add 40 here for testing the blogs are arranged in the order 
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'root',
        password: 'root',
        name: 'The Root'
      }
    })
    await request.post('/api/users', {
      data: {
        username: 'admin',
        password: 'admin',
        name: 'The Admin'
      }
    })

    const res = await request.post('/api/login', {
      data: { username: 'admin', password: 'admin' }
    })

    const body = await res.json(); 
    await request.post('/api/blogs', {
      data: { ...anotherBlog, user: body.id },
      headers: { Authorization: `Bearer ${body.token}` }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('login-form')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByTestId('login-button')).toBeVisible()
  })

  describe('Login', () => {
    test('valid user can login', async ({ page }) => {
      await loginWith(page, 'root', 'root')
      await expect(page.getByText('You logged in successfully')).toBeVisible()
    })

    test('invalid user cannot login', async ({ page }) => {
      await loginWith(page, 'root', 'admin')
      await expect(page.getByText('username or password is invalid')).toBeVisible()
    })
  })

  describe('After logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'root')
      await page.getByRole('button', { name: 'create' }).click()
      await createBlog(page, blog.title, blog.author, blog.url)
    })

    test('logged user can create a blog', async ({ page }) => {
      await expect(page.getByText(`a new blog ${blog.title} added`)).toBeVisible()
      await expect(page.locator('.blog').filter({ hasText: blog.title })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      const blogDiv = page.locator('.blog').filter({ hasText: blog.title })
      await blogDiv.getByRole('button', { name: 'view' }).click()
      
      await blogDiv.getByRole('button', { name: 'like' }).click()
      await expect(blogDiv.getByText('likes 1')).toBeVisible()
      
      await blogDiv.getByRole('button', { name: 'like' }).click()
      await expect(blogDiv.getByText('likes 2')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      const blogDiv = page.locator('.blog').filter({ hasText: blog.title })
      await blogDiv.getByRole('button', { name: 'view' }).click()
      
      page.on('dialog', dialog => dialog.accept())

      await blogDiv.getByRole('button', { name: 'remove' }).click()
      await expect(blogDiv.getByText(blog.title)).not.toBeVisible()
    })

    test('another user cannot see remove button from other user\' blog', async ({ page }) => {
      const blogDiv = page.locator('.blog').filter({ hasText: anotherBlog.title })
      await blogDiv.getByRole('button', { name: 'view' }).click()
      await expect(blogDiv.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test.only('blogs are arranged in the order according to the likes', async ({ page }) => {
      await expect(page.getByText(`a new blog ${blog.title} added`)).toBeVisible()

      const blogDivs = await page.locator('.blog').all()
      
      await blogDivs[0].getByRole('button', { name: 'view' }).click()
      await expect(blogDivs[0].getByText('likes 40')).toBeVisible()

      await blogDivs[1].getByRole('button', { name: 'view' }).click()
      await expect(blogDivs[1].getByText('likes 0')).toBeVisible()
    })
  })
})