'use strict';

const Koa = require('koa');
const json = require('koa-json');
var redis = require('redis');
var client = redis.createClient(6379, 'redis'); //creates a new client
const app = new Koa();

client.on('connect', function() {
  console.log('connected');
});

client.set('framework', 'AngularJS');

app.use( (ctx) => {
  new Promise(function(resolve, reject) {
    client.get('framework', function(err, reply) {
      resolve(reply);
    });
  }).then((result) => {
    console.log("Success", result);
    ctx.body = {message: ""+result}
  }).catch((error) => {
      console.log("Error", error);
      ctx.body = {message: "Error"}
  });
});


app.use(json());

app.listen(3000);
