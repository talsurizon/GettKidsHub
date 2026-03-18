import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <span className="text-7xl">😕</span>
      <h1 className="text-3xl font-extrabold text-white m-0">
        {t('notFound.title')}
      </h1>
      <p className="text-slate-400 text-lg">
        {t('notFound.message')}
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 
                   text-white font-bold no-underline hover:from-violet-400 hover:to-purple-500
                   transition-all duration-200 hover:scale-105"
      >
        {t('notFound.backHome')}
      </Link>
    </div>
  );
}
