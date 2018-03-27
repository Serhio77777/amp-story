// const url = 'https://amp-research.stageserver.org/'
const url = 'https://0e3748d8.ngrok.io'

// const { record } = require('./videoCreation')
// const puppeteer = require('puppeteer')

// const Recorder = require('chrome-recorder')

const Chromy = require('chromy')
const fs = require('fs')
let chromy = new Chromy()
let frame = 0

async function main () {
  // await chromy.chain()

  await chromy.goto(url)
  await chromy.click('.i-amphtml-story-experiment-error button')
  // await Page.navigate({url: url})
  // await Page.loadEventFired()
  // await Page.startScreencast({format: 'png', everyNthFrame: 1})
  //
  // let counter = 0
  // while (counter < 100) {
  //   const {data, metadata, sessionId} = await Page.screencastFrame()
  //   console.log(data, metadata, sessionId)
  //   counter++
  //   await Page.screencastFrameAck({sessionId: sessionId})
  // }
  await chromy.goto(url)
  await chromy.wait(500)
  await chromy.evaluate(() => {
    console.log(213)
    let problem = document.querySelector('.i-amphtml-story-no-rotation-overlay')
    if (problem) {
      problem.className = ''
    }
  })
  // await chromy.startScreencast({format: 'png', everyNthFrame: 1})
  await chromy.startScreencast(async (photo) => {
    frame++
    // fs.writeFileSync('results/out' + frame + '.png', photo.data)
    if (frame >= 50) {
      console.log('Finish')
      return chromy.stopScreencast()
    }
    await fs.writeFile('results/out' + frame + '.png', photo.data, 'base64')
    console.log(photo.metadata, frame)
  }, {
    format: 'png',
    quality: 100,
    maxWidth: 400,
    maxHeight: 720,
    everyNthFrame: 1
  })
  // chromy.screencastFrame(image => {
  //   const {data, metadata} = image
  //   console.log(data, metadata)
  // })
  // await chromy.close()
}

main()

// let start = async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 500,
//     // args: ['--start-fullscreen']
//     args: ['--window-size=1280,720']
//   })
//   const page = await browser.newPage()
//   await page.goto(url)
//   // const button = await page.evaluate(() => document.querySelector('.i-amphtml-story-experiment-error button'))
  // await page.click('.i-amphtml-story-experiment-error button')
//   // console.log(button)
//   // button.click()
//
  // await page.goto(url)
  // await page.waitFor(500)
  // await page.evaluate(() => {
  //   let problem = document.querySelector('.i-amphtml-story-no-rotation-overlay')
  //   problem.className = ''
  // })
//   // Initial frame
//   // await page.screenshot({path: './frames/page0.png'})
//   // page.startScreencast
//   // try {
//   //   await record({
//   //     browser: browser, // Optional: a puppeteer Browser instance,
//   //     page: page, // Optional: a puppeteer Page instance,
//   //     output: 'output.webm',
//   //     fps: 24,
//   //     frames: 72, // 5 seconds at 60 fps
//   //     prepare: async function (browser, page) {
//   //       console.log('_______________PREPARE_______________')
//   //     },
//   //     render: function (browser, page, frame) {
//   //       console.log(frame)
//   //     }
//   //   })
//   // } catch (e) {
//   //   console.error(e)
//   // }
//
//   // var frame = 0
//   // let worker = function (resolve, reject) {
//   //   frame++
//   //   // Render an image with the frame name
//   //   console.log(frame)
//   //   try {
//   //     page.screenshot({path: './frames/page0' + frame + '.png'})
//   //   } catch (e) {
//   //     console.error(e)
//   //   }
//   //
//   //   if (frame > 500) {
//   //     console.log('Done')
//   //     resolve()
//   //   } else {
//   //     worker(resolve, reject)
//   //   }
//   // }
//   // let makeScreenshot = new Promise((resolve, reject) => {
//   //   setTimeout(() => {
//   //     worker(resolve, reject)
//   //   }, 15)
//   // })
//   // await Promise.all([makeScreenshot]).then(() => {
//   //   console.log(3423)
//   // })
//
//   await browser.close()
// }
//
// start()
