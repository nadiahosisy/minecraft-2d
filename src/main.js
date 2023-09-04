import Game from "../src/modules/Game.js";
document
  .querySelector(".game-button-green")
  .addEventListener("click", function () {
    const game = new Game();
    document.querySelector(".main-div").style.display = "none";
    document.querySelector("html").style.fontSize = "100%";
    const gameStartView = document.getElementById("game-start-view");
    if (gameStartView) {
      gameStartView.parentNode.removeChild(gameStartView);
    }
    // Reset and start the game if it's already been initialized before
    game.start();
  });
