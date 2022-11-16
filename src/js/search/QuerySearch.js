import { myIncludes } from '../utils/helpers';
import Search from './Search';

export default class RecipeQuerySearch extends Search {
  /**
   * Get all corresponding results from a query.
   * May contain duplicate entries.
   *
   * @param {String} query  Search query
   * @returns {Array}       List of corresponding results
   */
  filterRecipes(query) {
    let res = [];

    for (const recipe of this.Recipes) {
      if (myIncludes(Object.keys(recipe)[0], query.toLowerCase())) {
        res = [...res, recipe];
      }
    }

    return res;
  }
}
