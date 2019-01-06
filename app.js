var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();

//APP CONFIG
mongoose.connect("mongodb://localhost/thezalophusblog")    
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);

//ROUTES

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});








app.listen(1234, process.env.IP, function(){
    console.log("Your application is running http://localhost:1234/");
});