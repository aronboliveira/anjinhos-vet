import { defineComponent, ref, reactive, watch, onMounted } from "vue";
import { nLb, nSl } from "../../declarations/types";
import { OptGroupProps, OptProps } from "../../declarations/interfaceComponents";
const FilterSelect = (() =>
  defineComponent({
    name: "FilterSelect",
    props: {
      id: {
        type: String,
        required: true,
        default: "",
      },
      lab: {
        type: String,
        required: false,
        default: "",
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
      defV: {
        type: String,
        required: false,
        default: "",
      },
      type: {
        type: String as () => "select-one" | "select-multiple",
        required: false,
        default: "select-one",
      },
      opts: {
        type: Array as (() => OptProps[]) | (() => OptGroupProps[]),
        required: true,
        default: [],
      },
    },
    setup(props) {
      const r = ref<nSl>(null);
      const rlb = ref<nLb>(null);
      const rc = ref<{ [k: string]: string[] }>({});
      const s = reactive({
        req: props.required,
        ro: props.readOnly,
        dsb: props.disabled,
        v: props.defV,
      });
      watch(
        () => s.req,
        n => (s.req = n),
      );
      watch(
        () => s.v,
        n => {
          s.v = n;
        },
      );
      if (s.req) {
        if (s.ro) r.value?.setAttribute("readonly", "true");
        else r.value?.removeAttribute("readonly");
        if (s.dsb) r.value?.setAttribute("disabled", "true");
        else r.value?.removeAttribute("disabled");
      }
      onMounted(() => {
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
          if (!(r.value instanceof HTMLSelectElement)) throw new Error(`Failed to validate main reference instance`);
          s.v = props.defV;
          if (s.v === "" && r.value.options.length > 0) s.v = r.value.options[0].value;
          r.value.dataset.default = props.defV;
        } catch (e) {
          console.error(
            `Error executing procedure for defining default value for Select ${props.id}:\n${(e as Error).message}`,
          );
        }
      });
      return {
        s,
        r,
        rc,
      };
    },
  }))();
export default FilterSelect;
