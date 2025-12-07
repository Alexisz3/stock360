const express = require('express');
const path = require('path');
const app = express();

// Asegúrate de que este nombre coincida con la carpeta dentro de 'dist'
const appName = 'stock360'; 

// Ruta a la carpeta compilada
const outputPath = path.join(__dirname, 'dist', appName, 'browser');

// 1. Servir archivos estáticos
app.use(express.static(outputPath));

// 2. Redirigir todas las peticiones al index.html
// Usamos Regex /.*/ para evitar el error de Railway
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(outputPath, 'index.html'));
});

// 3. Iniciar servidor
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor iniciado en puerto ${port}`);
});