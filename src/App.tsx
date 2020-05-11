import React from 'react';
import './App.css';
import * as board from "./xiangqi/board";

function App() {
    return (
        <div className="App">
            <board.Board/>
        </div>
    );
}

export default App;
