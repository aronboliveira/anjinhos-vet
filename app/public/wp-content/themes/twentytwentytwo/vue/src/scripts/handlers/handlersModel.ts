export function modelScripts(): void {
  const rex = /[\-\?\=\+\s\.\&\<\>\^\:~,\/\\@]/g;
  try {
    document.querySelectorAll("script").forEach((script, i) => {
      try {
        if (!(script instanceof HTMLScriptElement)) return;
        if (script.type === "" && script.src !== "") script.type = "text/javascript";
        if (script.id === "" && script.src !== "") {
          const url = new URL(script.src);
          script.id = url.pathname.replace(rex, "__");
        }
        if (script.crossOrigin === "") script.crossOrigin = "anonymous";
      } catch (e) {
        console.error(`Error executing iteration ${i} for <script> tags in modelScripts:\n${(e as Error).message}`);
      }
    });
    document.querySelectorAll("link").forEach((link, i) => {
      try {
        if (!(link instanceof HTMLLinkElement)) return;
        if (link.id === "" && link.href !== "") {
          const url = new URL(link.href);
          link.id = url.pathname.replace(rex, "__");
        }
        if (link.rel === "") link.rel = "alternate";
        if (link.crossOrigin === "") link.crossOrigin = "anonymous";
      } catch (e) {
        console.error(`Error executing iteration ${i} for <link> tags in modelScripts:\n${(e as Error).message}`);
      }
    });
    document.querySelectorAll("meta").forEach((meta, i) => {
      try {
        if (!(meta instanceof HTMLMetaElement)) return;
        if (meta.id === "") {
          if (meta.name && meta.name !== "") {
            meta.id = meta.name.replace(rex, "__");
            return;
          }
          if ((meta as any).property && (meta as any).property !== "") {
            meta.id = (meta as any).property.replace(rex, "__");
            return;
          }
          if (meta.httpEquiv && meta.httpEquiv !== "") {
            meta.id = meta.httpEquiv.replace(rex, "__");
            return;
          }
          if (meta.content && meta.content !== "") {
            meta.id = meta.content.replace(rex, "__");
            return;
          }
          if (/charset/g.test(meta.outerHTML)) meta.id = "charset";
        }
      } catch (e) {
        console.error(`Error executing iteration ${i} for identifying meta tag:\n${(e as Error).message}`);
      }
    });
    document.querySelectorAll("style").forEach((style, i) => {
      try {
        if (!(style instanceof HTMLStyleElement)) return;
        if (style.type !== "") style.type = "";
        if (style.media === "all") style.media = "";
        if (style.id === "") {
          style.id = document.getElementById("__next")
            ? `next_generated_style_${i}`
            : `automatically_generated_style_${i}`;
          style.dataset.group = "automatic_name";
        }
      } catch (e) {
        console.error(`Error executing iteration ${i} for <style> tags in modelScripts:\n${(e as Error).message}`);
      }
    });
    document.querySelectorAll("a").forEach((a, i) => {
      try {
        if (!(a instanceof HTMLAnchorElement)) return;
        if (a.href !== "" && !(new RegExp(location.hostname, "g").test(a.href) || /https/.test(a.href))) {
          if (!/noopener/g.test(a.rel)) a.rel += " noopener";
          if (!/noreferrer/g.test(a.rel)) a.rel += " noreferrer";
        }
      } catch (e) {
        console.error(`Error executing iteration ${i} for <a> tags in modelScripts:\n${(e as Error).message}`);
      }
    });
  } catch (e) {
    console.error(`Error executing modelScripts:\n${(e as Error).message}`);
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
        el instanceof HTMLHeadElement ||
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
