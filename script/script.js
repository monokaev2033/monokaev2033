let plan = ["##############################",
            "#                  o         #",
            "#                            #",
            "#          #####             #",
            "#                    #       #",
            "###         o        #       #",
            "#                    #       #",
            "#                            #",
            "#                            #",
            "#              o          ####",
            "#                            #",
            "#   o                        #",
            "#                            #",
            "##############################"];


class GameObject {
  constructor(width, height, game, index) {
    this.width = width;
    this.height = height;
    this.game = game;
    this.index = index;
  }
}


class Wall extends GameObject {
  draw() {
    this.game.ctx.fillStyle = 'black';
    this.game.ctx.fillRect(this.index.x * this.game.cellWidth, this.index.y * this.game.cellHeight, this.width, this.height);
  }
}


class Critter extends GameObject {
  constructor(width, height, game, index) {
    super(width, height, game, index);
    this.counter = 0;
  }

  draw() {
    if (this.counter % 30 == 0) this.move();
    this.game.ctx.fillStyle = 'green';
    this.game.ctx.fillRect(this.index.x * this.game.cellWidth, this.index.y * this.game.cellHeight, this.width, this.height);
    this.counter++;
  }

  move() {
    let move = this.game.createMove(this.index);
    this.game.grid[move.y][move.x] = this;
    this.game.grid[this.index.y][this.index.x] = null;
    this.index = move;
  }
}


let legend = {
  "#": Wall,
  "o": Critter,
};


class Game {
  constructor(plan, legend) {
    this.plan = plan;
    this.legend = legend;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.cellWidth = this.canvas.width / this.plan[0].length;
    this.cellHeight = this.canvas.height / this.plan.length;
    this.grid = this.createGrid();
    this.directions = [[-1, 0], [-1, 1], [0, 1], [1, 1],  [1, 0], [1, -1],  [0, -1], [-1, -1]];
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createGrid() {
    let rows = [],
        row = [];
    for(let i = 0; i < this.plan.length; i++) {
      for(let j = 0; j < this.plan[i].length; j++) {
        let cell = this.plan[i][j];
        if(cell !== " ") row.push(new this.legend[cell](this.cellWidth, this.cellHeight, this, {y: i, x: j}));
        else row.push(null);
      }
      rows.push(row);
      row = [];
    }
    return rows;
  }

  drawGrid() {
    for(let y = 0; y < this.grid.length; y++) {
      for(let x = 0; x < this.grid[y].length; x++) {
        let cell = this.grid[y][x];
        if(cell !== null) cell.draw();
      }
    }
  }

  createMove(index) {
    let random_direction, direction;
    while (true) {
      random_direction = this.randomElement(this.directions);
      direction = this.plus(index, random_direction);
      if (this.access(direction) == null) break;
    }
    return direction;
  }

  randomElement(massive) {
    return massive[Math.floor(Math.random() * massive.length)];
  }

  plus(index, direction) {
    return {
      x: index.x + direction[0],
      y: index.y + direction[1]
    };
  }

  access(direction) {
    return this.grid[direction.y][direction.x];
  }
}


let game = new Game(plan, legend);

function tick() {
  game.clear();
  game.drawGrid();
  requestAnimationFrame(tick);
}
tick();
