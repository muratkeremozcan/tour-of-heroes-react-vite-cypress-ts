import Heroes from './Heroes'
import {wrappedRender, screen, waitForElementToBeRemoved} from '../test-utils'
import userEvent from '@testing-library/user-event'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {heroes} from '../../db.json'

describe('Heroes', () => {
  // mute the expected console.error message, because we are mocking non-200 responses
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {})

  beforeEach(() => wrappedRender(<Heroes />))

  it('should see error on initial load with GET', async () => {
    const handlers = [
      rest.get(`${process.env.VITE_API_URL}/heroes`, async (_req, res, ctx) =>
        res(ctx.status(400)),
      ),
    ]
    const server = setupServer(...handlers)
    server.listen({
      onUnhandledRequest: 'warn',
    })
    jest.useFakeTimers()

    expect(await screen.findByTestId('page-spinner')).toBeVisible()

    jest.advanceTimersByTime(25000)
    await waitForElementToBeRemoved(
      () => screen.queryByTestId('page-spinner'),
      {
        timeout: 25000,
      },
    )

    expect(await screen.findByTestId('error')).toBeVisible()
    jest.useRealTimers()
    server.resetHandlers()
    server.close()
  })

  describe('200 flows', () => {
    const handlers = [
      rest.get(`${process.env.VITE_API_URL}/heroes`, async (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(heroes)),
      ),
      rest.delete(
        `${process.env.VITE_API_URL}/heroes/${heroes[0].id}`, // use /.*/ for all requests
        async (_req, res, ctx) =>
          res(ctx.status(400), ctx.json('expected error')),
      ),
    ]
    const server = setupServer(...handlers)
    beforeAll(() => {
      server.listen({
        onUnhandledRequest: 'warn',
      })
    })
    afterEach(server.resetHandlers)
    afterAll(server.close)

    it('should display the hero list on render, and go through hero add & refresh flow', async () => {
      expect(await screen.findByTestId('list-header')).toBeVisible()
      expect(await screen.findByTestId('hero-list')).toBeVisible()

      await userEvent.click(await screen.findByTestId('add-button'))
      expect(window.location.pathname).toBe('/heroes/add-hero')

      await userEvent.click(await screen.findByTestId('refresh-button'))
      expect(window.location.pathname).toBe('/heroes')
    })

    const deleteButtons = async () => screen.findAllByTestId('delete-button')
    const modalYesNo = async () => screen.findByTestId('modal-yes-no')
    const maybeModalYesNo = () => screen.queryByTestId('modal-yes-no')
    const invokeHeroDelete = async () => {
      userEvent.click((await deleteButtons())[0])
      expect(await modalYesNo()).toBeVisible()
    }

    it('should go through the modal flow, and cover error on DELETE', async () => {
      expect(screen.queryByTestId('modal-dialog')).not.toBeInTheDocument()

      await invokeHeroDelete()
      await userEvent.click(await screen.findByTestId('button-no'))
      expect(maybeModalYesNo()).not.toBeInTheDocument()

      await invokeHeroDelete()
      await userEvent.click(await screen.findByTestId('button-yes'))

      expect(maybeModalYesNo()).not.toBeInTheDocument()
      expect(await screen.findByTestId('error')).toBeVisible()
      expect(screen.queryByTestId('modal-dialog')).not.toBeInTheDocument()
    })
  })
})
