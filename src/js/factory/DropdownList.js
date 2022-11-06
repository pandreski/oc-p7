export default class DropdownList {
  constructor(data) {
    this.recipesData = data;
  }

  /**
   * Delete duplicated elements from the list.
   *
   * @param {Array} list Plain list
   * @returns {Array} List with only single elements
   */
  getUniqueElements(list) {
    let uniqueData = list.map((elem) => elem.toLowerCase());
    uniqueData = [...new Set(uniqueData)];
    uniqueData = uniqueData.map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1));
    return uniqueData;
  }

  /**
   * Get a list of options
   *
   * @param {String} listName Dropdown option name
   * @returns {Array} List of all options available for the given dropdown
   */
  getList(listName) {
    const dropdownElement = document.querySelector(`.dropdown[data-identifier="${listName}"]`);
    let listAll = [];

    if (!dropdownElement) {
      console.error('[data-identifier="%s"] not found for ".dropdown" element.', listName);
      return null;
    }

    this.recipesData.forEach((element) => {
      const keyLabel = Object.keys(element)[0];
      const recipeObject = element[keyLabel];

      switch (listName) {
        case 'ingredients':
          recipeObject.ingredients.map((elem) => listAll.push(elem.ingredient));
          break;
        case 'appliance':
          listAll.push(recipeObject.appliance);
          break;
        case 'ustensils':
          recipeObject.ustensils.map((elem) => listAll.push(elem));
          break;
        default:
          break;
      }
    });

    return this.getUniqueElements(listAll);
  }
}
