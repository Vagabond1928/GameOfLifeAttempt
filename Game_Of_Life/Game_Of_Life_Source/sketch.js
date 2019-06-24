//Initial Required variables
let currentGrid;
let cols;
let rows;
let resolution = 10;

//SETUP FUNCTION
function setup(){
  createCanvas(1000, 1000);
  //Ensures the columns and rows can be changed by modifying the resolution
  cols = width / resolution;
  rows = height / resolution;

  //Creates initial grid (2D Array)
  currentGrid = create2DArray(cols,rows);

/*Sets the values to a random 0 or 1 to generate cells
  1 == Alive
  0 == Dead
*/
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      //Changing the generateSeed value to 0 will produce a blank board
      currentGrid[i][j] = floor(generateSeed(10));
    }
  }
}

//DRAW FUNCTION
function draw(){

  //Loop to colour the squares depending on their value 0 or 1
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows;j++){
      let x = i * resolution;
      let y = j * resolution;
      if(currentGrid[i][j] == 0){
        fill(255);
      }else fill(0);
      stroke(117, 131, 135);
      rect(x,y,resolution,resolution);
    }
  }


  //set a new grid to be used to compare cells without affecting states
  let nextGrid = create2DArray(cols,rows);

  //generate next based on the current grid
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let currentCell = currentGrid[i][j];
      let noOfNeighbours = countNeighbouringCells(i,j);

      if (currentCell == 0 && noOfNeighbours == 3){
        nextGrid[i][j] = 1;
      }else if (currentCell == 1 && (noOfNeighbours < 2 || noOfNeighbours >3)){
        nextGrid[i][j] = 0;
      }else {
        nextGrid[i][j] = currentCell;
      }
    }
  }
  currentGrid = nextGrid;
}


function create2DArray(cols,rows){
  let array1 = new Array(cols);
  for (let i = 0; i < array1.length; i++){
    array1[i] = new Array(rows);
  }
  return array1;
}

function generateSeed(term){
  return (term == 0 ? 0 : random(2));
}

function countNeighbouringCells(i, j) {

    var liveCells = 0;

    for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
          //Loops around the given Cell, however the edges need to be accounted for
          //Thats why it will only count lives so long as it lies on the grid

            if (i + x >= 0 && i + x < cols && j + y >= 0 && j + y < rows) {
                if (!(x == 0 && y == 0)) {
                  //Total number of
                    liveCells += currentGrid[i + x][j + y];
                }
            }
        }
    }
    return liveCells;
}
