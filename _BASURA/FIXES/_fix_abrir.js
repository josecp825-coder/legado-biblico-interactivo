const fs = require('fs');
let code = fs.readFileSync('data_motor.js', 'utf8');

const target = `async function abrirLibroPrincipal(libro, cap = 1, verso = null) {
    const intro = document.querySelector('.intro-container');
    if (intro && intro.style.display !== 'none') {
        intro.style.display = 'none';
        const pantalla = document.getElementById('pantalla-estudio');
        pantalla.className = \`container-estudio theme-adolescentes is-active\`;
    }`;

const repl = `async function abrirLibroPrincipal(libro, cap = 1, verso = null) {
    const intro = document.querySelector('.intro-container');
    if (intro) intro.style.display = 'none';
    const st = document.getElementById('lb-santuario-layer');
    if (st) st.style.display = 'none';

    const pantalla = document.getElementById('pantalla-estudio');
    if (pantalla) pantalla.className = \`container-estudio theme-adolescentes is-active\`;`;

if (code.includes(target)) {
    code = code.replace(target, repl);
    fs.writeFileSync('data_motor.js', code, 'utf8');
    console.log("REEMPLAZO EXITOSO");
} else {
    // maybe different line endings
    const target2 = target.replace(/\r\n/g, '\n');
    if (code.replace(/\r\n/g, '\n').includes(target2)) {
        code = code.replace(/\r\n/g, '\n').replace(target2, repl);
        fs.writeFileSync('data_motor.js', code, 'utf8');
        console.log("REEMPLAZO EXITOSO (con ajuste \\n)");
    } else {
        console.log("NO SE ENCONTRO");
    }
}
