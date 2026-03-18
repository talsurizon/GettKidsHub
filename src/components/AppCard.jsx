import { useTranslation } from 'react-i18next';

const iconMap = {
  'math-adventure': '🔢',
  'aleph-bet': '🔤',
  'space-runner': '🚀',
  'bubble-pop': '🫧',
  'science-lab': '🔬',
  'word-wizard': '✨',
  'puzzle-quest': '🧩',
  'color-splash': '🎨',
  'code-kids': '💻',
  'geo-explorer': '🌍',
  'drawing-studio': '🖌️',
  'music-maker': '🎵',
  'math-kids': '➕',
  'double': '🔵',
  'read-clock': '🕐',
  'piano-princess': '🎹',
  'soduku': '🔢',
  'jumping-jack': '🏃',
  'popit': '🦄',
};

export default function AppCard({ app }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isWeb = app.category === 'web';

  const handleAction = () => {
    if (isWeb) {
      window.open(app.downloadUrl, '_blank', 'noopener,noreferrer');
    } else {
      const link = document.createElement('a');
      link.href = import.meta.env.BASE_URL + app.downloadUrl.replace(/^\//, '');
      link.download = '';
      link.click();
    }
  };

  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 
                    border border-slate-700/40 hover:border-slate-600/60
                    hover:bg-slate-750/80 transition-all duration-200 hover:shadow-lg">
      {/* App Icon */}
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-slate-700/50 
                      flex items-center justify-center text-3xl
                      group-hover:scale-105 transition-transform duration-200">
        {iconMap[app.icon] || '📱'}
      </div>

      {/* App Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-white m-0 truncate">
          {app.name[lang] || app.name.en}
        </h3>
        <p className="text-sm text-slate-400 m-0 line-clamp-1">
          {app.description[lang] || app.description.en}
        </p>
        {app.madeBy && (
          <span className="text-xs text-slate-500">
            {(typeof app.madeBy === 'object' ? (app.madeBy[lang] || app.madeBy.en) : app.madeBy)}
          </span>
        )}
      </div>

      {/* Download/Open Button */}
      <button
        onClick={handleAction}
        className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-sm text-white 
                   cursor-pointer border-0 transition-all duration-200 hover:scale-105
                   ${isWeb
                     ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400'
                     : 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500'
                   }`}
      >
        {isWeb ? t('category.open') : t('category.download')}
      </button>
    </div>
  );
}
