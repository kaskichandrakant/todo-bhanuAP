const timeStamp = require('../time.js').timeStamp;
const fs=require('fs');
let toS = o=>JSON.stringify(o,null,2);
let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}

const getContentType = function(fileName) {
  let extension = fileName.substr((fileName.lastIndexOf('.') + 1));
  let contentTypes = {
    'html': 'text/html',
    'txt': 'text/plain',
    'css': 'text/css',
    'gif': 'image/gif',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'ico': 'image/ico',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'js': 'application/javascript'
  }
  return contentTypes[extension];
}

exports.toS=toS;
exports.logRequest=logRequest;
exports.getContentType=getContentType;
