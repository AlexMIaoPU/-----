// So basically
// Player makes move first
// Bot randomly reponses
// Compare player's move with bot's response and return who wins

// Player Buttons
const paper_btn = document.getElementById("paper-btn")
const scissors_btn = document.getElementById("scissors-btn")
const stone_btn = document.getElementById("stone-btn")
const reset_btn = document.getElementById("reset-btn")

// Some states of the game
let game_started = false
let player_picked = false
let round_over = true
// -ive means lost consecutively, +ive means win, 0 is draw
let game_history = 0

// Elements to be displayed
const result_el = document.getElementById("result-el")
const versus_el_player = document.getElementById("versus-el-player")
const versus_el_bot = document.getElementById("versus-el-bot")
const Game_history_el = document.getElementById("game-histr-el")

// Some constants

// P, S, S have digital significance now
const Paper = 2
const Scissors = 1
const Stone = 0

// emojis
const pss_emojis = ["✊", "✌", "🖐"]

// reset btn is hidden before player makes move
reset_btn.style.visibility = 'hidden';

// Player makes move
paper_btn.addEventListener("click", function() {
    render_game(2)
})

scissors_btn.addEventListener("click", function() {
    render_game(1)
})

stone_btn.addEventListener("click", function() {
    render_game(0)
})


// The bot making move
// Returns an integer, which correspondes to one of P, S, S

function bots_move() {
    // return is either 0 or 1 or 2
    return Math.floor(Math.random() * 3);
}

function update_history(current_result) {
    if (current_result === 1) {
        if (game_history <= 0) {
            game_history = 1
        }
        else {
            game_history += 1
        }
    }
    else if (current_result === 0) {
        game_history = 0
    }
    else if (current_result === -1) {
        if (game_history > 0) {
            game_history = -1
        }
        else {
            game_history += -1
        }
    }

    if (game_history > 0) {
        Game_history_el.innerText = `U have won ${game_history} time(s) in a row, Hoorahhh!`
    }
    if (game_history < 0) {
        Game_history_el.innerText = `U have lost ${-game_history} time(s) in a row to a bot, smh`
    }
    if (game_history === 0) {
        Game_history_el.innerText = "Drawwwwwwwwwwwwwwwww"
    }
}

// Render the game
// Takes player's move as input
// When player have already moved in this round, make no response
// Displays the outcome of the game
function render_game(players_move) {
    if (player_picked == true) {
        // no cheating ya cunt
        return
    }
    game_started = true
    round_over = false
    player_picked = true
    
    bots_pick = bots_move()
    // duel!
    let result = the_duel(players_move, bots_pick)

    versus_el_player.innerText = `Your move: ${pss_emojis[players_move]}`
    versus_el_bot.innerText = `The bot: ${pss_emojis[bots_pick]}`

    if (result === 1) {
        result_el.innerText = "The Human has triumphed! Nice Play"
    }

    if (result === 0) {
        result_el.innerText = "No side came on top in this epic duel"
    }

    if (result === -1) {
        result_el.innerText = "The machine has proven to be superior, ya lose"
    }

    update_history(result)
    // reset btn is shown after player makes move
    reset_btn.style.visibility = 'visible';
}


reset_btn.addEventListener("click", function() {

    player_picked = false
    round_over = true
    versus_el_player.innerText = ""
    versus_el_bot.innerText = ""
    result_el.innerText = ""
    reset_btn.style.visibility = 'hidden'
    Game_history_el.innerText = ""
})

// Playing the game, one choice VS another
// two params, each being one of the moves
// returns whether the first move wins or loses or it is a draw
// -1: lose
// 0: draw
// 1: win 
function the_duel(move1, move2) {
    // paper
    if (move1 === 2) {
        if (move2 === 2) {
            return 0
        }
        if (move2 === 1) {
            return -1
        }
        if (move2 === 0) {
            return 1
        }
    }
    // scissors
    else if (move1 === 1) {
        if (move2 === 2) {
            return 1
        }
        if (move2 === 1) {
            return 0
        }
        if (move2 === 0) {
            return -1
        }
    }
    // stone
    else if (move1 === 0) {
        if (move2 === 2) {
            return -1
        }
        if (move2 === 1) {
            return 1
        }
        if (move2 === 0) {
            return 0
        }
    }
}