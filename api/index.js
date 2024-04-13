const express = require("express");
const app = express();
const path = require('path'); // Módulo para trabajar con rutas de archivos
const fs = require('fs'); // Módulo para trabajar con los archivos en sí.

//Configuración para correr en Vercel
const PORT = process.env.PORT;

app.get('/json', async (req, res) => {
    const pathArchivoJSON = path.join(__dirname,'datos.json');
    try {
     
      fs.readFile(pathArchivoJSON, 'utf8', (err, data) => {
        if (err) {
          console.error("Error al leer el archivo JSON:", err);
          return res.status(500).json({ error: "Error interno del servidor" });
        }
        
        // Convertir los datos a objeto JSON
        const datosJSON = JSON.parse(data);
        
        // Enviar el JSON como respuesta
        res.json(datosJSON);
      });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });


app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
app.use(express.static('api'));
app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));

module.exports = app;