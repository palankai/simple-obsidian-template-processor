import { TemplateProcessor } from '~/templateProcessor';

interface SetupParams {
  template: string;
}

function setup(p: SetupParams) {
  const tp = new TemplateProcessor(p.template);

  return {
    tp,
  };
}

test('Substituting variable', () => {
  const { tp } = setup({ template: 'Hello {{name}}' });

  const result = tp.render({ name: 'John' });

  expect(result).toEqual('Hello John');
});

test('Substituting variable with non matching case', () => {
  const { tp } = setup({ template: 'Hello {{NAME}}' });

  const result = tp.render({ name: 'John' });

  expect(result).toEqual('Hello John');
});

test('Substituting variable but whitespace around variable', () => {
  const { tp } = setup({ template: 'Hello {{ name }}' });

  const result = tp.render({ name: 'John' });

  expect(result).toEqual('Hello {{ name }}');
});

test('Without template string it should render empty sting', () => {
  const { tp } = setup({ template: '' });

  const result = tp.render();

  expect(result).toEqual('');
});

test('With function params without arguments', () => {
  const { tp } = setup({ template: 'Result: {{func}}' });

  const result = tp.render({ func: () => 'Function result' });

  expect(result).toEqual('Result: Function result');
});

test('With function params with arguments', () => {
  const { tp } = setup({ template: 'Hello {{name:John}}' });

  const result = tp.render({ name: (p: string) => p });

  expect(result).toEqual('Hello John');
});
