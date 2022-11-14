import SearchDropdown from '../factory/SearchDropdown';
import Tag from '../templates/Tag';
import RecipeCategorySearch from './CategorySearch';
import RecipeListAdapter from '../adapters/RecipeListAdapter';
import RecipeCard from '../templates/RecipeCard';
import EmptyResult from '../templates/EmptyResult';
import Recipe from '../models/Recipe';

export default class SearchFilters {
  constructor(Recipes) {
    this.Recipes = Recipes;
    this.recipesWrapper = document.querySelector('.recipes-listing');
    this.tagWrapper = document.querySelector('.secondary-filters .tags');
    this.dropdownElements = document.querySelectorAll('.dropdown');
    this.activeFilters = {
      ingredients: [],
      appliance: [],
      ustensils: [],
    };
    this.remainingFilters = {
      ingredients: [],
      appliance: [],
      ustensils: [],
    };
  }

  handleFilterInput(e) {
    if (e.code === 'Space') {
      e.preventDefault();
      e.target.value += ' ';
    }
  }

  initSearchDropdown() {
    this.dropdownElements.forEach((dropdown) => {
      const searchDropdown = new SearchDropdown(dropdown);
      const identifier = dropdown.getAttribute('data-identifier');
      const input = dropdown.querySelector('input');

      switch (identifier) {
        case 'ingredients':
          this.updateList(this.getUniqueElements(this.Recipes.byIngredient), dropdown);
          break;
        case 'appliance':
          this.updateList(this.getUniqueElements(this.Recipes.byAppliance), dropdown);
          break;
        case 'ustensils':
          this.updateList(this.getUniqueElements(this.Recipes.byUstensil), dropdown);
          break;
        default:
          break;
      }

      dropdown.addEventListener('shown.bs.dropdown', () => {
        searchDropdown.handleShow();
        input.addEventListener('keydown', this.handleFilterInput);
      });

      dropdown.addEventListener('hide.bs.dropdown', () => {
        searchDropdown.handleHide();
        input.value = '';
        input.removeEventListener('keydown', this.handleFilterInput);
      });
    });
  }

  resetRemainingFilters() {
    this.remainingFilters = {
      ingredients: [],
      appliance: [],
      ustensils: [],
    };
  }

  /**
   * Update filters in dropdowns
   *
   * @param {Array} remainingRecipes  Array of recipes actually fitting with current filters
   */
  updateRemainingFilters(remainingRecipes) {
    this.resetRemainingFilters();

    remainingRecipes.forEach((recipe) => {
      const keyLabel = Object.keys(recipe)[0];
      const RecipeObj = new Recipe(recipe[keyLabel]);

      // Check for each filter if this one is already selected.
      // Also check if the filter is already in the "remainingFilters" object.
      // Then, do not include it.
      const activeIngredients = this.lowerCaseList(this.activeFilters.ingredients);
      const activeAppliance = this.lowerCaseList(this.activeFilters.appliance);
      const activeUstensils = this.lowerCaseList(this.activeFilters.ustensils);

      RecipeObj.ingredients.forEach((ingredient) => {
        if (
          !this.remainingFilters.ingredients.includes(ingredient.ingredient.toLowerCase())
          && !activeIngredients.includes(ingredient.ingredient.toLowerCase())
        ) {
          this.remainingFilters.ingredients.push(ingredient.ingredient.toLowerCase());
        }
      });

      if (
        !this.remainingFilters.appliance.includes(RecipeObj.appliance.toLowerCase())
        && !activeAppliance.includes(RecipeObj.appliance.toLowerCase())
      ) {
        this.remainingFilters.appliance.push(RecipeObj.appliance.toLowerCase());
      }

      RecipeObj.ustensils.forEach((ustensil) => {
        if (
          !this.remainingFilters.ustensils.includes(ustensil.toLowerCase())
          && !activeUstensils.includes(ustensil.toLowerCase())
        ) {
          this.remainingFilters.ustensils.push(ustensil.toLowerCase());
        }
      });
    });

    this.dropdownElements.forEach((dropdown) => {
      const identifier = dropdown.getAttribute('data-identifier');
      this.updateList(this.upperCaseList(this.remainingFilters[identifier]), dropdown);
    });
  }

