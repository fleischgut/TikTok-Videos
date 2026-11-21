const {chromium}=require('playwright');
(async()=>{const [,,out,fps,dur,only]=process.argv;
const b=await chromium.launch({args:['--allow-file-access-from-files']});const pg=await b.newPage({viewport:{width:1080,height:1920}});
await pg.goto('file://'+__dirname+'/cta.html');await pg.evaluate(()=>document.fonts.ready);await pg.waitForTimeout(300);
const N=only?only.split(',').map(Number):[...Array(Math.round(fps*dur)).keys()].map(i=>i/fps);
let i=0;for(const t of N){await pg.evaluate(t=>render(t),t);await pg.screenshot({path:`${out}/${String(i++).padStart(4,'0')}.png`});}
await b.close();})();
