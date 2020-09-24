import React from 'react'
import {render, cleanup, fireEvent} from '@testing-library/react'

import {useNotify, useNotifications, Notifications, UseNotificationsFunction} from './hook-notifications'

const TestWrapper: React.FC = ({children}) => {
  return <Notifications>{children}</Notifications>
}

const TestComponent: React.FC = () => {
  const {notifications, removeNotification} = useNotifications()
  const {notify} = useNotify()

  return <>
    <p>Notifications: {notifications.length}</p>
    {notifications[0] ? <p>UUID: {notifications[0].uuid}</p> : ''}
    <button onClick={() => {
      notify({
        title: 'test',
        message: 'Testing'
      })
    }}>add notification</button>
    <button onClick={() => {
      removeNotification(notifications[0].uuid)
    }}>remove notification</button>
  </>
}

describe('Notifications', () => {
  afterEach(() => {
    cleanup()
  })

  it('should throw and exception if not a child of <otifications>', () => {
    expect(() => {
      render(<TestComponent />)
    }).toThrow()
  })

  it('should add a notification with a uuid', () => {
    const {getByText} = render(<TestWrapper><TestComponent /></TestWrapper>)

    expect(getByText('Notifications: 0')).toBeInTheDocument()

    fireEvent.click(getByText('add notification'))

    expect(getByText('Notifications: 1')).toBeInTheDocument()
    expect(getByText(/^UUID: [0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)).toBeInTheDocument()

    fireEvent.click(getByText('remove notification'))

    expect(getByText('Notifications: 0')).toBeInTheDocument()
  })

  it('should support custom notification types', () => {
    const Component: React.FC = () => {
      const {notifications} = (useNotifications as UseNotificationsFunction<{
        icon: string
        title: string
        message: string
        uuid: string
      }>)()

      return <>
        <p>Notifications: {notifications.length}</p>
      </>
    }

    const {getByText} = render(<TestWrapper><Component /></TestWrapper>)

    expect(getByText('Notifications: 0')).toBeInTheDocument()
  })
})