const puppeteer = require('puppeteer');

module.exports = async function scrapePost(url) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const postText = await page.evaluate(() => {
      const post = document.querySelector('[data-ad-preview="message"]');
      return post ? post.innerText : '⚠️ ไม่พบข้อความในโพสต์';
    });
    return postText;
  } catch (err) {
    return `❌ Error: ${err.message}`;
  } finally {
    await browser.close();
  }
};
