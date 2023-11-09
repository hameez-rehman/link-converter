export abstract class LinkParser {
  inputUrl: string;
  abstract weblinkRegex: RegExp;
  abstract deeplinkRegex: RegExp;

  private _requiredFields: string[];

  public get requiredFields() {
    return this._requiredFields;
  }

  public set requiredFields(fields: string[]) {
    this._requiredFields = fields;
  }

  constructor(url: string, requiredFields?: string[]) {
    this.inputUrl = url;
    this.requiredFields = requiredFields;
  }
  abstract parseDeeplink(url: string): void;

  abstract parseWeblink(url: string): void;

  abstract toDeeplink(): string;

  abstract toWeblink(): string;

  validate() {
    if (!this._requiredFields?.length) {
      return true;
    }
    return this.requiredFields.every((field) => this[field]);
  }
}
