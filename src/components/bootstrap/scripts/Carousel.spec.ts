import { mount } from "@vue/test-utils";
//@ts-ignore
import Carousel from "../Carousel.vue";
import { ImgProps } from "../../../scripts/declarations/interfaces";
describe("Carousel.vue", () => {
  const figures: ImgProps[] = [
    { src: "image1.jpg", alt: "Image 1" },
    { src: "image2.jpg", alt: "Image 2" },
  ];
  it("renders correctly with required props", () => {
    const wrapper = mount(Carousel, {
      props: {
        id: "carousel1" as any,
        figures,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().id).toBe("carousel1");
    expect(wrapper.props().figures).toEqual(figures);
  });
  it("sets default data-bs-ride attribute when invalid", async () => {
    const wrapper = mount(Carousel, {
      props: {
        id: "carousel2" as any,
        figures,
        ride: "invalid",
      },
    });
    await wrapper.vm.$nextTick();
    expect((wrapper.findComponent({ ref: "r" }).element as HTMLElement).getAttribute("data-bs-ride")).toBe("false");
  });
  it("keeps data-bs-ride attribute when valid", async () => {
    const wrapper = mount(Carousel, {
      props: {
        id: "carousel3" as any,
        figures,
        ride: "carousel",
      },
    });
    await wrapper.vm.$nextTick();
    expect((wrapper.findComponent({ ref: "r" }).element as HTMLElement).getAttribute("data-bs-ride")).toBe("carousel");
  });
  it("handles missing HTMLElement reference gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mount(Carousel, {
      props: {
        id: "carousel4" as any,
        figures,
      },
      attachTo: document.createElement("div"),
    });
    await Promise.resolve();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Failed to validate instance of main reference"),
    );
    consoleErrorSpy.mockRestore();
  });
});
