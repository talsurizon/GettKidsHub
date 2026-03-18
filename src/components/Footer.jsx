import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="text-center py-4 text-sm text-slate-500 border-t border-slate-700/30">
      {t('footer.madeWith')}
    </footer>
  );
}
