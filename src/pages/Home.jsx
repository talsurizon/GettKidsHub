import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CategoryNav from '../components/CategoryNav';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 sm:py-20">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
          {t('home.welcome')}
        </h1>
        <p className="text-lg text-slate-400">
          {t('home.chooseCategory')}
        </p>
      </div>

      <CategoryNav />

      <Link
        to="/add-app"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                   bg-slate-800/60 border border-slate-700/40 hover:border-violet-500/50
                   text-white font-bold no-underline hover:bg-slate-700/60
                   transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/10"
      >
        <span className="text-xl">➕</span>
        {t('home.addApp')}
      </Link>
    </div>
  );
}
