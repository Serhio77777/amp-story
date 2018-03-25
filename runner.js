const url = 'https://1af55ced.ngrok.io'

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
  let worker = function (resolve, reject) {
    frame++
    // Render an image with the frame name
    console.log(frame)
    try {
      page.screenshot({path: './frames/page0' + frame + '.png'})
    } catch (e) {
      console.error(e)
    }

    if (frame > 500) {
      console.log('Done')
      resolve()
    } else {
      worker(resolve, reject)
    }
  }
  let makeScreenshot = new Promise((resolve, reject) => {
    setTimeout(() => {
      worker(resolve, reject)
    }, 15)
  })
  await Promise.all([makeScreenshot]).then(() => {
    console.log(3423)
  })
  // await browser.close()
}

start()
