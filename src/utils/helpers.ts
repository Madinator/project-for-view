import { queryString } from '../utils/query-string';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

function subtractDate(dateString?: string | Date, count = 1, type = 'month'): Dayjs {
  return dayjs(dateString).subtract(count, type);
}

function formatDateObjByPattern(
  dateString: string | Date,
  pattern = 'YYYY-MM-DDTHH:mm:ss',
): string | null | undefined {
  if (
    (!dateString && typeof dateString === 'undefined') ||
    (!dateString && typeof dateString === 'string')
  )
    return dateString;

  let date = '';

  try {
    date = dayjs(dateString).format(pattern);
  } catch (e) {
    console.debug(e, 'error formatDateObjByPattern');
  }
  return date;
}

function objectToQueryString(obj: Record<string, any>) {
  return queryString.stringify(obj);
}

const arrayFromNumberLength = (length: number): number[] => {
  return Array.from({ length }, (v, k) => k);
};

function OnEscKeyPressedDoCallback(e : any, callback : any) {
  if (e.keyCode === 27 && !e.ctrlKey && !e.shiftKey && !e.altKey) {
    callback && callback();
  }
}

const onEnterKeyPressDoCallback = (e : any, callback : any) => {
  // eslint-disable-next-line
  if (e.keyCode === 13 || e.key == 'Enter') {
    return callback();
  }
};

const trimStringByLength = (string : any, targetLength : any) => {
  if (string.length < targetLength) {
    return string;
  } else {
    // eslint-disable-next-line
    return string.substring(0, targetLength) + '...';
  }
};

const readFileAsDataUrl = (file : any, callback : any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e : any) => resolve(callback(e.target.result));
    reader.readAsDataURL(file);
  });
};

const getLocaleDateString = (dateUTC: string | number, locale = 'ru-RU') => {
  return new Date(dateUTC).toLocaleDateString(locale);
};

const getLocaleDateTimeString = (dateUTC: string | number, locale = 'ru-RU') => {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateUTC));
};

const withoutSpaces = (str: string | number) => {
  if (!Number(str)) {
    if (!str) return '';
    return str.toString().replace(/\s+/g, '');
  } else {
    return Number(str.toString().replace(/\s+/g, ''));
  }
};

const formatNumber = (inputValue : any) => {
  // 0.000009
  const decimalRegExp = /^[0]?[0-9]+[.]?[0-9]+/;
  const isEmpty = (str : any) => (str?.trim() == '' ? true : false);

  let value;
  if (!inputValue) return inputValue;
  // и без пробелов
  value = inputValue.replace(/\s+/g, '');
  value = value.split(' ').join('');
  value.replace(decimalRegExp, '');
  // и только цифры
  value = value.replace(/[^\d.]/g, '');

  if (!value || isEmpty(value)) return '';
  return Number(value);
};

export const isNetworkError = (s: string) => {
  const errorClient = s?.match(/NetworkError/) != null;
  const errorServer = s?.match(/EHOSTUNREACH/) != null;
  return errorClient || errorServer;
};

function isJson(str : any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

//склонение по падежам
/**
 * Plural forms for russian words
 * @param  {Number} number quantity for word
 * @param  {Array} titles Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String}        Count + plural form for word
 */
const pluralizeWordsByCount = (number: number, titles: [string, string, string]) => {
  number = Math.abs(number);
  const cases = [2, 0, 1, 1, 1, 2];
  if (Number.isInteger(number)) {
    return titles[
      number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }
  return titles[1];
};

const generateId = () => {
  return new Date().getTime() + Math.random().toFixed(24);
};

const openLinkInExternalWindow = (url : any) => {
  const a = document.createElement('a');
  a.href = url;
  document.body.appendChild(a);
  a.target = '_blank';
  a.click();
  a.remove();
};

function downloadFileFromString(text: string | void, name: string, type: string): void {
  if (!text) return;
  const blob = new Blob([text], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.download = name;
  a.click();
  a.remove();
}

export {
  arrayFromNumberLength,
  downloadFileFromString,
  formatDateObjByPattern,
  formatNumber,
  generateId,
  getLocaleDateString,
  getLocaleDateTimeString,
  isJson,
  objectToQueryString,
  onEnterKeyPressDoCallback,
  OnEscKeyPressedDoCallback,
  openLinkInExternalWindow,
  pluralizeWordsByCount,
  readFileAsDataUrl,
  subtractDate,
  trimStringByLength,
  withoutSpaces,
};
