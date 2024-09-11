export function parseNotNaN(iniVal: string, def: number = 0, context: string = "float", fixed: number = 4): number {
  let returnVal = 0;
  try {
    if (typeof iniVal !== "string") throw new Error("Failed to validate argument: iniVal must be a string.");
    if (typeof context !== "string") throw new Error("Failed to validate argument: context must be a string.");
    if (typeof def !== "number") throw new Error("Failed to validate argument: def must be a number.");
    if (typeof fixed !== "number") throw new Error("Failed to validate argument: fixed must be a number.");
    switch (context) {
      case "int":
        returnVal = parseInt(iniVal, 10) || def;
        if (!Number.isFinite(returnVal) || Number.isNaN(returnVal) || isNaN(returnVal)) returnVal = def;
        break;
      case "float":
        returnVal = parseFloat(parseFloat(iniVal).toFixed(fixed)) || def;
        if (!Number.isFinite(returnVal) || isNaN(returnVal)) returnVal = def;
        break;
      default:
        throw new Error(`Context of parsing invalid.`);
    }
    return returnVal || 0;
  } catch (e) {
    console.error(`Error executing parseNotNaN:\n${(e as Error).message}`);
    return returnVal || 0;
  }
}
export function syncAriaStates(els: Array<Element> | NodeListOf<Element>): void {
  if (els instanceof NodeList) els = Array.from(els);
  els = els.filter(el => el instanceof Element);
  if (Array.isArray(els) && els.length > 0 && Array.from(els).every(el => el instanceof Element)) {
    els.forEach(el => {
      if (
        el instanceof HTMLHtmlElement ||
        el instanceof HTMLScriptElement ||
        el instanceof HTMLLinkElement ||
        el instanceof HTMLMetaElement ||
        el instanceof HTMLTitleElement ||
        (el.parentElement && el.parentElement instanceof HTMLHeadElement)
      )
        return;
      if (el instanceof HTMLElement) {
        el.hidden && !el.focus ? (el.ariaHidden = "true") : (el.ariaHidden = "false");
        el.addEventListener("click", () => {
          el.hidden && !el.focus ? (el.ariaHidden = "true") : (el.ariaHidden = "false");
        });
        if (el.classList.contains("poCaller")) {
          el.ariaHasPopup = "menu";
        }
        if (el instanceof HTMLSelectElement || el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          if (el instanceof HTMLSelectElement) {
            if (el.querySelectorAll("option").length > 0) {
              el.querySelectorAll("option").forEach(option => {
                option.selected ? (option.ariaSelected = "true") : (option.ariaSelected = "false");
              });
              el.addEventListener("change", () => {
                el.querySelectorAll("option").forEach(option => {
                  option.selected ? (option.ariaSelected = "true") : (option.ariaSelected = "false");
                });
              });
            }
            el.addEventListener("click", () => {
              if (el.ariaExpanded === "false") el.ariaExpanded = "true";
              if (el.ariaExpanded === "true") el.ariaExpanded = "false";
            });
          }
          if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
            if (el.placeholder && el.placeholder !== "") el.ariaPlaceholder = el.placeholder;
            if (el.type !== "radio") {
              el.required ? (el.ariaRequired = "true") : (el.ariaRequired = "false");
              !el.checkValidity() ? (el.ariaInvalid = "true") : (el.ariaInvalid = "false");
              el.closest("form")?.addEventListener("submit", () => {
                !el.checkValidity() ? (el.ariaInvalid = "true") : (el.ariaInvalid = "false");
              });
            }
            if (
              el instanceof HTMLTextAreaElement ||
              (el instanceof HTMLInputElement &&
                (el.type === "text" ||
                  el.type === "tel" ||
                  el.type === "email" ||
                  el.type === "number" ||
                  el.type === "date" ||
                  el.type === "time" ||
                  el.type === "password" ||
                  el.type === "search" ||
                  el.type === "month" ||
                  el.type === "week"))
            ) {
              if (el instanceof HTMLInputElement && el.list && el.list.id !== "") el.ariaAutoComplete = "list";
              if (
                el instanceof HTMLInputElement &&
                (el.type === "number" || el.type === "date" || el.type === "time")
              ) {
                el.ariaValueMax = (el as HTMLInputElement).max;
                el.ariaValueMin = (el as HTMLInputElement).min;
              }
              if (el instanceof HTMLInputElement && el.type === "range") {
                el.addEventListener("change", () => {
                  el.ariaValueNow = el.value;
                  el.ariaValueText = el.value;
                });
              }
            } else if (el instanceof HTMLInputElement && (el.type === "radio" || el.type === "checkbox")) {
              el.checked ? (el.ariaChecked = "true") : (el.ariaChecked = "false");
              el.disabled ? (el.ariaDisabled = "true") : (el.ariaDisabled = "false");
              el.addEventListener("change", () => {
                el.checked ? (el.ariaChecked = "true") : (el.ariaChecked = "false");
                el.disabled ? (el.ariaDisabled = "true") : (el.ariaDisabled = "false");
              });
            } else if (
              el instanceof HTMLInputElement &&
              (el.type === "button" || el.type === "submit" || el.type === "reset")
            ) {
              el.addEventListener("mousedown", click => {
                if (click.button === 0) el.ariaPressed = "true";
              });
              el.addEventListener("mouseup", release => {
                if (release.button === 0) el.ariaPressed = "false";
              });
            }
          }
        }
        if (el instanceof HTMLLabelElement) {
          if (el.hasChildNodes() && el.firstChild instanceof Text) {
            el.ariaLabel = el.firstChild.nodeValue;
          }
        }
        if (el instanceof HTMLButtonElement) {
          el.addEventListener("mousedown", click => {
            if (click.button === 0) el.ariaPressed = "true";
          });
          el.addEventListener("mouseup", release => {
            if (release.button === 0) el.ariaPressed = "false";
          });
          if (el.textContent?.match(/consultar/gi)) {
            el.ariaHasPopup = "dialog";
          }
        }
        if (el instanceof HTMLDialogElement) el.ariaModal = "true";
      }
    });
  }
}
