import {WebSocket} from 'ws'
import { Game } from './Game';
import { INIT_GAME, MOVE } from './message';

export class GameManage {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket:WebSocket) {
        // add user in array
        this.users.push(socket);
        this.addHandler(socket);
    }
    
    removeUser(socket:WebSocket){
        // remove user
        this.users = this.users.filter(user => user !== socket);
        // stop the game because user left
    }

    private addHandler(socket: WebSocket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            // console.log(message);
            
            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    // start a game if any pending user exist then connect b/w
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else{
                    this.pendingUser = socket;
                }
            }

            if (message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 == socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        })
    }
} 
