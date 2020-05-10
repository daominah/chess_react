import React from 'react'
import * as csstype from 'csstype';

import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import * as xq from './xiangqi_rule'

export class Piece extends React.Component <PieceProps> {
    render() {
        let pieceSymbol = xq.PieceSymbols.get(this.props.piece);
        return (<span style={{color: "black", zIndex: 1, fontSize: 20}}>
            {pieceSymbol}
        </span>)
    }
}

interface PieceProps {
    piece: number
}

export class Square extends React.Component <SquareProps> {
    render() {
        return (<button style={{
            visibility: this.props.visibility,
            width: `${100 / xq.BoardWidth}%`,
            height: `${100 / xq.BoardHeight}%`,
            fontSize: 8, color: "teal",
        }}>
            {this.props.index}<Piece piece={this.props.piece}/>
        </button>)
    }
}

interface SquareProps {
    index: number
    visibility: csstype.VisibilityProperty;
    piece: number
}

export class Board extends React.Component {
    state: BoardState;

    constructor(props: any) {
        super(props);
        this.state = {SparsePieces: xq.DefaultBoard}
    }

    render() {

        return (<DndProvider backend={Backend}>
            <div style={{
                width: xq.BoardWidth * 60,
                height: xq.BoardHeight * 54,
            }}>
                {xq.SquareIndices.map((sqIdx) =>
                    <Square key={sqIdx} {...{
                        index: sqIdx,
                        visibility: xq.OffBoards[sqIdx],
                        piece: this.state.SparsePieces[sqIdx]
                    }}
                    />
                )}
            </div>
        </DndProvider>)
    }
}

interface BoardState {
    // map square index to piece code
    SparsePieces: Record<number, number>
}





