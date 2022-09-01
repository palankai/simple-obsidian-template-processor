import { TemplateProcessor } from "~/templateProcessor";

describe("class TemplateProcessor", () => {
  describe("with expected template string", () => {
    const t = new TemplateProcessor("Hello {{name}}");

    it("should render the substituted string", ()=> {
      const result = t.render({name: "John"});
      expect(result).toEqual("Hello John");
    });
  });

  describe("with empty template", () => {
    const t = new TemplateProcessor("");

    it("should render nothing", () => {
      const result = t.render();
      expect(result).toEqual("");
    });
  });

  describe("with some template but no params", () => {
    const t = new TemplateProcessor("This is a string");

    it("should render the unmodified template", ()=> {
      const result = t.render();
      expect(result).toEqual("This is a string");
    })
  });

  describe("with some template and whitespace around the variable", () => {
    const t = new TemplateProcessor("Hello {{ name }}");

    it("should render the substituted string", ()=> {
      const result = t.render({name: "John"});
      expect(result).toEqual("Hello John");
    });
  });

  describe("with case non case matching params", () => {
    const t = new TemplateProcessor("Hello {{ NAME }}");

    it("should render the substituted string regardless of casing", ()=> {
      const result = t.render({name: "John"});
      expect(result).toEqual("Hello John");
    });
  });

  describe("with function params with arguments", () => {
    const t = new TemplateProcessor("Hello {{ name: John }}");
    const result = t.render({name: (p: string) => p});

    it("should render the substituted string", ()=> {
      expect(result).toEqual("Hello John");
    });
  });

});
