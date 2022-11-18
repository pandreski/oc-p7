export default class Search {
  constructor(Recipes) {
    this.Recipes = Recipes;
  }

  search(query) {
    return this.filterRecipes(query);
  }
}
