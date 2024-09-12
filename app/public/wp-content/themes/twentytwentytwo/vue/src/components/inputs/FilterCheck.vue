<script lang="ts">
  import { defineComponent, ref, reactive, watch, onMounted } from "vue";
  import { nInp, nLb } from "../../scripts/declarations/types";
  import { labMap } from "../../vars";
  import { updateAttrs, assignFormAttrs, handleLabs } from "../../scripts/components/utils.ts";
  export default defineComponent({
    name: "FilterCheck",
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
      checked: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    setup(props) {
      const r = ref<nInp>(null);
      const rlb = ref<nLb>(null);
      const rc = ref<{ [k: string]: string[] }>({});
      const s = reactive({
        req: props.required,
        ro: props.readOnly,
        dsb: props.disabled,
        v: r.value?.indeterminate || r.value?.defaultChecked || r.value?.checked || props.checked,
        lb: props.lab,
      });
      watch(
        () => s.req,
        n => updateAttrs(r.value, s.ro, s.dsb, s.req),
      );
      watch(
        () => s.v,
        n => {
          s.v = n ? n : r.value?.indeterminate || r.value?.defaultChecked || r.value?.checked || props.checked || n;
        },
      );
      if (s.lb === "" && props.id !== "") s.lb = labMap.get(props.id) || props.id || s.lb;
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
        handleLabs(r.value, rlb.value, props);
      });
      return {
        s,
        r,
        rc,
        tLab: labMap.get(s.lb) || s.lb || props.lab,
      };
    },
  });
</script>
<template>
  <fieldset :id="`${id}Fs`" class="form-check form-group">
    <label class="form-check-label" :id="`${id}Lab`" :for="id" ref="rlb">{{ tLab }}</label>
    <input
      v-model="s.v"
      ref="r"
      type="checkbox"
      class="form-check-input"
      :id="id"
      :name="id.replace(/([A-Z])/g, (m, i) => (m === id.charAt(0) ? `${m.toLowerCase()}` : `_${m.toLowerCase()}`))"
      :required="s.req"
      :disabled="s.dsb"
      :readonly="s.ro"
      :data-check="s.ck"
    />
  </fieldset>
</template>
<style scoped>
  fieldset {
    display: flex;
    flex-flow: column wrap;
    label {
      width: 100%;
    }
    input {
      width: 100%;
    }
  }
</style>
