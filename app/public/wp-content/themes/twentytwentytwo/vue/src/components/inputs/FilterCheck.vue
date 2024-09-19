<script lang="ts">
  import { defineComponent, ref, reactive, watch, onMounted } from "vue";
  import { nInp, nLb } from "../../scripts/declarations/types";
  import { labMap } from "../../vars";
  import { updateAttrs, assignFormAttrs, handleLabs } from "../../scripts/components/utils.ts";
  import props from "./scripts/check/props.ts";
  import isetup from "./scripts/check/setup.ts";
  export default defineComponent({
    name: "FilterCheck",
    props,
    setup(props) {
      const { s, r, rlb, tLab } = isetup(props);
      return {
        s,
        r,
        rlb,
        tLab,
      };
    },
  });
</script>
<template>
  <fieldset :id="`${id}Fs`" :class="{ 'form-group form-check': true, fading: id === 'felv' || id === 'fiv' }">
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
      :autofocus="id === 'felv' ? true : false"
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
  }
</style>
