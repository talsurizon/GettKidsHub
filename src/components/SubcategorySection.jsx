import { useTranslation } from 'react-i18next';
import AppCard from './AppCard';

export default function SubcategorySection({ title, apps }) {
  const { t } = useTranslation();

  if (!apps || apps.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-extrabold text-slate-200 mb-4 
                     border-b border-slate-700/50 pb-2">
        {t(`category.${title}`)}
      </h2>
      <div className="flex flex-col gap-3">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}
