# Notifications Hook

## Install

```
npm install --save @caesium/hook-notifications
```

## Usage

There are 3 exported properties that are needed at a minimum `useNotify`, `useNotifications` and `Notifications`.

At the top level of your app add `Notifications` as a wrapper around everything. e.g.

```tsx
import React from 'react'
import {Notifications} from '@caesium/hook-notifications'

export const App: React.FC = ({children}) => {
  return <Notifications>
    {children}
  </Notifications>
}
```

In your notifications component use `useNotifications` to get a list of notifications and the `removeNotification` function to remove them.

```tsx
import React from 'react'
import {useNotifications} from '@caesium/hook-notifications'

export const NotificationsComponent: React.FC = () => {
  const {notifications, removeNotification} = useNotifications()

  return <div>
    {notifications.map((notification) => {
      return <div key={notification.uuid} onClick={() => {
        removeNotification(notification.uuid)
      }}>
        <h6>{notification.title}</h6>
        <p>{notification.message}</p>
      </div>
    })}
  </div>
}
```

From any component that needs to create a notification you use `useNotify` to get the `notify` function.

```tsx
import React from 'react'
import {useNotify} from '@caesium/hook-notifications'

export const ButtonPresser: React.FC = () => {
  const {notify} = useNotify()

  return <div>
    <button onClick={() => {
      notify({
        title: 'Foo',
        message: 'bar'
      })
    }}>Notify Me</button>
  </div>
}
```