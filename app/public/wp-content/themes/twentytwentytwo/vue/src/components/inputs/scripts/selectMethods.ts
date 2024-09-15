const selectMethods = {
  handleMouseDown(ev: MouseEvent) {
    let targ = ev.currentTarget;
    if (!(targ instanceof HTMLSelectElement || targ instanceof HTMLOptionElement)) {
      console.warn(`Event target passed to handleMouseDown is not a select`);
      return;
    }
    if (targ instanceof HTMLSelectElement) {
      console.log(targ.selectedOptions);
      console.log(targ.selectedIndex);
    } else {
      targ = targ.closest("select");
      if (!(targ instanceof HTMLSelectElement)) {
        console.warn(`Failed to fetch parent select`);
        return;
      }
      console.log(targ.selectedOptions);
      console.log(targ.selectedIndex);
    }
    // this.$refs.multiSelect.selectedIndex = -1;
  },
};
export default selectMethods;
