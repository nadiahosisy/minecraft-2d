export default class Element {
  constructor(game, gameMap, width) {
    this.game = game;
    this.gameMap = gameMap;
    this.numberOfDivsInRow = width / 50;
    this.randomArray = new Array(this.game.oneLine + 1)
      .fill(null)
      .map(() => Math.floor(Math.random() * 1 + 2));

    this.randomNumTrees1 = Math.floor(Math.random() * this.numberOfDivsInRow);
    this.randomNumTrees2 = Math.floor(Math.random() * this.numberOfDivsInRow);
    this.randomNumCloudsX = Math.floor(Math.random() * this.numberOfDivsInRow);
    this.randomNumCloudsY = Math.floor(Math.random() * 3);
    // Define specific tree and cloud coordinates
    this.treeCoordinates1 = [
      [this.randomNumTrees1, this.game.ground],
      [this.randomNumTrees1, this.game.ground - 1],
    ];
    this.treeCoordinates2 = [
      [this.randomNumTrees2, this.game.ground],
      [this.randomNumTrees2, this.game.ground - 1],
    ];

    this.cloudCoordinates = [
      [this.randomNumCloudsX, this.randomNumCloudsY],
      [this.randomNumCloudsX + 1, this.randomNumCloudsY],
      [this.randomNumCloudsX + 2, this.randomNumCloudsY],
      [this.randomNumCloudsX + 3, this.randomNumCloudsY],
      [this.randomNumCloudsX + 1, this.randomNumCloudsY + 1],
      [this.randomNumCloudsX + 2, this.randomNumCloudsY + 1],
      [this.randomNumCloudsX + 3, this.randomNumCloudsY + 1],
      [this.randomNumCloudsX + 4, this.randomNumCloudsY + 1],
      [this.randomNumCloudsX + 6, this.randomNumCloudsY + 1],
      [this.randomNumCloudsX + 4, this.randomNumCloudsY + 2],
      [this.randomNumCloudsX + 3, this.randomNumCloudsY + 2],
    ];
  }

  generateTerrain(tile, terrain, ground) {
    for (let terrainIndex = 0; terrainIndex < terrain.length; terrainIndex++) {
      const [terrainX, terrainY] = [
        terrainIndex,
        ground + terrain[terrainIndex] - 1,
      ];
      const tileCoordinates = tile.coordinates.toString();
      const terrainCoordinates = [terrainX, terrainY].toString();

      if (tileCoordinates === terrainCoordinates) {
        tile.changeType("grass");

        // Change the tile below to dirt
        const dirtTile = this.game.allTiles.find(
          (b) =>
            b.coordinates.toString() ===
            [terrainX, ground + terrain[terrainIndex]].toString()
        );

        if (dirtTile) {
          dirtTile.changeType("dirt");
        }
      }
    }
  }

  generateClouds(tile) {
    for (const cloudCoord of this.cloudCoordinates) {
      const [cloudX, cloudY] = cloudCoord;
      const tileCoordinates = tile.coordinates.toString();
      const cloudCoordinates = [cloudX, cloudY].toString();

      if (tileCoordinates === cloudCoordinates) {
        tile.changeType("cloud");
      }
    }
  }

  generateTrees1(tile) {
    for (const treeCoord of this.treeCoordinates1) {
      const [treeX, treeY] = treeCoord;
      const tileCoordinates = tile.coordinates.toString();
      const treeCoordinates = [treeX, treeY].toString();

      if (tileCoordinates === treeCoordinates) {
        // Set the entire tree
        tile.changeType("tree");

        // Generate leaves around the tree
        for (let line = 0; line < 3; line++) {
          for (let p = -1; p < 2; p++) {
            const leafX = treeX + p;
            const leafY = treeY - 2 - line;
            const leafCoordinates = [leafX, leafY].toString();

            const leafTile = this.game.allTiles.find(
              (t) => t.coordinates.toString() === leafCoordinates
            );

            if (leafTile) {
              leafTile.changeType("leaf");
            }
          }
        }
      }
    }
  }
  generateTrees2(tile) {
    for (const treeCoord of this.treeCoordinates2) {
      const [treeX, treeY] = treeCoord;
      const tileCoordinates = tile.coordinates.toString();
      const treeCoordinates = [treeX, treeY].toString();

      if (tileCoordinates === treeCoordinates) {
        // Set the entire tree
        tile.changeType("tree");

        // Generate leaves around the tree
        for (let line = 0; line < 3; line++) {
          for (let p = -1; p < 2; p++) {
            const leafX = treeX + p;
            const leafY = treeY - 2 - line;
            const leafCoordinates = [leafX, leafY].toString();

            const leafTile = this.game.allTiles.find(
              (t) => t.coordinates.toString() === leafCoordinates
            );

            if (leafTile) {
              leafTile.changeType("leaf");
            }
          }
        }
      }
    }
  }

  generateElements() {
    const ground = this.game.ground;

    this.game.allTiles.forEach((tile) => {
      this.generateTerrain(tile, this.randomArray, ground);
      this.generateClouds(tile);
      this.generateTrees1(tile);
      this.generateTrees2(tile);
    });
  }
}
