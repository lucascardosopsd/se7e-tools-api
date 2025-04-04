import { Request, Response } from "express";
import { generatePdfFromHtml } from "../services/pdfService";

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9-_\.]/g, "_")
    .replace(/\.+$/, "")
    .slice(0, 100);
}

export async function convertHtmlToPdf(req: Request, res: Response) {
  try {
    const { html, filename, backgroundImage } = req.body;

    if (!html || !filename) {
      return res
        .status(400)
        .json({ error: "HTML content and filename are required" });
    }

    const pdfBuffer = await generatePdfFromHtml(html, backgroundImage);
    const safeFilename = sanitizeFilename(filename);

    // const filePath = path.resolve(
    //   __dirname,
    //   "../",
    //   "pdfs",
    //   `${safeFilename}.pdf`
    // );

    // await writeFile(filePath, pdfBuffer);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFilename}.pdf"`
    );
    res.end(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}
