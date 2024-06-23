"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManage = void 0;
const Game_1 = require("./Game");
const message_1 = require("./message");
class GameManage {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        // add user in array
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        // remove user
        this.users = this.users.filter(user => user !== socket);
        // stop the game because user left
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            // console.log(message);
            if (message.type === message_1.INIT_GAME) {
                if (this.pendingUser) {
                    // start a game if any pending user exist then connect b/w
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === message_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 == socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManage = GameManage;
