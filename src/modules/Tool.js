export default class Tool {
  constructor(game, type, approachedTile) {
    this.game = game;
    this.type = type;
    this.approachedTile = approachedTile;
    this.toolHolder = document.createElement("div");
    this.toolHolder.className = "tool " + this.type;
    this.toolHolder.innerHTML = `<img src='../assets/images/${this.type}.png'>`;
    document.querySelector(".tools-container").appendChild(this.toolHolder);
    this.toolHolder.addEventListener("click", this.handleToolClick.bind(this));
  }

  handleToolClick() {
    this.game.selectedInventory = null;
    this.game.selectedTool = [];
    this.game.selectedTool = this.approachedTile;
    const divs = document.querySelectorAll("div");
    divs.forEach((div) => div.classList.remove("active"));
    this.toolHolder.classList.add("active");
    document.getElementById(
      "map"
    ).style.cursor = `url('../assets/cursors/${this.type}.cur'), auto`;
  }
}
