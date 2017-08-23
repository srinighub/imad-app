var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
    user: 'srinikrishnamoorthy',
    database: 'srinikrishnamoorthy',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
var pool = new Pool(config);

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
                    <div>${date.toDateString()}</div>
                    <div>
                         ${content}   
                    </div>
                    <div class="footer">
                        <hr/>
                        <h3>Provide your comments below:</h3>
                        <input type="text" id="name" placeholder="Enter your Name"/>
                        <textarea rows="4" cols="100" id="articleComment" name="articleComment" placeholder="Enter your comment here"></textarea>
                        <input type="hidden" value="${articlekey}" id="articleName"/>
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

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

function hash (input, salt){
    var hashed = crypto.pbkdf2Sync('secret', 'salt', 100000, 512, 'sha512');
    return hashed.toString(hex);
}

app.get ('/hash/:input', function (req,res) {
    var hashedString = hash(req.param.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.get('/test-db', function (req, res) {
  pool.query('select * from article', function(err,result){
      if (err){
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
  } );
});


app.get('/articles/:articleName', function (req, res) {
    // input is articleName = article-one
    //articles[article-one] = content for article one
    var articleName = req.params.articleName;
    pool.query("SELECT id, title, heading, date, content from article where title = $1", [req.params.articleName], function(err,result){
        if (err){
            res.status(500).send(err.toString());
        } else {
          if (result.rows.length === 0){
              res.status(404).send('Article Not Found');
          } else {
                var articleData = result.rows[0];
                res.send(createArticleTemplate(articleData));
          }
        }
    })
   
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
    var articlename = req.params.articleName;
    var comment = '<li><b>' + req.query.name + '</b> (' + Date().toString()  + ')' + '<br>' + req.query.comment + '</li>';

/*    var articleObj = articles[articlename];
       var keys = [];
       keys.push(articlename);
       keys.push(comment);
       for(var key in articleObj){
          keys.push(key);
       }
      //JSON Javascript Object Notation
    res.send(JSON.stringify(keys));
*/
   
    var commentList = articles[articlename].comments + comment;
    articles[articlename].comments = commentList;
    res.send(commentList.toString());

});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
