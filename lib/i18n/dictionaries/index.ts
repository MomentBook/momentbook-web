// Dictionary loader

import type { Language } from '../config';
import { en } from './en';
import { ko } from './ko';
import { zh } from './zh';
import { ja } from './ja';

const dictionaries = {
  en,
  ko,
  zh,
  ja,
  es: en,
  pt: en,
  fr: en,
  th: en,
  vi: en,
};

export async function getDictionary(lang: Language) {
  return dictionaries[lang] ?? en;
}
