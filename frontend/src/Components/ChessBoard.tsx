import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const ChessBoard = ({board, socket, chess, setBoard}: { 
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
    chess: any;
    setBoard: any;
}) => {


    const [from, setFrom] = useState<null | Square>(null);
    const [to, setTo] = useState<null | Square>(null);

    return (<>
        <div className="tex-white-200">

            {
                board.map((row, i) => {
                    return <div key={i} className="flex">
                        {
                            row.map((square, j) => {
                                return <div onClick={() => {
                                    const squareRepresentation = String.fromCharCode(97 + (j%8)) + "" + (8-i)  as Square

                                    if (!from) {
                                        setFrom(squareRepresentation);
                                    }
                                    else{
                                        setTo(square?.square ?? null);
                                        socket.send(JSON.stringify({
                                            type: "move",
                                            payload: {
                                                move: {
                                                    from,
                                                    to: squareRepresentation
                                                }
                                            }
                                        }))
                                        chess.move({
                                            from,
                                            to: squareRepresentation
                                        });
                                        setBoard(chess.board())
                                        setFrom(null)
                                    }

                                }} key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-green-500' : 'bg-green-300'}`} >
                                    <div className="w-full justify-center flex h-full">
                                        <div className="h-full justify-center flex flex-col">
                                            {
                                                square ? 
                                                <img className="w-9" src={`/${square?.color === "w" ? `${square?.type?.toUpperCase()}Copy` : `${square?.type?.toUpperCase()}`}.svg`} />
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    </>)
}