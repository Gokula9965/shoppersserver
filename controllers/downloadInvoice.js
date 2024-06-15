const createInvoice=require("./createInvoice")
const downLoadInvoice = async (req, res) => {
    try {
      const invoice = req?.body;
      console.log(invoice);
      const pdfData = await createInvoice(invoice);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
      res.send(pdfData);
    } catch (error) {
      res.status(500).send("Error generating invoice");
    }
  };
  
  module.exports = downLoadInvoice;