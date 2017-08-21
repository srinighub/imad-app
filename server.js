var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});
var articles = {
        'article-one': {
            articlekey: 'article-one',
            title: 'Srini | Article One',
            heading: 'Article One',
            date: 'Aug 13, 2017',
            content: `
               <p>content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here.
               </p>
               <p>content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here.
               </p>
               <p>content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here. content for Article one goes here.
               </p>`,
             comments: '<li>Test Comment for article one</li>'
        },
        'article-two': {
            articlekey: 'article-two',
            title: 'Srini | Article Two',
            heading: 'Article Two',
            date: 'Aug 14, 2017',
            content: `
               <p>
               content for Article Two goes here.
               </p>`,
            comments: '<li>Test Comment for article two</li>'
           },
        'article-three': {
            articlekey: 'article-three',
            title: 'Srini | Article Three',
            heading: 'Article Three',
            date: 'Aug 15, 2017',
            content: `
               <p>content for Article Three goes here.
               </p>`,
            comments: '<li>Test Comment for article three</li>'
        }
        };
function createArticleTemplate(data) {
    var articlekey = data.articlekey;
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var comments = data.comments;
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
                    <div class="footer">
                        <hr/>
                        <h3>Provide your comments below:</h3>
                        <textarea id="articleComment" name="articleComment"></textarea>
                        <input type="hidden" value="${articlekey}"" id="articleName"/>
                        <input type="submit" value="Submit" id="submit_cmnt"/>
                        <hr/>
                        <h3>Comments</h3>
                        <ul id="commentList">
                            ${comments}
                        </ul>
                    </div>
                    
                </div>
                 <script type="text/javascript" src="/ui/main.js">
                 </script>
            </body>
        </html>
        `;
        return articleHtmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article/:articleName', function (req, res) {
    // input is articleName = article-one
    //articles[article-one] = content for article one
  res.send(createArticleTemplate(articles[req.params.articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/lion.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'lion.jpg'));
});

//GET 'Name', add to the list and push the list back as JSON
var names = [];
app.get('/submit-name', function (req, res) { //Send 'name' as query parameter in the URL ?name=sdfsdf
    var name = req.query.name;
    names.push(name);
    //JSON Javascript Object Notation
    res.send(JSON.stringify(names));
});

//Article Comments

app.get('/articles/:articleName/submit-comment', function (req, res) { //Send 'articlename' and 'comment' as query parameter in the URL ?comment=sdfsdf
    var articlename = req.params.articlename;
    var comment = '<li>' + req.query.comment + '</li>';
    var articleObj = articles[articlename];
    var commentList = articleObj.comments + comment;
   //articles[articlename].comments = commentList;
    //JSON Javascript Object Notation
    //res.send(commentList.tostring());
    res.send(commentList);

});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
