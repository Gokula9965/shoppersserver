const express = require("express");
const pdfInvoiceEmail = require("../controllers/pdfInvoice");
const downLoadInvoice = require("../controllers/downloadInvoice");
const pdfRouter = express.Router();

pdfRouter.post('/pdfEmail', pdfInvoiceEmail);

pdfRouter.post('/pdf-invoice',downLoadInvoice);

module.exports = pdfRouter;