const PDFDocument = require("pdfkit");
const fs = require("fs");
function invoiceEmail(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Shoppers Inc.", 110, 57)
    .fontSize(10)
    .text("Shoppers Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("Civil Aerodrome Post,Coimbatore,India", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice?.invoice_number, 150, customerInformationTop)
    .font("Helvetica")
    .text("OrderId:", 50, customerInformationTop + 15)
    .text(invoice?.orderId, 150, customerInformationTop + 15)
    .text("Invoice Date:", 50, customerInformationTop + 30)
    .text(formatDate(new Date()), 150, customerInformationTop + 30)
    .text("Total Amount:", 50, customerInformationTop + 45)
    .text(
      formatCurrency(invoice?.totalAmount),
      150,
      customerInformationTop + 45
    )
    .font("Helvetica-Bold")
    .text(invoice?.shipping?.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice?.shipping?.address, 300, customerInformationTop + 15)
    .text(
      invoice?.shipping?.city +
        ", " +
        invoice?.shipping?.state +
        ", " +
        invoice?.shipping?.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 254);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice?.items?.length; i++) {
    const item = invoice?.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item?.title,
      formatCurrency(item?.price * 84),
      item?.quantity,
      formatCurrency(item?.price * 84 * item?.quantity)
    );

    generateHr(doc, position + 20);
  }
 const subtotal=invoice?.totalAmount - invoice?.tax
  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "Subtotal",
    "",
    formatCurrency(subtotal)
  );

  const taxPosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    taxPosition,
    "",
    "Tax",
    "",
    formatCurrency(invoice?.tax)
  );

  const totalPosition = taxPosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    totalPosition,
    "",
    "Total",
    "",
    formatCurrency(invoice?.totalAmount)
  );

  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text("Thank you for your business.", 50, 780, {
      align: "center",
      width: 500,
    });
}

function generateTableRow(doc, y, item, unitCost, quantity, lineTotal) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(price) {
  return "Rs." + price.toLocaleString("en-IN");
}

function formatDate(date) {
  const day = date?.getDate();
  const month = date?.getMonth() + 1;
  const year = date?.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  invoiceEmail,
};
