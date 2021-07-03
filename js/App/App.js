import Pokemon from "./Pokemon.js";

export default class App {
  constructor(poke_api, cache, audio) {
    this.body = document.querySelector('body');
    this.flickity_el = document.querySelector('div.js-flickity');
    this.pokeApi = poke_api;
    this.cache = cache;
    this.audio = audio;
  }

  init() {
    // Add slides.
    for (let i = 1; i <= 151; i++) {
      let slide = document.createElement('div');
      slide.classList.add(...['slide']);
      this.flickity_el.appendChild(slide);
    }

    // Init flickity.
    this.flickity = new Flickity(this.flickity_el, {
      cellSelector: '.slide',
      pageDots: false,
      prevNextButtons: false,
      percentPosition: false,
      draggable: true,
      cellAlign: 'left',
      contain: true
    });
  }

  toggleAudio() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  lazyLoadBackground() {
    let thisBody = this.body;
    // Lazy load high def version of background.
    window.onload = () => {
      let img = new Image();

      // Assign an onLoad handler to the dummy image *before* assigning the src
      img.onload = () => {
        thisBody.style.backgroundImage = 'url(' + thisBody.dataset.background + ')';
      };
      // Finally, trigger the whole preloading chain by giving the dummy
      // image its source.
      img.src = thisBody.dataset.background;
    };
  }

  async updatePokeInfo(id) {
    let index = id - 1;

    // Fetch pokemon from cache.
    let pokemon = this.cache.getPokemon(id);

    if (!pokemon) {
      // Not cached yet, fetch from API.
      let api_pokemon = await this.pokeApi.getPokemon(id);
      let api_species = await this.pokeApi.getSpecies(id);

      pokemon = Pokemon.createFromApi(api_pokemon, api_species);
      this.cache.addPokemon(id, pokemon);
    }

    this.flickity.cells[index].element.style.backgroundImage = 'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + id + '.svg)';
    this.flickity.cells[index].element.style.backgroundColor = this.getPokedexHexColor(pokemon.getColor());
  }

  async populatePokeList(el) {
    let list = await this.pokeApi.getList(151);
    list.results.forEach((item, index) => {
      let c = document.createElement('div');
      c.dataset.pokeIndex = (index + 1);
      c.classList.add(...['cursor-pointer']);
      c.innerHTML = '#' + (index + 1) + ' ' + item.name;
      el.appendChild(c);
    });
  }

  getPokedexHexColor(color) {
    let colors = new Map([
      ['black', '#111111'],
      ['blue', '#2196F3'],
      ['brown', '#A1887F'],
      ['gray', '#BBBBBB'],
      ['green', '#4CAF50'],
      ['pink', '#E91E63'],
      ['purple', '#9C27B0'],
      ['red', '#F44336'],
      ['white', '#FFFFFF'],
      ['yellow', '#FFC107'],
    ]);

    return colors.get(color);
  }
}