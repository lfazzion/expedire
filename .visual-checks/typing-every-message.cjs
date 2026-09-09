const {chromium}=require('/home/ubuntu/.npm-global/lib/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:'/home/hermes/.cache/ms-playwright/chromium-1228/chrome-linux/chrome',args:['--no-sandbox']});
try {
await Promise.all(['index','whatsapp'].map(async route=>{
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.goto(`http://localhost:4321/${route}.html`);
await page.locator('.conversation-demo.is-playing').waitFor();
const result=await page.evaluate(async()=>{
const demo=document.querySelector('.conversation-demo');
const events=[]; const start=performance.now();
await new Promise(resolve=>{function sample(){
const visible=[...demo.querySelectorAll('.typing-indicator')].filter(el=>getComputedStyle(el).visibility==='visible' && getComputedStyle(el).display!=='none');
for(const el of visible){if(!events.some(e=>e.el===el))events.push({el,start:performance.now()-start,end:0});}
for(const e of events)if(visible.includes(e.el))e.end=performance.now()-start;
if(performance.now()-start<8000)requestAnimationFrame(sample);else resolve();
}sample();});
return {count:demo.querySelectorAll('.bubble').length,events:events.map(({start,end})=>({start,end,duration:end-start}))};
});
assert.equal(result.events.length,result.count,`${route}: typing must precede every message`);
for(const event of result.events)assert(event.duration>=350 && event.duration<=600,JSON.stringify(event));
await page.evaluate(()=>{const d=document.querySelector('.conversation-demo');d.classList.remove('is-playing');void d.offsetWidth;d.classList.add('is-playing');});
await page.waitForTimeout(3400);
assert.equal(await page.locator('.typing-indicator').evaluateAll(els=>els.filter(el=>getComputedStyle(el).visibility==='visible').length),1);
await page.screenshot({path:`.visual-checks/${route}-typing-middle-fixed.png`});
await page.waitForTimeout(700);
console.log(route,JSON.stringify(result));await page.close();
}));
}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
