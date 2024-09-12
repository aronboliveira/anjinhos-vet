<script lang="ts">
  import { defineComponent, ref, watch, onMounted } from "vue";
  import { InpProps } from "../../declarations/interfaceComponents";
  import { nFm } from "../../declarations/types";
  import FilterInp from "../inputs/FilterInp.vue";
  import FilterCheck from "../inputs/FilterCheck.vue";
  import FilterSelect from "../inputs/FilterSelect.vue";
  import FilterNum from "../inputs/FilterNum.vue";
  export default defineComponent({
    name: "FilterForm",
    props: {
      id: {
        type: String,
        required: true,
        default: "",
      },
      action: {
        type: String,
        required: true,
        default: "/",
      },
      inps: {
        type: Array as () => InpProps[],
        required: true,
        default: [],
      },
    },
    data() {
      return {
        formData: {
          formId: `${this.id}`,
        },
      };
    },
    methods: {
      handleSubmit() {
        console.log(this.formData);
      },
    },
    components: {
      FilterInp,
      FilterNum,
      FilterCheck,
      FilterSelect,
    },
    setup(props) {
      const r = ref<nFm>(null);
      const isCat = ref<boolean>(null);
      const spr = ref<string>("dog");
      watch(() => n => {
        isCat.value = n === "cat";
      });
      onMounted(() => {
        try {
          if (!(r.value instanceof HTMLFormElement)) throw new Error(`Failed to validate Form Reference`);
          try {
            const metaCs =
              document.querySelector('meta[charset*="utf-"]') ?? document.querySelector('meta[charset*="UTF-"]');
            if (!(metaCs instanceof HTMLMetaElement)) throw new Error(`Failed to fetch HTMLMetaElement for Charset`);
            const cs = /utf\-16/gi.test(metaCs.outerHTML) ? "utf-16" : "utf-18";
            r.value.acceptCharset = cs;
          } catch (e) {
            console.error(
              `Error executing procedure for defining Accept Charset for ${props.id}:${(e as Error).message}`,
            );
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
                console.error(
                  `Error executing iteration ${i} for adding ids do elements list:\n${(e as Error).message}`,
                );
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
        isCat,
        spr,
      };
    },
  });
</script>
<template>
  <form
    :id="`filterForm${id}`"
    :name="`filter_form_${id.replace(/([A-Z])/g, '_$1').toLowerCase()}`"
    :action="action"
    method="post"
    target="_self"
    enctype="application/x-www-form-urlencoded"
    ref="r"
    class="filterForm"
    @submit.prevent="handleSubmit"
  >
    <legend>Pesquise pelo seu novo Pet!</legend>
    <div v-for="i in inps" :key="`inp__${id}__${i.id}`">
      <FilterSelect v-if="i.id === 'species'" v-model="spr" :id="i.id" :lab="i.lab" :opts="i.opts" />
      <FilterSelect
        v-else-if="i.type === 'select-one' || i.type === 'select-multiple'"
        :type="i.type"
        :id="i.id"
        :lab="i.lab"
        :opts="i.opts"
      />
      <FilterCheck
        v-else-if="i.type === 'checkbox' || i.type === 'radio'"
        :id="i.id"
        :lab="i.lab"
        :type="i.type"
        :required="i.required"
      />
      <FilterNum
        v-else-if="i.type === 'number'"
        :id="i.id"
        :lab="i.lab"
        :autocomplete="i.autocomplete"
        :required="i.required"
      />
      <FilterInp
        v-else
        :id="i.id"
        :lab="i.lab"
        :autocomplete="i.autocomplete"
        :autocapitalize="i.autocapitalize"
        :required="i.required"
      />
    </div>
    <template v-if="isCat">
      <FilterCheck id="felv" />
      <FilterCheck id="fiv" />
    </template>
  </form>
</template>
<style scoped>
  form {
    display: flex;
    gap: 0.5rem;
    flex-flow: column wrap;
    min-width: 80%;
  }
  .filterForm {
    fieldset {
      display: flex;
      flex-flow: column wrap;
      width: 100%;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
    }
    label,
    .form-label {
      padding-left: 0.2rem;
      font-weight: 800;
    }
  }
</style>
