var express = require("express");
var router = express();
var path = require("path");
router.use(express.static("public"));
var mysql = require("mysql");


var server = require("http").Server(router);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000)

// var bordyParser = require("body-parser");
// var urlencodeParser = bodyParser.urlencoded({extend:false});
//socket.io

io.on("connection", function(socket){
  // res.send({hoten:"nguyen van teo"});
  console.log("da co nguoi connect" + socket.id);
})


//connect mysql

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"",
  database:"DoAnA"
});

connection.connect(function(error){
  if(error){
    console.log("error abc");
  }else {
    console.log("connected");
  }
})

//api
router.get("/books",function(req,res) {
  connection.query("SELECT tensach,hinhsach,noidung,tacgia FROM sachkinh",function(error,rows,fields){

    if(error){
      console.log("Error query");

    }else {
      console.log("SUCESS!");
      console.log(rows);
      res.send(rows);
    }
  })
})

router.get("/login",function(req,res){
  connection.query("SELECT email,password FROM user",function(error,rows,fields){
    if (error) {
      console.log("Error query");
    }else {
      console.log("SUCCESS!");
      console.log(rows);
      res.send(rows);
    }
  })
})


router.get("/file",function(req,res){
  connection.query("SELECT ten,tenhinh FROM pokemon",function(error,rows,fields){
    if(error){
      console.log("Error query");
    }else {
      console.log("SUCESS!");
      res.send(rows);
    }
  })
})
