<script lang="ts">
  import { defineComponent, onMounted } from "vue";
  import { modelScripts, syncAriaStates } from "../../scripts/model/utils";
  import FilterForm from "../../components/forms/FilterForm.vue";
  import Carousel from "../../components/bootstrap/Carousel.vue";
  import { handleSubmit } from "../../scripts/handlers/handlersIO";
  export default defineComponent({
    name: "AnjinhosApp",
    components: {
      FilterForm,
      Carousel,
    },
    setup() {
      try {
        const body = document.body;
        if (!body) throw new Error("Failed to fetch body element");
        body.classList.add("home", "blog", "logged-in", "admin-bar", "no-customize-support", "wp-embed-responsive");
      } catch (e) {
        console.error(`Error executing enqueuedScript for App.ts:\n${(e as Error).message}`);
      }
      onMounted(() => {
        syncAriaStates(document.querySelectorAll("*"));
        modelScripts();
        const form = document.querySelector("form"),
          species = document.getElementById("species");
        if (!(form instanceof HTMLFormElement && species instanceof HTMLSelectElement)) return;
        setTimeout(() => {
          handleSubmit(form, form);
        }, 1000);
      });
    },
  });
</script>
<template>
  <div id="wp-body" class="home blog logged-in admin-bar no-customize-support wp-embed-responsive">
    <h2
      class="alignwide wp-block-post-title has-var-wp-custom-typography-font-size-huge-clamp-2-25-rem-4-vw-2-75-rem-font-size"
      style="padding-block: 2rem"
    >
      <a href="#" target="_self"><strong>ONG Anjinhos</strong></a>
    </h2>
    <div class="wp-site-blocks">
      <figure class="wp-block-image alignwide size-full is-resized">
        <Carousel
          id="PetsCarousel"
          :hasIndicators="true"
          :hasLabels="true"
          :fade="false"
          ride="true"
          :defFig="0"
          :figures="[
            {
              src: '/phs/cat_ph1.jpeg',
              alt: 'Gato Preto',
              labTitle: 'Gato Preto',
              labDesc: 'Belíssimo gato preto',
            },
            {
              src: '/phs/dog_ph_1.jpeg',
              alt: 'Caramelo Filhote',
              labTitle: 'Caramelo Filhote',
              labDesc: 'Filho de Caramelo simpático',
            },
            {
              src: '/phs/dog_ph_2.jpeg',
              alt: 'Pitbull Cinza',
              labTitle: 'Pitbull Cinza',
              labDesc: 'Incrível Pitbull mestiço com American Bully',
            },
            {
              src: '/phs/dog_ph_3.jpeg',
              alt: 'Golden-lata',
              labTitle: 'Vira-lata de Golden Retriever',
              labDesc: 'Muito amigável e energético',
            },
            {
              src: '/phs/cat_ph2.jpeg',
              alt: 'Gato Tricolor',
              labTitle: 'Gatinha Tricolor',
              labDesc: 'Brincalhona e muito sociável',
            },
          ]"
        />
      </figure>
    </div>
    <div aria-hidden="false" class="wp-block-spacer" style="height: 66px">
      <p style="font-size: 0.8rem; opacity: 1; color: darkolivegreen; filter: drop-shadow(-2px 4px 6px black)">
        Imagens geradas pelo Dall-E 3
      </p>
    </div>
    <main class="wp-block-query is-layout-constrained wp-block-query-is-layout-constrained" id="wp--skip-link--target">
      <ul class="alignwide wp-block-post-template is-layout-flow wp-block-post-template-is-layout-flow">
        <li class="wp-block-post post-1 post type-post status-publish format-standard hentry category-uncategorized">
          <div class="wp-block-group is-layout-constrained wp-block-group-is-layout-constrained">
            <div
              class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-1 wp-block-columns-is-layout-flex"
            >
              <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
                <div class="wp-block-post-excerpt">
                  <p class="wp-block-post-excerpt__excerpt" style="color: black">Au au! Miau miau!</p>
                </div>

                <div style="font-style: italic; font-weight: 400" class="wp-block-post-date has-small-font-size">
                  <time datetime="2024-09-05T03:26:30+00:00">
                    <a href="#">September 5, 2024</a>
                  </time>
                </div>
              </div>
            </div>
            <div style="height: 112px" aria-hidden="true" class="wp-block-spacer"></div>
          </div>
        </li>
      </ul>
      <FilterForm
        :id="'PetsTable'"
        :action="'pets'"
        :inps="[
          //@ts-ignore
          { id: 'name', minLength: 2, autocapitalize: true, autocomplete: 'name', required: true },
          {
            //@ts-ignore
            id: 'age',
            type: 'number',
            //@ts-ignore
            required: false,
            autocomplete: 'age',
          },
          {
            //@ts-ignore
            id: 'species',
            //@ts-ignore
            type: 'select-one',
            opts: [
              //@ts-ignore
              { value: 'dog', text: 'Cão' },
              //@ts-ignore
              { value: 'cat', text: 'Gato' },
            ],
          },
          {
            //@ts-ignore
            id: 'sex',
            type: 'select-one',
            opts: [
              //@ts-ignore
              { value: 'both', text: 'Ambos' },
              //@ts-ignore
              { value: 'female', text: 'Fêmea' },
              //@ts-ignore
              { value: 'male', text: 'Macho' },
            ],
          },
          {
            //@ts-ignore
            id: 'humor',
            type: 'select-multiple',
            opts: [
              { value: 'children', text: 'Crianças' },
              { value: 'cats', text: 'Gatos' },
              { value: 'dogs', text: 'Cães' },
              { value: 'small', text: 'Outros pets pequenos (aves, roedores, etc)' },
            ],
          },
          {
            //@ts-ignore
            id: 'castrated',
            type: 'checkbox',
            //@ts-ignore
            required: false,
          },
        ]"
      />
      <section id="tab-wrapper" style="overflow: auto; min-width: 100vw; padding-inline: 5%; position: relative">
        <video
          id="cat_video"
          class="bg_video"
          crossorigin="anonymous"
          preload="metadata"
          disablepictureinpicture
          autoplay
          playsinline
          loop
          muted
          controls
          controlslist="nofullscreen nodownload noplaybackrate"
        >
          <source src="/cat_clean_pexels.webm" type="video/webm" />
          <source src="/cat_clean_pexels.mp4" type="video/mp4" />
          Your browser does not support videos
        </video>
        <table class="table table-striped table-hover" id="petsTable" style="min-width: 90%">
          <caption style="caption-side: top">
            <h2>Tabela de Animais</h2>
          </caption>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr></tr>
          </tbody>
        </table>
      </section>
    </main>
    <footer class="wp-block-template-part" style="position: relative">
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
        controls
        controlslist="nofullscreen nodownload noplaybackrate"
      >
        <source src="/charming_dog.webm" type="video/webm" />
        <source src="/charming_dog.mp4" type="video/mp4" />
        Your browser does not support videos
      </video>
      <div
        class="wp-block-group is-layout-constrained wp-block-group-is-layout-constrained"
        style="padding-top: var(--wp--custom--spacing--large, 8rem); height: 10vh; background-color: #000"
      >
        <div class="wp-block-group alignfull is-layout-constrained wp-block-group-is-layout-constrained">
          <div
            class="wp-block-group alignwide is-content-justification-space-between is-layout-flex wp-container-core-group-is-layout-7 wp-block-group-is-layout-flex"
            style="padding-top: 4rem; padding-bottom: 4rem"
          >
            <p class="wp-block-site-title"></p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  video {
    z-index: 0;
    transform: scale(1.5);
    width: 100vw;
  }
  #dog_video {
    transform: scale(3) translateY(-75vh);
    width: 100vw;
    min-width: 100vw;
  }
  table {
    position: relative;
    z-index: 10;
    opacity: 0.9;
  }
  table * {
    z-index: 12;
  }
</style>
