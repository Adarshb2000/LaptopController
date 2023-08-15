import Jimp from 'jimp'
import { Bitmap } from 'robotjs'

export const isAlpha = (char: string) => {
  return char.toUpperCase() !== char.toLowerCase()
}

export const isUpperCase = (char: string) => {
  return isAlpha(char) && char.toUpperCase() === char
}

export const isDigit = (char: string) => {
  return Number.isInteger(char)
}

export const imageConverter = (
  screenshot: Bitmap,
  quality = 50,
  rotate = 0,
  resizeWidth = screenshot.width,
  resizeHeight = screenshot.height
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const image = new Jimp(screenshot.width, screenshot.height)
      let pos = 0
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = screenshot.image.readUInt8(pos++)
        image.bitmap.data[idx + 1] = screenshot.image.readUInt8(pos++)
        image.bitmap.data[idx + 0] = screenshot.image.readUInt8(pos++)
        image.bitmap.data[idx + 3] = screenshot.image.readUInt8(pos++)
      })
      resolve(
        image
          .quality(quality)
          .resize(resizeWidth, resizeHeight)
          .rotate(rotate)
          .getBase64Async(Jimp.MIME_JPEG)
      )
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

export const maxWidthAspectRatio = (
  maxWidth: number,
  maxHeight: number,
  aspectRatio: number
) => {
  console.log(maxWidth, maxHeight, aspectRatio)
  let low = 0,
    high = maxWidth
  let answer = -1
  while (low <= high) {
    let mid = ~~((low + high) / 2)
    if (mid / aspectRatio <= maxHeight) {
      answer = mid
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return answer
}
