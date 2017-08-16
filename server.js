var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
        'article-one': {
            title: 'Srini | Article One',
            heading: 'Article One',
            date: 'Aug 13, 2017',
            content: `
               <p>content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here.
               </p>
               <p>content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here.
               </p>
               <p>content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here.
               </p>`
        },
        'article-two': {
            title: 'Srini | Article Two',
            heading: 'Article Two',
            date: 'Aug 14, 2017',
            content: `
               <p>
               content for Article Two goes here.
               </p>`
           },
        'article-three': {
            title: 'Srini | Article Three',
            heading: 'Article Three',
            date: 'Aug 15, 2017',
            content: `
               <p>content for Article Three goes here.
               </p>`
        }
        };
function createArticleTemplate(data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var articleHtmlTemplate = `
        <html>
            <head>
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                    <div>
                        <a href="/">Home</a> 
                    </div>
                    <hr/>
                    <h3>${heading}</h3>
                    <div>${date}</div>
                    <div>
                         ${content}   
                    </div>
                </div>
            </body>
        </html>
        `;
        return articleHtmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
    // input is articleName = article-one
    //articles[article-one] = content for article one
  res.send(createArticleTemplate(articles[req.params.articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
