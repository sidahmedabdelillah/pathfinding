class node {
  constructor(i, j) {
    this.i = i;
    this.j = j;

    this.neighbors = [];

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.prev = undefined;

    this.wall = false;
    this.color = 'white'
  }

  drawMe() {
    fill(this.color);

    square(this.i * cellWidth, this.j * cellWidth, cellWidth);
  }

  setWall(){
      this.wall = true 
      this.color = 'black'
  }

  setOpen(){
      this.color = 'green'
  }

  setClose(){
      this.color = 'red'
  }

  calculateNeighbors(maze) {
    const i = this.i;
    const j = this.j;

    // left
    if (i > 0) {
      if (!maze[i - 1][j].wall) {
        this.neighbors.push(maze[i - 1][j]);
      }
    }

    // right
    if (i < maze[0].length - 1) {
      if (!maze[i + 1][j].wall) {
        this.neighbors.push(maze[i + 1][j]);
      }
    }

    // up
    if (j > 0) {
        if (!maze[i ][j - 1].wall) {
          this.neighbors.push(maze[i][j - 1 ]);
        }
      }
  
      // down
      if (j < maze.length - 1) {
        if (!maze[i ][j + 1 ].wall) {
          this.neighbors.push(maze[i ][j + 1 ]);
        }
      }

    
  }
}
