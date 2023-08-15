import { useContext } from 'react'
import Preferences from './Preferences'
import { checkPassword } from './password'

const Settings = () => {
  checkPassword()
  const [preferences, setPreferences] = useContext(Preferences)
  return (
    <div className="w-full p-4 h-full ">
      <h1 className="text-4xl">Settings</h1>
      <form className="bg-primary h-full p-4 flex flex-col gap-2">
        <label htmlFor="dpi">
          DPI
          <br />
          <input
            type="range"
            name="dpi"
            min={200}
            max={800}
            step={200}
            id="dpi"
            className="w-40"
            // @ts-ignore
            value={preferences.dpi * 100}
            onChange={(e) => {
              console.log(e.target.value)
              // @ts-ignore
              setPreferences({
                ...preferences,
                dpi: ~~(parseInt(e.target.value) / 100),
              })
            }}
            list="markers"
          />
          <datalist
            className="flex flex-col gap-4 content-between [writing-mode:vertical-lr] w-40"
            id="markers"
          >
            <option value="200" label="200"></option>
            <option value="400" label="400"></option>
            <option value="600" label="600"></option>
            <option value="800" label="800"></option>
          </datalist>
        </label>
        <label htmlFor="scrollFactor">
          Scroll Factor
          <input
            type="number"
            min={10}
            step={10}
            id="scrollFactor"
            className="w-20 ml-4"
            //@ts-ignore
            value={preferences.scrollFactor}
            onChange={(e) =>
              // @ts-ignore
              setPreferences({
                ...preferences,
                scrollFactor: parseInt(e.target.value),
              })
            }
          />
        </label>
        <label htmlFor="tapThreshold">
          Tap Threshold
          <input
            type="number"
            min={0}
            step={50}
            id="tapThreshold"
            className="w-20 ml-4"
            //@ts-ignore
            value={preferences.tapThreshold}
            onChange={(e) =>
              // @ts-ignore
              setPreferences({
                ...preferences,
                tapThreshold: parseInt(e.target.value),
              })
            }
          />
        </label>
        <label htmlFor="doubleTapThreshold">
          Double Tap Threshold
          <input
            type="number"
            min={0}
            step={50}
            id="doubleTapThreshold"
            className="w-20 ml-4"
            //@ts-ignore
            value={preferences.doubleTapThreshold}
            onChange={(e) =>
              // @ts-ignore
              setPreferences({
                ...preferences,
                doubleTapThreshold: parseInt(e.target.value),
              })
            }
          />
        </label>
      </form>
    </div>
  )
}

export default Settings
