<script lang="ts">
  import { defineComponent, onMounted } from "vue";
  import FilterForm from "../../components/forms/FilterForm.vue";
  import { modelScripts, syncAriaStates } from "../../scripts/handlers/handlersModel.ts";
  export default defineComponent({
    name: "SozedApp",
    components: {
      FilterForm,
    },
    setup() {
      console.log("Running for App...");
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
      });
    },
  });
</script>

<template>
  <div id="wp-body" class="home blog logged-in admin-bar no-customize-support wp-embed-responsive">
    <div class="wp-site-blocks">
      <header class="wp-block-template-part">
        <div class="wp-block-group is-layout-constrained wp-block-group-is-layout-constrained">
          <div
            class="wp-block-group alignwide is-content-justification-space-between is-layout-flex wp-container-core-group-is-layout-3 wp-block-group-is-layout-flex"
            style="
              padding-top: var(--wp--custom--spacing--small, 1.25rem);
              padding-bottom: var(--wp--custom--spacing--large, 8rem);
            "
          >
            <div class="wp-block-group is-layout-flex wp-block-group-is-layout-flex">
              <h1 class="wp-block-site-title">
                <a href="http://sozed-vet-rj.local" target="_self" rel="home" aria-current="page">SOZED</a>
              </h1>
            </div>

            <div
              class="wp-block-group is-content-justification-left is-layout-flex wp-container-core-group-is-layout-2 wp-block-group-is-layout-flex"
            >
              <nav
                class="is-responsive items-justified-right wp-block-navigation is-content-justification-right is-layout-flex wp-container-core-navigation-is-layout-1 wp-block-navigation-is-layout-flex"
                aria-label=""
                data-wp-interactive="core/navigation"
                data-wp-context='{"overlayOpenedBy":{"click":false,"hover":false,"focus":false},"type":"overlay","roleAttribute":"","ariaLabel":"Menu"}'
              >
                <button
                  aria-haspopup="dialog"
                  aria-label="Open menu"
                  class="wp-block-navigation__responsive-container-open"
                  data-wp-on-async--click="actions.openMenuOnClick"
                  data-wp-on--keydown="actions.handleMenuKeydown"
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <rect x="4" y="7.5" width="16" height="1.5"></rect>
                    <rect x="4" y="15" width="16" height="1.5"></rect>
                  </svg>
                </button>
                <div
                  class="wp-block-navigation__responsive-container"
                  id="modal-1"
                  data-wp-class--has-modal-open="state.isMenuOpen"
                  data-wp-class--is-menu-open="state.isMenuOpen"
                  data-wp-watch="callbacks.initMenu"
                  data-wp-on--keydown="actions.handleMenuKeydown"
                  data-wp-on-async--focusout="actions.handleMenuFocusout"
                  tabindex="-1"
                >
                  <div class="wp-block-navigation__responsive-close" tabindex="-1">
                    <div
                      class="wp-block-navigation__responsive-dialog"
                      data-wp-bind--aria-modal="state.ariaModal"
                      data-wp-bind--aria-label="state.ariaLabel"
                      data-wp-bind--role="state.roleAttribute"
                    >
                      <button
                        aria-label="Close menu"
                        class="wp-block-navigation__responsive-container-close"
                        data-wp-on-async--click="actions.closeMenuOnClick"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            d="M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"
                          ></path>
                        </svg>
                      </button>
                      <div
                        class="wp-block-navigation__responsive-container-content"
                        data-wp-watch="callbacks.focusFirstElement"
                        id="modal-1-content"
                      >
                        <ul
                          class="wp-block-navigation__container is-responsive items-justified-right wp-block-navigation"
                        >
                          <ul class="wp-block-page-list">
                            <li class="wp-block-pages-list__item wp-block-navigation-item open-on-hover-click">
                              <a
                                class="wp-block-pages-list__item__link wp-block-navigation-item__content"
                                href="http://sozed-vet-rj.local/sample-page/"
                              >
                                Sample Page
                              </a>
                            </li>
                          </ul>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <figure class="wp-block-image alignwide size-full is-resized">
        <img
          id="main-animals"
          src="http://sozed-vet-rj.local/wp-content/themes/twentytwentytwo/assets/images/ph.png"
          decoding="async"
          fetchpriority="high"
          alt="Front Cachorro &amp; Gato"
          onerror="this.onerror=null; this.src='../../../public/ph.png';"
        />
      </figure>
    </div>
    <div style="height: 66px" aria-hidden="true" class="wp-block-spacer"></div>
    <main class="wp-block-query is-layout-constrained wp-block-query-is-layout-constrained" id="wp--skip-link--target">
      <ul class="alignwide wp-block-post-template is-layout-flow wp-block-post-template-is-layout-flow">
        <li class="wp-block-post post-1 post type-post status-publish format-standard hentry category-uncategorized">
          <div class="wp-block-group is-layout-constrained wp-block-group-is-layout-constrained">
            <h2
              class="alignwide wp-block-post-title has-var-wp-custom-typography-font-size-huge-clamp-2-25-rem-4-vw-2-75-rem-font-size"
            >
              <a href="http://sozed-vet-rj.local/" target="_self"><strong>ONG Sozed</strong></a>
            </h2>
            <div
              class="wp-block-columns alignwide is-layout-flex wp-container-core-columns-is-layout-1 wp-block-columns-is-layout-flex"
            >
              <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="flex-basis: 650px">
                <div class="wp-block-post-excerpt">
                  <p class="wp-block-post-excerpt__excerpt" style="color: black">Au au! Miau miau!</p>
                </div>

                <div style="font-style: italic; font-weight: 400" class="wp-block-post-date has-small-font-size">
                  <time datetime="2024-09-05T03:26:30+00:00">
                    <a href="http://sozed-vet-rj.local/hello-world/">September 5, 2024</a>
                  </time>
                </div>
              </div>

              <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow"></div>
            </div>

            <div style="height: 112px" aria-hidden="true" class="wp-block-spacer"></div>
          </div>
        </li>
      </ul>
      <FilterForm
        :id="'PetsTable'"
        :action="''"
        :inps="[
          { id: 'name', minLength: 2, autocapitalize: true, autocomplete: 'name', required: true },
          { id: 'age', type: 'number', required: false, autocomplete: 'age' },
          {
            id: 'species',
            type: 'select-one',
            opts: [
              { value: 'dog', text: 'Cachorro' },
              { value: 'cat', text: 'Gato' },
            ],
          },
          {
            id: 'sex',
            type: 'select-one',
            opts: [
              { value: 'female', text: 'Fêmea' },
              { value: 'male', text: 'Macho' },
            ],
          },
          {
            id: 'castrated',
            type: 'checkbox',
            required: false,
          },
        ]"
      />
    </main>
    <footer class="wp-block-template-part">
      <div
        class="wp-block-group is-layout-constrained wp-block-group-is-layout-constrained"
        style="padding-top: var(--wp--custom--spacing--large, 8rem)"
      >
        <div class="wp-block-group alignfull is-layout-constrained wp-block-group-is-layout-constrained">
          <div
            class="wp-block-group alignwide is-content-justification-space-between is-layout-flex wp-container-core-group-is-layout-7 wp-block-group-is-layout-flex"
            style="padding-top: 4rem; padding-bottom: 4rem"
          >
            <p class="wp-block-site-title">
              <a href="http://sozed-vet-rj.local" target="_self" rel="home" aria-current="page">sozed-vet-rj</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
