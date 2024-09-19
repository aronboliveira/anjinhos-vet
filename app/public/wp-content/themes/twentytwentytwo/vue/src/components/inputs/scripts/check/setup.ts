import { ref, reactive, watch, onMounted } from "vue";
import { assignFormAttrs, handleLabs, updateAttrs } from "../../../../scripts/components/utils";
import { nInp, nLb } from "../../../../scripts/declarations/types";
import { labMap } from "../../../../vars";
import { CheckProps } from "./props";
import { InpProps } from "../../../../scripts/declarations/interfaceComponents";
export default function checkSetup(props: CheckProps) {
  const r = ref<nInp>(null);
  const rlb = ref<nLb>(null);
  const s = reactive({
    req: props.required.default,
    ro: props.readOnly.default,
    dsb: props.disabled.default,
    v: r.value?.indeterminate || r.value?.defaultChecked || r.value?.checked || props.checked.default,
    lb: props.lab.default,
  });
  watch(
    () => s.req,
    _ => updateAttrs(r.value, s.ro, s.dsb, s.req),
  );
  watch(
    () => s.v,
    n => {
      s.v = n ? n : r.value?.indeterminate || r.value?.defaultChecked || r.value?.checked || props.checked.default || n;
    },
  );
  if (s.lb === "" && props.id.default !== "") s.lb = labMap.get(props.id.default) || props.id.default || s.lb;
  onMounted(() => {
    try {
      if (!(r.value instanceof HTMLInputElement))
        throw new Error(`Couldn't validate the Reference for the input ${props.id}`);
      const form = r.value?.closest("form");
      if (!(form instanceof HTMLFormElement)) throw new Error(`Couldn't found Form for the Input ${props.id}`);
      assignFormAttrs(r.value, form);
    } catch (e) {
      console.error(`Error on defining form properties to the input:\n${(e as Error).message}`);
    }
    const extractedProps: Record<string, any> = {};
    for (const [key, value] of Object.entries(props)) extractedProps[key] = value.default;
    handleLabs(r.value, rlb.value, extractedProps as InpProps);
  });
  const tLab = labMap.get(s.lb) || s.lb || props.lab.default;
  return {
    s,
    r,
    rlb,
    tLab,
  };
}
