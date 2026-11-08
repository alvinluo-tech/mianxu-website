import zhCN from "./zh-CN.js";
import zhTW from "./zh-TW.js";
import en from "./en.js";
import ja from "./ja.js";
import ko from "./ko.js";
import es from "./es.js";
import ptBR from "./pt-BR.js";
import fr from "./fr.js";
import de from "./de.js";
import it from "./it.js";
import nl from "./nl.js";
import sv from "./sv.js";
import pl from "./pl.js";
import tr from "./tr.js";
import uk from "./uk.js";
import ru from "./ru.js";
import ar from "./ar.js";
import fa from "./fa.js";
import he from "./he.js";
import hi from "./hi.js";
import th from "./th.js";
import vi from "./vi.js";
import id from "./id.js";

const DICTS = {
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  en,
  ja,
  ko,
  es,
  "pt-BR": ptBR,
  fr,
  de,
  it,
  nl,
  sv,
  pl,
  tr,
  uk,
  ru,
  ar,
  fa,
  he,
  hi,
  th,
  vi,
  id,
};

/** 语言清单：code / 原生名（切换器展示用）/ 书写方向 */
export const LOCALES = [
  { code: "zh-CN", name: "简体中文", dir: "ltr", strings: DICTS["zh-CN"] },
  { code: "zh-TW", name: "繁體中文", dir: "ltr", strings: DICTS["zh-TW"] },
  { code: "en", name: "English", dir: "ltr", strings: DICTS.en },
  { code: "ja", name: "日本語", dir: "ltr", strings: DICTS.ja },
  { code: "ko", name: "한국어", dir: "ltr", strings: DICTS.ko },
  { code: "es", name: "Español", dir: "ltr", strings: DICTS.es },
  { code: "pt-BR", name: "Português (BR)", dir: "ltr", strings: DICTS["pt-BR"] },
  { code: "fr", name: "Français", dir: "ltr", strings: DICTS.fr },
  { code: "de", name: "Deutsch", dir: "ltr", strings: DICTS.de },
  { code: "it", name: "Italiano", dir: "ltr", strings: DICTS.it },
  { code: "nl", name: "Nederlands", dir: "ltr", strings: DICTS.nl },
  { code: "sv", name: "Svenska", dir: "ltr", strings: DICTS.sv },
  { code: "pl", name: "Polski", dir: "ltr", strings: DICTS.pl },
  { code: "tr", name: "Türkçe", dir: "ltr", strings: DICTS.tr },
  { code: "uk", name: "Українська", dir: "ltr", strings: DICTS.uk },
  { code: "ru", name: "Русский", dir: "ltr", strings: DICTS.ru },
  { code: "ar", name: "العربية", dir: "rtl", strings: DICTS.ar },
  { code: "he", name: "עברית", dir: "rtl", strings: DICTS.he },
  { code: "fa", name: "فارسی", dir: "rtl", strings: DICTS.fa },
  { code: "hi", name: "हिन्दी", dir: "ltr", strings: DICTS.hi },
  { code: "th", name: "ไทย", dir: "ltr", strings: DICTS.th },
  { code: "vi", name: "Tiếng Việt", dir: "ltr", strings: DICTS.vi },
  { code: "id", name: "Bahasa Indonesia", dir: "ltr", strings: DICTS.id },
];

export const RTL_LOCALES = LOCALES.filter((l) => l.dir === "rtl").map((l) => l.code);
export const DEFAULT_LOCALE = "zh-CN";
