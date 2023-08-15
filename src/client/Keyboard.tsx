import { useRef, useState } from 'react'
import socket from './socket'
import { checkPassword } from './password'

const Keyboard = () => {
  checkPassword()
  const inputRef = useRef(document.createElement('input'))
  const functionKeys = [
    ['escape', 'ESC'],
    ['enter', 'Enter'],
    ['delete', 'del'],
    ['f', 'f screen'],
    ['f1', 'f1'],
    ['f2', 'f2'],
    ['f3', 'f3'],
    ['f4', 'f4'],
    ['f5', 'f5'],
    ['f6', 'f6'],
    ['f7', 'f7'],
    ['f8', 'f8'],
    ['f9', 'f9'],
    ['f10', 'f10'],
    ['f11', 'f11'],
    ['f12', 'f12'],
  ]
  const specialKeys = [
    ['audio_vol_down', 'vol-'],
    ['audio_vol_up', 'vol+'],
    ['tab', 'tab'],
    ['command', `Win`],
    ['up', 'up'],
    ['down', 'down'],
    ['left', 'left'],
    ['right', 'right'],
  ]
  const toggleKeys = [
    ['control', 'CTRL'],
    ['alt', 'ALT'],
    ['shift', 'Shift'],
    ['command', 'Win'],
  ]

  const keyToggle = (key: string, down: string) => {
    socket.emit('key-toggle', key, down)
  }

  const keyTap = (key: string) => {
    socket.emit('key-tap', key)
  }
  // hello world1
  return (
    <div className="flex flex-col h-fit bg-secondary py-1 gap-1">
      <div className="w-full bg-secondary p-4 flex gap-4 overflow-x-auto md:justify-center">
        {functionKeys.map(([keyCode, key], index) => (
          <button
            key={index}
            className="min-w-[80px] bg-primary px-2s rounded-xl border-black border-2"
            onClick={() => {
              keyTap(keyCode)
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="w-full bg-secondary px-4 flex gap-4 overflow-x-auto md:justify-center">
        {toggleKeys.map(([keyCode, key], index) => (
          <button
            key={index}
            className="min-w-[80px] bg-primary px-2 rounded-xl border-black border-2"
            onClick={(e) => {
              keyToggle(
                keyCode,
                e.currentTarget.classList.contains('active') ? 'up' : 'down'
              )
              e.currentTarget.classList.toggle('active')
              inputRef.current.focus()
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap self-center gap-1 py-1">
        {specialKeys.map(([keyCode, key], index) => (
          <button
            key={index}
            className="w-20 bg-primary px-2 py-1 rounded-xl border-black border-2"
            onClick={() => {
              keyTap(keyCode)
            }}
          >
            {key}
          </button>
        ))}
      </div>
      <input
        ref={inputRef}
        autoCapitalize="none"
        type="text"
        className="self-center"
        onBlur={(e) => {
          e.target.value = ''
        }}
        onChange={(e) => {
          const char = e.target.value.at(-1) || ''
          keyTap(char)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Backspace')
            keyTap(e.key.toLowerCase())
          e.currentTarget.value = ''
        }}
      />
    </div>
  )
}

export default Keyboard
