import express from "express";
import { convertHtmlToPdf } from "../controllers/pdfController";

const router = express.Router();

router.post("/html-to-pdf", convertHtmlToPdf);

export default router;