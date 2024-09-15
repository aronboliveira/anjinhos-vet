<script lang="ts">
  import { defineComponent, ref, reactive, watch, onMounted } from "vue";
  import { nLb, nSl } from "../../scripts/declarations/types";
  import { OptGroupProps, OptProps } from "../../scripts/declarations/interfaceComponents";
  import { labMap } from "../../vars.ts";
  import { updateAttrs, assignFormAttrs, handleLabs } from "../../scripts/components/utils.ts";
  import { recolorOpts } from "../../scripts/handlers/handlersStyles.ts";
  import methods from "./scripts/selectMethods.ts";
  export default defineComponent({
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
      mv: {
        type: String,
        required: false,
        default: "",
      },
    },
    emits: ["update:mv"],
    methods: methods,
    setup(props, { emit }) {
      const r = ref<nSl>(null);
      const rlb = ref<nLb>(null);
      const v = ref(
        props.type === "select-multiple" ? (Array.isArray(props.mv) ? props.mv : []) : props.mv || props.defV || "dog",
      );
      const s = reactive({
        req: props.required,
        ro: props.readOnly,
        dsb: props.disabled,
        lb: props.lab,
      });
      watch(
        () => s.req,
        n => updateAttrs(r.value, s.ro, s.dsb, s.req),
      );
      watch(
        () => v.value,
        n => {
          v.value = n || props.defV;
          if (props.type === "select-multiple" && !Array.isArray(n)) n = [n];
          emit("update:mv", n);
        },
      );
      if (s.lb === "" && props.id !== "") s.lb = labMap.get(props.id) || props.id || s.lb;
      onMounted(() => {
        try {
          if (!(r.value instanceof HTMLInputElement || r.value instanceof HTMLSelectElement))
            throw new Error(`Couldn't validate the Reference for the input ${props.id}`);
          const form = r.value?.closest("form");
          if (!(form instanceof HTMLFormElement)) throw new Error(`Couldn't found Form for the Input ${props.id}`);
          assignFormAttrs(r.value, form);
        } catch (e) {
          console.error(`Error on defining form properties to the input:\n${(e as Error).message}`);
        }
        handleLabs(r.value, rlb.value, props);
        try {
          if (!(r.value instanceof HTMLSelectElement)) throw new Error(`Failed to validate main reference instance`);
          v.value = props.defV;
          if (v.value === "" && r.value.options.length > 0) v.value = r.value.options[0].value;
          r.value.dataset.default = props.defV;
        } catch (e) {
          console.error(
            `Error executing procedure for defining default value for Select ${props.id}:\n${(e as Error).message}`,
          );
        }
        try {
          if (props.defV !== "") {
            console.log("defV is " + props.defV || "undefined");
            v.value = props.defV;
            console.log("v.value is " + v.value || "undefined");
            emit("update:mv", props.defV);
          }
        } catch (e) {
          console.error(`Error executing procedures for defining default Value:\n${(e as Error).message}`);
        }
        if (props.type === "select-multiple") recolorOpts(r.value, "red");
      });
      return {
        s,
        v,
        r,
        rlb,
        tLab: labMap.get(s.lb) || s.lb || props.lab,
        o: props.opts,
      };
    },
  });
</script>
<template>
  <fieldset :id="`${id}Fs`" :class="{ 'form-group': true, fading: id === 'size' }">
    <label :id="`${id}Lab`" :for="id" ref="rlb" class="form-label">{{ tLab }}</label>
    <select
      ref="r"
      class="form-select"
      v-model="v"
      :data-model="mv"
      :id="id"
      :name="id.replace(/([A-Z])/g, (m, i) => (m === id.charAt(0) ? `${m.toLowerCase()}` : `_${m.toLowerCase()}`))"
      :required="s.req"
      :readonly="s.ro"
      :disabled="s.dsb"
      :data-type="type"
      :multiple="type === 'select-multiple' ? true : false"
      :autofocus="id === 'size' ? true : false"
      :size="type === 'select-multiple' ? 2 : null"
      @click="handleMouseDown"
    >
      <optgroup v-if="o.options && o.lab" v-for="o in opts" :key="`optgrp__${o.lab}__${id}`" :label="o.lab">
        <option v-for="op in o.options" :key="`opt__${op.value}__${lab}__${id}`" :value="op.value">
          {{ op.text }}
        </option>
      </optgroup>
      <option v-else v-for="o in opts" :key="`opt__${o.value}__${id}`" :value="o.value">
        {{ o.text }}
      </option>
    </select>
  </fieldset>
</template>
<style scoped>
  fieldset {
    display: flex;
    flex-flow: column wrap;
    label {
      width: 100%;
    }
    select {
      width: 100%;
    }
  }
</style>
