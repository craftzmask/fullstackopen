const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('root')
      await page.getByRole('button').click()

      const element = await page.getByText('Johnny Huynh logged in')
      await expect(element).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button').click()

      const element = await page.getByText('Johnny Huynh logged in')
      await expect(element).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('root')
      await page.getByTestId('password').fill('root')
      await page.getByRole('button').click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByTestId('title').fill('React Patterns')
      await page.getByTestId('author').fill('Micheal Chan')
      await page.getByTestId('url').fill('https://reactpatterns.com')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByText('React Patterns Micheal Chan').waitFor()

      const element = await page.getByText('React Patterns Micheal Chan')
      expect(element).toBeVisible()
    })
  })
})