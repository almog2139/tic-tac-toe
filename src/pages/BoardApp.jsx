
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { utilService } from '../services/utilService';

export const Board = () => {
    const [board, setBoard] = useState([])
    const [player, setCurrPlayer] = useState('🧁')
    const [winner, setWinner] = useState('')
    const [gameOn, setGameOn] = useState(true)
    const player1 = '🧁'
    const player2 = '🍩'



    const buildBoard = () => {

        let board = [];
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i][j] = '';
            }
        }
        setBoard(board)
        setGameOn(true)
        setWinner('')
    }

    const classNameTd = (idx, index) => {
        if (idx % 2 === 0 && index === 1) return 'hori';
        if (idx % 2 === 1 && index === 1) return 'vert hori';
        if (index % 2 === 0 && idx === 1) return 'vert';
    }

    const onClickCell = (ev, i, j) => {
        if (!gameOn) return
        ev.stopPropagation();
        let copyBoard = [...board]
        if (copyBoard[i][j] !== '') return
        copyBoard[i][j] = player

        const isPlayerWin = checkWinBoardDiagonal(player, i, j) || checkWinRowColumn(player, i, j)
        
        if (isPlayerWin) {
            setWinner(player)
            setGameOn(false)
        }

        if (player === player1) setCurrPlayer(player2)
        else setCurrPlayer(player1)
        setBoard(copyBoard)
        console.log('board', board);
    }

    const checkWinRowColumn = (player, cellI, cellJ) => {
        let countC=0;
        let countR=0;
        for (var i = 0; i < 3; i++) {

            if (board[i][cellJ] === player) countR++;
        }

        for (var j = 0; j < 3; j++) {
            if (board[cellI][j] === player) countC++;

        }
        return countC === 3 || countR === 3
    
    }
    const checkWinBoardDiagonal = (player, i, j) => {
        let countPrimaryDialog = 0
        let countSecodaryDialog = 0
        for (let i = 0; i < board.length; i++) {
            if (board[i][i] === player) countPrimaryDialog++;
            if (board[i][board.length - 1] === player) countSecodaryDialog++
        }
         return countSecodaryDialog === 3 || countPrimaryDialog === 3
      
    }

    useEffect(() => {
        buildBoard()
    }, [])


    if (!board) return <h1>Loading...</h1>
    const nextPlayer = (player === player1) ? 'Next Plyer is :🍩' : 'Next Plyer is :🧁'
    console.log('board', board);
    return (

        <div className="board">
            <h1>curr player: {player}</h1>
            <h1>{nextPlayer}</h1>
            <table>
                <tbody>
                    {board.map((cellI, i) => {
                        return <tr key={i}>
                            {board[0].map((cellJ, j) => {
                                console.log('board[i][j]', board[i][j]);
                                return <td onClick={(ev) => onClickCell(ev, i, j)} className={classNameTd(j, i)} key={utilService.makeId()}>{board[i][j]}</td>
                            })}
                        </tr>
                    })}

                </tbody>
            </table>
            {winner && <p>{winner} IS WIN!</p>}
            <button className="cta-btn" onClick={() => buildBoard()}>Rest Game</button>
        </div>
    )
}
