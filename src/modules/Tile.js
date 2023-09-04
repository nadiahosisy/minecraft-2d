import Inventory from "./Inventory.js";

export default class Tile {
  constructor(game, type, x, y) {
    this.game = game;
    this.type = type;
    this.coordinates = [x, y];
    this.tileHolder = document.createElement("div");
    this.tileHolder.className = "tile " + this.type;
    this.tileHolder.style.backgroundImage = `url('../assets/images/${this.type}.png')`;
    document.getElementById("map").appendChild(this.tileHolder);
    this.tileHolder.addEventListener("click", this.handleTileClick.bind(this));
  }

  changeType(type) {
    this.type = type;
    this.tileHolder.style.backgroundImage = `url('../assets/images/${this.type}.png')`;
    this.tileHolder.className = "tile " + this.type;
  }

  handleTileClick() {
    // Handling selected tool action
    for (let i = 0; i < this.game.selectedTool.length; i++) {
      const targettile = this.game.selectedTool[i];
      if (targettile === this.type) {
        if (!this.game.inventoryCounter[this.type]) {
          this.game.inventoryCounter[this.type] = 0;
        }
        new Inventory(this.game, targettile);
        // Assuming Inventory class handles addition to inventory
        //this.game.inventory.updateDisplay(this.type);

        const inventoryCounterElement = document.querySelector(
          `.${this.type} span`
        );
        if (inventoryCounterElement) {
          inventoryCounterElement.textContent =
            this.game.inventoryCounter[this.type];
        }
        this.changeType("blank");
      }
    }

    // Handling tile replacement from inventory

    if (
      this.game.selectedInventory &&
      this.game.inventoryCounter[this.game.selectedInventory]
    ) {
      if (this.type === "blank") {
        this.changeType(this.game.selectedInventory);

        this.game.inventoryCounter[this.game.selectedInventory]--;
        const inventoryCounterElement = document.querySelector(
          `.${this.type} span`
        );
        if (inventoryCounterElement) {
          inventoryCounterElement.textContent =
            this.game.inventoryCounter[this.game.selectedInventory];
        }
        if (this.game.inventoryCounter[this.game.selectedInventory] === 0) {
          this.game.selectedInventory = null;
          document.getElementById("map").style.cursor = "auto";
          const inventoryElement = document.querySelector(
            `.inventory-container .${this.type}`
          );
          if (inventoryElement) {
            inventoryElement.remove();
          }
        }
      }
    }
  }
}
