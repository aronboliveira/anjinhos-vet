<script lang="ts">
  import { defineComponent, ref, reactive, watch, onMounted } from "vue";
  import { nDl, nInp, nLb } from "../../scripts/declarations/types";
  import { parseNotNaN } from "../../scripts/handlers/handlersMath";
  import { labMap, rc } from "../../vars";
  import {
    updateAttrs,
    assignFormAttrs,
    handleLabs,
    handleDl,
    handleDlUpdate,
  } from "../../scripts/components/utils.ts";
  export default defineComponent({
    name: "FilterNum",
    props: {
      id: {
        type: String,
        required: true,
        default: "number",
      },
      lab: {
        type: String,
        required: false,
        default: "",
      },
      minLength: {
        type: Number,
        required: false,
        default: 0,
      },
      maxLength: {
        type: Number,
        required: false,
        default: 5,
      },
      pattern: {
        type: String,
        required: false,
        default: "^[0-9]*$",
      },
      autocomplete: {
        type: String,
        required: false,
        default: "none",
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
      dataList: {
        type: Array as () => string[],
        required: false,
        default: [],
      },
      step: {
        type: Number,
        required: false,
        default: 1,
      },
    },
    setup(props) {
      const r = ref<nInp>(null);
      const rlb = ref<nLb>(null);
      const dr = ref<nDl>(null);
      const s = reactive({
        req: props.required,
        ro: props.readOnly,
        dsb: props.disabled,
        pt: props.pattern,
        v: "",
        vn: NaN,
        lb: props.lab,
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
      const sanitazeValue = (n: string) => {
        if (/[^0-9,\.]/g.test(n)) n = n.replace(/[^0-9,\.]/g, "");
        if (parseNotNaN(n) < 0) n = 0;
        if (n.length > 2) n = n.slice(0, 2);
        return n && Number.isFinite(n) ? n : "0";
      };
      watch(
        () => s.req,
        n => updateAttrs(r, handleLabs, handleDl.value, s.ro, s.dsb, s.req),
      );
      watch(
        () => s.v,
        n => {
          s.v = sanitazeValue(n);
          updateDatalist(s.v);
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
        tLab: labMap.get(s.lb) || s.lb || props.lab,
        setp: props.step,
      };
    },
  });
</script>
<template>
  <fieldset :id="`${id}Fs`" class="form-group">
    <label :id="`${id}Lab`" :for="id" ref="rlb" class="form-label">{{ tLab }}</label>
    <input
      v-model="s.v"
      ref="r"
      class="form-control"
      type="number"
      dir="ltr"
      min="0"
      max="999"
      :name="id.replace(/([A-Z])/g, (m, i) => (m === id.charAt(0) ? `${m.toLowerCase()}` : `_${m.toLowerCase()}`))"
      :dirName="`${id.replace(/([A-Z])/g, (m, i) => (m === id.charAt(0) ? `${m.toLowerCase()}` : `_${m.toLowerCase()}`))?.direction ?? ''}`"
      :data-number="s.vn"
      :placeholder="`Digite ${tLab.toLowerCase() === 'idade' ? 'a' : 'o'} ${tLab} aqui`"
      :id="id"
      :minlength="minLength"
      :maxlength="maxLength"
      :autocomplete="autocomplete"
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