  /**
   * Add filter in the "activeFilters" object, inside the correct category.
   *
   * @param {*} filterName  Filter's name
   * @param {*} category    Filter's category
   */
  setActiveFilter(filterName, category) {
    this.activeFilters[category].push(filterName);
    this.search();
  }

  /**
   * Remove filter from the "activeFilters" object, regarding its category.
   *
   * @param {*} filterName  Filter's name
   * @param {*} category    Filter's category
   */
  removeActiveFilter(filterName, category) {
    const index = this.activeFilters[category].findIndex((elem) => elem === filterName);
    this.activeFilters[category].splice(index, 1);
  }

  /**
   * Instantiate search regarding the selected filters
   */
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
          QuerySearch = new RecipeCategorySearch(this.Recipes.byIngredient);
          break;
        case 'appliance':
          QuerySearch = new RecipeCategorySearch(this.Recipes.byAppliance);
          break;
        case 'ustensils':
          QuerySearch = new RecipeCategorySearch(this.Recipes.byUstensil);
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

    if (matchingRecipes.length) {
      this.displayRecipes(matchingRecipes); // display filtered recipes
    } else {
      this.displayRecipes(this.Recipes.byName); // display all recipes
    }
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

  /**
   * Display recipes in the results section.
   *
   * @param {Array} Recipes   Array of Recipes objects
   */
  displayRecipes(Recipes) {
    this.clearRecipesWrapper();
    const recipesAdapter = new RecipeListAdapter(Recipes);
    const singleRecipesList = recipesAdapter.getSingleElements();

    // Update available filters in dropdowns
    this.updateRemainingFilters(singleRecipesList);

    if (singleRecipesList.length) {
      singleRecipesList.forEach((elem) => {
        const Template = new RecipeCard(elem);
        this.recipesWrapper.appendChild(Template.createRecipeCard());
      });
    } else {
      this.recipesWrapper.innerHTML = EmptyResult();
    }
  }

  /**
   * Delete all recipes from the results section.
   */
  clearRecipesWrapper() {
    this.recipesWrapper.innerHTML = '';
  }

  /**
   * Uppercase the first letter of all elements from the list given as parameter.
   *
   * @param {Array} list  Array of string elements
   * @returns {Array}     Array of string elements
   */
  upperCaseList(list) {
    return list.map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1));
  }

  /**
   * Lowercase all elements from the list given as parameter.
   *
   * @param {Array} list  Array of string elements
   * @returns {Array}     Array of string elements
   */
  lowerCaseList(list) {
    return list.map((elem) => elem.toLowerCase());
  }

  /**
  * Delete duplicated elements from the list.
  * Uppercase the first letter of each element.
  *
  * @param {Array} list   Array of objects with value as key
  * @returns {Array}      Array of single key elements
  */
  getUniqueElements(list) {
    let uniqueData = list.map((elem) => Object.keys(elem)[0]);
    uniqueData = [...new Set(uniqueData)];
    uniqueData = this.upperCaseList(uniqueData);
    return uniqueData;
  }

  /**
   * Update dropdown listing with given data.
   *
   * @param {Array} data      Recipe list
   * @param {Node} dropdown   Dropdown element
   */
  updateList(data, dropdown) {
    const dataDom = data.map((option) => `<li class="col-md-4 item"><button>${option}</button></li>`).join('');
    const listWrapper = dropdown.querySelector('.items-list');
    const identifier = dropdown.getAttribute('data-identifier');

    listWrapper.innerHTML = dataDom;
    listWrapper.querySelectorAll('.item button').forEach((elem) => {
      elem.addEventListener('click', (e) => {
        const tag = new Tag(e.target.innerText, identifier);
        const tagDOM = tag.create();

        this.setActiveFilter(e.target.innerText, identifier);

        const that = this;

        tagDOM.querySelector('.delete').addEventListener('click', this.onTagDelete.bind(that));
        that.tagWrapper.append(tagDOM);
      });
    });
  }

  onTagDelete(e) {
    const label = e.target.parentNode.querySelector('.label').innerText;
    const category = e.target.parentNode.getAttribute('data-category');

    this.removeActiveFilter(label, category);
    e.target.parentNode.remove();
    this.search();
  }

  render() {
    this.initSearchDropdown();
  }
}
