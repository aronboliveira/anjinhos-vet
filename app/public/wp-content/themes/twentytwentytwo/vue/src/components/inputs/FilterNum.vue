<script lang="ts">
  import FilterInp from "../../scripts/components/inputs/FilterInp";
  export default FilterInp;
</script>
<template>
  <fieldset :id="`${id}Fs`">
    <label :id="`${id}Lab`" :for="id" ref="rlb">{{ tLab }}</label>
    <input
      v-model="sVl"
      ref="r"
      type="text"
      :name="lab.replace(/([A-Z])/g, '_$1').toLowerCase()"
      dir="ltr"
      :dirName="`${lab.replace(/([A-Z])/g, '_$1').toLowerCase()?.direction ?? ''}`"
      :data-number="`${nVl}`"
      :placeholder="`Digite o ${tLab} aqui`"
      :id="id"
      :minlength="minLength"
      :maxlength="maxLength"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :pattern="s.pt"
      :required="s.req"
      :disabled="s.dsb"
      :readonly="s.ro"
      :step="Number.isFinite(step) ? step.toFixed(0) : 1"
    />
    <datalist v-if="dataList.length > 0" :id="`${id}List`" ref="dr" :data-inp="id">
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
