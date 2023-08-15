import './App.css'
import Home from './Home'
import Mouse from './Mouse'
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Preferences from './Preferences'
import KeyboardMouse from './KeyboardMouse'
import Screen from './Screen'
import Settings from './Settings'
import Login from './Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/mouse',
    element: <Mouse />,
  },
  {
    path: '/keyboard-mouse',
    element: <KeyboardMouse />,
  },
  {
    path: '/screen',
    element: <Screen />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

function App() {
  const preferences = useState({
    dpi: 4,
    tapThreshold: 100,
    doubleTapThreshold: 100,
    scrollFactor: 50,
  })
  return (
    //@ts-ignore
    <Preferences.Provider value={preferences}>
      <RouterProvider router={router}></RouterProvider>
    </Preferences.Provider>
  )
}

export default App
