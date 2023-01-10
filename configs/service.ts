export const DEFAULT_NULLISH = '-';
const defaultDecimal = 2;

const service = {
  // object find value
  getValue: (
    obj: any | undefined,
    key: string,
    defaultValue?: any | undefined
  ): any => {
    if (!obj) {
      return defaultValue;
    }

    if (!key) {
      return defaultValue;
    }

    const keys = key.split(".");
    let value = obj;
    for (let i = 0, len = keys.length; i < len; i += 1) {
      const newValue = value[keys[i]];
      if (
        !newValue &&
        typeof newValue !== "number" &&
        typeof newValue !== "boolean"
      ) {
        return defaultValue;
      }
      value = newValue;
    }
    return value;
  },
  amount: (value: string | number | null | undefined, decimal?: number, defaultValue?: string | number): string => {
    const checked = service.checkNullish(value);
    // null check
    if (checked !== DEFAULT_NULLISH) {
      // 0 check
      if (defaultValue !== undefined && !checked) {
        return defaultValue.toString();
      }
      return service.getFixed(Number(checked), decimal ?? defaultDecimal).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return defaultValue !== undefined ? defaultValue.toString() : checked;
  },

  getFixed: (value: number | string, decimal: number = defaultDecimal): string => {
    const checked = service.checkNullish(value);
    if (checked === DEFAULT_NULLISH) {
      return checked;
    }
    return Number(value || 0).toFixed(decimal);
  },

  checkNullish: (value: string | number | null | undefined): number | string => {
    return value ?? DEFAULT_NULLISH;
  },

  // On key Down InputNumber
  onKeyDownInputNumber(e: any) {
    if (e.key === '.' && (e as any).target.value.includes('.')) {
      e.preventDefault();
    } else if (isNaN(+e.key) && e.key !== '.' && e.key != 'Backspace' && e.key != 'ArrowLeft' && e.key != 'ArrowRight' && e.key != 'ArrowTop' && e.key != 'ArrowBottom') {
      e.preventDefault();
    }
  },

  // Assign 'key' property for each object
  wrapList(list?: any[] | null): any[] {
    return list instanceof Array ? list.map((obj, i) => ({ ...obj, key: i })) : [];
  },
};

export default service;
