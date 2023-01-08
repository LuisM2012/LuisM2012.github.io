// JavaScript Sudoku

class Sudoku
{
	constructor(id)
	{
		this.board = new Array(81);
		this.randomList = [1,2,3,4,5,6,7,8,9];
		this.holes = [];
		this.solution = [];
    this.id = id;
    this.generate();
	}

	generate()
	{
		this.holes.length = 0;
		this.solution.length = 0;
		this.emptyBoard();
		this.build();
		this.getAll();
		this.createHoles();
		this.display();
	}

	emptyBoard() // DONE
	{
		for (let cell = 0; cell < this.board.length; cell++)
    {
      this.board[cell] = "";
    }
	}

	findNext() // DONE
	{
		for (let cell = 0; cell < this.board.length; cell++)
		{
			if (this.board[cell]=="") { return cell; }
		}
		return null;
	}

	validMove(x, y, value) // DONE
	{
		let qx = Math.floor(x/3)*3;
		let qy = Math.floor(y/3)*3;

		for (let i = 0; i < 9; i++)
		{
				if (this.board[(i)*9+(x)] == value ||
					this.board[(y)*9+(i)] == value ||
					this.board[(qy+(i%3))*9+(qx+Math.floor(i/3))] == value)
				{ return false; }
		}

		return true;
	}

	numSolutions() // DONE
	{
		const cell = this.findNext();
		// if no more cells, return
		if (cell == null) { return 1; } 
		// recurse over all possible values and count how many solutions
		let count = 0;
		for (let value = 1; value < 10; value++)
		{
			if (this.validMove(cell%9, Math.floor(cell/9), value))
			{
				this.board[cell] = value;
				count += this.numSolutions();
				this.board[cell] = "";
			}
		}
		return count;
	}

	build() //DONE
	{
		const cell = this.findNext();

		if (cell == null) { return true; }

		this.shuffle(); // shuffle randomList
		for (let i = 0; i < this.randomList.length; i++)
		{
			if(this.validMove(cell%9, Math.floor(cell/9), this.randomList[i]))
			{
				this.board[cell] = this.randomList[i];

				if (this.build()) { return true; }

				this.board[cell] = "";
			}
		}

		return false;
	}

	getAll() // DONE
	{
		for (let cell = 0; cell < this.board.length; cell++)
		{
			this.solution.push([cell, this.board[cell]]);
		}
	}

	createHoles()
	{
		// // EASY
		for (let i = 0; i < 81-17; i++)
		{
			let cell = Math.floor(Math.random()*this.board.length);
			const temp = this.board[cell];
			this.board[cell] = "";
			if (this.numSolutions() != 1)
			{
				this.board[cell] = temp;
			} else {
				this.holes.push([cell, temp]);
			}
		}

		// // MEDIUM
		// const start = Math.floor(Math.random()*this.solution.length);
		// for (let i = 0; i < this.solution.length; i++)
		// {
		// 	let index = (start + i) % this.solution.length;
		// 	if (this.board[this.solution[index][0]] != "")
		// 	{
		// 		this.board[this.solution[index][0]] = "";
		// 		if (this.numSolutions() != 1)
		// 		{
		// 			this.board[this.solution[index][0]] = this.solution[index][1];
		// 			return;
		// 		}
		// 		this.holes.push(this.solution[index]);
		// 		this.createHoles();
		// 		return;
		// 	}
		// }

		// // HARD
		// const start = Math.floor(Math.random()*this.solution.length);
		// for (let i = 0; i < this.solution.length; i++)
		// {
		// 	let index = (start + i) % this.solution.length;
		// 	if (this.board[this.solution[index][0]] != "")
		// 	{
		// 		this.board[this.solution[index][0]] = "";
		// 		if (this.numSolutions() == 1)
		// 		{
		// 			this.holes.
		// 			this.holes.push(this.solution[index]);
		// 			this.createHoles();
		// 			return;
		// 		}
		// 		this.board[this.solution[index][0]] = this.solution[index][1];
		// 	}
		// }
	}

	shuffle() // DONE
	{
		for (let i = 0; i < this.randomList.length; i++)
		{
			let j = Math.floor(Math.random() * this.randomList.length);
			[this.randomList[i], this.randomList[j]] = [this.randomList[j], this.randomList[i]];
		}
	}

	display()
	{
		let container = document.querySelector(this.id);

		if (!container)
		{
		alert("ERROR: No Element of id \""+ this.id +"\" found.");
		return false;
		}

		container.innerHTML = "";
    for (let row = 0; row < 9; row++)
    {
      let rowDiv = `<div class="row row_${row}">`;
      for (let cell = 0; cell < 9; cell++)
      {
				if (this.board[row*9+cell] == "") {
					rowDiv += `<div class="cell scell_${cell} edit" contenteditable="true">${this.board[row*9+cell]}</div>`;
				}
				else {
					rowDiv += `<div class="cell scell_${cell}">${this.board[row*9+cell]}</div>`;
				}
      }
      rowDiv += "</div>";
      container.innerHTML += rowDiv;
    }
	}
}