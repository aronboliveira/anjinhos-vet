<script lang="ts">
  import FilterInp from "../../scripts/components/inputs/FilterInp";
  export default FilterInp;
</script>
<template>
  <fieldset :id="`${id}Fs`">
    <label :id="`${id}Lab`" :for="id">{{ lab }}</label>
    <input
      ref="r"
      type="text"
      v-model="s.v"
      :placeholder="`Digite o ${lab} aqui`"
      :id="id"
      :name="lab.replace(/([A-Z])/g, '_$1').toLowerCase()"
      :minlength="minLength"
      :maxlength="maxLength"
      :pattern="s.pt"
      :autocomplete="autocomplete"
      :required="s.req"
      :disabled="s.dsb"
      :readonly="s.ro"
    />
    <datalist v-if="dataList.length > 0" :id="`${id}List`" ref="dr">
      <option v-for="d in recentSelections[id] ?? dataList" :key="`opt__${id}List__${d}`" :value="d"></option>
    </datalist>
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
