const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Función para generar un retardo (delay)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Ruta de la carpeta donde se guardarán los PDFs
const pdfsDir = path.join(__dirname, 'pdfs');

// Verificamos si la carpeta 'pdfs' existe y, si no, la creamos
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir);
  console.log(`Carpeta creada: ${pdfsDir}`);
}

(async () => {
  // Lanzamos el navegador (headless: false para ver el proceso; en producción, puede ser true)
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Ingresamos a la URL indicada
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Definimos cuántas páginas (o estados) queremos imprimir
  const totalPaginas = 5; // Ajusta este valor según tus necesidades

  for (let i = 1; i <= totalPaginas; i++) {
    // Esperamos un tiempo para que la página se estabilice (ajusta el tiempo si es necesario)
    await delay(3100);

    // Generamos el PDF de la página actual, eliminando los márgenes (o ajustándolos)
    await page.pdf({
      path: path.join(pdfsDir, `pagina-${i}.pdf`),
      format: 'A4',
      printBackground: true,
      margin: {
        top: '5px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    });
    console.log(`Página ${i} guardada como PDF en la carpeta 'pdfs'.`);

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
