<script lang="ts">
  import {defineComponent} from 'vue'export default defineComponent()
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
    @submit.prevent="handleSubmit"
  >
    <div v-for="i in inps" :key="`inp__${id}__${i.id}`">
      <FilterSelect v-if="i.type='select-one' || i.type='select-multiple'" :type="type" :id="id" :lab="lab" />
      <FilterCheck
        v-else-if="i.type === 'checkbox' || i.type === 'radio'"
        :id="id"
        :lab="lab"
        :type="'checkbox'"
        :required="required"
      />
      <FilterInp
        v-else-if="i.type === 'number'"
        :id="id"
        :lab="lab"
        :autocomplete="autocomplete"
        :required="required"
      />
      <FilterInp
        v-else
        :id="id"
        :lab="lab"
        :autocomplete="autocomplete"
        :autocapitalize="autocapitalize"
        :required="required"
      />
    </div>
  </form>
</template>
<style scoped>
  form {
    display: flex;
    flex-flow: column wrap;
    min-width: 80%;
  }
</style>
