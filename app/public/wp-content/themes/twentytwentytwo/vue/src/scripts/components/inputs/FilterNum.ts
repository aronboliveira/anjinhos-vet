import { defineComponent, ref, reactive, watch, onMounted, computed } from "vue";
import { nDl, nInp, nLb } from "../../declarations/types";
import { parseNotNaN } from "../../handlers/handlersMath";
import { labMap } from "../../../vars";
const FilterNum = (() =>
  defineComponent({
    name: "FilterNum",
    props: {
      id: {
        type: String,
        required: true,
        default: "number",
      },
      lab: {
        type: String,
        required: false,
        default: "",
      },
      minLength: {
        type: Number,
        required: false,
        default: 0,
      },
      maxLength: {
        type: Number,
        required: false,
        default: Number.MAX_SAFE_INTEGER,
      },
      pattern: {
        type: String,
        required: false,
        default: "^[0-9]*$",
      },
      autocomplete: {
        type: String,
        required: false,
        default: "none",
      },
      required: {
        type: Boolean,
        required: false,
        default: false,
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      readOnly: {
        type: Boolean,
        required: false,
        default: false,
      },
      dataList: {
        type: Array as () => string[],
        required: false,
        default: [],
      },
      step: {
        type: Number,
        required: false,
        default: 1,
      },
    },
    setup(props) {
      const r = ref<nInp>(null);
      const rlb = ref<nLb>(null);
      const dr = ref<nDl>(null);
      const rc = ref<{ [k: string]: string[] }>({});
      const s = reactive({
        req: props.required,
        ro: props.readOnly,
        dsb: props.disabled,
        pt: props.pattern,
        v: "",
        vn: NaN,
        lb: props.lab,
      });
      const nVl = computed(() => parseNotNaN(s.v) || s.vn);
      const sVl = computed(() => s.v);
      const updateDatalist = (n: string) => {
        try {
          if (!(r.value instanceof HTMLInputElement)) throw new Error(`Input reference for ${props.id} is not valid`);
          if (!dr.value) {
            dr.value = Object.assign(document.createElement("datalist"), {
              id: `${props.id}List`,
            });
            r.value.insertAdjacentElement("afterend", dr.value);
          }
          const idf = `${r.value.id}`;
          if (n !== "") {
            if (!rc.value[idf]) rc.value[idf] = [];
            if (!rc.value[idf].includes(n)) {
              rc.value[idf].push(n);
              if (rc.value[idf].length > 3) rc.value[idf].shift();
            }
          }
        } catch (e) {
          console.error(`Error updating datalist for ${props.id}: ${(e as Error).message}`);
        }
      };
      const sanitazeValue = (n: string) => {
        if (/[^0-9,\.]/g.test(n)) n = n.replace(/[^0-9,\.]/g, "");
        if (n.length > 2) n = n.slice(0, 2);
        const num = Math.abs(parseNotNaN(n, 0, "int"));
        return num && Number.isFinite(num) ? Math.abs(parseNotNaN(n, 0, "int")).toFixed(0) : "0";
      };
      watch(
        () => s.req,
        n => (s.req = n),
      );
      watch(
        () => s.v,
        n => {
          s.v = sanitazeValue(n);
          updateDatalist(s.v);
        },
      );
      watch(
        () => s.vn,
        n => (s.vn = parseNotNaN(s.v) || n),
      );
      if (s.lb === "" && props.id !== "") s.lb = labMap.get(props.id) || props.id || s.lb;
      if (s.req) {
        if (s.ro) r.value?.setAttribute("readonly", "true");
        else r.value?.removeAttribute("readonly");
        if (s.dsb) r.value?.setAttribute("disabled", "true");
        else r.value?.removeAttribute("disabled");
      }
      if (!/{/g.test(s.pt)) {
        if (props.minLength > 0) {
          s.pt = `${s.pt}{${props.minLength},`;
          if (props.maxLength) s.pt += `{props.maxLength}}`;
          else s.pt += `}`;
        }
      }
      onMounted(() => {
        updateDatalist(s.v);
        try {
          if (!(r.value instanceof HTMLInputElement))
            throw new Error(`Couldn't validate the Reference for the input ${props.id}`);
          const form = r.value?.closest("form");
          if (!(form instanceof HTMLFormElement)) throw new Error(`Couldn't found Form for the Input ${props.id}`);
          r.value.dataset.form = `#${form.id}`;
          r.value.formAction = form.action;
          r.value.formMethod = form.method;
          r.value.formEnctype = form.enctype;
          r.value.formNoValidate = form.noValidate;
        } catch (e) {
          console.error(`Error on defining form properties to the input:\n${(e as Error).message}`);
        }
        try {
          if (!(r.value instanceof HTMLInputElement)) throw new Error(`Failed to validate Input Reference`);
          try {
            if (!(rlb.value instanceof HTMLLabelElement)) throw new Error(`Failed to validate Label Reference`);
            if (rlb.value.htmlFor !== r.value.id) rlb.value.htmlFor = r.value.id;
          } catch (e) {
            console.error(`Error executing procedure for fixing Label htmlFor:\n${(e as Error).message}`);
          }
          if (!r.value.labels) throw new Error(`Failed to read labels NodeList for Input Reference.`);
          if (!r.value.labels[0]) throw new Error(`Failed to read any label in the Labels NodeList`);
          r.value.labels.forEach((lab, i) => {
            try {
              if (lab.id === "") return;
              if (!r.value) throw new Error(`Lost reference to the input`);
              if (i === 0) r.value.dataset.labels = `#${lab.id}`;
              else r.value.dataset.labels += `, #${lab.id}`;
            } catch (e) {
              console.error(`Error executing iteration ${i} for ${props.id}:\n${(e as Error).message}`);
            }
          });
        } catch (e) {
          console.error(`Error executing procedure to define Dataset Label:\n${(e as Error).message}`);
        }
        try {
          if (!(r.value instanceof HTMLInputElement)) throw new Error(`Failed to validate Input Reference`);
          if (dr.value instanceof HTMLDataListElement && r.value.list && r.value.list.id !== dr.value.id)
            r.value.setAttribute("list", dr.value.id);
          if (!r.value.list) {
            const dl =
              dr.value instanceof HTMLDataListElement
                ? dr.value.id
                : r.value.parentElement?.querySelector("datalist")?.id;
            if (!dl) throw new Error(`Failed to fetch datalist id`);
            r.value.setAttribute("list", dl);
          }
        } catch (e) {
          console.error(`Error executing procedure to assing List:\n${(e as Error).message}`);
        }
      });
      return {
        s,
        nVl,
        sVl,
        r,
        dr,
        rc,
        tLab: labMap.get(s.lb) || s.lb || props.lab,
      };
    },
  }))();
export default FilterNum;
