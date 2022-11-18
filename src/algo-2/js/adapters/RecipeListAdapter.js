import { myInArray } from '../utils/helpers';

export default class RecipeListAdapter {
  constructor(recipes) {
    this.recipes = recipes;
  }

  /**
   * Get single elements from the given list (delete duplicates).
   *
   * @returns {Array} Recipes list with single elements
   */
  getSingleElements() {
    const listId = [];
    const list = [];

    for (const recipe of this.recipes) {
      const keyLabel = Object.keys(recipe)[0];
      const recipeObject = recipe[keyLabel];

      if (!myInArray(listId, recipeObject.id)) {
        listId.push(recipeObject.id);
        list.push(recipe);
      }
    }

    return list;
  }
}
