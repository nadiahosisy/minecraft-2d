class Inventory {
  constructor(game, type) {
    this.game = game;
    this.type = type;
    this.inventoryElement = document.createElement("div");
    this.inventoryElement.className = "inv " + this.type;
    this.inventoryElement.innerHTML = `<img src='http://itc.yananas.com/git/minecraft/images/${this.type}.png'>`;
    const countingElement = document.createElement("span");
    this.inventoryElement.appendChild(countingElement);
    this.game.inventoryCounter[this.type]++;
    if (!document.querySelector(`.inventory-container .${this.type}`)) {
      document
        .querySelector(".inventory-container")
        .appendChild(this.inventoryElement);
    }
    this.inventoryElement.querySelector(`.${this.type} span`).textContent =
      this.game.inventoryCounter[this.type];
    this.inventoryElement.addEventListener(
      "click",
      this.handleInventoryClick.bind(this)
    );
  }

  handleInventoryClick() {
    this.game.selectedTool = [];
    const inv = document.querySelectorAll("div");
    inv.forEach((tool) => tool.classList.remove("active"));
    this.inventoryElement.classList.add("active");
    document.getElementById(
      "map"
    ).style.cursor = `url(http://itc.yananas.com/git/minecraft/images/cursors/${this.type}.png), auto`;
    this.game.selectedInventory = this.type;
  }
}
