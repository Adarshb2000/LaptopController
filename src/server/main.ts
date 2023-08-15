import express from 'express'
import ViteExpress from 'vite-express'
import http from 'http'
import { Server } from 'socket.io'
import {
  moveMouse,
  mouseClick,
  keyTap,
  keyToggle,
  mouseToggle,
  getMousePos,
  scrollMouse,
  setMouseDelay,
  screen,
  getScreenSize,
} from 'robotjs'
import { imageConverter, isUpperCase, maxWidthAspectRatio } from './helpers'

setMouseDelay(0)
const screenSize = getScreenSize()
const aspectRatio = screenSize.width / screenSize.height

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/hello', (_, res) => {
  res.send('Hello Vite + React + TypeScript!')
})

io.on('connection', (socket) => {
  console.log('connected')
  let sending = false
  let rotate = false,
    clientWidth = screenSize.width,
    clientHeight = screenSize.height

  // Mouse
  socket.on('tap', (touches: number, x?: number, y?: number) => {
    if (x && y) moveMouse(x, y)
    mouseClick(touches === 2 ? 'right' : 'left')
  })
  socket.on('move', (x, y) => {
    const { x: currX, y: currY } = getMousePos()
    moveMouse(currX + x, currY + y)
  })
  socket.on('move-exact', moveMouse)
  socket.on('drag', (start: boolean) => {
    mouseToggle(start ? 'down' : 'up')
  })
  socket.on('scroll', scrollMouse)

  // Keyboard
  socket.on('key-toggle', (key: string, down: string) => {
    keyToggle(key, down)
  })
  socket.on('key-tap', (key: string) => {
    if (key.length === 1 && isUpperCase(key)) keyTap(key, 'shift')
    else keyTap(key)
  })

  // Screen
  socket.on('screenshare-init', (width: number, height: number) => {
    const clientAR = width / height
    rotate = (clientAR - 1) * (aspectRatio - 1) < 0
    clientWidth = rotate
      ? maxWidthAspectRatio(height, width, aspectRatio)
      : maxWidthAspectRatio(width, height, aspectRatio)
    clientHeight = ~~(clientWidth / aspectRatio)
    socket.emit('ss-init', screenSize.width, screenSize.height, rotate)
  })
  socket.on('screenshare', async () => {
    if (sending) return
    sending = true

    const image = await imageConverter(
      screen.capture(),
      100,
      rotate ? 90 : 0,
      clientWidth,
      clientHeight
    )
    socket.emit('ss', image)
    sending = false
  })
})

server.listen(3000, '0.0.0.0', () => {
  console.log('server running on http://localhost:3000')
})

ViteExpress.bind(app, server)
//
