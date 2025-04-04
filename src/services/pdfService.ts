import puppeteer from "puppeteer";

export async function generatePdfFromHtml(
  html: string,
  backgroundImage?: string
): Promise<Uint8Array> {
  // Permitir sobrescrever via variável de ambiente
  const executablePath = process.env.BROWSER_PATH as string;

  const backgroundStyle = backgroundImage
    ? `<style>
        body::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('${backgroundImage}') no-repeat center center;
          background-size: cover;
          opacity: 0.15;
          z-index: -1;
        }
      </style>`
    : "";

  const styledHtml = `
    <html>
      <head>${backgroundStyle}</head>
      <body>${html}</body>
    </html>
  `;

  const browser = await puppeteer.launch({
    executablePath,
  });

  const page = await browser.newPage();
  await page.setContent(styledHtml, {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "10mm", bottom: "10mm", left: "0mm", right: "0mm" },
    preferCSSPageSize: true,
  });

  await browser.close();
  return pdf;
}
