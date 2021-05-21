const state ={
    currentTurn: "O",
    array:["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    winCondition:[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ]
}

function displayStatus(){
    let wrapper = document.querySelector(".wrapper")
    let headerDiv = document.createElement("div")
    headerDiv.setAttribute("class", "header")
    wrapper.append(headerDiv)

    let h1El = document.createElement("h1")
    h1El.innerText = "Tic Tac Toe"
    
    let gameStatus = document.createElement("h2")
    gameStatus.setAttribute("class", "status")
    gameStatus.innerText = "Playing"

    let playTurn = document.createElement("h3")
    playTurn.setAttribute("class", "play-turn")
    playTurn.innerHTML = "Turn:" + state.currentTurn

    headerDiv.append(h1El, gameStatus, playTurn)
}

function displayPlayGrid(){
    let wrapper = document.querySelector(".wrapper")

    let gridContainer = document.createElement("div")
    gridContainer.setAttribute("class", "grid-container")
    wrapper.append(gridContainer)

    for (i = 0; i < state.array.length; i++){
        let inputField = document.createElement("div")
        inputField.setAttribute("id", i)
        inputField.setAttribute("class", "input-field")
        gridContainer.append(inputField)

        inputField.addEventListener('click', function selectThisGrid(){
            inputField.removeEventListener('click', selectThisGrid)
            inputField.innerText = state.currentTurn
            state.array[this.id] = state.currentTurn

            winner = checkWinner()
            if(winner === "draw"){
                let headerDiv = document.querySelector(".header")
                headerDiv.innerHTML = ""
                let winnerH1 = document.createElement("h1")
                winnerH1.innerText = `Draw Game`
                winnerH1.style.color = "purple"
                headerDiv.append(winnerH1)

                restartButton.style.display = "block"
            }
            else if(winner !== undefined){
                let headerDiv = document.querySelector(".header")
                headerDiv.innerHTML = ""
                let winnerH1 = document.createElement("h1")
                winnerH1.innerText = `${winner} WINS!!`
                winnerH1.style.color = "purple"
                headerDiv.append(winnerH1)
                
                restartButton.style.display = "block"
            }
            else{
                if(state.currentTurn === "X") {
                    state.currentTurn = "O"
                }else state.currentTurn = "X"
                
                let playTurn = document.querySelector(".play-turn")
                playTurn.innerHTML = "Turn:" + state.currentTurn
            }

        })
    }

    let restartButton = document.createElement("button")
    restartButton.innerText = "Restart"
    wrapper.append(restartButton)

    restartButton.addEventListener("click", function(){
        restartButton.style.display = "none"
        let wrapperDiv = document.querySelector(".wrapper")
        wrapperDiv.innerHTML = ""
        displayStatus()
        displayPlayGrid()
        state.array.length = 0
        for (i = 0; i < 8; i++) state.array.push("empty")
    })
}

function checkWinner(){
    for(condition of  state.winCondition){
            if (state.array[condition[0]] === state.array[condition[1]] && state.array[condition[0]]===state.array[condition[2]] && state.array[condition[0]] !== "empty"){
            return state.array[condition[0]]
        }
    }

    if(state.array.findIndex(findEmptyField) === -1){
        return "draw"
    }
}

function findEmptyField(field){
    return field === "empty"
}

displayStatus()
displayPlayGrid()