<script lang="ts">
  import FilterCheck from "../../scripts/components/inputs/FilterCheck";
  export default FilterCheck;
</script>
<template>
  <fieldset :id="`${id}Fs`">
    <label :id="`${id}Lab`" :for="id" ref="rlb">{{ tLab }}</label>
    <select
      ref="r"
      v-model="s.v"
      :type="type"
      :id="id"
      :name="lab.replace(/([A-Z])/g, '_$1').toLowerCase()"
      :required="s.req"
      :disabled="s.dsb"
      :readonly="s.ro"
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
