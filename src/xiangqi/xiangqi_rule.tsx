import * as csstype from 'csstype';

// BoardWidth includes 4 padding files
export const BoardWidth = 13;
// BoardHeight includes 4 padding ranks
export const BoardHeight = 14;

export const SquareIndices: number[] = [];
// BoardRows is used for drawing html table
export const BoardRows: number[][] = [];
// map square index to visibility,
// the board has 2 ranks and 2 files that should be hidden
export const OffBoards: Record<number, csstype.VisibilityProperty> = {};
for (let y = BoardHeight - 1; y >= 0; y--) {
    let row: number[] = [];
    for (let x = 0; x < BoardWidth; x++) {
        let sqIdx = y * BoardWidth + x;
        SquareIndices.push(sqIdx);
        let isOffBoards = x < 2 || y < 2 ||
            x >= BoardWidth - 2 || y >= BoardHeight - 2;
        OffBoards[sqIdx] = isOffBoards ? "hidden" : "visible";
        if (!isOffBoards) {
            row.push(sqIdx)
        }
    }
    if (y != BoardHeight - 1 && y != 0) {
        BoardRows.push(row);
    }
}

// Piece code is an integer number that was defined by my server
export const PAWN = (1);
export const pawn = (-1);
export const ADVISER = (2);
export const adviser = (-2);
export const ELEPHANT = (3);
export const elephant = (-3);
export const HORSE = (4);
export const horse = (-4);
export const CANNON = (5);
export const cannon = (-5);
export const CHARIOT = (6);
export const chariot = (-6);
export const KING = (7);
export const king = (-7);
export const EMPTY = (0);
export const OFFBOARD = (255);
export const UNSEEN = (63);
export const unseen = (-63);

// PieceSymbols maps piece code to piece symbol
export const PieceSymbols: Map<number, string> = new Map();
PieceSymbols.set(PAWN, "P");
PieceSymbols.set(pawn, "p");
PieceSymbols.set(ADVISER, "A");
PieceSymbols.set(adviser, "a");
PieceSymbols.set(ELEPHANT, "B");
PieceSymbols.set(elephant, "b"); // Bishop
PieceSymbols.set(HORSE, "N");
PieceSymbols.set(horse, "n");// kNight
PieceSymbols.set(CANNON, "C");
PieceSymbols.set(cannon, "c");
PieceSymbols.set(CHARIOT, "R");
PieceSymbols.set(chariot, "r"); // Rook
PieceSymbols.set(KING, "K");
PieceSymbols.set(king, "k");
PieceSymbols.set(EMPTY, ".");
PieceSymbols.set(OFFBOARD, "+");
PieceSymbols.set(UNSEEN, "U");
PieceSymbols.set(unseen, "u");

// DefaultBoard is starting pieces position in a normal xiangqi game
export const DefaultBoard = {
    106: pawn,
    108: pawn,
    110: pawn,
    112: pawn,
    114: pawn,
    120: cannon,
    126: cannon,
    145: chariot,
    146: horse,
    147: elephant,
    148: adviser,
    149: king,
    150: adviser,
    151: elephant,
    152: horse,
    153: chariot,
    28: CHARIOT,
    29: HORSE,
    30: ELEPHANT,
    31: ADVISER,
    32: KING,
    33: ADVISER,
    34: ELEPHANT,
    35: HORSE,
    36: CHARIOT,
    55: CANNON,
    61: CANNON,
    67: PAWN,
    69: PAWN,
    71: PAWN,
    73: PAWN,
    75: PAWN
};
