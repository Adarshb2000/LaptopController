import Keyboard from './Keyboard'
import Mouse from './Mouse'
import { checkPassword } from './password'

const KeyboardMouse = () => {
  checkPassword()
  return (
    <div className="h-full w-full flex flex-col">
      <Mouse />
      <Keyboard />
    </div>
  )
}

export default KeyboardMouse
