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
