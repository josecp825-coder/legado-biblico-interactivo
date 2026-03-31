const sharp = require('sharp');
const path = require('path');
const BASE = __dirname;

const src = path.join(
    'C:\\Users\\jhose\\.gemini\\antigravity\\brain\\ca25598d-a239-4164-a6ae-a3a0348faa14',
    'legado_biblico_icon_1774316950061.png'
);

async function resize() {
    // 512x512
    await sharp(src)
        .resize(512, 512, { fit: 'contain', background: { r: 238, g: 244, b: 252, alpha: 1 } })
        .png()
        .toFile(path.join(BASE, 'icon-512.png'));
    console.log('✅ icon-512.png generado');

    // 192x192
    await sharp(src)
        .resize(192, 192, { fit: 'contain', background: { r: 238, g: 244, b: 252, alpha: 1 } })
        .png()
        .toFile(path.join(BASE, 'icon-192.png'));
    console.log('✅ icon-192.png generado');

    // Favicon pequeño 64x64
    await sharp(src)
        .resize(64, 64, { fit: 'contain', background: { r: 238, g: 244, b: 252, alpha: 1 } })
        .png()
        .toFile(path.join(BASE, 'favicon-64.png'));
    console.log('✅ favicon-64.png generado');

    console.log('\n🚀 Todos los iconos listos para deploy.');
}

resize().catch(e => console.error('Error:', e.message));
