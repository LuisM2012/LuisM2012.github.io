class TicTacToe
{
  constructor (id)
  {
    this.player_1 = "X";
    this.player_2 = "O";
    this.board_container = document.querySelector(id);
    this.winner = document.querySelector(".tttwinner");
    this.points = {"X": -1, "O": 1}

    this.computer = true; // change for game 
    this.current_player = this.player_1;
    this.board_full = false;
    this.board = ["", "", "",
                  "", "", "",
                  "", "", ""];
    this.render_board();
  };

  is_board_full () 
  { 
    for (let i = 0; i < 9; i++) 
    {
      if (this.board[i] == "") 
      {
        return false;
      }
    }
    return true;
  };

  check_line (a, b, c) 
  {
    return (
      this.board[a] == this.board[b] &&
      this.board[b] == this.board[c] &&
      this.board[c] != ""
    );
  };

  check_for_winner () 
  {
    let lines = [[0,1,2], [3,4,5], [6,7,8], [0,4,8],
                 [0,3,6], [1,4,7], [2,5,8], [2,4,6]]
  
    for (let i = 0; i < 8; i++) 
    {
      if (this.check_line(lines[i][0], lines[i][1], lines[i][2])) 
      {
        return lines[i];
      }
    }
    return null;
  };

  update_game_state () 
  {
    let result = this.check_for_winner();
    if (result != null) {
      document.querySelector(`.cell_${result[0]}`).classList.add("win");
      document.querySelector(`.cell_${result[1]}`).classList.add("win");
      document.querySelector(`.cell_${result[2]}`).classList.add("win");
      if (this.board[result[0]] == this.player_1){
        this.winner.innerText = "Player 1 Wins !!!";
        this.winner.classList.add("playerWin");
      } else {
        this.winner.innerText = "Player 2 Wins!!!";
        this.winner.classList.add("computerWin");
      }
      this.board_full = true;
    } else if (this.board_full) {
      this.winner.innerText = "Draw!";
      this.winner.classList.add("draw");
    }
  };

  addPlayerMove (e) 
  {
    if (!this.board_full && this.board[e] == "") {
      this.board[e] = this.current_player;
      this.game_loop();
      this.current_player = (this.current_player == this.player_2) ? this.player_1 : this.player_2;
      if (this.computer) {
        this.addComputerMove(); // game mode
        this.current_player = this.player_1;
      }
    }
  };

  addRandomMove = () => 
  {
    if (!this.board_full) {
      do {
        selected = Math.floor(Math.random() * 9);
      } while (this.board[selected] != "");
      this.board[selected] = this.player_2;
      this.game_loop();
    }
  };

  addComputerMove () 
  {
    if (!this.board_full) {
      let bestScore = -Infinity;
      let bestMove;
      for (let i = 0; i < 9; i++) {
        if (this.board[i] == "") {
          this.board[i] = this.player_2;
          let score = this.miniMax(false, 0);
          this.board[i] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      this.board[bestMove] = this.player_2;
      this.game_loop();
    }
  };

  miniMax (maximizing, depth)
  {
    // check if there's a winner and return score
    let result = this.check_for_winner();
    if (result != null) {
      return this.points[this.board[result[0]]] * (10-depth);
    } else if (this.is_board_full()){
      return 0;
    }
    // recursion
    if (maximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (this.board[i] == "") {
          this.board[i] = this.player_2;
          let score = this.miniMax(false, depth+1);
          this.board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore
    } else {
      let worstScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (this.board[i] == "") {
          this.board[i] = this.player_1;
          let score = this.miniMax(true, depth+1);
          this.board[i] = "";
          worstScore = Math.min(score, worstScore);
        }
      }
      return worstScore;
    }
  };

  game_loop () 
  {
    this.render_board();
    this.board_full = this.is_board_full();
    this.update_game_state();
  };

  reset_board () 
  {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.board_full = false;
    this.current_player = this.player_1;
    this.winner.classList.remove("playerWin");
    this.winner.classList.remove("computerWin");
    this.winner.classList.remove("draw");
    this.winner.innerText = "";
    this.render_board();
  };

  render_board ()
  {
    this.board_container.innerHTML = "";
    this.board.forEach((e, i) => {
      this.board_container.innerHTML += `<div class="block cell_${i}" onclick="tictactoe.addPlayerMove(${i})">${this.board[i]}</div>`
      if (e != "") {
        document.querySelector(`.cell_${i}`).classList.add("occupied");
      }
    });
  };
}