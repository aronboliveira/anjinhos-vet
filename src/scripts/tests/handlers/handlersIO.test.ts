import { handleSubmit, validateForm, where, select, escapeRegex, submitForm } from "../../handlers/handlersIO";
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { name: "Buddy", species: "dog", age: 5 },
        { name: "Mittens", species: "cat", age: 3 },
      ]),
  }),
);
describe("handlersIO.ts", () => {
  describe("where", () => {
    it("should evaluate conditions correctly", () => {
      expect(where(5).isGreaterThanOrEqualTo(3)).toBe(true);
      expect(where("test").matchesRegex(/^t/)).toBe(true);
      expect(where("apple").isEither("banana", "apple")).toBe(true);
      expect(where("1").has("a")).toBe(true);
    });
  });
  describe("select", () => {
    it("should select elements correctly", () => {
      const div = document.createElement("div");
      div.id = "testDiv";
      document.body.appendChild(div);
      expect(select({ q: "testDiv", from: document })).toBe(div);
      document.body.removeChild(div);
    });
  });
  describe("escapeRegex", () => {
    it("should escape special regex characters", () => {
      const string = ".*+?^${}()|[]\\";
      expect(escapeRegex(string)).toBe("\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\");
    });
  });
  describe("handleSubmit", () => {
    it("should call validateForm with correct arguments", () => {
      const input = document.createElement("input");
      input.type = "text";
      const form = document.createElement("form");
      form.appendChild(input);
      document.body.appendChild(form);
      const validateFormMock = jest.fn();
      (validateForm as jest.Mock) = validateFormMock;
      handleSubmit(input);
      expect(validateFormMock).toHaveBeenCalledWith(form, document);
      document.body.removeChild(form);
    });
  });
  describe("validateForm", () => {
    it("should validate form and return results", () => {
      const form = document.createElement("form");
      const input = document.createElement("input");
      input.type = "text";
      input.required = true;
      input.value = "test";
      form.appendChild(input);
      const result = validateForm(form);
      expect(result.validated).toBe(true);
      expect(result.invalids.length).toBe(0);
      expect(result.valids.length).toBeGreaterThan(0);
    });
  });
  describe("submitForm", () => {
    it("should submit form data and update table", async () => {
      const form = document.createElement("form");
      form.id = "testForm";
      const input = document.createElement("input");
      input.name = "species";
      input.value = "dog";
      form.appendChild(input);
      const table = document.createElement("table");
      table.id = "petsTable";
      const tbody = document.createElement("tbody");
      table.appendChild(tbody);
      document.body.appendChild(form);
      document.body.appendChild(table);
      await submitForm(form, "/api/pets");
      expect(fetch).toHaveBeenCalledWith("/dogs.json", expect.any(Object));
      document.body.removeChild(form);
      document.body.removeChild(table);
    });
  });
});
