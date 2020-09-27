var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const newGame = require("./model/connect4");
const dataFile = path.join(__dirname, ".", "model","jsonData.json");

const connect4Controller = require("./controller/connect4");
const app = express();

app.use(bodyParser.json());

app.post("/column", (req, res, next) => {
    const column = req.body.column;
    const token = req.body.token;
    const gamedata = JSON.parse(fs.readFileSync('./model/jsonData.json'));
  

    if (!token || !gamedata[token] || !gamedata[token]["status"] ) {
        return res.json("TOKEN NOT VALID");
    }
   
    const checkColumn=(token, column) => {    
        return gamedata[token]["gameRecord"][0][column-1] != 0;
    }

    if(column < 1 || column > 7 || checkColumn(token, column) ) {
        return res.json("Invalid move.")
    }

    let response=connect4Controller.playgame(token,column);

    return res.json(response)
   
});


app.get("/start", (req, res, next) => {

    const tokenVal = Date.now();
    const gamerecord = JSON.parse(fs.readFileSync('./model/jsonData.json'));
    gamerecord[tokenVal] = new newGame();

    fs.writeFile(dataFile, JSON.stringify(gamerecord), (err) => {
        if(!err) return res.json(tokenVal)

    });
  
});


app.listen(3030);
    
    