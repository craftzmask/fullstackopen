const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('../helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Johnny Huynh',
        username: 'root',
        password: 'root'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Micheal Je',
        username: 'admin',
        password: 'admin'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.getByText('username')
    await expect(username).toBeVisible()

    const password = await page.getByText('password')
    await expect(password).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'root', 'root')

      const element = await page.getByText('Johnny Huynh logged in')
      await expect(element).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'root', 'wrong')

      const element = await page.getByText('Johnny Huynh logged in')
      await expect(element).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'root', 'root')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'React Patterns', 'Micheal Chan', 'https://reactpatterns.com')

      const element = await page.getByText('React Patterns Micheal Chan')
      expect(element).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'React Patterns', 'Micheal Chan', 'https://reactpatterns.com')

      await page.getByRole('button', { name: 'view' }).click()
      let element = await page.getByText('likes: 0')
      expect(element).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()
      await page.getByText('likes: 1').waitFor()
      
      element = await page.getByText('likes: 1')
      expect(element).toBeVisible()
    })

    test('the blog can be deleted by its author', async ({ page }) => {
      await createBlog(page, 'React Patterns', 'Micheal Chan', 'https://reactpatterns.com')
      
      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', async dialog => {
        console.log(dialog.message())
        await dialog.accept()
      });

      page.getByRole('button', { name: 'delete' }).waitFor()
      await page.getByRole('button', { name: 'delete' }).click()

      await page.waitForTimeout(1000)

      const element = await page.getByText('React Patterns Micheal Chan')
      expect(element).not.toBeVisible()
    })

    test('only the author can see his blogs', async ({ page }) => {
      await createBlog(page, 'React Patterns', 'Micheal Chan', 'https://reactpatterns.com')

      await page.getByRole('button', { name: 'logout' }).click()

      await login(page, 'admin', 'admin')

      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })
  })
})