import { FormValidationRes } from "../declarations/interfaces";
import { nFm, nHtEl, nInpLike } from "../declarations/types";
import { formVars } from "../vars";
import { parseNotNaN } from "./handlersMath";
export function handleSubmit(targ: nInpLike | HTMLButtonElement | HTMLFormElement, fm?: nFm) {
  try {
    if (
      !(
        targ instanceof HTMLInputElement ||
        targ instanceof HTMLSelectElement ||
        targ instanceof HTMLTextAreaElement ||
        targ instanceof HTMLButtonElement ||
        targ instanceof HTMLFormElement
      )
    )
      throw new Error(`Invalid target instance passed to handleSubmit`);
    if (!(targ instanceof HTMLFormElement))
      targ =
        fm ??
        targ.form ??
        ((targ.dataset.form
          ? (document.getElementById(targ.dataset.form!) ?? document.querySelector(targ.dataset.form!))
          : targ.closest("form")) as nFm);
    if (!(targ instanceof HTMLFormElement))
      throw new Error(`Failed to validate fetch and/or validate target form instance.`);
    if (!targ.parentElement) throw new Error(`Failed to validate parent element for form`);
    validateForm(targ, targ.parentElement);
  } catch (e) {
    console.error(`Error executing handleSubmit:\n${(e as Error).message}`);
  }
}
export function validateForm(
  ev: SubmitEvent | HTMLFormElement,
  scope: HTMLElement | Document = document,
): FormValidationRes {
  let targ, form;
  if (!(ev instanceof HTMLFormElement || "currentTarget" in ev)) throw new Error(`Invalid form reference`);
  if (ev instanceof HTMLFormElement) targ = ev;
  else if (
    ev.currentTarget instanceof HTMLFormElement ||
    ((ev.currentTarget instanceof HTMLButtonElement || ev.currentTarget instanceof HTMLInputElement) &&
      ev.currentTarget.type === "submit")
  ) {
    ev.preventDefault();
    targ = ev.currentTarget;
  }
  const arrValidity: boolean[] = [],
    invalidEntries: string[] = [],
    validEntries: Array<[string, string | File]> = [];
  try {
    if (
      !(
        targ instanceof HTMLFormElement ||
        targ instanceof HTMLButtonElement ||
        targ instanceof HTMLInputElement ||
        (targ as any) instanceof HTMLSelectElement ||
        (targ as any) instanceof HTMLTextAreaElement
      )
    )
      throw new Error(`Failed to validate target instance`);
    if (targ instanceof HTMLFormElement) form = targ;
    else form = targ?.closest("form");
    if (!(form instanceof HTMLFormElement)) scope.querySelector("form");
    if (!(form instanceof HTMLFormElement)) throw new Error(`Failed to validate form instance`);
    [
      ...form.querySelectorAll("input"),
      ...form.querySelectorAll("textarea"),
      ...form.querySelectorAll("select"),
      ...form.querySelectorAll("canvas"),
    ].forEach(entry => {
      let isValid = true;
      if (entry instanceof HTMLSelectElement) {
        if (entry.value === "") {
          isValid = false;
          invalidEntries.push(entry.name || entry.id || entry.dataset.title || entry.tagName);
        }
      } else if (entry instanceof HTMLInputElement || entry instanceof HTMLTextAreaElement) {
        if (!entry.checkValidity()) {
          isValid = false;
          invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
        }
        if (entry instanceof HTMLInputElement && entry.type === "date") {
          if (entry.classList.contains("minCurrDate")) {
            const currDate = new Date().toISOString().split("T")[0].replace(/\-/g, "").trim();
            if (currDate.length < 8) {
              console.warn(`Failed to form Current Date string. Aborting check.`);
              return;
            }
            const currNumDate = Math.abs(parseNotNaN(currDate));
            if (
              !Number.isFinite(currNumDate) ||
              currNumDate.toString().slice(0, currNumDate.toString().indexOf(".")).length < 8
            ) {
              console.warn(`Failed to get Current Date as a Number. Aborting check.`);
              return;
            }
            const entryNumDateValue = parseNotNaN(entry.value.replace(/\-/g, ""));
            if (
              !Number.isFinite(entryNumDateValue) ||
              entryNumDateValue.toString().slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
            ) {
              console.warn(`Failed to get Current Date as a Number. Aborting check.`);
              return;
            }
            if (entryNumDateValue < currNumDate) {
              isValid = false;
              invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
            }
          }
          if (entry.classList.contains("maxCurrDate")) {
            const currDate = new Date().toISOString().split("T")[0].replace(/\-/g, "").trim();
            if (currDate.length < 8) {
              console.warn(`Failed to form Current Date string. Aborting check.`);
              return;
            }
            const currNumDate = Math.abs(parseNotNaN(currDate));
            if (
              !Number.isFinite(currNumDate) ||
              currNumDate.toString().slice(0, currNumDate.toString().indexOf(".")).length < 8
            ) {
              console.warn(`Failed to get Current Date as a Number. Aborting check.`);
              return;
            }
            const entryNumDateValue = parseNotNaN(entry.value.replace(/\-/g, ""));
            if (
              !Number.isFinite(entryNumDateValue) ||
              entryNumDateValue.toString().slice(0, entryNumDateValue.toString().indexOf(".")).length < 8
            ) {
              console.warn(`Failed to get Current Date as a Number. Aborting check.`);
              return;
            }
            if (entryNumDateValue > currNumDate) {
              isValid = false;
              invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
            }
          }
        } else if (entry instanceof HTMLInputElement && entry.type === "radio") {
          try {
            let parent = entry.parentElement;
            if (!(parent instanceof Element))
              throw new Error(
                `Failed to validate instance of parent for entry ${entry.id || entry.className || entry.tagName}`,
              );
            if (parent.querySelectorAll('input[type="radio"]').length < 2)
              parent = parent.closest(".divAdd") ?? parent.parentElement;
            if (!(parent instanceof Element))
              throw new Error(
                `Failed to validate instance of parent for entry ${entry.id || entry.className || entry.tagName}`,
              );
            const radioGroupList = parent.querySelectorAll('input[type="radio"]');
            if (radioGroupList.length === 0) throw new Error(`Error populating list of radios from parent`);
            if (
              Array.from(radioGroupList)
                .filter(radio => radio instanceof HTMLInputElement && radio.type === "radio")
                .some(
                  radio =>
                    radio instanceof HTMLInputElement &&
                    radio.type === "radio" &&
                    (radio.dataset.required === "true" || radio.required),
                ) &&
              !Array.from(radioGroupList)
                .filter(radio => radio instanceof HTMLInputElement && radio.type === "radio")
                .some(radio => radio instanceof HTMLInputElement && radio.type === "radio" && radio.checked)
            ) {
              isValid = false;
            }
            const cbGrpL = parent.querySelectorAll('input[type="checkbox"]');
            if (cbGrpL.length === 0) throw new Error(`Error populating list of checkboxes from parent`);
            if (
              Array.from(cbGrpL)
                .filter(checkbox => checkbox instanceof HTMLInputElement && checkbox.type === "checkbox")
                .some(
                  checkbox =>
                    checkbox instanceof HTMLInputElement &&
                    checkbox.type === "checkbox" &&
                    (checkbox.dataset.required === "true" || checkbox.required),
                ) &&
              !Array.from(cbGrpL)
                .filter(checkbox => checkbox instanceof HTMLInputElement && checkbox.type === "checkbox")
                .some(
                  checkbox => checkbox instanceof HTMLInputElement && checkbox.type === "checkbox" && checkbox.checked,
                )
            ) {
              isValid = false;
            }
          } catch (e) {
            console.error(`Error executing procedure for validating radio:\n${(e as Error).message}`);
          }
        } else if (entry instanceof HTMLInputElement && entry.type === "file") {
          if (!(entry.files && entry.files[0])) {
            isValid = false;
            invalidEntries.push(entry.name || entry.id || entry.dataset.title || entry.tagName);
          }
        } else {
          if (entry.classList.contains("minText") && entry.value.length < parseNotNaN(entry.dataset.reqlength || "3")) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
          }
          if (entry.classList.contains("maxText") && entry.value.length > parseNotNaN(entry.dataset.maxlength || "3")) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
          }
          if (
            entry.classList.contains("minNum") &&
            parseNotNaN(entry.value) < parseNotNaN(entry.dataset.minnum || "3")
          ) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
          }
          if (
            entry.classList.contains("maxNum") &&
            parseNotNaN(entry.value) > parseNotNaN(entry.dataset.maxnum || "3")
          ) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
          }
          if (
            entry.classList.contains("patternText") &&
            entry.dataset.pattern &&
            !new RegExp(entry.dataset.pattern, entry.dataset.flags || "").test(entry.value)
          ) {
            isValid = false;
            invalidEntries.push(entry.id || entry.name || entry.dataset.title || entry.tagName);
          }
        }
        arrValidity.push(isValid);
        if (isValid) {
          if (entry instanceof HTMLInputElement && entry.type === "checkbox" && entry.role !== "switch")
            validEntries.push([entry.name || entry.id || entry.dataset.title || entry.tagName, `${entry.checked}`]);
          else if (entry instanceof HTMLInputElement && entry.type === "radio") {
            try {
              let parent = entry.parentElement;
              if (!(parent instanceof Element))
                throw new Error(
                  `Failed to validate instance of parent for entry ${entry.id || entry.className || entry.tagName}`,
                );
              if (parent.querySelectorAll('input[type="radio"]').length < 2)
                parent = parent.closest(".divAdd") ?? parent.parentElement;
              if (!(parent instanceof Element))
                throw new Error(
                  `Failed to validate instance of parent for entry ${entry.id || entry.className || entry.tagName}`,
                );
              const radioGroupList = parent.querySelectorAll('input[type="radio"]');
              if (radioGroupList.length === 0) throw new Error(`Error populating list of radios from parent`);
              if (
                radioGroupList.length === 1 &&
                radioGroupList[0] instanceof HTMLInputElement &&
                radioGroupList[0].type === "radio"
              ) {
                radioGroupList[0].checked
                  ? validEntries.push([
                      radioGroupList[0].name ||
                        radioGroupList[0].id ||
                        radioGroupList[0].dataset.title ||
                        radioGroupList[0].tagName,
                      `true`,
                    ])
                  : validEntries.push([
                      radioGroupList[0].name ||
                        radioGroupList[0].id ||
                        radioGroupList[0].dataset.title ||
                        radioGroupList[0].tagName,
                      `false`,
                    ]);
              } else {
                const opChecked = Array.from(radioGroupList).filter(
                  radio => radio instanceof HTMLInputElement && radio.type === "radio" && radio.checked,
                )[0];
                if (!(opChecked instanceof HTMLInputElement && opChecked.type === "radio")) {
                  validEntries.push([opChecked.id || opChecked.tagName, `undefined`]);
                  throw new Error(`Failed to find checked radio in group`);
                } else {
                  if (radioGroupList.length === 2) {
                    if (
                      opChecked.id.endsWith("No") ||
                      opChecked.id.endsWith("-no") ||
                      opChecked.id.endsWith("-No") ||
                      opChecked.classList.contains("radNo")
                    )
                      validEntries.push([
                        opChecked.name || opChecked.id || opChecked.dataset.title || opChecked.tagName,
                        `false`,
                      ]);
                    else
                      validEntries.push([
                        opChecked.name || opChecked.id || opChecked.dataset.title || opChecked.tagName,
                        `true`,
                      ]);
                  } else if (radioGroupList.length > 2) {
                    validEntries.push([
                      opChecked.name || opChecked.id || opChecked.dataset.title || opChecked.tagName,
                      opChecked.dataset.value || `true`,
                    ]);
                  }
                }
              }
            } catch (e) {
              console.error(`Error executing procedure for pushing radio check:\n${(e as Error).message}`);
            }
          } else if (entry instanceof HTMLInputElement && entry.type === "file" && entry.files) {
            validEntries.push([entry.name || entry.id || entry.dataset.title || entry.tagName, entry.files[0]]);
          } else if (entry instanceof HTMLCanvasElement) {
            (async (): Promise<File> => {
              return new Promise((res, rej) => {
                entry.toBlob(blob => {
                  if (blob) {
                    res(
                      new File([blob], entry.name || entry.id || entry.dataset.title || entry.tagName, {
                        type: blob.type,
                      }),
                    );
                  } else rej(new Error(`Failed to extract file.`));
                });
              });
            })().then(file =>
              validEntries.push([entry.name || entry.id || entry.dataset.title || entry.tagName, file]),
            );
          } else validEntries.push([entry.name || entry.id || entry.dataset.title || entry.tagName, entry.value]);
        }
      }
    });
  } catch (e) {
    console.error(`Error executing validateForm:\n${(e as Error).message}`);
  }
  const validated = arrValidity.some(validity => validity === false) ? false : true;
  if (form instanceof HTMLFormElement)
    submitForm(form, form.dataset.ep || form.action.replace("submit_", "").replace("_form", ""));
  return { validated, invalids: invalidEntries.map(invalidIdf => `${invalidIdf} \n`), valids: validEntries };
}
type ComparableValue = string | number | boolean | undefined;
type RegexValue = string | RegExp;
export function where(value: ComparableValue): {
  isGreaterThanOrEqualTo: (comp: number) => boolean;
  matchesRegex: (regex: RegexValue) => boolean;
  isEqualTo: (comp: ComparableValue) => boolean;
  isEither: (...options: ComparableValue[]) => boolean;
  is: (type: ComparableValue) => boolean;
  has: (property: string) => boolean;
  isType: (type: string) => boolean;
  matchesAnyIn: (array: string[]) => boolean;
  matchesAllIn: (array: string[]) => boolean;
} {
  return {
    isGreaterThanOrEqualTo: (comp: number): boolean => typeof value === "number" && value >= comp,
    matchesRegex: (regex: RegexValue): boolean =>
      typeof value === "string" && (typeof regex === "string" ? new RegExp(regex) : regex).test(value),
    isEqualTo: (comp: ComparableValue): boolean => value === comp,
    isEither: (...options: ComparableValue[]): boolean => options.includes(value),
    is: (type: ComparableValue): boolean => value === type,
    has: (property: string): boolean => typeof value === "object" && value !== null && property in value,
    isType: (type: string): boolean => typeof value === type,
    matchesAnyIn: (array: string[]): boolean =>
      Array.isArray(array) && typeof value === "string" && array.some(item => value.includes(item)),
    matchesAllIn: (array: string[]): boolean =>
      Array.isArray(array) && typeof value === "string" && array.every(item => value.includes(item)),
  };
}
export const select = ({ q, from }: { q: string; from: Document | DocumentFragment | HTMLElement }): nHtEl =>
  from instanceof Document
    ? (from.getElementById(q) ?? from.getElementsByName(q)[0])
    : (from.querySelector(`#${q || "UNDEFINED"}`) ?? from.querySelector(`[name="${q || "UNDEFINED"}"]`));
