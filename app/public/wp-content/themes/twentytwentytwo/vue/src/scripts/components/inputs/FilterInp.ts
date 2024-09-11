import { defineComponent, ref, reactive, watch, onMounted } from "vue";
import { nDl, nInp } from "../../declarations/types";
const FilterInp = (() =>
  defineComponent({
    props: {
      v: {
        type: String,
        required: true,
        default: "",
      },
      id: {
        type: String,
        required: true,
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
        default: ".*",
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
    },
    setup(props) {
      const r = ref<nInp>(null);
      const dr = ref<nDl>(null);
      const rc = ref<{ [k: string]: string[] }>({});
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
      const s = reactive({
        req: props.required,
        ro: props.readOnly,
        dsb: props.disabled,
        pt: props.pattern,
        v: props.v,
      });
      watch(
        () => props.required,
        n => (s.req = n),
      );
      watch(
        () => props.v,
        n => updateDatalist(n),
      );
      if (s.req) {
        if (s.ro)
          Object.defineProperty(s, "readOnly", {
            value: !s.ro,
            writable: true,
            enumerable: true,
          });
        if (s.dsb)
          Object.defineProperty(s, "disabled", {
            value: !s.dsb,
            writable: true,
            enumerable: true,
          });
      }
      if (!/{/g.test(s.pt)) {
        if (props.minLength > 0) {
          s.pt = `${s.pt}{${props.minLength},`;
          if (props.maxLength) s.pt += `{props.maxLength}}`;
          else s.pt += `}`;
        }
      }
      onMounted(() => updateDatalist(s.v));
      return {
        s,
        r,
        dr,
        rc,
      };
    },
  }))();
export default FilterInp;
