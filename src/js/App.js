import * as bootstrap from 'bootstrap';
import SearchDropdown from './decorator/SearchDropdown';
import SearchTag from './factory/tag';
import { recipes } from '../../data/recipes';

class App {
  constructor(allRecipes) {
    this.recipes = allRecipes;
    console.log(this.recipes);
  }

  initSearchDropdown() {
    const dropdownList = document.querySelectorAll('.dropdown');

    dropdownList.forEach((dropdown) => {
      const searchDropdown = new SearchDropdown(dropdown);

      dropdown.addEventListener('shown.bs.dropdown', () => {
        searchDropdown.handleShow();
      });

      dropdown.addEventListener('hide.bs.dropdown', () => {
        searchDropdown.handleHide();
      });
    });
  }

  initTags() {
    const tags = document.querySelectorAll('.tags .tag');

    tags.forEach((tag) => {
      const tagElement = new SearchTag(tag);
    });
  }

  main() {
    this.initSearchDropdown();
    this.initTags();
  }
}

const recipesApp = new App(recipes);
recipesApp.main();
