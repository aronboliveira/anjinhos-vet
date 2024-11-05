import { createApp } from "vue";
import "./styles/style.css";
import "./styles/wpStyles.css";
//@ts-ignore
import App from "./App.vue";
let appElement = document.querySelector("#app");
if (!appElement) {
  console.warn("#app not found, using fallback selector...");
  appElement = document.querySelector(".wp-site-blocks");
}
if (appElement) createApp(App).mount(appElement);
else console.error("No valid element found to mount Vue.");
