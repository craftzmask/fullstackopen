const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./test_helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/testing/reset')
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
})