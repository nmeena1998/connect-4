const fs = require('fs');
const path = require('path');
const dataFile = path.join(__dirname, "..", "model","jsonData.json");

exports.playgame = (token, column) => {    
    const gamedata = JSON.parse(fs.readFileSync('./model/jsonData.json'));
    const game = gamedata[token];
    let row;   
        for(let i = 5; i >= 0; i--)
         { if(game["gameRecord"][i][column-1] == 0) { 
             row = i;            
             break; 
            }  
        }    
    
        if(game["current_color"]=="yellow") game["current_color"]="red"
        else game["current_color"]="yellow"

        game["gameRecord"][row][column-1] = game["current_color"]=="yellow" ? "yellow" : "red";
        if(game["current_color"]=="yellow") game["movesArrayYellow"].push(column);   
        else game["movesArrayRed"].push(column);  
        
      
  
        var win = checkWin(game["gameRecord"], row, column-1);    
         if(win) {game["winner_color"] = game["current_color"]=="red" ? "RED" : "YELLOW";    
         game["status"] = false;    
         }    
        fs.writeFileSync(dataFile, JSON.stringify(gamedata));    
        return win ? game["winner_color"] + "Win" : "Next turn";

    }


function checkWin(gameRecord, row, col) {
    let connectCount = 1;

    for(let i = row-7, j = col-7; i < 6 && j < 7; i++, j++) {
        if(i > 0 && j > 0) {
        if(gameRecord[i][j] == gameRecord[i-1][j-1] && gameRecord[i][j] != 0) connectCount++;
         else connectCount = 1;
         if(connectCount == 4) return true;
        }
    }
  
    connectCount = 1
  
   for(let i = row+7, j = col+7; i > 0 && j > 0; i--, j--) {
         if(i < 6 && j < 7) {
         if(gameRecord[i][j] == gameRecord[i-1][j-1] && gameRecord[i][j] != 0) connectCount++; 
          else connectCount = 1;
          if(connectCount == 4) return true;
        }
    }

    connectCount = 1 
 
   for(let j = 1; j < 7; j++) {
       if(gameRecord[row][j] == gameRecord[row][j-1] && gameRecord[row][j] != 0) connectCount++;
       else connectCount = 1;
       if(connectCount == 4) return true;
    }
 
    connectCount = 1;

   for(let i = 1; i < 6; i++) {
       if(gameRecord[i][col] == gameRecord[i-1][col] && gameRecord[i][col] != 0) connectCount++;
       else connectCount = 1;
       if(connectCount == 4) return true;
    }

    return false;
}



