<script lang="ts">
  import { defineComponent } from "vue";
  import defn from "./scripts/definition";
  export default defineComponent(defn);
</script>
<template>
  <form
    v-cloak
    :id="`filterForm${id}`"
    :name="`filter_form_${id.replace(/([A-Z])/g, m => (m === id.charAt(0) ? `${m.toLowerCase()}` : `_${m.toLowerCase()}`)).toLowerCase()}`"
    :action="action"
    method="post"
    target="_self"
    enctype="application/x-www-form-urlencoded"
    ref="fr"
    class="filterForm"
  >
    <legend>Pesquise pelo seu novo Pet!</legend>
    <video
      id="dog_and_woman_video"
      class="bg_video"
      crossorigin="anonymous"
      preload="metadata"
      disablepictureinpicture
      autoplay
      playsinline
      loop
      muted
    >
      <source src="/dog_and_woman_pexels.webm" type="video/webm" />
      <source src="/dog_and_woman_pexels.mp4" type="video/mp4" />
      Your browser does not support videos
    </video>
    <div id="fieldsets-wrapper" style="width: 90%; margin-inline: 5%">
      <template v-for="i in inps" :key="`inp__${id}__${i.id}`">
        <FilterSelect v-if="(i.id as any) === 'species'" v-model:mv="spr" :id="i.id" :lab="i.lab" :opts="i.opts" />
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
        <FilterInp v-else :id="i.id" :lab="i.lab" :autocomplete="i.autocomplete" :required="i.required" />
      </template>
      <template v-if="isCat">
        <FilterSelect
          id="felv"
          :opts="[
            { value: 'undefined', text: 'Não informado' },
            { value: 'positive', text: 'Positivo' },
            { value: 'negative', text: 'Negativo' },
          ]"
        />
        <FilterSelect
          id="fiv"
          :opts="[
            { value: 'undefined', text: 'Não informado' },
            { value: 'positive', text: 'Positivo' },
            { value: 'negative', text: 'Negativo' },
          ]"
        />
        <FilterSelect
          id="fur"
          type="select-multiple"
          :opts="[
            { value: 'white', text: 'Branco' },
            { value: 'black', text: 'Preto' },
            { value: 'yellow', text: 'Amarelo' },
            { value: 'grey', text: 'Cinza' },
            { value: 'tabby', text: 'Rajado' },
            { value: 'colorpoint', text: 'Colorpoint' },
            { value: 'tortoiseShell', text: 'Escaminha' },
            { value: 'calico', text: 'Tricolor' },
          ]"
        />
      </template>
      <template v-if="isDog">
        <FilterSelect
          id="size"
          type="select-multiple"
          :opts="[
            { text: 'Médio', value: 'medium' },
            { text: 'Grande', value: 'large' },
            { text: 'Pequeno', value: 'small' },
          ]"
        />
      </template>
      <details>
        <summary>Dicas</summary>
        <section>
          <strong>Com um teclado:</strong>
          <ul>
            <li>
              Pressione <kbd>Ctrl</kbd> e aperte <kbd>Space</kbd> para selecionar multiplas opções, movendo com as setas
              do teclado.
            </li>
          </ul>
        </section>
        <section>
          <ul>
            <li>Pressione o <b>Botão direito</b> para desselecionar uma opção já selecionada</li>
          </ul>
        </section>
      </details>
    </div>
    <video
      id="dog_video"
      class="bg_video"
      crossorigin="anonymous"
      preload="metadata"
      disablepictureinpicture
      autoplay
      playsinline
      loop
      muted
    >
      <source src="/charming_dog.webm" type="video/webm" />
      <source src="/charming_dog.mp4" type="video/mp4" />
      Your browser does not support videos
    </video>
  </form>
</template>
<style scoped>
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  form {
    display: flex;
    gap: 0.5rem;
    flex-flow: column wrap;
    min-width: 80%;
    max-width: 100vw;
    transition: width 1s ease-in-out;
    animation: fadeIn 3s ease-in-out;
    position: relative;
    z-index: 1;
    *:not(video) {
      z-index: 2;
    }
    video {
      width: 100vw;
      min-height: 150%;
      opacity: 0.2;
      border-radius: 0.5rem;
      object-fit: cover;
      transform: translateY(-3%);
    }
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
  video {
    object-fit: fill;
    width: 100vw;
  }
  #dog_video {
    transform: translateY(200%);
    border-radius: 0;
  }
  [v-cloak] {
    display: none;
  }
</style>
