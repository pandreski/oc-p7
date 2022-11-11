import RecipeGlobalSearch from './GlobalSearch';
import RecipeCard from '../templates/RecipeCard';
import RecipeListAdapter from '../adapters/RecipeListAdapter';
import EmptyResult from '../templates/EmptyResult';

export default class SearchForm {
  constructor(Recipes) {
    this.Recipes = Recipes;

    this.recipesWrapper = document.querySelector('.recipes-listing');
    this.searchForm = document.getElementById('main-search-input');

    this.RecipeGlobalSearch = new RecipeGlobalSearch(this.Recipes);
  }

  search(query) {
    const SearchedRecipes = this.RecipeGlobalSearch.search(query);
    this.displayRecipes(SearchedRecipes);
  }

  clearRecipesWrapper() {
    this.recipesWrapper.innerHTML = '';
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

  onSearch() {
    this.searchForm.addEventListener('input', (e) => {
      const query = e.target.value;

      if (query.length > 2) {
        this.search(query);
      } else if (query.length === 0) {
        this.displayRecipes(this.Recipes);
      }
    });
  }

  render() {
    this.onSearch();
  }
}
