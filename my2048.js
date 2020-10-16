document.addEventListener("DOMContentLoaded", () => {

    var score = 0
    const scoreTafel = document.getElementById("score")
    var board = []
    var dimension = 4
    var mapBoard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    randBoard = [2,2,2,4,2,2,2,2,2,2,2,2,4,2,2,2]

    function genRand(){
        randNo = Math.floor(Math.random() * 16)
        return randNo;
    }



    function addNumbers(){
        let gR = genRand()
        mapBoard[gR] == 0 ? mapBoard[gR] = randBoard[gR] : addNumbers()

    }

    function initBoard(){
        addNumbers()
        addNumbers()
    }

    initBoard()
    
    for(let i = 0; i<16; i++){
        var cell = document.createElement("div")
        document.querySelector(".board").appendChild(cell)
        board.push(cell)
    }

    function gameOver(){
        let noOfZeros = 0

        for(let i = 0; i < 16; i++){
            if (mapBoard[i] == 0){
                noOfZeros++
            }
        }
        if ((noOfZeros == 0) && noMove()) {
            document.getElementById('topScore').textContent = score
            return true
        }else return false

    }

    function display(){
        for (let i = 0; i < 16; i++) {
            if(mapBoard[i] != 0){
                board[i].textContent = mapBoard[i];

            }else{
                board[i].textContent = ""
            }
        }
        scoreTafel.textContent = score

    }
    display()

    document.addEventListener("keyup", (e) => {
        switch(e.keyCode){
            case 39:
                if(!gameOver()){
                    moveRight()
                }
                break;
            case 37:
                if(!gameOver()){
                    moveLeft()
                }
                break;
            case 38:
                if (!gameOver()) {
                    moveUp()
                }
                break;
            case 40:
                if(!gameOver()){
                    moveDown()
                }
                break;
        }
    })

    function moveRight(){
        compressRight()
        joinRight()
        compressRight()
        addNumbers()
        display()
        console.log("right")
    }

    function moveLeft(){
        compressLeft()
        joinLeft()
        compressLeft()
        addNumbers()
        display()
        console.log("left")
    }

    function moveUp(){
        compressUp()
        joinUp()
        compressUp()
        addNumbers()
        display()
        console.log("up")
    }

    function moveDown(){
        compressDown()
        joinDown()
        compressDown()
        addNumbers()
        display()
        console.log("down")
    }

    function compressRight() {
        for (let x = 0; x < dimension; x++) {
            for (let i = dimension - 1; i > 0; i--) {
                if (mapBoard[x * dimension + i] == 0) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (mapBoard[x * dimension + j] > 0) {
                            mapBoard[x * dimension + i] = mapBoard[x * dimension + j];
                            mapBoard[x * dimension + j] = 0;
                            break;
                        }
                    }
                }
            }
        }
    }
    function joinRight() {
        for (let x = 0; x < dimension; x++) {
            for (let i = dimension - 1; i > 0; i--) {
                if (mapBoard[x * dimension + i] == mapBoard[x * dimension + i - 1] && mapBoard[x * dimension + i] != 0) {
                    mapBoard[x * dimension + i] = mapBoard[x * dimension + i - 1] * 2;
                    score += mapBoard[x * dimension + i];
                    mapBoard[x * dimension + i - 1] = 0;
                }
            }
        }

    }

        function compressLeft() {
            for (let x = 0; x < dimension; x++) {
                for (let i = 0; i < dimension; i++) {
                    if (mapBoard[x * dimension + i] == 0) {
                        for (let j = i + 1; j < dimension; j++) {
                            if (mapBoard[x * dimension + j] > 0) {
                                mapBoard[x * dimension + i] = mapBoard[x * dimension + j];
                                mapBoard[x * dimension + j] = 0;
                                break;
                            }
                        }
                    }
                }
            }
        }

        function joinLeft() {
            for (let x = 0; x < dimension; x++) {
                for (let i = 0; i < dimension - 1; i++) {
                    if (mapBoard[x * dimension + i] == mapBoard[x * dimension + i + 1] && mapBoard[x * dimension + i] != 0) {
                        mapBoard[x * dimension + i] = (mapBoard[x * dimension + i] * 2);
                        score += mapBoard[x * dimension + i];
                        mapBoard[x * dimension + i + 1] = 0;
                    }
                }
            }

        }
        function compressUp() {
            for (let x = 0; x < dimension; x++) {
                for (let i = 0; i < dimension; i++) {
                    if (mapBoard[x + i * dimension] == 0) {
                        for (let j = i + 1; j < dimension; j++) {
                            if (mapBoard[x + j * dimension] > 0) {
                                mapBoard[x + i * dimension] = mapBoard[x + j * dimension];
                                mapBoard[x + j * dimension] = 0;
                                break;
                            }
                        }
                    }
                }
            }
        }
        function joinUp() {
            for (let x = 0; x < dimension; x++) {
                for (let i = 0; i < dimension - 1; i++) {
                    if (mapBoard[x + i * dimension] == mapBoard[x + (i + 1) * dimension] && mapBoard[x + i * dimension] != 0) {
                        mapBoard[x + i * dimension] = mapBoard[x + (i + 1) * dimension] * 2;
                        score += mapBoard[x + i * dimension];
                        mapBoard[x + (i + 1) * dimension] = 0;
                    }
                }
            }

        }
        function compressDown() {
            for (let x = 0; x < dimension; x++) {
                for (let i = dimension - 1; i > 0; i--) {
                    if (mapBoard[x + i * dimension] == 0) {
                        for (let j = i - 1; j >= 0; j--) {
                            if (mapBoard[x + j * dimension] > 0) {
                                mapBoard[x + i * dimension] = mapBoard[x + j * dimension];
                                mapBoard[x + j * dimension] = 0;
                                break;
                            }
                        }
                    }
                }
            }
        }
        function joinDown() {
            for (let x = 0; x < dimension; x++) {
                for (let i = dimension - 1; i > 0; i--) {
                    if (mapBoard[x + i * dimension] == mapBoard[x + (i - 1) * dimension] && mapBoard[x + i * dimension] != 0) {
                        mapBoard[x + i * dimension] = mapBoard[x + (i - 1) * dimension] * 2;
                        score += mapBoard[x + i * dimension];
                        mapBoard[x + (i - 1) * dimension] = 0;
                    }
                }
            }

        }
    function noMove() {
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension - 1; j++) {
                if (mapBoard[i * dimension + j] == mapBoard[i * dimension + j + 1]) return false;
            }
        }

        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension - 1; j++) {
                if (mapBoard[i + j * 4] == mapBoard[i + (j + 1) * 4]) return false;
            }
        }
        return true;
    }

    document.getElementById("newButton").addEventListener("click", newGame);

    function newGame(){
        for(let x = 0; x < dimension*dimension; x++){
            mapBoard[x] = 0;
        }
        score = 0;
        addNumbers()
        addNumbers()
        display();
    }

})
