export default class Tag {
  constructor(label, listId) {
    this.label = label;
    this.wrapper = document.querySelector('.secondary-filters .tags');

    switch (listId) {
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

    const labelDOM = document.createElement('span');
    labelDOM.classList.add('label');
    labelDOM.innerText = this.label;

    const buttonDOM = document.createElement('button');
    buttonDOM.classList.add('delete');
    buttonDOM.setAttribute('aria-label', 'Supprimer le tag');
    buttonDOM.addEventListener('click', this.handleDelete);

    tagDOM.append(labelDOM);
    tagDOM.append(buttonDOM);
    this.wrapper.append(tagDOM);
  }

  handleDelete(e) {
    e.target.parentNode.remove();
    // TODO: update results
    // TODO: update all dropdown choices
  }
}
