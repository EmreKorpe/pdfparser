const express = require('express');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
    res.send('Api Running');
})

app.post('/upload-pdf', upload.single('pdf'), async (req, res) => {
    try {
        const pdfBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(pdfBuffer);
        res.json({ text: data.text });
    } catch (error) {
        res.status(500).json({ error: 'Error processing PDF' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
