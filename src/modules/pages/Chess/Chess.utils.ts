import { range, areEqualSign, areDifSignNonZero } from "../../../utils/utils";

type squareType = {
    value: number,
    pos: string
}
type squareIndexed = {
    square: squareType,
    idx: number
}
type chessBoardType = Array<squareType>

export const WIN = "You Win!";
export const LOSE = "You Lose";
export const DRAW = "Draw";
export const MAX = 64;
export const MIN = 0;

export const displayMoves = (pos: string, chessPiece: number, chessBoard: chessBoardType) => {
    const chessBoardPair: any = chessBoard.reduce((acc, square) => ({ ...acc, [square.pos]: square.value }), {});
    const [rowStr, colStr] = pos.split("");
    const col = parseInt(colStr);
    const chessPieceSign = chessPiece / Math.abs(chessPiece);
    const firstSquare = "A1";
    const lastSquare = "H8";
    const limits = {
        MAX_ROW: "H",
        MIN_ROW: "A",
        MIN_COL: "1",
        MAX_COL: "8",
    }
    const possibleMoves: Array<string> = [];
    switch (Math.abs(chessPiece)) {
        case 2: //ROOK MOVESET
            const processRookMoves = (start: any, condition: any, step: "add" | "substract", mode: "row" | "col" = "col") => {
                for (let i = start;
                    step === "add" ? i <= condition : i >= condition;
                    step === "add" ? i++ : i--) {
                    const newMove = mode === "col" ? rowStr + i.toString() : String.fromCharCode(i) + colStr;
                    const equal = areEqualSign(chessBoardPair[newMove], chessPiece)
                    if (equal) break;
                    possibleMoves.push(newMove);
                    const difSign = areDifSignNonZero(chessBoardPair[newMove], chessPiece);
                    if (difSign) break;
                }
            }
            processRookMoves(col - 1, parseInt(limits.MIN_COL), "substract");
            processRookMoves(col + 1, parseInt(limits.MAX_COL), "add");
            processRookMoves(rowStr.charCodeAt(0) - 1, limits.MIN_ROW.charCodeAt(0), "substract", "row");
            processRookMoves(rowStr.charCodeAt(0) + 1, limits.MAX_ROW.charCodeAt(0), "add", "row");
            break;
        case 3: //KNIGHT MOVESET
            let possibleKnightMoves = new Set<string>();
            const knightMove = (colMoves: Array<number>, rowMoves: Array<number>) => {
                colMoves.forEach(colMove => {
                    rowMoves.forEach(rowMove => {
                        let letter = String.fromCharCode(rowStr.charCodeAt(0) + rowMove);
                        let num = (col + colMove).toString();
                        let move = letter + num;
                        const equal = areEqualSign(chessBoardPair[move], chessPiece);
                        if (!equal) possibleKnightMoves.add(move);
                    })
                });
            }
            knightMove([2, -2], [1, -1]);
            knightMove([1, -1], [2, -2]);
            possibleMoves.push(...Array.from(possibleKnightMoves));
            break;
        case 4: //BISHOP MOVESET
            const processBishopMoves = (dir1: "top" | "bottom", dir2: "right" | "left") => {
                let i = dir1 === "top" ? rowStr.charCodeAt(0) - 1 : rowStr.charCodeAt(0) + 1;
                let counter = dir2 === "left" ? -1 : 1;
                let condition = dir1 === "top" ? i >= limits.MIN_ROW.charCodeAt(0) : i <= limits.MAX_ROW.charCodeAt(0);
                while (condition) {
                    const newMove = String.fromCharCode(i) + (col + counter).toString();
                    const equal = areEqualSign(chessBoardPair[newMove], chessPiece);
                    if (equal) break;
                    possibleMoves.push(newMove);
                    const difSign = areDifSignNonZero(chessBoardPair[newMove], chessPiece);
                    if (difSign) break;
                    dir1 === "top" ? i-- : i++;
                    dir2 === "left" ? counter-- : counter++;
                }
            }
            processBishopMoves("top", "left");
            processBishopMoves("top", "right");
            processBishopMoves("bottom", "left");
            processBishopMoves("bottom", "right");
            break;
        case 5: //QUEEN MOVESET
            const allPossibleMoves = [...displayMoves(pos, 2 * chessPieceSign, chessBoard), ...displayMoves(pos, 4 * chessPieceSign, chessBoard), ...displayMoves(pos, 6 * chessPieceSign, chessBoard)];
            let queenMoveSet = new Set<string>();
            allPossibleMoves.forEach(move => {
                queenMoveSet.add(move);
            });
            possibleMoves.push(...Array.from(queenMoveSet));
            break;
        case 6: //KING MOVESET
            let startNum = col - 1;
            let startLetterCode = rowStr.charCodeAt(0) - 1;
            for (let i = startNum; i < startNum + 3; i++) {
                for (let j = startLetterCode; j < startLetterCode + 3; j++) {
                    const newMove = String.fromCharCode(j) + i.toString();
                    const equal = areEqualSign(chessBoardPair[newMove], chessPiece);
                    if (newMove !== pos && !equal && newMove >= firstSquare && newMove <= lastSquare)
                        possibleMoves.push(newMove);
                }
            }
            break;
        default:  //PAWN MOVESET
            const initialRow = chessPieceSign === -1 ? "G" : "B";
            const numMoves = rowStr === initialRow ? 2 : 1;
            for (let i = rowStr.charCodeAt(0), times = numMoves; times > 0; times--) {
                i += chessPieceSign;
                const newMove = String.fromCharCode(i) + colStr;
                const equal = areEqualSign(chessBoardPair[newMove], chessPiece);
                if (equal) break;
                const difSign = areDifSignNonZero(chessBoardPair[newMove], chessPiece);
                if (difSign) break;
                possibleMoves.push(newMove);
            }
            //ATTACK
            [-1, 1].forEach(sideMove => {
                const newColPos = col + sideMove;
                const newRowPos = rowStr.charCodeAt(0) + chessPieceSign;
                const newMove = String.fromCharCode(newRowPos) + newColPos.toString();
                const difSign = areDifSignNonZero(chessBoardPair[newMove], chessPiece);
                if (difSign) possibleMoves.push(newMove);
            })
    }
    return possibleMoves;
}

