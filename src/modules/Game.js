import constants from "../models/constants.js";
import World from "./World.js";
import Button from "./Button.js";
import Tool from "./Tool.js";
import Element from "./UI.js";
const { AXE_REMOVAL, SHOVEL_REMOVAL, PICKAXE_REMOVAL, ERASER_REMOVAL } =
  constants;
export default class Game {
  constructor() {
    this.allTiles = [];
    this.selectedWidth = 1500;
    this.selectedTool = [];
    this.selectedInventory = null;
    this.inventoryCounter = {};
    this.oneLine = this.selectedWidth / 50;
    this.buttons;
  }

  start() {
    let letsPlay = new World(this);
    letsPlay.generateWorld(); //generating all divs
    letsPlay.generateTile(); //generating all tiles
    this.initializeTools(); //generating all tools
    this.buttons = new Button(this);

    new Element(this, letsPlay, this.selectedWidth).generateElements(); // this is UI class - dynamic elements (Trees , Clouds..)
  }

  random(min, max, excluded) {
    let n = Math.floor(Math.random() * (max - min) + min);
    if (n >= excluded) n++;
    return n;
  }

  initializeTools() {
    new Tool(this, "axe", AXE_REMOVAL);
    new Tool(this, "shovel", SHOVEL_REMOVAL);
    new Tool(this, "pickaxe", PICKAXE_REMOVAL);
    new Tool(this, "eraser", ERASER_REMOVAL);
  }
}
