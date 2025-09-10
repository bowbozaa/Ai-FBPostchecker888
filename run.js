const scrapePost = require('./scrape');

const url = process.argv[2]; // รับ URL จาก args
if (!url) {
  console.error('❌ กรุณาใส่ URL โพสต์ Facebook');
  process.exit(1);
}

scrapePost(url).then((postText) => {
  console.log('✅ ข้อความในโพสต์คือ:');
  console.log(postText);
});
