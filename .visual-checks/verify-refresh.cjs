const {chromium}=require('/home/ubuntu/.npm-global/lib/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:'/home/hermes/.cache/ms-playwright/chromium-1228/chrome-linux/chrome',args:['--no-sandbox']});
const errors=[];
await Promise.all(['index','whatsapp'].map(async route=>{
 for(const [width,height] of [[1440,900],[1280,800],[390,2400]]){
 const page=await browser.newPage({viewport:{width,height}});
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto(`http://localhost:4321/${route}.html`);await page.evaluate(()=>document.fonts.ready);
 await page.waitForTimeout(6900);
 const typing=page.locator('.typing-indicator');
 assert.equal(await typing.evaluate(e=>getComputedStyle(e).visibility),'visible');
 const dots=await typing.locator('span').evaluateAll(es=>es.map(e=>getComputedStyle(e).transform));
 await page.waitForTimeout(180); const nextDots=await typing.locator('span').evaluateAll(es=>es.map(e=>getComputedStyle(e).transform)); assert.notDeepEqual(dots,nextDots,'dots must move over time');
 const reply=page.locator('.reply-stage .bubble');assert.equal(await reply.evaluate(e=>getComputedStyle(e).opacity),'0');
 if(width===1440)await page.screenshot({path:`.visual-checks/${route}-typing.png`});
 await page.waitForTimeout(3700);
 assert.equal(await typing.evaluate(e=>getComputedStyle(e).visibility),'hidden');
 assert.equal(await page.locator('.appointment').evaluate(e=>getComputedStyle(e).opacity),'1');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow');
 await page.screenshot({path:`.visual-checks/${route}-final-${width}.png`});
 if(width===1440){
 const button=page.locator('.hero .button');const before=await button.evaluate(e=>getComputedStyle(e).backgroundColor);await button.hover();await page.waitForTimeout(350);assert.notEqual(await button.evaluate(e=>getComputedStyle(e).backgroundColor),before);
 await page.locator('.site-footer').scrollIntoViewIfNeeded();await page.locator('.site-footer').screenshot({path:`.visual-checks/${route}-footer.png`});
 }
 console.log(`${route} ${width}x${height}: typing, final, overflow OK`);await page.close();
 }
}));
const p=await browser.newPage({reducedMotion:'reduce'});await p.goto('http://localhost:4321/whatsapp');await p.waitForURL('**/whatsapp.html');assert.equal(await p.locator('.appointment').evaluate(e=>getComputedStyle(e).opacity),'1');assert.equal(await p.locator('.typing-indicator').evaluate(e=>getComputedStyle(e).display),'none');
assert.deepEqual(errors,[]);console.log('Hover, reduced motion, /whatsapp route, JS/console: OK');await browser.close();
})();
