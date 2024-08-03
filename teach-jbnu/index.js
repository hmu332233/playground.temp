/*
* 취업정보 페이지에서 채용정보 제목 가져오는 간단한 예시 코드
* 예시 코드 제공용
*/

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    // headless: false, slowMo: 100,
  });
  const page = await browser.newPage();

  // 로그인 페이지 접속
  await page.goto('https://career.chonbuk.ac.kr/career/21909/subview.do');

  // 아이디 입력
  await page.waitForSelector('#userId');
  await page.type('#userId', "[아이디]");
  
  // 비밀번호 입력
  await page.waitForSelector('#userPwd');
  await page.type('#userPwd', "[비밀번호]");

  // 로그인 버튼 클릭
  await page.waitForSelector('._loginSubmit');
  await Promise.all([
    page.click('._loginSubmit'),
    page.waitForNavigation()
  ]);

  // 채용정보 페이지 접속
  await page.goto('https://career.chonbuk.ac.kr/career/21893/subview.do');

  // 채용정보 제목만 가져오기
  const titles = await page.evaluate(() => {
    const elements = document.querySelectorAll('[class^="_artclTdTitle"]');
    return Array.from(elements).map(el => el.textContent.trim());
  });

  console.log(titles);

  await browser.close();
})();