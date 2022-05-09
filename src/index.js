const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },
    eventHandlers: {
        oninput: null,
        onclose: null
    },
    properties: {
        value: "",
        capsLock: false
    },
    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
        document.querySelectorAll(".text_area").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
            "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
            "done","space",
        ];
        // const buttonsRu = [
        //     "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
        //     "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
        //     "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "enter",
        //     "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "left", "right",
        //     "lang", "space", "done",
        // ];
        //
        // const shiftEng = [
        //     "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace",
        //     "tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
        //     "caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "|", "enter",
        //     "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "left", "right",
        //     "lang", "space", "done",
        // ];
        // const shiftRu = [
        //     "Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace",
        //     "tab", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
        //     "caps", "Ф", "Ы", "В", "Ф", "П", "Р", "О", "Л", "Д", "Ж", "Э", "/", "enter",
        //     "shift", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", "left", "right",
        //     "lang", "space", "done",
        // ];
        //
        // if (lang === "eng") {layouts = buttonsEng}
        // else if (lang === "ru") {layouts = buttonsRu}
        // else if (lang === "shiftEng") {layouts = shiftEng}
        // else if (lang === "shiftRu") {layouts = shiftRu}
        //
        // layouts.forEach(key => {
        //         const keyElement = document.createElement("button");
        //         const insertLineBreak = ["backspace", "]", "enter", "ъ", "up", "Ъ", "}", "right"].indexOf(key) !== -1;
        //
        //         keyElement.setAttribute("type", "button");
        //         keyElement.classList.add("button");
        // //почему то не отрабатывает переход на язык
        //
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };
        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;
                            // делалось только для Англ.языка. const keyLayout

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

        // case "lang":
        //     keyElement.classList.add("button", "button_lang", "button_wide");
        //     keyElement.addEventListener("click", () => {
        //
        //         }
        //         this.elements.btnWrapper.innerHTML = "";
        //         if (language === "eng") {
        //             this.elements.btnWrapper.appendChild(this.createKeys("ru"));
        //             this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
        //             language = "ru";
        //
        //         } else {
        //             this.elements.btnWrapper.appendChild(this.createKeys("eng"));
        //             this.elements.buttons = this.elements.btnWrapper.querySelectorAll(".button");
        //             language = "eng";
        //
        //         }
        //         buttons = Array.from(this.elements.buttons)
        //         display.focus()
        //         if (speech) {document.querySelector(".button_speech").classList.add("active")}
        //         else {document.querySelector(".button_speech").classList.remove("active")}
        //     });
        //
        //     break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
