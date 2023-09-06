import Tile from "./Tile.js";
export default class World {
  constructor(game) {
    this.game = game;
    this.x = 1;
    this.y = 0;
  }

  generateWorld() {
    // Create the main container
    const container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);

    // Create the left panel
    const leftPanel = document.createElement("div");
    leftPanel.id = "leftPanel";
    container.appendChild(leftPanel);

    // Create the game map div
    const gameMapDiv = document.createElement("div");
    gameMapDiv.id = "gameMap";
    container.appendChild(gameMapDiv);

    const mapHolder = document.createElement("div");
    mapHolder.id = "map";
    mapHolder.style.width = `${this.game.selectedWidth}px`;

    // Append mapHolder to gameMapDiv instead of directly to body
    gameMapDiv.appendChild(mapHolder);

    const toolContainer = document.createElement("div");
    toolContainer.className = "tools-container bgholder";
    leftPanel.appendChild(toolContainer);
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container bgholder";
    modalContainer.addEventListener("click", function () {
      const modal = document.querySelector(".inventory-container");
      if (modal.style.display === "flex") {
        modal.style.display = "none";
      } else {
        modal.style.display = "flex";
      }
    });

    const inventoryContainer = document.createElement("div");
    inventoryContainer.className = "inventory-container bgholder ";
    leftPanel.appendChild(inventoryContainer);

    leftPanel.appendChild(modalContainer);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-container bgholder";
    const resetButton = document.createElement("div");
    resetButton.className = "reset";
    resetButton.innerHTML = `<img src='../assets/images/reset.png'>`;

    buttonsContainer.appendChild(resetButton);
    leftPanel.appendChild(buttonsContainer);
  }

  generateLines(tileType, lines) {
    for (let i = 0; i < lines; i++) {
      this.x += 1;
      if (i % this.game.oneLine === 0) {
        this.y += 1;
        this.x = 1;
      }
      this.game.allTiles.push(new Tile(this.game, tileType, this.x, this.y));
    }
    // Assuming "blank" tile type is used to determine ground level
    if (tileType === "blank") {
      this.game.ground = this.y - 1;
    }
  }

  generateTile() {
    this.generateLines("blank", this.game.selectedWidth / 5);
    this.generateLines("dirt", this.game.selectedWidth / 10);
    this.generateLines("rock", this.game.oneLine);
    this.generateLines("lava", this.game.oneLine);
  }
}
