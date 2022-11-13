import SearchDropdown from '../factory/SearchDropdown';
import Tag from '../factory/Tag';
import RecipeQuerySearch from './QuerySearch';
import RecipeListAdapter from '../adapters/RecipeListAdapter';
import RecipeCard from '../templates/RecipeCard';
import EmptyResult from '../templates/EmptyResult';
import Recipe from '../models/Recipe';

export default class SearchFilters {
  constructor(Recipes) {
    this.Recipes = Recipes;
    this.recipesWrapper = document.querySelector('.recipes-listing');
    this.activeFilters = {
      ingredients: [],
      appliance: [],
      ustensils: [],
    };
  }

  initSearchDropdown() {
    const dropdownElements = document.querySelectorAll('.dropdown');

    dropdownElements.forEach((dropdown) => {
      const searchDropdown = new SearchDropdown(dropdown);
      const identifier = dropdown.getAttribute('data-identifier');

      switch (identifier) {
        case 'ingredients':
          this.updateList(this.Recipes.byIngredient, dropdown);
          break;
        case 'appliance':
          this.updateList(this.Recipes.byAppliance, dropdown);
          break;
        case 'ustensils':
          this.updateList(this.Recipes.byUstensil, dropdown);
          break;
        default:
          break;
      }

      dropdown.addEventListener('shown.bs.dropdown', () => {
        searchDropdown.handleShow();
      });

      dropdown.addEventListener('hide.bs.dropdown', () => {
        searchDropdown.handleHide();
      });
    });
  }

  setActiveFilter(filterName, category) {
    this.activeFilters[category].push(filterName);
    this.search();
  }

  search() {
    const activeFiltersDictionary = Object.entries(this.activeFilters);
    const matchingFilters = []; // List of recipes having at least 1 matching filter

    activeFiltersDictionary.forEach((elem) => {
      let QuerySearch;

      if (!elem[1].length) {
        return;
      }

      switch (elem[0]) {
        case 'ingredients':
          QuerySearch = new RecipeQuerySearch(this.Recipes.byIngredient);
          break;
        case 'appliance':
          QuerySearch = new RecipeQuerySearch(this.Recipes.byAppliance);
          break;
        case 'ustensils':
          QuerySearch = new RecipeQuerySearch(this.Recipes.byUstensil);
          break;
        default:
          break;
      }

      if (!QuerySearch) {
        return;
      }

      elem[1].forEach((query) => {
        const queryResults = QuerySearch.search(query);
        queryResults.forEach((res) => matchingFilters.push(res));
      });
    });

    const matchingRecipes = this.getMatchingRecipes(matchingFilters);
    this.displayRecipes(matchingRecipes);
  }

  /**
   * Get all recipes matching with all active filters (ingredients, appliance, ustensils).
   *
   * @param {Array} recipes   Recipes with at least one matching filter
   * @returns {Array}         Recipes with all matching filters
   */
  getMatchingRecipes(recipes) {
    const matchingRecipes = [];

    recipes.forEach((recipe) => {
      const keyLabel = Object.keys(recipe)[0];
      const RecipeObj = new Recipe(recipe[keyLabel]);
      const recipeIngredients = RecipeObj.ingredientsName.map((elem) => elem.toLowerCase());
      const recipeUstensils = RecipeObj.ustensils.map((elem) => elem.toLowerCase());
      let ingredientsMatching = true;
      let applianceMatching = true;
      let ustensilsMatching = true;

      if (this.activeFilters.ingredients.length) {
        ingredientsMatching = this.activeFilters.ingredients
          .every((elem) => recipeIngredients.includes(elem.toLowerCase()));
      }

      if (this.activeFilters.appliance.length) {
        applianceMatching = this.activeFilters.appliance
          .every((elem) => RecipeObj.appliance.toLowerCase() === elem.toLowerCase());
      }

      if (this.activeFilters.ustensils.length) {
        ustensilsMatching = this.activeFilters.ustensils
          .every((elem) => recipeUstensils.includes(elem.toLowerCase()));
      }

      if (ingredientsMatching && applianceMatching && ustensilsMatching) {
        matchingRecipes.push(recipe);
      }
    });

    return matchingRecipes;
  }

  displayRecipes(Recipes) {
    this.clearRecipesWrapper();
    const recipesAdapter = new RecipeListAdapter(Recipes);
    const singleRecipesList = recipesAdapter.getSingleElements();

    if (singleRecipesList.length) {
      singleRecipesList.forEach((Recipe) => {
        const Template = new RecipeCard(Recipe);
        this.recipesWrapper.appendChild(Template.createRecipeCard());
      });
    } else {
      this.recipesWrapper.innerHTML = EmptyResult();
    }
  }

  clearRecipesWrapper() {
    this.recipesWrapper.innerHTML = '';
  }

  /**
  * Delete duplicated elements from the list.
  * Uppercase the first letter of each element.
  *
  * @param {Array} list Array of objects with value as key
  * @returns {Array} Array of single key elements
  */
  getUniqueElements(list) {
    let uniqueData = list.map((elem) => Object.keys(elem)[0]);
    uniqueData = [...new Set(uniqueData)];
    uniqueData = uniqueData.map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1));
    return uniqueData;
  }

  /**
   * Update dropdown listing with given data.
   *
   * @param {Array} data      Recipe list
   * @param {Node} dropdown   Dropdown element
   */
  updateList(data, dropdown) {
    const sortedData = this.getUniqueElements(data);
    const dataDom = sortedData.map((option) => `<li class="col-md-4 item"><button>${option}</button></li>`).join('');
    const listWrapper = dropdown.querySelector('.items-list');
    const identifier = dropdown.getAttribute('data-identifier');

    listWrapper.innerHTML = dataDom;
    listWrapper.querySelectorAll('.item button').forEach((elem) => {
      elem.addEventListener('click', (e) => {
        const tag = new Tag(e.target.innerText, identifier);
        tag.create();
        // TODO: update results
        this.setActiveFilter(e.target.innerText, identifier);
        // TODO: update all dropdown choices
      });
    });
  }

  onFilterSearch() {
    // TODO:
  }

  render() {
    this.initSearchDropdown();
  }
}
