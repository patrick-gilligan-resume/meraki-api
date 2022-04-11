//express
import express from 'express';
const app = express();
//other imports
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//listen port
let listenPort = 9999
//use public folder
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/views/index.html')
})

app.use('/public', express.static(__dirname + '/public'));

app.post('/device', (req,res) => {
    
})




app.listen(listenPort, () => {console.log(`app is running on ${listenPort}...`)});