export const checkAvailablePromotion = (chessBoard: chessBoardType) => {
    for (let i = 0; i < 8; i++) {
        if (Math.abs(chessBoard[i].value) === 1) return chessBoard[i];
    }
    for (let i = chessBoard.length - 8; i < chessBoard.length; i++) {
        if (Math.abs(chessBoard[i].value) === 1) return chessBoard[i];
    }
    return null;
}

export const move = (from: squareIndexed, to: squareIndexed, chessBoard: chessBoardType) => {
    chessBoard[from.idx].value = 0;
    chessBoard[to.idx].value = from.square.value;
    return chessBoard;
}

export let createChessPositions = () => {
    const rowPos = range("A".charCodeAt(0), "I".charCodeAt(0)).map(value => String.fromCharCode(value));
    const columnPos = range(1, 9).map(value => value.toString());
    const matrix = rowPos.map(value => {
        return columnPos.map(num => ({ value: 0, pos: value + num }));
    })
    return matrix.flat();
}

export const setupChessBoardColors = () => {
    let data = [];
    let counter = 0;
    for (let i = 1; i <= MAX; i++) {
        const num = (-1) ** (i + counter);
        data.push(num);
        if (i > 0 && i / 8 === Math.floor(i / 8)) counter++;
    }
    return data;
}

export const setupChessBoard = () => {
    let matrix = createChessPositions();
    const chessPositions = {
        rooks: [0, 7, matrix.length - 1, matrix.length - 8],
        knights: [1, 6, matrix.length - 2, matrix.length - 7],
        bishops: [2, 5, matrix.length - 3, matrix.length - 6],
        kings: [3, matrix.length - 4],
        queens: [4, matrix.length - 5],
        pawns: [range(8, 16), range(matrix.length - 16, matrix.length - 8)].flat()
    }
    matrix = matrix.map((element, idx) => {
        const color = idx < MAX / 2 ? 1 : -1;
        if (chessPositions.pawns.includes(idx)) return { ...element, value: 1 * color }
        else if (chessPositions.rooks.includes(idx)) return { ...element, value: 2 * color }
        else if (chessPositions.knights.includes(idx)) return { ...element, value: 3 * color }
        else if (chessPositions.bishops.includes(idx)) return { ...element, value: 4 * color }
        else if (chessPositions.queens.includes(idx)) return { ...element, value: 5 * color }
        else if (chessPositions.kings.includes(idx)) return { ...element, value: 6 * color }
        else return element;
    });
    return matrix;
}

