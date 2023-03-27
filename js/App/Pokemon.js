export default class Pokemon {

  constructor(id, name, color, infoBox, images, types, sprite) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._infoBox = infoBox;
    this._images = images;
    this._types = types;
    this._sprite = sprite;
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getColor() {
    return this._color;
  }

  getInfoBox(){
    return this._infoBox
  }

  getImages() {
    return this._images;
  }

  getTypes() {
    return this._types;
  }

  getSprite() {
    return this._sprite;
  }

  static createFromApi(api_pokemon) {
    return new Pokemon(
      api_pokemon.id,
      api_pokemon.name,
      api_pokemon.color.name,
      api_pokemon.infoBox,
      api_pokemon.images.map((image) => {
        return image.image.url;
      }),
      api_pokemon.types.map((type) => {
        return type.type.name;
      }),
      api_pokemon.sprites
    );
  }

  static createFromCache(data) {
    return new Pokemon(
      data._id,
      data._name,
      data._color,
      data._infoBox,
      data._images,
      data._types,
      data._sprite
    );
  }

}