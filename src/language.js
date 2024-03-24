// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import HttpApi from "i18next-http-backend";

// i18n.use(LanguageDetector)
//     .use(initReactI18next)
//     .use(HttpApi)
//     .init({
//         supportedLngs: ["ru", "en", "uz"],
//         fallbackLng: localStorage.getItem("lng") || "en",
//         detection: {
//             order: ["htmlTag", "cookie", "localStorage", "subdomain", "path"],
//             cash: ["cookie"],
//         },
//         backend: {
//             loadPath: "/assetss/locales/{{lng}}/translation.json",
//         },
//     });

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./lng/en.json";
import ru from "./lng/ru.json";
import uz from "./lng/uz.json";

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        ru: {
            translation: ru,
        },
        uz: {
            translation: uz,
        },
    },
    lng: localStorage.getItem("lng") || "en",
});

export default i18next;
