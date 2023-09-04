export default class Button {
  constructor(game) {
    this.game = game;
    this.setupButtonHandlers();
  }

  setupButtonHandlers() {
    document.querySelector(".reset").addEventListener("click", () => {
      document.getElementById("container").remove();
      this.game.allTiles = [];
      this.game.selectedTool = [];
      this.game.inventoryCounter = {};
      this.game.start();
    });
  }
}
