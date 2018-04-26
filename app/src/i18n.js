import i18n from "i18next";
//import XHR from "i18next-xhr-backend";
//import { LanguageDetector } from "i18next-browser-languagedetector";
import LanguageJson from "./locales/";
import { reactI18nextModule } from "react-i18next";
import language from "./locales/";
import { getLocalItem, setLocalItem } from "./utils/util";
var languageItem = getLocalItem("language");
var languageType = languageItem ? languageItem.data : "zh";

if (!languageItem) {
	setLocalItem("language", "zh");
}

i18n
	//.use(XHR)
	//.use(LanguageDetector)
	.use(reactI18nextModule) // if not using I18nextProvider
	.init(
		{
			resources: language,
			translations: ["translation"],
			defaultNS: "translation",
			fallbackLng: languageType,
			lng: languageType,
			debug: false,
			interpolation: {
				escapeValue: false // not needed for react!!
			},
			react: {
				wait: true
			}
		},
		(err, t) => {
			if (err) {
				return console.error(err);
			}
			console.log("i18n successfully initialized");
		}
	);
//监听语言变化，重载页面
// i18n.on("languageChanged", () => {
// 	window.location.reload();
// });
export default i18n;
