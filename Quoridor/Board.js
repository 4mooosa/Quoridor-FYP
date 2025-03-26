class Board {
    constructor() {
        this.boardSize = 9;

        // Initial position for both players.
        this.player1 = [8, 4]
        this.player2 = [0, 4]
        
        // This holds the information for all the different cells on the grid.
        this.walls = {
            north : Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0)),
            south : Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0)),
            east : Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0)),
            west : Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0))
        }
    }

    canMove(player, direction) {
        // Getting the position of the current player piece.
        let [x, y] = player === 1 ? this.player1 : this.player2;

        // Getting the position of the opponents piece.
        let [oppX, oppY] = player === 1 ? this.player2 : this.player1;

        // Define movement directions.
        const moves = {
            "up": [-1, 0, this.walls.north],
            "down": [1, 0, this.walls.south],
            "left": [0, -1, this.walls.west],
            "right": [0, 1, this.walls.east]
        };

        // Return false if the move is not valid.
        // I.e. if it is not equal to up, down, left or right.
        if (!(direction in moves)) return false; 

        // Getting the movement details.
        let [dx, dy, wallMatrix] = moves[direction];
        let newX = x + dx;
        let newY = y + dy;

        // Return false if the move is out of the borders of the game.
        if (newX < 0 || newX >= this.boardSize || newY < 0 || newY >= this.boardSize) {
            return false;
        }

        // Return false if there is a wall blocking the way.
        if (wallMatrix[x][y] === 1) {
            return false;
        }

        // Handle opponent collision (Jump or Side-step).
        if (newX === oppX && newY === oppY) {
            let jumpX = newX + dx;
            let jumpY = newY + dy;

            // If there is no wall then jump direct.
            if (jumpX >= 0 && jumpX < this.boardSize && jumpY >= 0 && jumpY < this.boardSize && wallMatrix[newX][newY] === 0) {
                return true;
            } else {
                // If direct jump is blocked then side-step.
                if (direction === "up" || direction === "down") {
                    return (newY - 1 >= 0 && this.westWalls[newX][newY] === 0) ||
                           (newY + 1 < this.boardSize && this.eastWalls[newX][newY] === 0);
                } else {
                    return (newX - 1 >= 0 && this.northWalls[newX][newY] === 0) ||
                           (newX + 1 < this.boardSize && this.southWalls[newX][newY] === 0);
                }
            }
        }
        
        // The move is valid.
        return true; 
    }

    movePlayer(player, direction) {
        // Check the move is valid.
        if (!this.canMove(player, direction)) {
            console.log("Invalid move");
            return false;
        }

        // Getting the position of the current player piece.
        let [x, y] = player === 1 ? this.player1 : this.player2;

        // Getting the position of the opponents piece.
        let [oppX, oppY] = player === 1 ? this.player2 : this.player1;

        // Define movement directions.
        const moves = {
            "up": [-1, 0, this.northWalls],
            "down": [1, 0, this.southWalls],
            "left": [0, -1, this.westWalls],
            "right": [0, 1, this.eastWalls]
        };

        let [dx, dy, wallMatrix] = moves[direction];

        let newX = x + dx;
        let newY = y + dy;

        // Opponent collision handling (Jump or Side-step)
        if (newX === oppX && newY === oppY) {
            let jumpX = newX + dx;
            let jumpY = newY + dy;

            // Direct jump if no wall
            if (jumpX >= 0 && jumpX < this.boardSize && jumpY >= 0 && jumpY < this.boardSize && wallMatrix[newX][newY] === 0) {
                newX = jumpX;
                newY = jumpY;
            } else {
                // Side-step if direct jump is blocked
                if (direction === "up" || direction === "down") {
                    if (newY - 1 >= 0 && this.westWalls[newX][newY] === 0) {
                        newY -= 1;
                    } else if (newY + 1 < this.boardSize && this.eastWalls[newX][newY] === 0) {
                        newY += 1;
                    }
                } else {
                    if (newX - 1 >= 0 && this.northWalls[newX][newY] === 0) {
                        newX -= 1;
                    } else if (newX + 1 < this.boardSize && this.southWalls[newX][newY] === 0) {
                        newX += 1;
                    }
                }
            }
        }

        // Update player position
        if (player === 1) {
            this.player1 = [newX, newY];
        } else {
            this.player2 = [newX, newY];
        }

        console.log(`Player ${player} moved to [${newX}, ${newY}]`);
        return true;
    }

    canPlaceWall(x, y, orientation) {

    }

    placeWall(x, y, orientation) {

    }

    placeTemporaryWall(x, y, orientation) {

    }

    removeTemporaryWall(x, y, orientation) {

    }

    hasValidPath(player) {

    }

    checkWin(player) {

    }

    displayBoard() {

    }
}