import { createApp } from "vue";
//@ts-ignore
import App from "./App.vue";
describe("Main Application", () => {
  it("mounts App component to #app element", () => {
    document.body.innerHTML = '<div id="app"></div>';
    const appElement = document.querySelector("#app");
    expect(appElement).not.toBeNull();
    const app = createApp(App);
    app.mount(appElement!);
    expect(appElement?.innerHTML).not.toBe("");
  });
  it("falls back to .wp-site-blocks if #app is not found", () => {
    document.body.innerHTML = '<div class="wp-site-blocks"></div>';
    const appElement = document.querySelector("#app");
    expect(appElement).toBeNull();
    const fallbackElement = document.querySelector(".wp-site-blocks");
    expect(fallbackElement).not.toBeNull();
    createApp(App).mount(fallbackElement!);
    expect(fallbackElement?.innerHTML).not.toBe("");
  });
  it("logs error if no valid element is found to mount Vue", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    document.body.innerHTML = '<div id="other"></div>';
    const appElement = document.querySelector("#app") || document.querySelector(".wp-site-blocks");
    expect(appElement).toBeNull();
    createApp(App).mount(appElement as Element);
    expect(consoleErrorSpy).toHaveBeenCalledWith("No valid element found to mount Vue.");
    consoleErrorSpy.mockRestore();
  });
});
