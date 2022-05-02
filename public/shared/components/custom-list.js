export class CustomList extends HTMLUListElement {
  static get observedAttributes() {
    return ["value"];
  }

  get value() {
    return this.getAttribute("value");
  }
  set value(newValue) {
    this.setAttribute("value", newValue);
  }

  constructor() {
    super();

    this.classList.add("custom-list");
    this.addEventListener("click", (e) => {
      const selection = e.target.closest("li.custom-list-item");
      if (selection) this.value = selection.dataset.item;
    });
  }

  setItems(items) {
    this.clearItems();
    if (items) for (const element of items) this.addItem(element);
  }
  addItem(item) {
    const template = this.querySelector("template");
    const templateNode = template.content.firstElementChild;
    const node = templateNode.cloneNode(true);

    this.appendChild(node);
    node.data = item;
  }
  clearItems() {
    this.value = "";
    for (const element of this.querySelectorAll("li.custom-list-item"))
      element.remove();
  }

  selectFirst() {
    const selection = this.querySelector("li.custom-list-item");
    if (selection) this.value = selection.dataItem;
  }
  select(dataItem) {
    const selection = this.querySelector(
      `li.custom-list-item[data-item="${dataItem}"]`
    );
    if (selection) this.value = selection.dataItem;
  }
  clearSelection() {
    this.querySelectorAll("li.custom-list-item").forEach((element) => {
      element.deselect();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      if (oldValue) {
        const selection = this.querySelector(`li[data-item="${oldValue}"]`);
        if (selection) selection.deselect();
      }
      if (newValue) {
        const selection = this.querySelector(`li[data-item="${newValue}"]`);
        if (selection) selection.select();
      }

      this.dispatchEvent(new Event("change"));
    }
  }
}

customElements.define("custom-list", CustomList, { extends: "ul" });
