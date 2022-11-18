import * as bootstrap from 'bootstrap';
import { recipes } from '../../data/recipes';
import RecipeCard from './templates/RecipeCard';
import Data from './models/Data';
import SearchForm from './search/SearchForm';
import SearchFilters from './search/SearchFilters';

export default class App {
  constructor(data) {
    this.recipes = [];
    this.recipesWrapper = document.querySelector('.recipes-listing');
    this.recipesData = new Data(data);
  }

  initSearchForm() {
    // List of data including name, ingredients and description for main search form
    const globalDataList = [
      ...this.recipesData.byName,
      ...this.recipesData.byIngredient,
      ...this.recipesData.byDescription];

    const Search = new SearchForm(globalDataList, this.recipesData);
    Search.render();
  }

  initFilters() {
    const Filters = new SearchFilters(this.recipesData);
    Filters.render();
  }

  main() {
    const recipesByName = Object.values(this.recipesData.byName);

    this.initSearchForm();
    this.initFilters();

    for (let i = 0; i < recipesByName.length; i++) {
      const Template = new RecipeCard(recipesByName[i]);
      this.recipesWrapper.appendChild(Template.createRecipeCard());
    }
  }
}

const recipesApp = new App(recipes);
recipesApp.main();
