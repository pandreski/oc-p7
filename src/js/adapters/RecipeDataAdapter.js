export default class RecipeDataAdapter {
  constructor(data) {
    this.data = data;
  }

  /**
   * Get data dictionary with recipe's name as a key
   * @return {Object} formatted data object
   */
  get formattedData() {
    return this.data.map(this.formatter);
  }

  /**
   * @param {Object} recipe plain recipe object
   * @returns {Object} formatted recipe object with "name" value as a key
   */
  formatter(recipe) {
    return {
      [recipe.name]: recipe,
    };
  }
}
