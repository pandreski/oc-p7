export default class Tag {
  constructor(label, category) {
    this.label = label;
    this.category = category;

    switch (category) {
      case 'appliance':
        this.style = 'secondary';
        break;
      case 'ustensils':
        this.style = 'tertiary';
        break;
      default:
        this.style = 'primary';
        break;
    }
  }

  create() {
    const tagDOM = document.createElement('div');
    tagDOM.classList.add('tag', `tag-${this.style}`, 'me-3', 'mt-2');
    tagDOM.setAttribute('data-category', this.category);

    const labelDOM = document.createElement('span');
    labelDOM.classList.add('label');
    labelDOM.innerText = this.label;

    const buttonDOM = document.createElement('button');
    buttonDOM.classList.add('delete');
    buttonDOM.setAttribute('aria-label', 'Supprimer le tag');

    tagDOM.append(labelDOM);
    tagDOM.append(buttonDOM);

    return tagDOM;
  }
}
