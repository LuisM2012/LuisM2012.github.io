// Mazes Javascript

class Maze
{
  constructor(width, height, id)
  {
    this.width = width;
    this.height = height;
    this.maze = new Array(this.width*this.height);
    this.start = [0,0];
    this.id = id;
    this.generate();
  }

  generate()
  {
    this.addAllWalls();
    this.depthFirst(this.start[0], this.start[1]);
    this.display();
  }

  addAllWalls()
  {
    for (let cell = 0; cell < this.maze.length; cell++)
    {
      this.maze[cell] = [0,""];
    }
  }

  depthFirst(x, y)
  {
    const WIDTH = this.width;
    const HEIGHT = this.height;
    this.maze[(y)*WIDTH+(x)][0] = 1;

    let turn = [];

    if (x+1<WIDTH && this.maze[WIDTH*y+(x+1)][0]==0)
    { turn.push(1); }
    if ((x-1>=0) && this.maze[WIDTH*y+(x-1)][0]==0)
    { turn.push(2); }
    if (y+1<HEIGHT && this.maze[WIDTH*(y+1)+(x)][0]==0)
    { turn.push(3); }
    if ((y-1>=0) && this.maze[WIDTH*(y-1)+(x)][0]==0)
    { turn.push(4); }

    if (turn.length != 0)
    {
      switch(turn[Math.floor(Math.random()*turn.length)])
      {
        case 1:
          this.maze[WIDTH*(y)+(x+1)][0] = 1;
          this.maze[y*this.width+x][1] += " right";
          this.maze[y*this.width+x+1][1] += " left";
          this.depthFirst(x+1, y);
          this.depthFirst(x, y);
          break;
        case 2:
          this.maze[WIDTH*(y)+(x-1)][0] = 1;
          this.maze[y*this.width+x][1] += " left";
          this.maze[y*this.width+x-1][1] += " right";
          this.depthFirst(x-1, y);
          this.depthFirst(x, y);
          break;
        case 3:
          this.maze[WIDTH*(y+1)+(x)][0] = 1;
          this.maze[y*this.width+x][1] += " bottom";
          this.maze[(y+1)*this.width+x][1] += " top";
          this.depthFirst(x, y+1);
          this.depthFirst(x, y);
          break;
        case 4:
          this.maze[WIDTH*(y-1)+(x)][0] = 1;
          this.maze[y*this.width+x][1] += " top";
          this.maze[(y-1)*this.width+x][1] += " bottom";
          this.depthFirst(x, y-1);
          this.depthFirst(x, y);
          break;
        default:
          break;
      }
    }
  }

  display()
  {
    let container = document.querySelector(this.id);

    if (!container)
    {
      alert("ERROR: No Element of id \""+ id +"\" found.");
      return false;
    }

    container.innerHTML = "";
    for (let row = 0; row < this.height; row++)
    {
      let rowDiv = `<div class="row">`;
      for (let cell = 0; cell < this.width; cell++)
      {
        rowDiv += `<div class="cell${this.maze[row*this.width+cell][1]}"></div>`;
      }
      rowDiv += "</div>";
      container.innerHTML += rowDiv;
    }
  }
}