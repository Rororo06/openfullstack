const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

const apiUrl = 'http://localhost:3003/api'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${apiUrl}/testing/reset`)
    await request.post(`${apiUrl}/users`, {
      data: { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' },
    })
    await request.post(`${apiUrl}/users`, {
      data: { name: 'Arto Hellas', username: 'hellas', password: 'salainen' },
    })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      const notification = page.getByRole('alert')
      await expect(notification).toContainText('wrong username or password')
      await expect(notification).toHaveClass('error')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'a blog created by playwright',
        author: 'Playwright',
        url: 'http://example.com/playwright',
      })

      await expect(
        page.locator('.blog-title', { hasText: 'a blog created by playwright' })
      ).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: 'first blog',
          author: 'Playwright',
          url: 'http://example.com/first',
        })
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.locator('.blog-likes')).toHaveText('1')
      })

      test('it can be deleted by the user who added it', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.locator('.blog')).toHaveCount(0)
      })

      test('only the creator sees the remove button', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'hellas', 'salainen')
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByRole('button', { name: 'like' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('blogs are ordered by likes, most liked first', async ({ page }) => {
        await createBlog(page, {
          title: 'second blog',
          author: 'Playwright',
          url: 'http://example.com/second',
        })

        const second = page.locator('.blog').filter({ hasText: 'second blog' })
        await second.getByRole('button', { name: 'view' }).click()
        await second.getByRole('button', { name: 'like' }).click()
        await expect(second.locator('.blog-likes')).toHaveText('1')

        await expect(page.locator('.blog-title').first()).toHaveText('second blog')
      })
    })
  })
})
