import { useContext, useState } from 'react'
import Preferences from './Preferences'
import TouchableDiv from './TouchableDiv'
import socket from './socket'
import { checkPassword } from './password'

const Mouse = () => {
  checkPassword()
  const [temp, setTemp] = useState('')
  let buttonToggleTimeout: ReturnType<typeof setTimeout>
  let timeout: number
  // @ts-ignore
  const [{ dpi, scrollFactor, tapThreshold }] = useContext(Preferences)

  const onTap = (touches: number) => {
    socket.emit('tap', touches)
  }
  const move = (x: number, y: number) => {
    socket.emit('move', x * dpi, y * dpi)
  }
  const dragStart = () => {
    socket.emit('drag', true)
  }
  const dragEnd = () => {
    socket.emit('drag', false)
  }
  const scroll = (x: number, y: number) => {
    socket.emit('scroll', x * scrollFactor, y * scrollFactor)
  }

  return (
    <div className="h-full flex flex-col w-full">
      <TouchableDiv
        className="bg-black flex-grow"
        onTap={onTap}
        dragStart={dragStart}
        dragEnd={dragEnd}
        move={move}
        twoFingerMove={scroll}
      ></TouchableDiv>
      <div className="flex h-[10%]">
        <button
          onTouchStart={() => {
            timeout = Date.now()
            buttonToggleTimeout = setTimeout(() => {
              dragStart()
            }, tapThreshold)
          }}
          onTouchEnd={() => {
            if (Date.now() - timeout < tapThreshold) {
              clearTimeout(buttonToggleTimeout)
              onTap(1)
            } else {
              dragEnd()
            }
          }}
          className="w-full h-full border-2"
        ></button>
        <button
          onClick={() => {
            onTap(2)
          }}
          className="w-full h-full border-2"
        ></button>
      </div>
    </div>
  )
}

export default Mouse
