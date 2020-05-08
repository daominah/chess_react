import React from 'react'

export class Piece extends React.Component <PieceProps> {
    render() {
        return (<span style={{color: "black", zIndex: 1, fontSize: 16}}>
            {this.props.piece}
        </span>)
    }
}

interface PieceProps {
    piece: string
}

export class Square extends React.Component <SquareProps> {
    state: SquareState;

    constructor(props: SquareProps) {
        super(props);
        this.state = {piece: ""}
    }

    render() {
        return (<button style={{
            width: `${100 / BoardWidth}%`,
            height: `${100 / BoardHeight}%`,
            fontSize: 8,
        }}>
            {this.props.index}<Piece piece={this.state.piece}/>
        </button>)
    }
}

interface SquareProps {
    index: number
}

interface SquareState {
    piece: string
}

export class Board extends React.Component {
    state: BoardState;

    constructor(props: any) {
        super(props);
        this.state = {
            SparsePieces: {},
        }
    }

    render() {
        let squareIndices = [];
        for (let y = BoardHeight - 1; y >= 0; y--) {
            for (let x = 0; x < BoardWidth; x++) {
                squareIndices.push(y * BoardWidth + x)
            }
        }
        return (<div style={{
            width: BoardWidth * SquareWidthPx,
            height: BoardHeight * SquareHeightPx,
        }}>
            {squareIndices.map((si) =>
                <Square index={si}/>
            )}
        </div>)
    }
}

const BoardWidth = 13;
const BoardHeight = 14;
const SquareWidthPx = 60;
const SquareHeightPx = 54;

interface BoardState {
    SparsePieces: Record<number, string> // map square index to piece
}

const PieceEnum = {
    PAWN: "P", pawn: "p",
    ADVISER: "A", adviser: "a",
    ELEPHANT: "B", elephant: "b", // Bishop
    HORSE: "N", horse: "n",// kNight
    CANNON: "C", cannon: "c",
    CHARIOT: "R", chariot: "r", // Rook
    KING: "K", king: "k",
    EMPTY: ".", OFFBOARD: "+",
    UNSEEN: "U", unseen: "u", // only for Jeiqi
    default: "",
};