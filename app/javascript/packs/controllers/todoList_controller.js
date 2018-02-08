import Rails from "rails-ujs";
import { Controller } from "stimulus"

const ENTER_KEY = 13

export default class extends Controller {
  add(e) {
    if (e.keyCode !== ENTER_KEY) {
      return
    }
    const fd = new FormData();
    fd.append("todo[name]", e.target.value);
    Rails.ajax({
      url: "/todos",
      type: "POST",
      data: fd
    });
  }
}
