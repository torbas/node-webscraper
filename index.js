var request = require('request');
var cheerio = require('cheerio');

request('http://substack.net/images/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('tr').each(function(i, element){
      console.log($(this).text());
      // $(this).children('td').each(function(){
      //   cols = $(this).text().split('\n');
      //   console.log(cols);
        
      // });

    });
  }
});