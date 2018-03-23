// var page = require('webpage').create()
// page.viewportSize = { width: 640, height: 480 }
//
// page.open('https://61a6b043.ngrok.io/', function () {
//   setTimeout(function () {
//     // Initial frame
//     var frame = 0
//     // Add an interval every 25th second
//     var timer = setInterval(function () {
//       // Render an image with the frame name
//       page.render('./frames/page' + (frame++) + '.png', {format: 'png'})
//
//       if (frame > 50) {
//         console.log('Done')
//         clearInterval(timer)
//         // page.close()
//         phantom.exit()
//       }
//     }, 15)
//   }, 2500)
// })
const url = 'https://61a6b043.ngrok.io'

const puppeteer = require('puppeteer')

let start = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // args: ['--start-fullscreen']
    args: ['--window-size=1280,720']
  })
  const page = await browser.newPage()
  await page.goto(url)
  // const button = await page.evaluate(() => document.querySelector('.i-amphtml-story-experiment-error button'))
  await page.click('.i-amphtml-story-experiment-error button')
  // console.log(button)
  // button.click()

  await page.goto(url)
  await page.waitFor(500)
  await page.evaluate(() => {
    let problem = document.querySelector('.i-amphtml-story-no-rotation-overlay')
    problem.className = ''
  })
  // Initial frame
  // await page.screenshot({path: './frames/page0.png'})
  var frame = 0
  let worker = async function (resolve, reject) {
    frame++
    // Render an image with the frame name
    try {
      await page.screenshot({path: './frames/page' + frame + '.png'})
    } catch (e) {
      console.error(e)
    }

    if (frame > 30) {
      console.log('Done')
      resolve()
    }
  }
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      worker(resolve, reject)
    }, 15)
  })
  // await browser.close()
}

start()
