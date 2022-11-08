export default class SearchDropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.dropdownButton = this.dropdown.querySelector('.dropdown-toggle');
    this.dropdownMenu = this.dropdown.querySelector('.dropdown-menu');
    this.buttonLabel = this.dropdownButton.innerText;
    this.identifier = this.dropdown.getAttribute('data-identifier');
    this.listWrapper = this.dropdownMenu.querySelector('.items-list');
  }

  // Set equal width between button and menu
  handleShow() {
    this.dropdownButton.style.width = `${this.dropdownMenu.offsetWidth}px`;
    this.setSearchForm();
  }

  // Reset button width
  handleHide() {
    this.dropdownButton.style.width = '';
    this.dropdownButton.innerText = this.buttonLabel;
  }

  // Set dropdown search form markup and replace button label.
  setSearchForm() {
    let label = '';

    switch (this.identifier) {
      case 'ingredients':
        label = 'Rechercher un ingrédient';
        break;
      case 'appliance':
        label = 'Rechercher un appareil';
        break;
      case 'ustensils':
        label = 'Rechercher un ustensile';
        break;
      default:
        break;
    }

    if (!label.length) return;

    const inputForm = `
    <form id="dropdown-search-${this.identifier}">
      <label class="visually-hidden" for="search-${this.identifier}-input">${label}</label>
      <input type="text" id="search-${this.identifier}-input" name="search-${this.identifier}-input" placeholder="${label}">
    </form>
    `;

    this.dropdownButton.innerHTML = inputForm;
    this.dropdownButton.querySelector('input').focus();
    this.dropdownButton.querySelector('input').addEventListener('keydown', this.handleSearchKeydown);
    this.dropdownButton.querySelector('input').addEventListener('click', (e) => e.stopPropagation());
  }

  handleSearchKeydown(e) {
    if (e.code === 'Space') {
      e.preventDefault();
      e.target.value += ' ';
    }
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
   * @param {Array} data
   */
  updateList(data) {
    const sortedData = this.getUniqueElements(data);
    const dataDom = sortedData.map((option) => `<li class="col-md-4 item"><button>${option}</button></li>`).join('');
    this.listWrapper.innerHTML = dataDom;
  }
}
