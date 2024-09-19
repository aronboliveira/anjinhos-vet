import { pushSelectOpts } from "../../../../scripts/components/utils";
import { rc } from "../../../../vars";
const selectMethods = {
  handleClick(ev: MouseEvent): void {
    let targ = ev.currentTarget;
    if (!(targ instanceof HTMLSelectElement || targ instanceof HTMLOptionElement)) {
      console.warn(`Event target passed to handleClick is not a select`);
      return;
    }
    const updateOpts = (targ: HTMLSelectElement) => {
      const clickEl = document.elementFromPoint(ev.clientX, ev.clientY);
      try {
        if (clickEl instanceof HTMLOptionElement) {
          if (!clickEl.classList.contains("selected")) clickEl.selected = false;
          if (!rc[targ.id]) rc[targ.id] = {};
          if (!Array.isArray(rc[targ.id]?.lastOpts)) rc[targ.id].lastOpts = [];
          if (!Array.isArray(rc[targ.id]?.lastOpts))
            console.warn(`Failed to fetch recent last options for the <select>`);
          else {
            for (const o of Object.values(rc[targ.id].lastOpts)) {
              const sOp = Array.from(targ.options).find(op => op.value === o);
              if (sOp && o !== clickEl.value) {
                sOp.selected = true;
                sOp.ariaSelected = "true";
              }
            }
          }
          pushSelectOpts(targ, targ.id, Array.from(targ.selectedOptions));
        }
      } catch (e) {
        console.error(`Error executing updateOpts:\n${(e as Error).message}`);
      }
    };
    if (targ instanceof HTMLSelectElement) updateOpts(targ);
    else {
      targ = targ.closest("select");
      if (!(targ instanceof HTMLSelectElement)) {
        console.warn(`Failed to fetch parent select`);
        return;
      }
      updateOpts(targ);
    }
  },
  toggleOption(ev: MouseEvent): void {
    try {
      const clickEl = document.elementFromPoint(ev.clientX, ev.clientY);
      if (clickEl instanceof HTMLOptionElement) clickEl.classList.toggle("selected");
    } catch (e) {
      console.error(`Error executing toggleOption:\n${(e as Error).message}`);
    }
  },
};
export default selectMethods;
