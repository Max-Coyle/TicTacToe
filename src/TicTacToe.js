import React, { useState } from 'react';
import './TicTacToe.css';

export default function TicTacToe() 
{    
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i) {        
        const squaresCopy = squares.slice();
        if (CalculateWinner() || squares[i]) {
            return;
          }
        squaresCopy[i] = xIsNext ? 'X' : 'O';        
        setSquares(squaresCopy);
        setXIsNext(!xIsNext);
    }

    function CalculateWinner() {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        for (let line of lines) {
            const [a, b, c] = line;            

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {                
                return squares[a];
            }
        }
        
        return null;
      }

    function Square(props)  {      
        
        return (
            <button className="square"  onClick={props.onClick}>
                { props.value }
            </button>
        );
    }

    function renderSquare(i) {
        return  <Square 
                    value = { squares[i] }  
                    onClick={() => handleClick(i)} 
                />;
    }
    
    function Board() {
        const winner = CalculateWinner();
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (xIsNext ? 'X' : 'O');
        }

        return (
        <div>
            <div className="status">
                {status}
            </div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
        );
    }

    return (
        <div className="game">
            <div className="game-board">
            <Board />
            </div>
            <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}