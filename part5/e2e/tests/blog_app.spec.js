const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./test_helper')

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
    const blog = {
      author: 'Jane Doe',
      title: 'Mastering Distributed Systems',
      url: 'https://example.com/mastering-distributed-systems'
    }

    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'root')
      await page.getByRole('button', { name: 'create' }).click()
      await createBlog(page, blog.title, blog.author, blog.url)
    })

    test('logged user can create a blog', async ({ page }) => {
      await expect(page.getByText(`a new blog ${blog.title} added`)).toBeVisible()
      await expect(page.locator('.blog').filter({ hasText: blog.title })).toBeVisible()
    })

    test.only('a blog can be liked', async ({ page }) => {
      const blogDiv = page.locator('.blog').filter({ hasText: blog.title })
      await blogDiv.getByRole('button', { name: 'view' }).click()
      
      await blogDiv.getByRole('button', { name: 'like' }).click()
      await expect(blogDiv.getByText('likes 1')).toBeVisible()
      
      await blogDiv.getByRole('button', { name: 'like' }).click()
      await expect(blogDiv.getByText('likes 2')).toBeVisible()
    })
  })
})