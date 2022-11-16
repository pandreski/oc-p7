import { myIncludes } from '../utils/helpers';
import Search from './Search';

export default class FilterCategorySearch extends Search {
  /**
   * Get all corresponding results from a query.
   * May contain duplicate entries.
   *
   * @param {String} query  Search query
   * @returns {Array}       List of corresponding results
   */
  filterRecipes(query) {
    let res = [];

    if (!query.length) { return this.Recipes; }

    for (const recipe of this.Recipes) {
      if (myIncludes(recipe.toLowerCase(), query.toLowerCase())) {
        res = [...res, recipe];
      }
    }

    return res;
  }
}
