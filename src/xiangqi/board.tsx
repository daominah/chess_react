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
        const sqH = `${100 / (xq.BoardHeight - 4)}%`;
        const sqW = `${100 / (xq.BoardWidth - 4)}%`;
        return (<reactDND.DndProvider backend={dNDBackendHTML5}>
            <table style={{
                height: (xq.BoardHeight - 4) * 60,
                width: (xq.BoardWidth - 4) * 60,
                borderCollapse: "collapse",
                borderSpacing: 0,
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
        }}>
            {props.index}
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
                style={{maxWidth: "100%", maxHeight: "100%"}}
                src={process.env.PUBLIC_URL + pieceSrc}
            />
    }
    return (
        <span ref={drag}
              style={{
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

// PieceImages maps piece code to piece symbol
export const PieceImages: Map<number, string> = new Map();
PieceImages.set(xq.PAWN, "/xiangqi/PAWN1.png");
PieceImages.set(xq.pawn, "/xiangqi/pawn.png");
PieceImages.set(xq.ADVISER, "/xiangqi/ADVISER1.png");
PieceImages.set(xq.adviser, "/xiangqi/adviser.png");
PieceImages.set(xq.ELEPHANT, "/xiangqi/BISHOP1.png");
PieceImages.set(xq.elephant, "/xiangqi/bishop.png");
PieceImages.set(xq.HORSE, "/xiangqi/KNIGHT1.png");
PieceImages.set(xq.horse, "/xiangqi/knight.png");
PieceImages.set(xq.CANNON, "/xiangqi/CANNON1.png");
PieceImages.set(xq.cannon, "/xiangqi/cannon.png");
PieceImages.set(xq.CHARIOT, "/xiangqi/ROOK1.png");
PieceImages.set(xq.chariot, "/xiangqi/rook.png");
PieceImages.set(xq.KING, "/xiangqi/KING1.png");
PieceImages.set(xq.king, "/xiangqi/king.png");
PieceImages.set(xq.UNSEEN, "");
PieceImages.set(xq.unseen, "");