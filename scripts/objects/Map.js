var Map = function (game) {
    this.mapLayers = {};
    this.map = {};
    this.checkpoints = [];
}
Map.prototype.createMap = function () {
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('tiles');

    this.mapLayers['grass'] = this.map.createLayer('Grass');
    this.mapLayers['road'] = this.map.createLayer('Road');
    this.mapLayers['collision'] = this.map.createLayer('Collision');

    this.mapLayers['road'].resizeWorld();

    this.map.setCollisionBetween(1, 25, true, this.mapLayers['collision']);

    this.parseCheckpoints(this.mapLayers['road'].layer.properties);
}
Map.prototype.parseCheckpoints = function (properties) {
    for (var tile in properties) {
        var position = properties[tile].split(',');
        this.checkpoints.push({
            x: parseInt(position[0]),
            y: parseInt(position[1])
        })
    }
}