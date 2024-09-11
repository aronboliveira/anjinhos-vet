import { defineComponent, onMounted } from "vue";
import FilterForm from "./forms/FilterForm";
import { modelScripts, syncAriaStates } from "../handlers/handlersModel";
export const SozedApp = (() =>
  defineComponent({
    name: "SozedApp",
    components: {
      FilterForm,
    },
    setup() {
      console.log("Running for App...");
      try {
        const body = document.body;
        if (!body) throw new Error(`Faile to fetch body element`);
        body.classList.add("home", "blog", "logged-in", "admin-bar", "no-customize-support", "wp-embed-responsive");
      } catch (e) {
        console.error(`Error executing enqueuedScript for App.ts:\n${(e as Error).message}`);
      }
      onMounted(() => {
        syncAriaStates(document.querySelectorAll("*"));
        modelScripts();
      });
    },
  }))();
