import Rails from "rails-ujs";
import { Controller } from "stimulus"

const ENTER_KEY = 13

export default class extends Controller {
  static targets = ["input"]

  connect() {
    this.id = parseInt(this.element.dataset.id);
    this.name = this.element.dataset.name;
  }

  destroy(e) {
    Rails.ajax({
      url: `/todos/${this.id}`,
      type: "DELETE",
    });
  }

  toggle(e) {
    const fd = new FormData();
    fd.append("todo[checked]", e.target.checked)
    Rails.ajax({
      url: `/todos/${this.id}`,
      type: "PATCH",
      data: fd,
    });
  }

  edit(e) {
    this.element.classList.add("editing")
    this.inputTarget.focus()
    this.inputTarget.value = this.name
  }

  cancel(e) {
    this.element.classList.remove("editing")
    this.inputTarget.value = ""
  }

  update(e) {
    if (e.keyCode !== ENTER_KEY) {
      return
    }
    const fd = new FormData();
    fd.append("todo[name]", e.target.value)
    Rails.ajax({
      url: `/todos/${this.id}`,
      type: "PATCH",
      data: fd,
    });
  }
}
