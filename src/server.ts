import "dotenv/config";
import express from "express";
import pdfRoutes from "./routes/pdfRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use("/api", pdfRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
