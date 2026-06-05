import fs from 'fs';

const files = [
  'src/components/admin/ManageProducts.tsx',
  'src/routes/index.tsx',
  'src/routes/products.tsx',
  'src/routes/retail.tsx',
  'src/routes/wholesale.tsx',
  'src/routes/product.$productId.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /const parsedCatalog = isW(?:holesale)? \? 'wholesale' : isR(?:etail)? \? 'retail' : 'retail';/g,
    `const parsedCatalog = (isW${file.includes('product') ? '' : 'holesale'} ? 'wholesale' : isR${file.includes('product') ? '' : 'etail'} ? 'retail' : 'retail') as 'retail' | 'wholesale' | 'both';`
  );
  content = content.replace(
    /const parsedCatalog = isWholesale \? 'wholesale' : isRetail \? 'retail' : 'retail';/g,
    `const parsedCatalog = (isWholesale ? 'wholesale' : isRetail ? 'retail' : 'retail') as 'retail' | 'wholesale' | 'both';`
  );
  content = content.replace(
    /const parsedCatalog = isW \? 'wholesale' : isR \? 'retail' : 'retail';/g,
    `const parsedCatalog = (isW ? 'wholesale' : isR ? 'retail' : 'retail') as 'retail' | 'wholesale' | 'both';`
  );
  fs.writeFileSync(file, content);
}

const pcFile = 'src/components/site/ProductCard.tsx';
let pcContent = fs.readFileSync(pcFile, 'utf8');
if (!pcContent.includes('import type { Product }')) {
  pcContent = `import type { Product } from "@/lib/types";\n` + pcContent;
  fs.writeFileSync(pcFile, pcContent);
}

const bgFile = 'src/components/site/DivineBackground3D.tsx';
let bgContent = fs.readFileSync(bgFile, 'utf8');
bgContent = bgContent.replace(
  /if \(mountRef\.current\) \{\s*mountRef\.current\.removeChild\(renderer\.domElement\);\s*\}/,
  `if (mountRef.current && renderer.domElement) {\n      mountRef.current.removeChild(renderer.domElement);\n    }`
);
fs.writeFileSync(bgFile, bgContent);

console.log('Fixed types');
