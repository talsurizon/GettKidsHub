import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Header() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  const toggleLanguage = () => {
    const newLang = isRtl ? 'en' : 'he';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <span className="text-3xl">🚀</span>
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h1 className="text-xl font-extrabold text-white m-0 leading-tight">
              {t('header.title')}
            </h1>
            <p className="text-xs text-slate-400 m-0">{t('header.subtitle')}</p>
          </div>
        </Link>

        <button
          onClick={toggleLanguage}
          className="px-3 py-1.5 rounded-full bg-slate-700/60 hover:bg-slate-600/60 
                     text-sm font-bold text-white border border-slate-600/50 
                     transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          {t('language.switch')}
        </button>
      </div>
    </header>
  );
}
