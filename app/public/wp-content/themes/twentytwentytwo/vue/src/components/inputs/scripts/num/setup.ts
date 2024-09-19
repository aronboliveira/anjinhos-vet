import { NumProps } from "../../../../scripts/declarations/interfaces";
import { ref, reactive, watch, onMounted } from "vue";
import { nInp, nLb, nDl } from "../../../../scripts/declarations/types";
import { handleDlUpdate, updateAttrs, handleDl, handleLabs, assignFormAttrs } from "../../../../scripts/model/utils";
import { labMap } from "../../../../vars";
import { parseNotNaN } from "../../../../scripts/handlers/handlersMath";
export default function numSetup(props: NumProps) {
  const r = ref<nInp>(null);
  const rlb = ref<nLb>(null);
  const dr = ref<nDl>(null);
  const s = reactive({
    req: props.required,
    ro: props.readOnly,
    dsb: props.disabled,
    pt: props.pattern,
    v: "",
    vn: NaN,
    lb: props.lab,
  });
  const updateDatalist = (n: string) => {
    try {
      if (!(r.value instanceof HTMLInputElement)) throw new Error(`Input reference for ${props.id} is not valid`);
      sessionStorage.setItem(`${props.id}_v`, s.v);
      if (!dr.value) {
        dr.value = Object.assign(document.createElement("datalist"), {
          id: `${props.id}List`,
        });
        r.value.insertAdjacentElement("afterend", dr.value);
      }
      handleDlUpdate(r.value, dr.value, n);
    } catch (e) {
      console.error(`Error updating datalist for ${props.id}: ${(e as Error).message}`);
    }
  };
  const sanitazeValue = (n: number | string) => {
    if (typeof n === "string") n = parseInt((n as string).replace(/[^0-9]/g, ""));
    if (!Number.isFinite(n)) n = 0;
    if (n.toString().length > 2)
      n = parseInt(
        n
          .toString()
          .replace(/[^0-9]/g, "")
          .slice(0, 2),
      );
    return n;
  };
  watch(
    () => s.req,
    _ => updateAttrs(r.value, s.ro as any, s.dsb as any, s.req as any),
  );
  watch(
    () => s.v,
    n => {
      s.v = sanitazeValue(n).toString();
      updateDatalist(s.v);
    },
  );
  watch(
    () => s.vn,
    n => (s.vn = parseNotNaN(sanitazeValue(n).toString())),
  );
  if (s.lb === ("" as any) && props.id !== ("" as any)) (s.lb as any) = labMap.get(props.id as any) || props.id || s.lb;
  if (!/{/g.test(s.pt as any)) {
    if ((props.minLength as any) > 0) {
      (s.pt as any) = `${s.pt}{${props.minLength},`;
      if (props.maxLength) (s.pt as any) += `{props.maxLength}}`;
      else (s.pt as any) += `}`;
    }
  }
  onMounted(() => {
    updateDatalist(s.v);
    try {
      if (!(r.value instanceof HTMLInputElement))
        throw new Error(`Couldn't validate the Reference for the input ${props.id}`);
      const form = r.value?.closest("form");
      if (!(form instanceof HTMLFormElement)) throw new Error(`Couldn't found Form for the Input ${props.id}`);
      assignFormAttrs(r.value, form);
    } catch (e) {
      console.error(`Error on defining form properties to the input:\n${(e as Error).message}`);
    }
    handleLabs(r.value, rlb.value, props);
    handleDl(r.value, dr.value);
  });
  return {
    s,
    r,
    rlb,
    dr,
    tLab: labMap.get(props.id as any) || s.lb || props.lab,
    step: props.step,
  };
}
