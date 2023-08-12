const express = require('express');

//sercidor de express
const app = express();

//rutas
app.get('/', (req, res)=>{
res.json({
    ok: true,
    msg: 'Hola mundo'
})
});


app.listen(3000, () => {
    console.log('servidor4 corriendo en puerto 3000');
});