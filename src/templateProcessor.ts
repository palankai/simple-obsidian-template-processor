export class TemplateProcessor {
  private templateString: string;

  constructor(templateString: string) {
    this.templateString = templateString;
  }

  render(params?: Record<string, any>): string {
    let result = this.templateString;
    if (params) {
      for (const key in params) {
        if (typeof params[key] == 'function') {
          const re = new RegExp(`{{\\s*${key}(:(.*))?\\s*}}`, 'gi');
          result = result.replace(re, (_1, _2, param?: string) => {
            return params[key](param ? param.trim() : param);
          });
        } else {
          const re = new RegExp(`{{\\s*${key}\\s*}}`, 'gi');
          result = result.replace(re, params[key]);
        }
      }
    }
    return result;
  }
}
