const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Función para generar un retardo (delay)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Función para sanitizar el nombre del archivo (eliminando caracteres no permitidos)
// Se seguirá utilizando para el nombre del PDF extraído del <p> en .titulo_name
const sanitizeFilename = filename => {
  return filename.replace(/[\/\\?%*:|"<>]/g, '').trim() || 'Texto_no_encontrado';
};

// Ruta de la carpeta donde se guardarán los PDFs
const pdfsDir = path.join(__dirname, 'pdfs');

// Verificamos si la carpeta 'pdfs' existe y, si no, la creamos
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir);
  console.log(`Carpeta creada: ${pdfsDir}`);
}

(async () => {
  // Lanzamos el navegador (headless: false para ver el proceso; en producción, puede ser true)
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Ingresamos a la URL indicada
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Definimos cuántas páginas (o estados) queremos imprimir
  const totalPaginas = 36; // Ajusta este valor según tus necesidades

  for (let i = 1; i <= totalPaginas; i++) {
    // Esperamos un tiempo para que la página se estabilice (ajusta el tiempo si es necesario)
    await delay(2100);

    // Extraemos el src del logo ubicado en el <nav className="navbar">
    const logoSrc = await page.evaluate(() => {
      const logoImg = document.querySelector('nav.navbar .logo-container img');
      return logoImg ? logoImg.getAttribute('src') : null;
    });

    // Procesamos el src para extraer el nombre de la imagen (sin extensión) y lo decodificamos
    let logoName = 'default';
    if (logoSrc) {
      try {
        // Si el src es relativo, usamos la URL base 'http://localhost:3000/'
        const urlObj = new URL(logoSrc, 'http://localhost:3000/');
        // Extraemos el nombre del archivo sin la extensión .png y lo decodificamos
        logoName = decodeURIComponent(path.basename(urlObj.pathname, '.png'));
      } catch (e) {
        console.error('Error procesando logoSrc:', e);
        logoName = 'default';
      }
    }

    // Creamos la subcarpeta para este logo si no existe (usando el nombre sin sanitizar)
    const logoFolder = path.join(pdfsDir, logoName);
    if (!fs.existsSync(logoFolder)) {
      fs.mkdirSync(logoFolder);
      console.log(`Subcarpeta creada: ${logoFolder}`);
    }

    // Extraemos el texto contenido en el <p> dentro del <div className='titulo_name'>
    const rawTitle = await page.evaluate(() => {
      const pElem = document.querySelector('.titulo_name p');
      return pElem ? pElem.innerText : 'Texto no encontrado';
    });
    // Sanitizamos el título para el nombre del archivo PDF
    const sanitizedTitle = sanitizeFilename(rawTitle);

    // Definimos la ruta completa donde se guardará el PDF
    const filePath = path.join(logoFolder, `${sanitizedTitle}.pdf`);

    // Generamos el PDF de la página actual, con fondo y márgenes ajustados
    await page.pdf({
      path: filePath,
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '10px',
        right: '0px',
        bottom: '10px',
        left: '0px'
      }
    });
    console.log(`Página ${i} guardada como PDF en: ${filePath}`);

    // Si no es la última página, simulamos presionar la flecha derecha para avanzar
    if (i < totalPaginas) {
      await page.keyboard.press('ArrowRight');
      console.log('Avanzando a la siguiente página...');
      // Esperamos un poco para que la transición se complete
      await delay(1000);
    }
  }

  // Cerramos el navegador
  await browser.close();
})();
