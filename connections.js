var lastId = 0;

module.exports = class Connections {
  constructor() {
    this.connections = {};
  }

  add(connection) {
    var id = lastId++;
    this.connections[id] = connection; 
    return id;
  }

  delete(id) {
    delete this.connections[id];
  }

  all() {
    return Object.values(this.connections);
  }
}

