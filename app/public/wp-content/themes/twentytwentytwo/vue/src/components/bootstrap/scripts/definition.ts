import { ref } from "vue";
import { nDv } from "../../../scripts/declarations/types";
const carouselDefinition = {
  props: {
    id: {
      type: String,
      required: true,
      default: "",
    },
    figures: {
      type: Array as () => {}[],
      required: true,
      default: [{ src: "" }],
    },
    ride: {
      type: String,
      required: false,
      default: "false",
    },
    interval: {
      type: Number,
      required: false,
      default: 5000,
    },
    pause: {
      type: Boolean,
      required: false,
      default: true,
    },
    keyboard: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  setup(props: any) {
    const r = ref<nDv>(null);
    try {
      if (!(r.value instanceof HTMLElement)) throw new Error(`Failed to validate instance of main reference`);
      if (
        r.value.getAttribute("data-bs-ride") !== "carousel" &&
        r.value.getAttribute("data-bs-ride") !== "true" &&
        r.value.getAttribute("data-bs-ride") !== "false"
      )
        r.value.setAttribute("data-bs-ride", "false");
    } catch (e) {
      console.error(`Error executing procedure to define pause behavior string:\n${(e as Error).message}`);
    }
    return {
      r,
    };
  },
};
export default carouselDefinition;