export const escapeRegex = (string: string): string => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export async function submitForm(form: nFm, ep: string) {
  try {
    if (!(form instanceof HTMLFormElement)) throw new Error(`Failed to validate form instance.`);
    if (typeof ep !== "string") throw new Error(`Incorret type for ep argument in submitForm`);
    const fd = new FormData();
    const elements = [
      ...form.querySelectorAll("input"),
      ...form.querySelectorAll("textarea"),
      ...form.querySelectorAll("select"),
    ].filter(
      el =>
        (el instanceof HTMLInputElement &&
          !(
            el.type === "hidden" ||
            el.type === "reset" ||
            el.type === "button" ||
            el.type === "submit" ||
            el.type === "image"
          )) ||
        el instanceof HTMLSelectElement ||
        el instanceof HTMLTextAreaElement,
    );
    elements.forEach((el, i) => {
      try {
        if (el.name === "") {
          console.warn(`Element ${el.id || el.className || `undefined ${el.tagName}`} has no name prop defined!`);
          if (el.id === "")
            console.warn(`Element ${el.className || `undefined ${el.tagName}`} also does not have a id prop defined!`);
        }
        const idf = el.name || el.id || el.dataset.title || el.className || el.tagName;
        if (el instanceof HTMLInputElement) {
          if (el.type === "radio") {
            const appendRad = (el: HTMLInputElement): void => {
              el.checked && el.dataset.value && el.dataset.value !== ""
                ? fd.append(idf, el.dataset.value)
                : fd.append(idf, el.checked.toString());
            };
            const checkGroup = (refAncestral: HTMLElement): void => {
              let group = refAncestral.querySelectorAll('input[type="radio"]');
              if (group.length === 1) {
                const parentOfAncestral = refAncestral.parentElement;
                if (parentOfAncestral) {
                  group = parentOfAncestral.querySelectorAll('input[type="radio"]');
                  if (group.length === 1) {
                    appendRad(el);
                    return;
                  } else {
                    const checked = Array.from(group).find(
                      rad => rad instanceof HTMLInputElement && rad.type === "radio" && rad.checked,
                    ) as HTMLInputElement;
                    if (!checked) {
                      if (fd.get(idf)) return;
                      fd.append(idf, "false");
                    }
                    appendRad(checked);
                    return;
                  }
                }
                appendRad(el);
                return;
              } else {
                const checked = Array.from(group).find(
                  rad => rad instanceof HTMLInputElement && rad.type === "radio" && rad.checked,
                ) as HTMLInputElement;
                if (!checked) {
                  if (fd.get(idf)) return;
                  fd.append(idf, "false");
                }
                appendRad(checked);
              }
            };
            const checkParent = (refAncestral: nHtEl, group: string = 'input[type="radio"]'): void => {
              if (el.dataset.parent && el.dataset.parent !== "") {
                refAncestral = document.querySelector(el.dataset.parent);
                if (refAncestral) {
                  checkGroup(refAncestral);
                  return;
                }
                console.warn(`Failed to fetch reference for ancestral using data-parent. Defaulting to parent element`);
                refAncestral = el.parentElement;
                if (!refAncestral) {
                  appendRad(el);
                  return;
                }
                let groupQueried = refAncestral.querySelectorAll(group);
                if (groupQueried.length === 0 && group !== 'input[type="radio"]' && group !== "input[type=radio]")
                  groupQueried = refAncestral.querySelectorAll('input[type="radio"]');
                if (groupQueried.length <= 1 && el.parentElement) {
                  refAncestral = el.parentElement.parentElement;
                  if (!refAncestral) {
                    appendRad(el);
                    return;
                  }
                  checkGroup(refAncestral);
                  return;
                }
                checkGroup(refAncestral);
                return;
              }
              if (refAncestral) {
                checkGroup(refAncestral);
                return;
              }
              appendRad(el);
              return;
            };
            const refAncestral = el.parentElement;
            el.dataset.group && el.dataset.group !== ""
              ? checkParent(refAncestral, `[data-group="${el.dataset.group}"]`)
              : checkParent(refAncestral);
            return;
          }
          if (el.type === "checkbox") {
            fd.append(idf, el.checked.toString());
            return;
          }
          if (el.type === "file") {
            if (!el.multiple) {
              fd.append(idf, el.files?.[0] ?? "null");
              return;
            } else {
              if (el.files) for (const file of el.files) fd.append(idf, file);
              else fd.append(idf, "null");
              return;
            }
          } else {
            fd.append(idf, el.value);
            return;
          }
        } else if (el instanceof HTMLSelectElement) {
          if (!el.multiple) {
            fd.append(idf, el.value);
            return;
          } else for (const opt of el.selectedOptions) fd.append(idf, opt.value);
        } else {
          fd.append(idf, el.value);
          return;
        }
      } catch (e) {
        console.error(
          `Error executin iteration ${i} for mapping ${
            form.id || form.className || form.tagName
          }:\n${(e as Error).message}`,
        );
      }
    });
    try {
      if (typeof ep !== "string") throw new Error(`Error validating apiRoute type`);
      const res = await fetch(`/${formVars.animals}.json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`Error posting Table to API`);
      let parsed = await res.json();
      if (!("length" in parsed)) throw new Error(`Parsed response is not an iterable`);
      if (!Array.isArray(parsed)) parsed = Array.from(parsed);
      const entries = Array.from(fd.entries())
        .map(e => {
          return { constraint: e[0], value: e[1] };
        })
        .filter(c => c.value !== "" && !(c.value instanceof File));
      let mapped = parsed;
      function toComparableString(value: any): string {
        if (typeof value === "boolean") return value ? "true" : "false";
        if (typeof value === "string") return value;
        return value.toString();
      }
      for (const c of entries) {
        mapped = mapped.filter((a: any) => {
          if (!a || !a.hasOwnProperty(c.constraint) || typeof c.value !== "string") return true;
          switch (c.constraint) {
            case "age":
              return where(a[c.constraint]).isGreaterThanOrEqualTo(Number(c.value));
            case "fur":
              const fur = select({ q: "fur", from: document });
              if (!(fur instanceof HTMLSelectElement)) return a;
              return Array.from(fur.selectedOptions)
                .map(o => o.value)
                .map(o => a[c.constraint].includes(o))
                .some(o => o);
            case "humor":
              const humor = select({ q: "humor", from: document });
              if (!(humor instanceof HTMLSelectElement)) return a;
              return Array.from(humor.selectedOptions)
                .map(o => o.value)
                .map(o => a[c.constraint].includes(o))
                .every(o => o);
            case "size":
              const size = select({ q: "size", from: document });
              if (!(size instanceof HTMLSelectElement)) return a;
              return Array.from(size.selectedOptions)
                .map(o => o.value)
                .map(o => a[c.constraint].includes(o))
                .some(o => o);
            case "name":
              return (
                typeof a[c.constraint] === "string" &&
                where(a[c.constraint]).matchesRegex(new RegExp(`^${escapeRegex(c.value)}.*$`, "i"))
              );
            case "castrated":
            case "sex":
              const aValue = toComparableString(a[c.constraint]),
                cValue = toComparableString(c.value);
              return where(c.value).isEither("both", "false") || where(aValue).isEqualTo(cValue);
            case "fiv":
            case "felv":
              return where(c.value).is("undefined") || where(a[c.constraint]).isEqualTo(c.value);
            default:
              return where(toComparableString(a[c.constraint])).isEqualTo(toComparableString(c.value));
          }
        });
      }
      const filtered = mapped
        .filter((a: any) => a && "name" in a && typeof a.name === "string")
        .toSorted((a: any, b: any) => {
          return a.name.toLowerCase().trim().localeCompare(b.name.toLowerCase().trim());
        });
      if (!("length" in filtered)) return;
      const table = document.getElementById("petsTable");
      if (!(table instanceof HTMLTableElement)) return;
      const tbody = table.querySelector("tbody");
      if (!(tbody instanceof HTMLTableSectionElement)) return;
      tbody.innerHTML = ``;
      const thead = table.querySelector("thead");
      if (!(thead instanceof HTMLTableSectionElement)) return;
      thead.innerHTML = ``;
      for (let i = 0; i < filtered.length + 1; i++) {
        const a = (filtered as any)[i === 0 ? 0 : i - 1];
        if (!a) continue;
        if (i === 0) {
          const thead = table.querySelector("thead");
          if (thead) {
            const row = thead.insertRow(i);
            row.dataset.row = (i + 1).toString();
            row.dataset.animal = a.species;
            let acc = 0;
            for (const p in a) {
              const cell = row.insertCell();
              cell.dataset.row = (i + 1).toString();
              cell.dataset.column = (acc + 1).toString();
              cell.dataset.animal = a.species;
              const stringP = typeof p === "string" ? p : (p as any).toString();
              switch (p) {
                case "name":
                  cell.textContent = `Nome`;
                  break;
                case "age":
                  cell.textContent = "Idade";
                  break;
                case "species":
                  cell.textContent = "Espécie";
                  break;
                case "sex":
                  cell.textContent = "Sexo";
                  break;
                case "humor":
                  cell.textContent = "Convive";
                  break;
                case "castrated":
                  cell.textContent = "Castrado";
                  break;
                case "size":
                  cell.textContent = "Porte";
                  break;
                default:
                  cell.textContent = `${stringP.charAt(0).toUpperCase()}${stringP.slice(1)}`;
                  break;
              }
              cell.id = `__${stringP.toLowerCase().replace(/\s/g, "_")}`;
              acc += 1;
            }
            continue;
          }
        }
        const tbody = table.querySelector("tbody");
        if (!(tbody instanceof HTMLTableSectionElement)) continue;
        const row = tbody.appendChild(document.createElement("tr"));
        row.dataset.row = (i + 1).toString();
        row.dataset.animal = a.species;
        let acc = 0;
        for (const p in a) {
          const cell = row.insertCell();
          cell.dataset.row = (i + 1).toString();
          cell.dataset.column = (acc + 1).toString();
          cell.dataset.animal = a.species;
          const stringP = Array.isArray(a[p])
            ? a[p]
                .map((e: any) =>
                  typeof e === "string"
                    ? `${e.charAt(0).toUpperCase()}${e.slice(1)}`
                    : `${e.toString().charAt(0).toUpperCase()}${e.toString().slice(1)}`,
                )
                .join(", ")
                .replace(/children/gi, "Crianças")
                .replace(/cat/gi, "Gato")
                .replace(/dogs/gi, "Cães")
                .replace(/small/gi, "Animais pequenos")
                .replace(/white/gi, "Branco")
                .replace(/black/gi, "Preto")
                .replace(/grey/gi, "Cinza")
                .replace(/orange/gi, "Laranja")
                .replace(/yellow/gi, "Amarelo")
                .replace(/fur/gi, "Pelugem")
                .replace(/tortoiseshell/gi, "Escaminha")
                .replace(/tabby/gi, "Rajado")
                .replace(/calico/gi, "Tricolor")
            : typeof a[p] === "string"
              ? a[p]
              : (a[p] as any).toString();
          switch (p) {
            case "species":
              cell.textContent = a[p] === "dog" ? "Cão" : "Gato";
              break;
            case "size":
              switch (a[p]) {
                case "large":
                  cell.textContent = `Grande`;
                  break;
                case "small":
                  cell.textContent = "Pequeno";
                  break;
                default:
                  cell.textContent = "Médio";
                  break;
              }
              break;
            case "sex":
              cell.textContent = a[p] === "male" ? "Macho" : "Fêmea";
              break;
            case "fiv":
              if (a[p] === "undefined") {
                cell.textContent = "Não testado";
                break;
              }
              cell.textContent = a[p] === "negative" ? "Negativo" : "Positivo";
              break;
            case "felv":
              if (a[p] === "undefined") {
                cell.textContent = "Não testado";
                break;
              }
              cell.textContent = a[p] === "negative" ? "Negativo" : "Positivo";
              break;
            default:
              if (a[p] === "true" || a[p] === true || a[p] === "false" || a[p] === false) {
                cell.textContent = a[p] === "true" || a[p] === true ? "Sim" : "Não";
                break;
              }
              cell.textContent = `${stringP.charAt(0)}${stringP.slice(1)}`;
              break;
          }
          cell.id = `__${stringP.toLowerCase().replace(/\s/g, "_")}`;
          acc += 1;
        }
      }
    } catch (e) {
      console.error(`Error executing routeSubmit:\n${(e as Error).message}`);
    }
  } catch (e) {
    console.error(`Error executing submitForm:\n${(e as Error).message}`);
  }
}
