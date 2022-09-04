import moment from 'moment';
import { TemplateProcessor, TemplateProcessorOpts } from '~/templateProcessor';

interface SetupParams {
  template: string;
  dateFormat?: string;
  now?: string;
}

function setup(p: SetupParams) {
  const opts: TemplateProcessorOpts = {
    _moment: p.now ? moment(p.now) : moment(),
    dateFormat: p.dateFormat,
  };

  const tp = new TemplateProcessor(p.template, opts);

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

test('With date substituted', () => {
  const { tp } = setup({
    template: 'Today is {{date}}',
    now: '2022-08-03',
  });

  const result = tp.render();

  expect(result).toEqual('Today is 2022-08-03');
});

test('With date substituted and default format specified', () => {
  const tp = new TemplateProcessor('Today is {{date}}', {
    _moment: moment('2022-08-03 12:34:56'),
    dateFormat: 'DD/MM/YYYY',
  });

  const result = tp.render();

  expect(result).toEqual('Today is 03/08/2022');
});

test('With date substituted and format specified in the argument', () => {
  const tp = new TemplateProcessor('Today is {{date:DD/MM/YYYY}}', {
    _moment: moment('2022-08-03 12:34:56'),
  });
  const result = tp.render();
  expect(result).toEqual('Today is 03/08/2022');
});

test('With time substituted', () => {
  const tp = new TemplateProcessor('Now is {{time}}', {
    _moment: moment('2022-08-03 12:34:56'),
  });
  const result = tp.render();
  expect(result).toEqual('Now is 12:34');
});

test('With time substituted and default format specified', () => {
  const tp = new TemplateProcessor('Now is {{time}}', {
    _moment: moment('2022-08-03 12:34:56'),
    timeFormat: 'HH:mm:ss',
  });
  const result = tp.render();
  expect(result).toEqual('Now is 12:34:56');
});

test('With time substituted and format specified in the argument', () => {
  const tp = new TemplateProcessor('Now is {{time:HH:mm:ss}}', {
    _moment: moment('2022-08-03 12:34:56'),
  });
  const result = tp.render();
  expect(result).toEqual('Now is 12:34:56');
});

test('When a builtin function is overrode', () => {
  const tp = new TemplateProcessor('Now is {{time:HH:mm:ss}}', {
    _moment: moment('2022-08-03 12:34:56'),
  });
  const result = tp.render({ time: () => 'not a good time' });
  expect(result).toEqual('Now is not a good time');
});
