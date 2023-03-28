export default class PokeApi {
  constructor() {
    this.base = '/assets/data/';
  }

  async request(path) {
    let response = await fetch(this.base + path);
    return await response.json();
  }

  async getPokemon(identifier) {
    return await this.request(identifier + ".json");
  }

  async getList(limit) {
    return await this.request("list.json");
  }

  async getSpecies(identifier) {
    return await this.request("species.json");
  }

}