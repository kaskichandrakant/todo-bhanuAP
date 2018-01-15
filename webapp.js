const toKeyValue = kv=>{
    let parts = kv.split('=');
    return {key:parts[0].trim(),value:parts[1].trim()};
};
const accumulate = (o,kv)=> {
  o[kv.key] = kv.value;
  return o;
};
const parseBody = text=> text && text.split('&').map(toKeyValue).reduce(accumulate,{}) || {};
let redirect = function(path){
  this.statusCode = 302;
  this.setHeader('location',path);
  this.end();
};
const parseCookies = text=> {
  try {
    return text && text.split(';').map(toKeyValue).reduce(accumulate,{}) || {};
  }catch(e){
    return {};
  }
}
let invoke = function(req,res){
  let handler = this._handlers[req.method][req.url];
  if(!handler){
    res.statusCode = 404;
    res.write('File not found!');
    res.end();
    return;
  }
  handler(req,res);
}
const initialize = function(){
  this._handlers = {GET:{},POST:{}};
  this._preprocess = [];
  this._postprocess = [];
};
const get = function(url,handler){
  this._handlers.GET[url] = handler;
}
const post = function(url,handler){
  this._handlers.POST[url] = handler;
};
const preProcess = function(handler){
  this._preprocess.push(handler);
};
const postProcess = function(handler){
  this._postprocess.push(handler);
}
let urlIsOneOf = function(urls){
  return urls.includes(this.url);
}
let handleProcess = function(req,res,processor){
  processor.forEach(middleware=>{
    if(res.finished) return;
    middleware(req,res);
  });
}
const main = function(req,res){
  // console.log(req.headers);
  res.redirect = redirect.bind(res);
  req.urlIsOneOf = urlIsOneOf.bind(req);
  req.cookies = parseCookies(req.headers.cookie||'');
  let content="";
  req.on('data',data=>content+=data.toString());
  req.on('end',()=>{
    req.body = parseBody(content);
    content="";
    debugger;
    handleProcess(req,res,this._preprocess);
    if(res.finished) return;
    invoke.call(this,req,res);
    if(res.finished) return;
    handleProcess(req,res,this._postprocess);
    if(res.finished) return;
  });
};

let create = ()=>{
  let rh = (req,res)=>{
    main.call(rh,req,res)
  };
  initialize.call(rh);
  rh.get = get;
  rh.post = post;
  rh.preProcess = preProcess;
  rh.postProcess = postProcess;
  return rh;
}
exports.create = create;
