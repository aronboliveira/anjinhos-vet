import { defineComponent, ref } from "vue";
import { InpProps } from "../../declarations/interfaceComponents";
import { onMounted } from "vue/dist/vue.js";
import { nFm } from "../../declarations/types";
import FilterInp from "../inputs/FilterInp";
const FilterForm = (() =>
  defineComponent({
    name: "FilterForm",
    props: {
      id: {
        type: String,
        required: true,
        default: "",
      },
      action: {
        type: String,
        required: true,
        default: "/",
      },
      inps: {
        type: Array as () => InpProps[],
        required: true,
        default: [],
      },
    },
    data() {
      return {
        formData: {
          formId: `${this.id}`,
        },
      };
    },
    methods: {
      handleSubmit() {
        console.log(this.formData);
      },
    },
    components: {
      FilterInp,
    },
    setup(props) {
      const r = ref<nFm>(null);
      onMounted(() => {
        try {
          if (!(r.value instanceof HTMLFormElement)) throw new Error(`Failed to validate Form Reference`);
          try {
            const metaCs =
              document.querySelector('meta[charset*="utf-"]') ?? document.querySelector('meta[charset*="UTF-"]');
            if (!(metaCs instanceof HTMLMetaElement)) throw new Error(`Failed to fetch HTMLMetaElement for Charset`);
            const cs = /utf\-16/gi.test(metaCs.outerHTML) ? "utf-16" : "utf-18";
            r.value.acceptCharset = cs;
          } catch (e) {
            console.error(
              `Error executing procedure for defining Accept Charset for ${props.id}:${(e as Error).message}`,
            );
          }
          try {
            let els = "",
              len = 0;
            [
              ...r.value.querySelectorAll("button"),
              ...r.value.querySelectorAll("fieldset"),
              ...r.value.querySelectorAll("input"),
              ...r.value.querySelectorAll("object"),
              ...r.value.querySelectorAll("output"),
              ...r.value.querySelectorAll("select"),
              ...r.value.querySelectorAll("textarea"),
            ].forEach((el, i) => {
              try {
                if (!(el instanceof HTMLElement) || el.id === "") return;
                if (els === "") els = `#${el.id}`;
                else els += `, #${el.id}`;
                len += 1;
              } catch (e) {
                console.error(
                  `Error executing iteration ${i} for adding ids do elements list:\n${(e as Error).message}`,
                );
              }
            });
            r.value.dataset.elements = els;
            r.value.dataset.len = len.toString();
          } catch (e) {
            console.error(`Error executing procedures for defining Dataset for Elements:\n${(e as Error).message}`);
          }
        } catch (e) {
          console.error(`Error executing onMounted procedures for Form ${props.id}:${(e as Error).message}`);
        }
      });
    },
  }))();
export default FilterForm;
