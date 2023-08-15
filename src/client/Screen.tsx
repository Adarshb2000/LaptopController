import { useContext, useEffect, useRef, useState } from 'react'
import socket from './socket'
import TouchableDiv from './TouchableDiv'
import Preferences from './Preferences'

const Screen = () => {
  // @ts-ignore
  const [{ scrollFactor, fps }] = useContext(Preferences)
  const imageRef = useRef(document.createElement('img'))
  let screenshareInterval: ReturnType<typeof setInterval> | false = false
  const [initParams, setInitParams] = useState({
    rotate: false,
    width: 1920,
    height: 1080,
  })

  const getScreenCoords = (x: number, y: number) =>
    [
      ((x - imageRef.current.offsetLeft) * initParams.width) /
        imageRef.current.offsetWidth,
      initParams.height -
        ((y - imageRef.current.offsetTop) * initParams.height) /
          imageRef.current.offsetHeight,
    ].map((i) => ~~i)

  useEffect(() => {
    if (!screenshareInterval) {
      socket.on('ss-init', (width, height, rotate) => {
        if (rotate)
          setInitParams({
            width: height,
            height: width,
            rotate,
          })
        else
          setInitParams({
            width,
            height,
            rotate,
          })
      })
      socket.emit('screenshare-init', window.innerWidth, window.innerHeight)
      socket.on('ss', (image) => {
        imageRef.current.src = image
      })
      screenshareInterval = setInterval(() => {
        socket.emit('screenshare')
      }, 1000 / fps)
    }
  }, [])

  const onTap = (touches: number, x?: number, y?: number) => {
    if (x && y) {
      const screenTouch = getScreenCoords(x, y)
      if (initParams.rotate)
        socket.emit('tap', touches, ...screenTouch.reverse())
      else socket.emit('tap', touches, ...screenTouch)
    } else socket.emit('tap', touches)
  }
  const moveExact = (x: number, y: number) => {
    if (initParams.rotate)
      socket.emit('move-exact', ...getScreenCoords(x, y).reverse())
    else socket.emit('move-exact', ...getScreenCoords(x, y))
  }

  const dragStart = () => {
    socket.emit('drag', true)
  }
  const dragEnd = () => {
    socket.emit('drag', false)
  }
  const scroll = (
    xMovement: number,
    yMovement: number,
    x?: number,
    y?: number
  ) => {
    if (x && y) moveExact(x, y)
    const scrollVal = [xMovement * scrollFactor, yMovement * scrollFactor]
    if (initParams.rotate) socket.emit('scroll', ...scrollVal.reverse())
    else socket.emit('scroll', ...scrollVal)
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      {/* {temp} */}
      <TouchableDiv
        onTap={onTap}
        moveExact={moveExact}
        dragStart={dragStart}
        dragEnd={dragEnd}
        twoFingerMove={scroll}
      >
        <img alt="" ref={imageRef} />
      </TouchableDiv>
    </div>
  )
}

export default Screen
