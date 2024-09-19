import { ref, watch, onMounted } from "vue";
import { nFm } from "../../../scripts/declarations/types";
import { FormProps } from "./props";
export default function FilterFormSetup(props: FormProps) {
  const r = ref<nFm>(null);
  const spr = ref<string>("dog");
  const isCat = ref<boolean>(spr.value === "cat");
  const isDog = ref<boolean>(spr.value === "dog");
  watch(
    () => spr.value,
    n => {
      isCat.value = n === "cat";
      isDog.value = n === "dog";
    },
    { immediate: true },
  );
  onMounted(() => {
    try {
      if (!(r.value instanceof HTMLFormElement)) throw new Error(`Failed to validate Form Reference`);
      try {
        const metaCs =
          document.querySelector('meta[charset*="utf-"]') ?? document.querySelector('meta[charset*="UTF-"]');
        if (!(metaCs instanceof HTMLMetaElement)) throw new Error(`Failed to fetch HTMLMetaElement for Charset`);
        const cs = /utf\-16/gi.test(metaCs.outerHTML) ? "utf-16" : "utf-8";
        r.value.acceptCharset = cs;
      } catch (e) {
        console.error(`Error executing procedure for defining Accept Charset for ${props.id}:${(e as Error).message}`);
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
            console.error(`Error executing iteration ${i} for adding ids do elements list:\n${(e as Error).message}`);
          }
        });
        r.value.dataset.elements = els;
        r.value.dataset.len = len.toString();
      } catch (e) {
        console.error(`Error executing procedures for defining Dataset for Elements:\n${(e as Error).message}`);
      }
    } catch (e) {
      console.error(`Error executing onMounted procedures for Form ${props.id}:\n${(e as Error).message}`);
    }
  });
  return {
    r,
    spr,
    isCat,
    isDog,
  };
}
