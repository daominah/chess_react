import React from 'react'
import * as csstype from 'csstype';

import * as reactDND from 'react-dnd'
import dNDBackendHTML5 from 'react-dnd-html5-backend'

import * as xq from './xiangqi_rule'


export class Board extends React.Component {
    state: {
        // map square index to piece code
        SparsePieces: Record<number, number>
    };

    constructor(props: any) {
        super(props);
        this.state = {SparsePieces: xq.DefaultBoard};
        this.makeMove = this.makeMove.bind(this);
    }

    makeMove(originSquare: number, targetSquare: number) {
        let movingPiece = this.state.SparsePieces[originSquare];
        let newState = this.state;
        newState.SparsePieces[targetSquare] = movingPiece;
        newState.SparsePieces[originSquare] = xq.EMPTY;
        this.setState(newState);
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
                        makeMove: this.makeMove,
                    }}
                    />
                )}
            </div>
        </reactDND.DndProvider>)
    }
}

export function Square(props: {
    index: number
    visibility: csstype.VisibilityProperty
    piece: number
    // function to update the board state
    makeMove: (originSquare: number, targetSquare: number) => void
}) {
    const [{isOver}, drop] = reactDND.useDrop({
        accept: DraggableTypes.PIECE,
        drop: (item, monitor) => {
            let draggedProps: PieceProps = monitor.getItem().props;
            props.makeMove(draggedProps.sqIdx, props.index);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    });
    return (
        <button ref={drop}
                style={{
                    visibility: props.visibility,
                    width: `${100 / xq.BoardWidth}%`,
                    height: `${100 / xq.BoardHeight}%`,
                    fontSize: 8, color: "teal",
                }}>
            {props.index}<Piece {...{piece: props.piece, sqIdx: props.index}}/>
        </button>)
}

export function Piece(props: PieceProps) {
    let [{isDragging}, drag] = reactDND.useDrag({
        item: {type: DraggableTypes.PIECE, props: props},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    let pieceSymbol = xq.PieceSymbols.get(props.piece);
    return (
        <span ref={drag}
              style={{
                  opacity: isDragging ? 0.5 : 1, cursor: 'move',
                  color: "black", zIndex: 1, fontSize: 25,
              }}>
            {pieceSymbol}
        </span>
    )
}

interface PieceProps {
    piece: number,
    // current square this piece belongs to
    sqIdx: number
}

export const DraggableTypes = {
    PIECE: 'PIECE',
};
