import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { submitNewApp } from '../services/github';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 ' +
  'text-white placeholder-slate-500 outline-none focus:border-violet-500 ' +
  'focus:ring-1 focus:ring-violet-500 transition-colors';

const labelClass = 'text-sm font-bold text-slate-300';

export default function AddApp() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'he';

  const [form, setForm] = useState({
    name: '',
    description: '',
    madeBy: '',
    platform: 'web',
    subcategory: 'fun',
    url: '',
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      await submitNewApp({
        ...form,
        file: form.platform !== 'web' ? file : null,
      });
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  };

  const acceptType = form.platform === 'android' ? '.apk' : '.ipa';

  // Success screen
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <span className="text-7xl">🎉</span>
        <h2 className="text-2xl font-extrabold text-white m-0">
          {t('addApp.processing')}
        </h2>
        <p className="text-slate-400 max-w-md">{t('addApp.processingDesc')}</p>
        <Link
          to="/"
          className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600
                     text-white font-bold no-underline hover:from-violet-400 hover:to-purple-500
                     transition-all duration-200 hover:scale-105"
        >
          {t('addApp.backHome')}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 max-w-lg mx-auto">
      {/* Header */}
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
          <span>➕</span>
          {t('addApp.title')}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* App Name */}
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>{t('addApp.appName')}</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder={t('addApp.appNamePlaceholder')}
            className={inputClass}
          />
        </label>

        {/* Description */}
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>{t('addApp.description')}</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder={t('addApp.descriptionPlaceholder')}
            className={inputClass + ' resize-none'}
          />
        </label>

        {/* Made By */}
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>{t('addApp.madeBy')}</span>
          <input
            name="madeBy"
            value={form.madeBy}
            onChange={handleChange}
            required
            placeholder={t('addApp.madeByPlaceholder')}
            className={inputClass}
          />
        </label>

        {/* Subcategory */}
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>{t('addApp.subcategory')}</span>
          <select
            name="subcategory"
            value={form.subcategory}
            onChange={handleChange}
            className={inputClass + ' cursor-pointer'}
          >
            <option value="fun">{t('addApp.fun')}</option>
            <option value="educational">{t('addApp.educational')}</option>
          </select>
        </label>

        {/* Platform / App Type */}
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>{t('addApp.appType')}</span>
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className={inputClass + ' cursor-pointer'}
          >
            <option value="web">🌐 Web</option>
            <option value="android">🤖 Android</option>
            <option value="ios">🍎 iOS</option>
          </select>
        </label>

        {/* Conditional: URL or File */}
        {form.platform === 'web' ? (
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>{t('addApp.url')}</span>
            <input
              name="url"
              type="url"
              value={form.url}
              onChange={handleChange}
              required
              placeholder="https://example.com"
              className={inputClass}
            />
          </label>
        ) : (
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>{t('addApp.file')}</span>
            <input
              type="file"
              accept={acceptType}
              onChange={(e) => setFile(e.target.files[0] || null)}
              required
              className="block w-full text-sm text-slate-400 file:mr-4 file:ml-0
                         file:py-2 file:px-4 file:rounded-xl file:border-0
                         file:text-sm file:font-bold file:bg-violet-600 file:text-white
                         hover:file:bg-violet-500 file:cursor-pointer file:transition-colors"
            />
            <span className="text-xs text-slate-500">
              {form.platform === 'android' ? '.apk' : '.ipa'}
            </span>
          </label>
        )}

        {/* Error message */}
        {status === 'error' && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-3 rounded-xl font-bold text-white text-lg cursor-pointer border-0
                     bg-gradient-to-r from-violet-500 to-purple-600
                     hover:from-violet-400 hover:to-purple-500
                     transition-all duration-200 hover:scale-[1.02]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {status === 'submitting' ? t('addApp.submitting') : t('addApp.submit')}
        </button>
      </form>
    </div>
  );
}
