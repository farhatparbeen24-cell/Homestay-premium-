const fs = require('fs');
const path = require('path');

const filesToPatch = [
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'server', 'app-render', 'entry-base.js'),
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'esm', 'server', 'app-render', 'entry-base.js'),
];

for (const filePath of filesToPatch) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes("require('../../next-devtools/userspace/app/segment-explorer-node')")) {
      content = content.replace(
        /let SegmentViewNode = \(\)=>null;\s*let SegmentViewStateNode = \(\)=>null;\s*if \(process\.env\.NODE_ENV === ['"]development['"]\) \{[\s\S]*?SegmentViewStateNode = mod\.SegmentViewStateNode;\s*\}/g,
        'let SegmentViewNode = (props)=>props?.children || null;\nlet SegmentViewStateNode = ()=>null;'
      );
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Patched ${filePath}`);
    }
  }
}
