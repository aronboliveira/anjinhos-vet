import { rc } from "../../vars";
import { InpProps } from "../declarations/interfaceComponents";
import { nDl, nFm, nInp, nLb, nSl } from "../declarations/types";
export function updateAttrs(el: nInp | HTMLSelectElement, ro: boolean, dsb: boolean, req: boolean): void {
  if (!el) return;
  ro ? el.setAttribute("readonly", "true") : el.removeAttribute("readonly");
  dsb ? el.setAttribute("disabled", "true") : el.removeAttribute("disabled");
  req ? el.setAttribute("required", "true") : el.removeAttribute("required");
}
export function assignFormAttrs(inp: nInp, fm: nFm): void {
  if (!inp || !fm) return;
  inp.dataset.form = `#${fm.id}`;
  inp.formAction = fm.action;
  inp.formMethod = fm.method;
  inp.formEnctype = fm.enctype;
  inp.formNoValidate = fm.noValidate;
  Array.from(fm.elements).forEach(e => {
    if (!(e instanceof HTMLElement)) return;
    if (fm.id !== "") e.dataset.form = fm.id;
    if (
      (e instanceof HTMLFieldSetElement || e instanceof HTMLObjectElement || e instanceof HTMLButtonElement) &&
      e.id !== ""
    )
      e.name = e.id.replace(/([A-Z])/g, m => (m === e.id.charAt(0) ? m.toLowerCase() : `_${m.toLowerCase()}`));
  });
}
export function handleLabs(r: nInp | HTMLSelectElement, rlb: nLb, props: InpProps): void {
  try {
    if (!(r instanceof HTMLInputElement || r instanceof HTMLSelectElement))
      throw new Error(`Failed to validate Input Reference`);
    try {
      if (!(rlb instanceof HTMLLabelElement)) throw new Error(`Failed to validate Label Reference`);
      if (rlb.htmlFor !== r.id) rlb.htmlFor = r.id;
    } catch (e) {
      console.error(`Error executing procedure for fixing Label htmlFor:\n${(e as Error).message}`);
    }
    if (!r.labels) throw new Error(`Failed to read labels NodeList for Input Reference.`);
    if (!r.labels[0]) throw new Error(`Failed to read any label in the Labels NodeList`);
    r.labels.forEach((lab, i) => {
      try {
        if (lab.id === "") return;
        if (!r) throw new Error(`Lost reference to the input`);
        if (i === 0) r.dataset.labels = `#${lab.id}`;
        else r.dataset.labels += `, #${lab.id}`;
      } catch (e) {
        console.error(`Error executing iteration ${i} for ${props.id}:\n${(e as Error).message}`);
      }
    });
  } catch (e) {
    console.error(`Error executing procedure to define Dataset Label:\n${(e as Error).message}`);
  }
}
export function handleDl(r: nInp, dr: nDl): void {
  try {
    if (!(r instanceof HTMLInputElement)) throw new Error(`Failed to validate Input Reference`);
    if (dr instanceof HTMLDataListElement && r.list && r.list.id !== dr.id) r.setAttribute("list", dr.id);
    if (!r.list) {
      const dl = dr instanceof HTMLDataListElement ? dr.id : r.parentElement?.querySelector("datalist")?.id;
      if (!dl) throw new Error(`Failed to fetch datalist id`);
      r.setAttribute("list", dl);
    }
  } catch (e) {
    console.error(`Error executing procedure to assing List:\n${(e as Error).message}`);
  }
}
export function handleDlUpdate(r: nInp, dr: nDl, n: string = ""): void {
  try {
    if (!(r instanceof HTMLInputElement)) throw new Error(`Failed to validate reference to <input>`);
    const idf = `${r.id}`;
    if (n === "") sessionStorage.getItem(`${idf}_v`) ?? "";
    if (n !== "") {
      if (!rc[idf]) rc[idf] = {};
      if (!rc[idf].vs || !Array.isArray(rc[idf].vs)) rc[idf].vs = [];
      if (!rc[idf].vs.includes(n)) {
        rc[idf].vs.push(n);
        if (rc[idf].vs.length > 3) rc[idf].vs.shift();
        if (!(dr instanceof HTMLDataListElement)) throw new Error(`Failed to validate reference to Datalist`);
        dr.innerHTML = "";
        rc[idf].vs.forEach(value => {
          if (!(dr instanceof HTMLDataListElement)) {
            console.warn(`Lost reference to datalist`);
            return;
          }
          dr.appendChild(
            Object.assign(document.createElement("option"), {
              value: value,
            }),
          );
        });
      }
    }
  } catch (e) {
    console.error(`Error handling Datalist update:\n${(e as Error).message}`);
  }
}
export function pushSelectOpts(el: nSl, idf: string, opts: HTMLOptionElement[]): void {
  try {
    if (!(el instanceof HTMLSelectElement && (el.type === "select-multiple" || el.dataset.type === "select-multiple")))
      throw new Error(`Invalid type for select`);
    if (typeof idf !== "string") throw new Error(`Invalid type passed as identificator.`);
    if (idf === "" || !document.getElementById(idf)) throw new Error(`Invalid id string passed as identificator.`);
    if (!rc[idf]) rc[idf] = {};
    rc[idf].lastOpts = opts.map(op => op.value);
  } catch (e) {
    console.error(`Error executing pushSelectOpts:\n${(e as Error).message}`);
  }
}
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
