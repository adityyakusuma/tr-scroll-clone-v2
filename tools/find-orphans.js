const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'src');

function walk(dir, files = []){
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir,f);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) walk(fp, files);
    else files.push(fp);
  });
  return files;
}

const sourceFiles = walk(src).filter(f => f.endsWith('.vue') || f.endsWith('.js') || f.endsWith('.scss'));

const content = sourceFiles.map(f => ({f, src: fs.readFileSync(f,'utf8')}));

function isReferenced(filePath){
  const rel = path.relative(src, filePath).replace(/\\/g, '/');
  // check by filename or by path without extension
  const base = './' + rel;
  const noExt = base.replace(/\.(vue|js|scss)$/,'');
  // search in all files
  return content.some(c => {
    if (c.f === filePath) return false;
    return c.src.includes(`'${base}`) || c.src.includes(`"${base}`) || c.src.includes(`'${noExt}`) || c.src.includes(`"${noExt}`) || c.src.includes(rel.split('/').pop());
  });
}

const orphans = [];
for (const f of sourceFiles){
  // entry points to skip
  if (f.endsWith('main.js') || f.endsWith('App.vue') || f.endsWith('pages/index.vue')) continue;
  if (!isReferenced(f)) orphans.push(path.relative(root, f));
}

console.log('Potential orphan files:');
console.log(orphans.join('\n') || '(none)');
