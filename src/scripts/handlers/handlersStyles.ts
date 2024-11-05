import { nSl } from "../declarations/types";
import { parseNotNaN } from "./handlersMath";
export function recolorOpts(
  el: nSl | HTMLDataListElement,
  color: string = "rgb(84, 84, 84)",
  altcolor: string = "rgba(0, 0, 0, 0)",
) {
  try {
    if (!(el instanceof HTMLSelectElement || el instanceof HTMLDataListElement))
      throw new Error(`Failed to validate main element instance`);
    let i = 0;
    const recolor = (ev: Event) => {
      try {
        if (
          !(
            ev.currentTarget instanceof HTMLOptionElement ||
            ev.currentTarget instanceof HTMLSelectElement ||
            ev.currentTarget instanceof HTMLDataListElement
          )
        )
          throw new Error(`Failed to validate option instance.`);
        if (ev.currentTarget instanceof HTMLSelectElement || ev.currentTarget instanceof HTMLDataListElement) {
          for (const o of ev.currentTarget.options) {
            if (o.selected) o.style.backgroundColor = color;
            else o.style.backgroundColor = altcolor;
          }
        } else {
          // when clicked -> rgb(153, 200, 255), but not changed
          // when selected -> background-color rgb(84, 84, 84), rgb(255, 255, 255)
          // default -> none;
          // if (getComputedStyle(targ).backgroundColor === "rgb(153, 200, 255)") targ.style.backgroundColor = "blue";
          // if (getComputedStyle(targ).backgroundColor === "rgb(84, 84, 84)") targ.style.backgroundColor = "green";
          // targ.style.backgroundColor = color;
          // else targ.style.backgroundColor = altcolor;
        }
      } catch (e) {
        console.error(`Error executing recolor for options:\n${(e as Error).message}`);
      }
    };
    for (const o of el.options) {
      try {
        i = +1;
        o.addEventListener("click", recolor);
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for the options of ${el.id || el.className || el.tagName}:\n${(e as Error).message}`,
        );
      }
    }
  } catch (e) {
    console.error(`Error executing recolorOpts:\n${(e as Error).message}`);
  }
}
export function limitResize(el: nSl): void {
  try {
    if (!(el instanceof HTMLSelectElement && (el.multiple || el.dataset.type === "select-multiple")))
      throw new Error(`Failed to validate Select instance.`);
    let msz = Array.from(el.options).reduce(
      (a, o) =>
        a +
        parseNotNaN(getComputedStyle(o).height.replace("px", "").trim()) +
        parseNotNaN(getComputedStyle(o).paddingTop.replace("px", "").trim()) +
        parseNotNaN(getComputedStyle(o).paddingBottom.replace("px", "").trim()) +
        parseNotNaN(getComputedStyle(el).paddingTop.replace("px", "").trim()) / 4,
      0,
    );
    el.style.maxHeight = `${msz}px`;
  } catch (e) {
    console.error(`Error executing limitResize:\n${(e as Error).message}`);
  }
}
