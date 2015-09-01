var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var csvArr = [
  ["Permissions", "Absolute Url", "File Type"]
];

request('http://substack.net/images/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('tr').each(function(i, element){
      var tds = $(element).children("td");

      var size = $(tds.get(1)).text();
      var file = $(tds.get(2)).text();

      if (size.length > 0) {
        var file = $(tds.get(2)).text();
        var ext = file.split('.')[1];
        if(ext){
          var permissions = $(tds.get(0)).text();
          var fileUrl = "http://substack.net/" + $(tds.get(2)).children('a').attr('href');
          var rowArr = [permissions, fileUrl, ext];
          csvArr.push(rowArr);
        }
      };

    });

    var file = fs.createWriteStream('substack_images.csv');
    file.on('error', function(err) { console.log(err) });
    csvArr.forEach(function(row) { 
      line = row.join(',')+ '\n';
      console.log(line);
      file.write(line); 
    });
    file.end();

  }
});