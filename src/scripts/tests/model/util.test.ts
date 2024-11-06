import {
  updateAttrs,
  assignFormAttrs,
  handleLabs,
  handleDl,
  handleDlUpdate,
  pushSelectOpts,
  modelScripts,
  syncAriaStates,
} from "../../model/utils";
import { rc } from "../../../vars";
import { InpProps } from "../../declarations/interfaceComponents";
jest.spyOn(console, "error").mockImplementation(() => {});
describe("util.ts", () => {
  describe("updateAttrs", () => {
    it("should update attributes correctly", () => {
      const el = document.createElement("input");
      updateAttrs(el, true, true, true);
      expect(el.getAttribute("readonly")).toBe("true");
      expect(el.getAttribute("disabled")).toBe("true");
      expect(el.getAttribute("required")).toBe("true");
      updateAttrs(el, false, false, false);
      expect(el.hasAttribute("readonly")).toBe(false);
      expect(el.hasAttribute("disabled")).toBe(false);
      expect(el.hasAttribute("required")).toBe(false);
    });
  });
  describe("assignFormAttrs", () => {
    it("should assign form attributes to input elements", () => {
      const form = document.createElement("form");
      form.id = "testForm";
      form.action = "/submit";
      form.method = "post";
      form.enctype = "multipart/form-data";
      form.noValidate = true;
      const input = document.createElement("input");
      assignFormAttrs(input, form);
      expect(input.dataset.form).toBe("#testForm");
      expect(input.formAction).toBe("/submit");
      expect(input.formMethod).toBe("post");
      expect(input.formEnctype).toBe("multipart/form-data");
      expect(input.formNoValidate).toBe(true);
    });
    it("should assign form attributes to select and textarea elements", () => {
      const form = document.createElement("form");
      form.id = "testForm";
      form.action = "/submit";
      form.method = "post";
      form.enctype = "multipart/form-data";
      form.noValidate = true;
      const select = document.createElement("select");
      assignFormAttrs(select, form);
      expect(select.dataset.form).toBe("#testForm");
      expect(select.dataset.formAction).toBe("/submit");
      expect(select.dataset.formMethod).toBe("post");
      expect(select.dataset.formEnctype).toBe("multipart/form-data");
      expect(select.dataset.formNoValidate).toBe("true");
    });
  });
  describe("handleLabs", () => {
    it("should handle label associations correctly", () => {
      const input = document.createElement("input");
      input.id = "input1";
      const label = document.createElement("label");
      label.id = "label1";
      label.htmlFor = "input1";
      const props: InpProps = { id: "input1" as any, lab: "Label 1" as any };
      document.body.appendChild(label);
      document.body.appendChild(input);
      handleLabs(input, label, props);
      expect(label.htmlFor).toBe("input1");
      expect(input.dataset.labels).toContain("#label1");
      document.body.removeChild(label);
      document.body.removeChild(input);
    });
  });
  describe("handleDl", () => {
    it("should assign datalist correctly", () => {
      const input = document.createElement("input");
      const datalist = document.createElement("datalist");
      datalist.id = "datalist1";
      document.body.appendChild(input);
      document.body.appendChild(datalist);
      handleDl(input, datalist);
      expect(input.getAttribute("list")).toBe("datalist1");
      document.body.removeChild(input);
      document.body.removeChild(datalist);
    });
  });
  describe("handleDlUpdate", () => {
    it("should update datalist options correctly", () => {
      const input = document.createElement("input");
      input.id = "input1";
      const datalist = document.createElement("datalist");
      datalist.id = "datalist1";
      document.body.appendChild(input);
      document.body.appendChild(datalist);
      handleDlUpdate(input, datalist, "option1");
      expect(datalist.children.length).toBe(1);
      expect((datalist.children[0] as HTMLOptionElement).value).toBe("option1");
      handleDlUpdate(input, datalist, "option2");
      expect(datalist.children.length).toBe(2);
      expect((datalist.children[1] as HTMLOptionElement).value).toBe("option2");
      document.body.removeChild(input);
      document.body.removeChild(datalist);
    });
  });
  describe("pushSelectOpts", () => {
    it("should push selected options to rc object", () => {
      const select = document.createElement("select");
      select.id = "select1";
      select.multiple = true;
      const option1 = document.createElement("option");
      option1.value = "option1";
      option1.selected = true;
      const option2 = document.createElement("option");
      option2.value = "option2";
      option2.selected = true;
      select.appendChild(option1);
      select.appendChild(option2);
      pushSelectOpts(select, "select1", [option1, option2]);
      expect(rc["select1"].lastOpts).toEqual(["option1", "option2"]);
    });
  });
  describe("modelScripts", () => {
    it("should model scripts and links correctly", () => {
      const script = document.createElement("script");
      script.src = "https://example.com/script.js";
      const link = document.createElement("link");
      link.href = "https://example.com/style.css";
      const meta = document.createElement("meta");
      meta.name = "description";
      const style = document.createElement("style");
      style.innerHTML = "body { color: red; }";
      const anchor = document.createElement("a");
      anchor.href = "https://external.com";
      document.head.appendChild(script);
      document.head.appendChild(link);
      document.head.appendChild(meta);
      document.head.appendChild(style);
      document.body.appendChild(anchor);
      modelScripts();
      expect(script.type).toBe("text/javascript");
      expect(script.id).toContain("script_js");
      expect(script.crossOrigin).toBe("anonymous");
      expect(link.id).toContain("style_css");
      expect(link.rel).toBe("alternate");
      expect(link.crossOrigin).toBe("anonymous");
      expect(meta.id).toBe("description");
      expect(style.id).toContain("automatically_generated_style");
      expect(anchor.rel).toContain("noopener");
      expect(anchor.rel).toContain("noreferrer");
      document.head.removeChild(script);
      document.head.removeChild(link);
      document.head.removeChild(meta);
      document.head.removeChild(style);
      document.body.removeChild(anchor);
    });
  });
  describe("syncAriaStates", () => {
    it("should synchronize ARIA states for elements", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Enter text";
      input.required = true;
      syncAriaStates([input]);
      expect(input.getAttribute("aria-placeholder")).toBe("Enter text");
      expect(input.getAttribute("aria-required")).toBe("true");
      expect(input.getAttribute("aria-invalid")).toBe("false");
      input.value = "";
      input.dispatchEvent(new Event("input"));
      syncAriaStates([input]);
      expect(input.getAttribute("aria-invalid")).toBe("true");
    });
  });
});
