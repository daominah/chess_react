import React from 'react';
import './App.css';
import * as board from "./xiangqi/board";

function App() {
    return (
        <div className="App">
            <div className="pageCol0"></div>
            <div className="pageCol1"></div>
            <div className="pageCol2">
                <board.Board/>
            </div>
            <div className="pageCol3"></div>
        </div>
    );
}

export default App;
