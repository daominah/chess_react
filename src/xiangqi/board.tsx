import React from 'react'
import * as csstype from 'csstype';

import * as reactDND from 'react-dnd'
import dNDBackendHTML5 from 'react-dnd-html5-backend'

import * as xq from './xiangqi_rule'


export class Board extends React.Component {
    state: BoardState;

    constructor(props: any) {
        super(props);
        this.state = {SparsePieces: xq.DefaultBoard};
        this.makeMove = this.makeMove.bind(this);
    }

    makeMove(originSquare: number, targetSquare: number) {
        let movingPiece = this.state.SparsePieces[originSquare];
        this.state.SparsePieces[targetSquare] = movingPiece;
        this.state.SparsePieces[originSquare] = xq.EMPTY;
    }

    render() {
        return (<reactDND.DndProvider backend={dNDBackendHTML5}>
            <div style={{
                width: xq.BoardWidth * 60,
                height: xq.BoardHeight * 54,
            }}>
                {xq.SquareIndices.map((sqIdx) =>
                    <Square key={sqIdx} {...{
                        index: sqIdx,
                        visibility: xq.OffBoards[sqIdx],
                        piece: this.state.SparsePieces[sqIdx],
                        MakeMove: this.makeMove,
                    }}
                    />
                )}
            </div>
        </reactDND.DndProvider>)
    }
}

interface BoardState {
    // map square index to piece code
    SparsePieces: Record<number, number>
}

export function Square(props: SquareProps) {
    const [{isOver}, drop] = reactDND.useDrop({
        accept: DraggableTypes.PIECE,
        drop: () => props.MakeMove(0, props.index),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });
    return (<button style={{
        visibility: props.visibility,
        width: `${100 / xq.BoardWidth}%`,
        height: `${100 / xq.BoardHeight}%`,
        fontSize: 8, color: "teal",
    }}>
        {props.index}<Piece piece={props.piece}/>
    </button>)
}

interface SquareProps {
    index: number
    visibility: csstype.VisibilityProperty
    piece: number
    MakeMove: (originSquare: number, targetSquare: number) => void
}

export function Piece(props: PieceProps) {
    let [{isDragging}, drag] = reactDND.useDrag({
        item: {type: DraggableTypes.PIECE},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    let pieceSymbol = xq.PieceSymbols.get(props.piece);
    return (
        <span
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1, cursor: 'move',
                color: "black", zIndex: 1, fontSize: 25,
            }}
        >
            {pieceSymbol}
        </span>
    )
}

interface PieceProps {
    piece: number
}


export const DraggableTypes = {
    PIECE: 'PIECE',
};
