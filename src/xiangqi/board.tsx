import React from 'react'
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
        const sqH = `${100 / (xq.BoardHeight - 2)}%`;
        const sqW = `${100 / (xq.BoardWidth - 4)}%`;
        return (<reactDND.DndProvider backend={dNDBackendHTML5}>
            <table style={{
                height: (xq.BoardHeight - 2) * 100,
                width: (xq.BoardWidth - 4) * 100,
                borderCollapse: "collapse", borderSpacing: 0,
                backgroundImage: `url(${Images.Board})`,
                backgroundRepeat: "no-repeat", backgroundSize: "100% 100%",
            }}>
                <tbody>
                {xq.BoardRows.map((row, rowIdx) =>
                    <tr key={rowIdx} style={{height: sqH,}}>
                        {row.map((sqIdx) =>
                            <td key={sqIdx} style={{
                                height: sqH, width: sqW,
                            }}>
                                <Square {...{
                                    index: sqIdx,
                                    piece: this.state.SparsePieces[sqIdx],
                                    makeMove: this.makeMove,
                                }}/>
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        </reactDND.DndProvider>)
    }
}

export function Square(props: {
    index: number
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
        <button ref={drop} style={{
            height: `100%`, width: `100%`,
            textAlign: "left", verticalAlign: "top", fontSize: 8, color: "teal",
            background: "rgba(0,0,0,0)", padding: 0, border: "none",
        }}>
            <Piece {...{piece: props.piece, sqIdx: props.index}}/>
        </button>)
}

export function Piece(props: PieceProps) {
    let [{isDragging}, drag] = reactDND.useDrag({
        item: {type: DraggableTypes.PIECE, props: props},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    let pieceSrc = PieceImages.get(props.piece);
    let imgElem = <br/>;
    if (pieceSrc) {
        imgElem =
            <img
                style={{width: "100%", height: "100%"}}
                src={pieceSrc}
            />
    }
    return (
        <span ref={drag} style={{
            opacity: isDragging ? 0.5 : 1, cursor: 'move',
            color: "black", zIndex: 1, fontSize: 25,
        }}>
            {imgElem}
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

// PieceImages maps piece code to piece image
export const PieceImages: Map<number, string> = new Map();
PieceImages.set(xq.PAWN, process.env.PUBLIC_URL + "/xiangqi/PAWN1.png");
PieceImages.set(xq.pawn, process.env.PUBLIC_URL + "/xiangqi/pawn.png");
PieceImages.set(xq.ADVISER, process.env.PUBLIC_URL + "/xiangqi/ADVISER1.png");
PieceImages.set(xq.adviser, process.env.PUBLIC_URL + "/xiangqi/adviser.png");
PieceImages.set(xq.ELEPHANT, process.env.PUBLIC_URL + "/xiangqi/BISHOP1.png");
PieceImages.set(xq.elephant, process.env.PUBLIC_URL + "/xiangqi/bishop.png");
PieceImages.set(xq.HORSE, process.env.PUBLIC_URL + "/xiangqi/KNIGHT1.png");
PieceImages.set(xq.horse, process.env.PUBLIC_URL + "/xiangqi/knight.png");
PieceImages.set(xq.CANNON, process.env.PUBLIC_URL + "/xiangqi/CANNON1.png");
PieceImages.set(xq.cannon, process.env.PUBLIC_URL + "/xiangqi/cannon.png");
PieceImages.set(xq.CHARIOT, process.env.PUBLIC_URL + "/xiangqi/ROOK1.png");
PieceImages.set(xq.chariot, process.env.PUBLIC_URL + "/xiangqi/rook.png");
PieceImages.set(xq.KING, process.env.PUBLIC_URL + "/xiangqi/KING1.png");
PieceImages.set(xq.king, process.env.PUBLIC_URL + "/xiangqi/king.png");
PieceImages.set(xq.UNSEEN, "");
PieceImages.set(xq.unseen, "");

export const Images: Record<string, string> = {
    Board: process.env.PUBLIC_URL + "/xiangqi/zboard.png",
};