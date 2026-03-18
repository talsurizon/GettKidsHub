import { useTranslation } from 'react-i18next';
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
    </div>
  );
}
