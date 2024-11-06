import { mount } from "@vue/test-utils";
//@ts-ignore
import FilterForm from "../scripts/FilterForm.vue";
import { InpProps } from "../../../scripts/declarations/interfaceComponents";
describe("FilterForm.vue", () => {
  const inps: InpProps[] = [
    { id: "input1" as any, lab: "Input 1" as any, required: true as any },
    { id: "input2", lab: "Input 2", required: false },
  ];
  it("renders correctly with required props", () => {
    const wrapper = mount(FilterForm, {
      props: {
        id: "form1",
        action: "/submit",
        inps,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().id).toBe("form1");
    expect(wrapper.props().action).toBe("/submit");
    expect(wrapper.props().inps).toEqual(inps);
  });
  it("provides form reference and reactive properties", () => {
    const wrapper = mount(FilterForm, {
      props: {
        id: "form2",
        action: "/submit",
        inps,
      },
    });
    const { fr, loading, canFetch } = wrapper.vm;
    expect(fr).toBeDefined();
    expect(loading).toBeDefined();
    expect(canFetch).toBeDefined();
  });
  it("sets accept-charset based on meta charset", async () => {
    document.head.innerHTML = '<meta charset="UTF-8">';
    const wrapper = mount(FilterForm, {
      props: {
        id: "form3",
        action: "/submit",
        inps,
      },
    });
    await wrapper.vm.$nextTick();
    expect((wrapper.findComponent({ ref: "fr" }).element as HTMLFormElement).acceptCharset).toBe("utf-8");
  });
  it("handles onMounted errors gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mount(FilterForm, {
      props: {
        id: "form4",
        action: "/submit",
        inps,
      },
      attachTo: document.createElement("div"),
    });
    await Promise.resolve();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Error executing onMounted procedures for Form form4`),
    );
    consoleErrorSpy.mockRestore();
  });
});
