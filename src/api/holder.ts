export class Holder {
  promise: Promise<any> | null;
  resolveFunc: ((value?: unknown) => void) | null;
  rejectFunc: ((reason?: any) => void) | null;

  constructor() {
    this.promise = null;
    this.resolveFunc = null;
    this.rejectFunc = null;
  }

  hold() {
    this.promise = new Promise((resolve, reject) => {
      this.resolveFunc = resolve;
      this.rejectFunc = reject;
    });
  }

  resolve() {
    if (this.resolveFunc) {
      this.resolveFunc();
      this.promise = null;
    }
  }

  reject() {
    if (this.rejectFunc) {
      this.rejectFunc();
      this.promise = null;
    }
  }
}
