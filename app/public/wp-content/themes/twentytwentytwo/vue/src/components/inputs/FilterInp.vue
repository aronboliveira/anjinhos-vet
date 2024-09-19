<script lang="ts">
  import { defineComponent, ref, reactive, watch, onMounted } from "vue";
  import { nDl, nInp, nLb } from "../../declarations/types";
  import { parseNotNaN } from "../../scripts/handlers/handlersMath.ts";
  import { labMap } from "../../vars.ts";
  import {
    updateAttrs,
    assignFormAttrs,
    handleLabs,
    handleDl,
    handleDlUpdate,
  } from "../../scripts/components/utils.ts";
  import props from "./scripts/text/props.ts";
  export default defineComponent({
    name: "FilterInp",
    props,
    setup(props) {
      const r = ref<nInp>(null);
      const rlb = ref<nLb>(null);
      const dr = ref<nDl>(null);
      const rc = ref<{ [k: string]: string[] }>({});
      const s = reactive({
        req: props.required,
        ro: props.readOnly,
        dsb: props.disabled,
        pt: props.pattern,
        lb: props.lab,
        v: "",
        vn: NaN,
      });
      const updateDatalist = (n: string) => {
        try {
          if (!(r.value instanceof HTMLInputElement)) throw new Error(`Input reference for ${props.id} is not valid`);
          sessionStorage.setItem(`${props.id}_v`, s.v);
          if (!dr.value) {
            dr.value = Object.assign(document.createElement("datalist"), {
              id: `${props.id}List`,
            });
            r.value.insertAdjacentElement("afterend", dr.value);
          }
          handleDlUpdate(r.value, dr.value, n);
        } catch (e) {
          console.error(`Error updating datalist for ${props.id}: ${(e as Error).message}`);
        }
      };
      watch(
        () => s.req,
        n => updateAttrs(r.value, s.ro, s.dsb, r.req),
      );
      watch(
        () => s.v,
        n => {
          s.vn = parseNotNaN(n);
          updateDatalist(n);
        },
      );
      watch(
        () => s.vn,
        n => (s.vn = parseNotNaN(s.v) || n),
      );
      if (s.lb === "" && props.id !== "") s.lb = labMap.get(props.id) || props.id || s.lb;
      if (!/{/g.test(s.pt)) {
        if (props.minLength > 0) {
          s.pt = `${s.pt}{${props.minLength},`;
          if (props.maxLength) s.pt += `{props.maxLength}}`;
          else s.pt += `}`;
        }
      }
      onMounted(() => {
        updateDatalist(s.v);
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
        handleDl(r.value, dr.value);
      });
      return {
        s,
        r,
        rlb,
        dr,
        rc,
        tLab: labMap.get(s.lb) || s.lb || props.lab,
      };
    },
  });
</script>
<template>
  <fieldset :id="`${id}Fs`" class="form-group">
    <label :id="`${id}Lab`" :for="id" ref="rlb" class="form-label">{{ tLab }}</label>
    <input
      v-model="s.v"
      class="form-control"
      ref="r"
      type="text"
      dir="ltr"
      :name="id.replace(/([A-Z])/g, (m, i) => (m === id.charAt(0) ? `${m.toLowerCase()}` : `_${m.toLowerCase()}`))"
      :dirName="`${id.replace(/([A-Z])/g, (m, i) => (m === id.charAt(0) ? `${m.toLowerCase()}` : `_${m.toLowerCase()}`))?.direction ?? ''}`"
      :data-number="s.vn"
      :placeholder="`Digite o ${tLab} aqui`"
      :id="id"
      :minLength="minLength"
      :maxLength="maxLength"
      :autocomplete="autocomplete"
      :autocapitalize="autocapitalize"
      :pattern="s.pt"
      :required="s.req"
      :disabled="s.dsb"
      :readonly="s.ro"
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
