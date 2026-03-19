import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'web',
    emoji: '🌐',
    color: 'from-orange-500 to-amber-600',
    hoverColor: 'hover:from-orange-400 hover:to-amber-500',
    shadow: 'hover:shadow-orange-500/30',
  },
  {
    id: 'android',
    emoji: '🤖',
    color: 'from-emerald-500 to-green-600',
    hoverColor: 'hover:from-emerald-400 hover:to-green-500',
    shadow: 'hover:shadow-emerald-500/30',
  },
  {
    id: 'ios',
    emoji: '🍎',
    color: 'from-blue-500 to-indigo-600',
    hoverColor: 'hover:from-blue-400 hover:to-indigo-500',
    shadow: 'hover:shadow-blue-500/30',
  },
];

export default function CategoryNav() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-2xl mx-auto">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={`/category/${cat.id}`}
          className={`group flex flex-col items-center justify-center gap-3 p-8 sm:p-10 
                      rounded-3xl bg-gradient-to-br ${cat.color} ${cat.hoverColor}
                      shadow-lg ${cat.shadow} hover:shadow-xl
                      transition-all duration-300 hover:scale-105 hover:-translate-y-1
                      no-underline`}
        >
          <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300">
            {cat.emoji}
          </span>
          <span className="text-lg sm:text-xl font-bold text-white">
            {t(`home.${cat.id}`)}
          </span>
        </Link>
      ))}
    </div>
  );
}
