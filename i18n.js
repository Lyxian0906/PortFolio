const LANG_NAMES = { en: "EN", es: "ES", fr: "FR", it: "IT", ru: "RU", zh: "中文", ja: "日本語", ko: "한국어" };
const LANG_LABELS = { en: "English", es: "Español", fr: "Français", it: "Italiano", ru: "Русский", zh: "中文", ja: "日本語", ko: "한국어" };
 
function getCurrentLang(){
  return localStorage.getItem("site-lang") || "en";
}
 
function applyTranslations(lang){
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.documentElement.setAttribute("lang", lang);
 
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if(dict[key] !== undefined){ el.textContent = dict[key]; }
  });
 
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if(dict[key] !== undefined){ el.setAttribute("placeholder", dict[key]); }
  });
 
  const trigger = document.getElementById("lang-current");
  if(trigger){ trigger.textContent = LANG_NAMES[lang]; }
  document.querySelectorAll(".lang-option").forEach(opt => {
    opt.classList.toggle("active-lang", opt.dataset.lang === lang);
  });
}
 
function setLang(lang){
  localStorage.setItem("site-lang", lang);
  applyTranslations(lang);
  const menu = document.getElementById("lang-menu");
  if(menu){ menu.classList.remove("open"); }
}
 
function buildLangSwitcher(){
  const nav = document.querySelector(".nav-inner");
  if(!nav || document.getElementById("lang-switcher")) return;
 
  const wrap = document.createElement("div");
  wrap.className = "lang-switcher";
  wrap.id = "lang-switcher";
 
  const trigger = document.createElement("button");
  trigger.className = "lang-trigger";
  trigger.setAttribute("aria-label", "Change language");
  trigger.innerHTML = `🌐 <span id="lang-current">EN</span>`;
 
  const menu = document.createElement("div");
  menu.className = "lang-menu";
  menu.id = "lang-menu";
 
  Object.keys(LANG_LABELS).forEach(code => {
    const opt = document.createElement("button");
    opt.className = "lang-option";
    opt.dataset.lang = code;
    opt.textContent = LANG_LABELS[code];
    opt.addEventListener("click", () => setLang(code));
    menu.appendChild(opt);
  });
 
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });
  document.addEventListener("click", () => menu.classList.remove("open"));
 
  wrap.appendChild(trigger);
  wrap.appendChild(menu);
 
  const toggle = nav.querySelector(".nav-toggle");
  nav.insertBefore(wrap, toggle);
}
 
document.addEventListener("DOMContentLoaded", () => {
  buildLangSwitcher();
  applyTranslations(getCurrentLang());
});
