import { createContext } from 'react'

const Preferences = createContext([
  {
    dpi: 4,
    tapThreshold: 100,
    doubleTapthreshold: 100,
    scrollFactor: 50,
  },
  () => {},
])

export default Preferences
