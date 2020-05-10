import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as board from "./xiangqi/board";

function App() {
    return (
        <div className="App">
            <board.Board {...{width: 13, height: 14}} >
            </board.Board>
        </div>
    );
}

export default App;
