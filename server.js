const express = require('express');
const path = require('path');
const app = express();
const appName = 'stock360';
const outputPath = path.join(__dirname, 'dist', appName, 'browser');

app.use(express.static(outputPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(outputPath, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor iniciado en puerto ${port}`);
});