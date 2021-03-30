/**
 * Leer un archivo con Node.JS línea
 * por línea usando fs y readline
 * 
 * @author parzibyte
 */
const readline = require("readline"),
    fs = require("fs"),
    NOMBRE_ARCHIVO = "BTC/BTCUSDT_2020_3m_data.csv";

let lector = readline.createInterface({
    input: fs.createReadStream(NOMBRE_ARCHIVO)
});

var nl=0;
lector.on("line", linea => {
nl++;
    console.log(nl+" ", linea);
});
