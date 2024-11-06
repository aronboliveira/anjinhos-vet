import { regularToSnake } from "../../model/textual";
describe("textual.ts", () => {
  describe("regularToSnake", () => {
    it("should convert camelCase to snake-case", () => {
      expect(regularToSnake("camelCaseString")).toBe("camel-case-string");
    });
    it("should convert spaces and underscores to hyphens", () => {
      expect(regularToSnake("string with spaces")).toBe("string-with-spaces");
      expect(regularToSnake("string_with_underscores")).toBe("string-with-underscores");
    });
    it("should handle empty strings", () => {
      expect(regularToSnake("")).toBe("");
    });
    it("should handle strings with mixed separators", () => {
      expect(regularToSnake("String With_MixedSeparators")).toBe("string-with-mixed-separators");
    });
  });
});
