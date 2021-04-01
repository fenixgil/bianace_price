const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
var moment = require('moment');


//const event = new Date('05 October 2011 14:48 UTC');

//var a=moment('02/01/2017, 10:09:43', "DD-MM-YYYY HH:mm:ss").format();
//a=new Date(a);
// expected output: 2011-10-05T14:48:00.000Z



// let url = "mongodb://username:password@localhost:27017/";

var carpeta='ETHBTC';
var par="ETHBTC";
var year='2020';  //falta
var tiempo='3m';
var archivo=carpeta+'/'+par+'_'+year+'_'+tiempo+'_data.csv';


let url = "mongodb://localhost:27017/";
let stream = fs.createReadStream(archivo);
let csvData = [];
let csvStream = fastcsv

  .parse()
  .on("data", function(data) {		//Date	Open	High	Low	Close	Volume	QuoteVolume
  
	
	var f=moment(data[0], "DD-MM-YYYY HH:mm:ss").format();
    var ffin=new Date(f);
  
    csvData.push({
      Date: ffin,
      Open: data[1],
      High: data[2],
      Low: data[3],
	  Close: data[4],
	  Volumen: data[5],
	  QuoteVolume: data[6],
	  
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("cripto")
          .collection(par+tiempo)
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);
console.log(year);
