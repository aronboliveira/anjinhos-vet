<script lang="ts">
  import { defineComponent } from "vue";
  import defn from "./scripts/definition.ts";
  export default defineComponent(defn);
</script>
<template>
  <div ref="r" :id="id" class="carousel slide">
    <div class="carousel-inner">
      <figure class="carousel-item active">
        <img src="" />
      </figure>
    </div>
    <button></button>
  </div>
</template>
<style scoped></style>
