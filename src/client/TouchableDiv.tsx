import React, { useContext, useRef } from 'react'
import Preferences from './Preferences'

const TouchableDiv = ({
  children = null,
  className = '',
  onTap = (touches) => {},
  dragStart = () => {},
  dragEnd = () => {},
  move = (x, y) => {},
  moveExact = (x, y) => {},
  twoFingerMove = (xMovement, yMovement) => {},
}: {
  children?: React.JSX.Element | String | null
  className?: string
  onTap?: { (touches: number, x?: number, y?: number): void }
  dragStart?: { (): void }
  drag?: { (x: number, y: number): void }
  dragEnd?: { (): void }
  move?: { (x: number, y: number): void }
  moveExact?: { (x: number, y: number): void }
  twoFingerMove?: {
    (xMovement: number, yMovement: number, x?: number, y?: number): void
  }
}) => {
  const div = useRef(document.createElement('div'))

  // @ts-ignore
  const [{ tapThreshold, doubleTapThreshold, scrollThreshold }] =
    useContext(Preferences)
  let touches: number,
    touchStart: number,
    touchEnd: number,
    doubleTap: boolean = false,
    callTimeout: ReturnType<typeof setTimeout>,
    lastTouches: [number, number][],
    touchesCount = 0

  return (
    <div
      ref={div}
      onTouchStart={(e) => {
        touches = e.touches.length
        touchesCount = e.touches.length
        touchStart = Date.now()
        if (touchStart - touchEnd < doubleTapThreshold) {
          clearTimeout(callTimeout)
          doubleTap = true
          dragStart()
        }
        lastTouches = Array.from(e.touches).map((touch) => [
          touch.pageX,
          touch.pageY,
        ])
      }}
      onTouchMove={(e) => {
        const { pageX, pageY } = e.changedTouches[0]
        if (touches === 1) {
          moveExact(pageX, pageY)
          const [lastX, lastY] = lastTouches[0]
          move(pageX - lastX, pageY - lastY)
        } else if (touches === 2) {
          const x = Math.round(
            e.touches[0].pageX +
              e.touches[1].pageX -
              lastTouches[0][0] -
              lastTouches[1][0]
          )
          const y = Math.round(
            e.touches[0].pageY +
              e.touches[1].pageY -
              lastTouches[0][1] -
              lastTouches[1][1]
          )
          twoFingerMove(x, y, pageX, pageY)
        }
        lastTouches = Array.from(e.touches)
          .map((touch) => [touch.pageX, touch.pageY])
          .map(([x, y]) => [Math.round(x), Math.round(y)])
      }}
      onTouchEnd={(e) => {
        if (Date.now() - touchStart > tapThreshold) {
          if (doubleTap) {
            doubleTap = false
            dragEnd()
          }
          return
        }
        if (doubleTap) {
          onTap(touchesCount, ...lastTouches[0])
          onTap(touchesCount, ...lastTouches[0])
        }
        if (touches === 1) {
          callTimeout = setTimeout(() => {
            onTap(touchesCount, ...lastTouches[0])
          }, doubleTapThreshold)
        }
        touchEnd = Date.now()
        touches -= 1
      }}
      className={className}
    >
      {children}
    </div>
  )
}

export default TouchableDiv
