const cellWidth = 20;
const cols = 30;
const rows = 30;
const nodes = [];
const openSet = [];
const closedSet = [];
let pause = true
let start;
let end;

function removeFromArray(arr, elt) {
  const index = arr.indexOf(elt);
  arr.splice(index, 1);
}

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

function setup() {
  createCanvas(rows * cellWidth, cols * cellWidth);
  for (let i = 0; i < cols; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const newNode = new node(i, j);
      row.push(newNode);
    }
    nodes.push(row);
  }

  start = nodes[0][0];
  end = nodes[cols - 1][cols - 1];
  openSet.push(start);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      nodes[i][j].calculateNeighbors(nodes);
    }
  }

  button = createButton('click me');
  button.position(rows * cellWidth + 20 , cols * cellWidth + 20);
  button.mousePressed(() => pause = false);
}

function draw() {
  nodes.forEach((n) => n.forEach((x) => x.drawMe()));

  if (pause) return

  if (openSet.length > 0) {
    // get next best f
    let bestFIndex = 0;

    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[bestFIndex].f) {
        bestFIndex = i;
      }
    }

    for (let i = 0; i < closedSet.length; i++) {
      closedSet[i].color = 'red'
    }
    const current = openSet[bestFIndex];

    if (current == end) {
      print("DONE")
      let past = current.prev 
      console.log(past)
      while(past){
        print(past)
        past.color= 'green'
        past.drawMe()
        past = past.prev
      }
      noLoop();
      return;
    }


    
    removeFromArray(openSet, current);
    closedSet.push(current)
    
    

    const currentNeighbors = current.neighbors;

    for (let i = 0; i < currentNeighbors.length; i++) {
      const neghbor = currentNeighbors[i];
      if (!closedSet.includes(neghbor) && !neghbor.wall) {
        const tempG = current.g + heuristic(neghbor, current);

        let newPath = false;
        if (openSet.includes(neghbor)) {
          neghbor.g = tempG;
          newPath = true;
        } else {
          neghbor.g = tempG;
          newPath = true;
          openSet.push(neghbor);
          current.setOpen()
        }

        if (newPath) {
          neghbor.h = heuristic(neghbor, end);
          neghbor.f = neghbor.g + neghbor.h;
          neghbor.prev = current;
        }
      }
    }
  }
}

function aStar() {
  

  
}

function mouseDragged() {
  const x = Math.floor(mouseX / cellWidth);
  const y = Math.floor(mouseY / cellWidth);
  if (x > cols || y > rows) return;
  nodes[x][y].setWall()
}
