// ws, express, 
import { WebSocketServer } from 'ws'
import { GameManage } from './GameManager';

const wss = new WebSocketServer({port:8080});

const gameManager = new GameManage();

wss.on("connection", function connection (ws){
    gameManager.addUser(ws);
    ws.on('close', () => gameManager.removeUser(ws));
})