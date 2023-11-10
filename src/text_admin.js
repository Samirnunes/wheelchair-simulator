import { Admin } from "./admin";

export class TextAdmin extends Admin{
    #standardClass = "text";
    #standardTextId = "standard-text"

    modifyText(newText) {
        var textElement = document.getElementById(this.#standardTextId);
        if (textElement) {
            textElement.textContent = newText;
        }
    }

    hideText() {
        var textElement = document.getElementById(this.#standardTextId);
        if (textElement) {
            textElement.style.display = "none";
        }
    }

    showText() {
        var textElement = document.getElementById(this.#standardTextId);
        if (textElement) {
            textElement.style.display = ""; 
        }
    }
}