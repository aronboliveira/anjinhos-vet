//@ts-ignore
import FilterInp from "../../inputs/FilterInp.vue";
//@ts-ignore
import FilterCheck from "../../inputs/FilterCheck.vue";
//@ts-ignore
import FilterSelect from "../../inputs/FilterSelect.vue";
//@ts-ignore
import FilterNum from "../../inputs/FilterNum.vue";
import props, { FormProps } from "./props";
import isetup from "./setup";
const formDefinition = {
  name: "FilterForm",
  props,
  components: {
    FilterInp,
    FilterNum,
    FilterCheck,
    FilterSelect,
  },
  setup(props: FormProps) {
    const { fr, spr, isCat, isDog, loading, canFetch } = isetup(props);
    return {
      fr,
      spr,
      isCat,
      isDog,
      loading,
      canFetch,
    };
  },
};
export default formDefinition;
