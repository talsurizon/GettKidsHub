import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubcategorySection from '../components/SubcategorySection';
import appsData from '../data/apps.json';

const platformEmoji = {
  android: '🤖',
  ios: '🍎',
  web: '🌐',
};

export default function CategoryPage() {
  const { platform } = useParams();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  const platformApps = appsData.apps.filter((app) => app.category === platform);
  const funApps = platformApps.filter((app) => app.subcategory === 'fun');
  const educationalApps = platformApps.filter((app) => app.subcategory === 'educational');

  const platformTitle = t(`home.${platform}`) || platform;

  return (
    <div className="py-6">
      {/* Back button + title */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-slate-400 
                     hover:text-white transition-colors no-underline mb-4"
        >
          <span>{isRtl ? '→' : '←'}</span>
          {t('category.backHome')}
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3 m-0">
          <span>{platformEmoji[platform] || '📱'}</span>
          {platformTitle}
        </h1>
      </div>

      {platformApps.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-lg">
          {t('category.noApps')}
        </div>
      ) : (
        <>
          <SubcategorySection title="educational" apps={educationalApps} />
          <SubcategorySection title="fun" apps={funApps} />
        </>
      )}
    </div>
  );
}
