const PDFDocument = require("pdfkit");

router.get("/invoice/:id", async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  doc.fontSize(20).text("SmartCare Hospital Invoice");
  doc.text(`Amount: ₹${payment.amount}`);
  doc.text(`Payment ID: ${payment.paymentId}`);

  doc.end();
});
