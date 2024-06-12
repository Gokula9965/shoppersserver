

const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { invoiceEmail } = require("./invoiceEmail");
const asyncHandler = require("express-async-handler");
const pdfInvoiceEmail = asyncHandler(async (req, res) => {
    const invoice = req?.body;
    const pdfPath = path.join(__dirname, "invoice.pdf");
    invoiceEmail(invoice, pdfPath);
    await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (fs.existsSync(pdfPath)) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shoppersindia6@gmail.com',
            pass: 'vvobkmpkqhryipcm'
        }
    });
  
    const mailOptions = {
        from: 'shoppersindia6@gmail.com',
        to: `${invoice?.emailId}`,
        subject: 'Your Invoice',
        text: 'Please find attached your invoice.',
        attachments: [
            {
                filename: 'invoice.pdf',
                path: pdfPath
            }
        ]
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send("EmailSent");
    });
});

module.exports = pdfInvoiceEmail;

