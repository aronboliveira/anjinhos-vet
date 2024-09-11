<script lang="ts">
  import FilterCheck from "../../scripts/components/inputs/FilterCheck";
  export default FilterCheck;
</script>
<template>
  <fieldset :id="`${id}Fs`">
    <label :id="`${id}Lab`" :for="id" ref="rlb">{{ tLab }}</label>
    <input
      ref="r"
      type="checkbox"
      v-model="sVl"
      :id="id"
      :name="lab.replace(/([A-Z])/g, '_$1').toLowerCase()"
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
