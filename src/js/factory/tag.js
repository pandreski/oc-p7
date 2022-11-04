export default class SearchTag {
  constructor(tag) {
    this.tag = tag;
    this.deleteButton = this.tag.querySelector('.delete');

    this.initTag();
  }

  initTag() {
    this.deleteButton.addEventListener('click', this.handleDelete);
  }

  handleDelete() {
    console.log('delete tag', this.tag); // TODO: delete tag for real
  }
}
