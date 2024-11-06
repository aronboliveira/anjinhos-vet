import { recolorOpts, limitResize } from "../../handlers/handlersStyles";
describe("handlersStyle.ts", () => {
  describe("recolorOpts", () => {
    it("should recolor options based on selection", () => {
      const select = document.createElement("select");
      select.multiple = true;
      const option1 = document.createElement("option");
      option1.value = "1";
      option1.text = "Option 1";
      select.add(option1);
      const option2 = document.createElement("option");
      option2.value = "2";
      option2.text = "Option 2";
      select.add(option2);
      recolorOpts(select, "red", "blue");
      option1.selected = true;
      option1.dispatchEvent(new Event("click"));
      expect(option1.style.backgroundColor).toBe("red");
      expect(option2.style.backgroundColor).toBe("blue");
    });
  });
  describe("limitResize", () => {
    it("should set maxHeight based on options", () => {
      const select = document.createElement("select");
      select.multiple = true;
      for (let i = 0; i < 5; i++) {
        const option = document.createElement("option");
        option.text = `Option ${i}`;
        select.add(option);
      }
      const originalGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = jest.fn().mockImplementation(() => {
        return {
          height: "20px",
          paddingTop: "2px",
          paddingBottom: "2px",
        };
      });
      limitResize(select);
      expect(select.style.maxHeight).toBe("110px");
      window.getComputedStyle = originalGetComputedStyle;
    });
  });
});
