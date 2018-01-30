const http = require('http');
const app = require('./app.js');
let PORT=8000;

let server=http.createServer(app);
server.listen(PORT,()=>{
  console.log(`listening at ${PORT}`);
})
