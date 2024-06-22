"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = "";
        this.moves = [];
        this.startTime = new Date();
    }
    makeMove(socket, move) {
        // validation hear
        // is it this move hear
        // is the move is valid
        // update board
        // push move
        // check if the game is over
        // send updated board both player
    }
}
exports.Game = Game;
