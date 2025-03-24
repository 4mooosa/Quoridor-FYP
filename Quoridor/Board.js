class Board {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.board = this.createBoard();
        
        

        console.log(`Hello`)
    }

    createBoard() {
        this.board = new Array(this.boardSize);

        for(var i = 0; i < this.boardSize; i++) {
            this.board[i] = new Array(9);
        }

        this.board[0][0] = new Cell();
        console.log(this.board[0][0]);
    }
}