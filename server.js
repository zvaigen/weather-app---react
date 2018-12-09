const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');




express()
    .use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    }).use(bodyParser.json())
//   .use(express.static(path.join(__dirname, 'build')))
  .set('/static', path.join(__dirname, 'build/static'))
  .get('/', (req, res) => res.render('build/index'))
  .post('/weather',  function (req, res) {
    res.setHeader('Content-Type', 'application/json');
      let myCity= req.body["city"];
      let weather = null;
      if(myCity){
        request(`https://www.timeanddate.com/weather/?query=${myCity}`,(error,response,html)=>{
          if(!error && response.statusCode ===200){
            const $ = cheerio.load(html);
            var sss = $('.zebra');
            let city = sss.children('tbody').find('tr td').eq(0).text();
            let date = sss.children('tbody').find('tr td').eq(1).text();
            let temperature = sss.children('tbody').find(' tr td').eq(3).text();
            let myimg = sss.children('tbody').find('img').attr('src');
            let img= 'http:'+ myimg;
            weather= {
              city,img,date,temperature
            }
            console.log('temperature',weather);
            if(weather.city && weather.temperature){
              res.send(JSON.stringify({'status': 'approved',weather:weather}))
            }else {
              res.send(401,JSON.stringify({'status': 'ERROR'}))
            }
          }
        });
      }else {
        res.send(401,JSON.stringify({'status': 'CITY NULL'}))
      }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));