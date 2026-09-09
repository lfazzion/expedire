from PIL import Image,ImageOps,ImageDraw
from pathlib import Path
for route in ['index','whatsapp']:
 for w in [1440,390]:
  files=sorted(Path('.visual-checks').glob(f'hover-{route}-{w}-*.png'),key=lambda f:int(f.stem.split('-')[-1]))
  for start in range(0,len(files),24):
   subset=files[start:start+24];sheet=Image.new('RGB',(1200,220*((len(subset)+3)//4)), '#33382f');d=ImageDraw.Draw(sheet)
   for j,f in enumerate(subset):
    im=Image.open(f).convert('RGB');im.thumbnail((284,185));x=(j%4)*300;y=(j//4)*220;sheet.paste(im,(x+8,y+25));d.text((x+8,y+5),f.stem,fill='white')
   sheet.save(f'.visual-checks/sheet-{route}-{w}-{start//24}.jpg')
