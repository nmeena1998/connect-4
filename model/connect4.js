
class connect4Class {
  
    constructor(){
        this.gameRecord = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
        this.current_color = "red";
        this.movesArrayRed = [];
        this.movesArrayYellow = [];
        this.status = true;
        this.result = null;
        this.winner_color = null;
    }
    
}
module.exports = connect4Class;

