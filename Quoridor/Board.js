class Board {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.board = this.createBoard(this.boardSize);
        
        
        console.log(`Hello`)
    }

    createBoard(boardSize) {
        board = [];

        for(var i = 0; i < this.boardSize; i++) {
            row = [];
            for(var i = 0; i < this.boardSize; i++) {
                row.push(0);
            }
            board.push(row);
        }
        return board;
    }
}