//express
import express from 'express';
const app = express();
//other imports
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import bodyParser from 'body-parser';
// import {
//     blinkDevice
// } from './index.js'

//listen port
let listenPort = 9999
//use public folder
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());

//handlers
app.get('/', (req,res) => {
    res.sendFile(__dirname+'/views/index.html')
})
app.post('/device', (req,res) => {
    console.log(req.body);
    // if (req.body.serial) {
    //     // await blinkDevice(req.body.serial);
    // }
})




app.listen(listenPort, () => {console.log(`app is running on ${listenPort}...`)});