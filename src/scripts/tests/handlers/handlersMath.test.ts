import { parseNotNaN } from "../../handlers/handlersMath";
describe("handlersMath.ts", () => {
  describe("parseNotNaN", () => {
    it("should parse integers correctly", () => {
      expect(parseNotNaN("123", 0, "int")).toBe(123);
      expect(parseNotNaN("abc", 0, "int")).toBe(0);
    });
    it("should parse floats correctly", () => {
      expect(parseNotNaN("123.456", 0, "float")).toBe(123.456);
      expect(parseNotNaN("abc", 0, "float")).toBe(0);
    });
    it("should handle default values", () => {
      expect(parseNotNaN("NaN", 5, "int")).toBe(5);
      expect(parseNotNaN("NaN", 5, "float")).toBe(5);
    });
    it("should handle fixed decimal places", () => {
      expect(parseNotNaN("123.456789", 0, "float", 2)).toBe(123.46);
    });
    it("should return 0 on invalid context", () => {
      expect(parseNotNaN("123", 0, "invalid")).toBe(0);
    });
  });
});
