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
  <div
    id="wp-body"
    class="home blog logged-in admin-bar no-customize-support wp-embed-responsive"
    style="position: relative"
  >
    <header>
      <h2
        class="alignwide wp-block-post-title has-var-wp-custom-typography-font-size-huge-clamp-2-25-rem-4-vw-2-75-rem-font-size"
        style="padding-block: 2rem; color: #fff2 !important; padding-block: 1rem"
      >
        <a href="#" target="_self" style="color: #0006; filter: drop-shadow(1px 6px 2px #0001)"
          ><strong>ONG Anjinhos</strong></a
        >
      </h2>
    </header>
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
    <div aria-hidden="false" class="wp-block-spacer" style="margin-bottom: 0.25rem">
      <p
        style="
          font-size: 0.8rem;
          opacity: 1;
          color: rgb(85, 107, 47, 0.4);
          filter: drop-shadow(-2px 6px 4px #fff1);
          margin-bottom: 0;
        "
      >
        Imagens geradas pelo Dall-E 3
      </p>
    </div>
    <div aria-hidden="false" class="wp-block-spacer" style="margin-bottom: 1rem">
      <p style="font-size: 0.8rem; opacity: 1; color: rgb(85, 107, 47, 0.4); filter: drop-shadow(-2px 6px 4px #fff1)">
        Vídeos obtidos em
        <a
          href="https://www.pexels.com/"
          target="_blank"
          rel="external noreferrer noopener"
          style="color: inherit; filter: inherit"
          >pexels.com</a
        >
      </p>
    </div>
    <main class="wp-block-query is-layout-constrained wp-block-query-is-layout-constrained" id="wp--skip-link--target">
      <ul
        class="alignwide wp-block-post-template is-layout-flow wp-block-post-template-is-layout-flow"
        style="height: 2rem"
      >
        <li class="wp-block-post post-1 post type-post status-publish format-standard hentry category-uncategorized">
          <div class="wp-block-group is-layout-constrained wp-block-group-is-layout-constrained">
            <div
              class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-1 wp-block-columns-is-layout-flex"
            >
              <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
                <div class="wp-block-post-excerpt">
                  <p class="wp-block-post-excerpt__excerpt" style="color: black">Au au! Miau miau!</p>
                </div>
                <div style="font-style: italic; font-weight: 400" class="wp-block-post-date has-small-font-size"></div>
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
      <section
        id="tab-wrapper"
        style="overflow: auto; min-width: 100vw; padding: 5% 5%; position: relative; margin-top: 0; max-width: 100vw"
      >
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
      <div class="wp-block-group alignfull is-layout-constrained wp-block-group-is-layout-constrained">
        <div
          class="wp-block-group alignwide is-content-justification-space-between is-layout-flex wp-container-core-group-is-layout-7 wp-block-group-is-layout-flex"
          style="padding-top: 4rem; padding-bottom: 4rem"
        >
          <p class="wp-block-site-title"></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  header {
    position: sticky;
    top: 0;
    bottom: 0;
    z-index: 99;
    opacity: 0.7;
    height: min-content;
    border-style: ridge;
    border-top-width: 1px;
    border-top-color: #0003;
    border-inline-width: 0;
    background: radial-gradient(
      ellipse at left,
      rgba(200, 245, 210, 0.5),
      rgba(150, 220, 190, 0.5),
      rgba(70, 150, 120, 0.5)
    );
  }
  main {
    overflow: auto;
  }
  table {
    position: relative;
    z-index: 10;
    opacity: 0.9;
    transform: translateY(2rem);
    outline: #fff7 4px ridge;
  }
  table * {
    z-index: 12;
  }
</style>
