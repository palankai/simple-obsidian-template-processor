import moment, { Moment } from 'moment';

export interface TemplateProcessorOpts {
  _moment?: Moment;
  dateFormat?: string;
  timeFormat?: string;
}

export class TemplateProcessor {
  private templateString: string;
  private _moment?: Moment;
  private dateFormat: string;
  private timeFormat: string;

  constructor(templateString: string, opts?: TemplateProcessorOpts) {
    this.templateString = templateString;
    this._moment = opts?._moment;
    this.dateFormat = opts?.dateFormat || 'YYYY-MM-DD';
    this.timeFormat = opts?.timeFormat || 'HH:mm';
  }

  moment(): Moment {
    return this._moment || moment();
  }

  date(format?: string) {
    return this.moment().format(format || this.dateFormat);
  }

  time(format?: string) {
    return this.moment().format(format || this.timeFormat);
  }

  render(params?: Record<string, any>): string {
    let result = this.templateString;
    const replacers: Record<string, any> = {
      date: (format?: string) => this.date(format),
      time: (format?: string) => this.time(format),
      ...params,
    };
    if (replacers) {
      for (const key in replacers) {
        if (typeof replacers[key] == 'function') {
          const re = new RegExp(`{{${key}(:(.*))?}}`, 'gi');
          result = result.replace(re, (_1, _2, param?: string) => {
            return replacers[key](param ? param.trim() : param);
          });
        } else {
          const re = new RegExp(`{{${key}}}`, 'gi');
          result = result.replace(re, replacers[key]);
        }
      }
    }
    return result;
  }
}
