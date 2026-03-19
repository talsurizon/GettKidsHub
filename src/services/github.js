const OWNER = 'talsurizon';
const REPO = 'GettKidsHub';
const API = 'https://api.github.com';

function getToken() {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (!token) throw new Error('GitHub token is not configured.');
  return token;
}

async function ghFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `GitHub API error: ${res.status}`);
  }
  return res.json();
}

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function base64ToUtf8(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function autoAssignIcon(name, subcategory) {
  const l = name.toLowerCase();
  if (/math|number|count|calc/.test(l)) return 'math-kids';
  if (/puzzle|jigsaw/.test(l)) return 'puzzle-quest';
  if (/music|piano|song|melody/.test(l)) return 'music-maker';
  if (/draw|paint|color|art/.test(l)) return 'color-splash';
  if (/code|program|dev/.test(l)) return 'code-kids';
  if (/science|lab|experiment/.test(l)) return 'science-lab';
  if (/run|jump|sport|race/.test(l)) return 'space-runner';
  if (/pop|bubble/.test(l)) return 'bubble-pop';
  if (/word|read|letter|abc|aleph/.test(l)) return 'aleph-bet';
  if (/clock|time/.test(l)) return 'read-clock';
  if (/world|map|geo|earth/.test(l)) return 'geo-explorer';
  if (/wizard|magic/.test(l)) return 'word-wizard';
  return subcategory === 'educational' ? 'code-kids' : 'bubble-pop';
}

export async function submitNewApp({ name, description, madeBy, platform, subcategory, file, url }) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const appId = `${slug || Date.now()}-${platform}`;
  const branchName = `add-app/${appId}`;
  const icon = autoAssignIcon(name, subcategory);

  const newApp = {
    id: appId,
    name: { en: name, he: name },
    description: { en: description, he: description },
    category: platform,
    subcategory,
    icon,
    downloadUrl: platform === 'web' ? url : `/apps/${platform}/${file.name}`,
    madeBy,
  };

  // 1. Get main branch SHA
  const ref = await ghFetch(`/repos/${OWNER}/${REPO}/git/ref/heads/main`);
  const mainSha = ref.object.sha;

  // 2. Create branch
  await ghFetch(`/repos/${OWNER}/${REPO}/git/refs`, {
    method: 'POST',
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: mainSha }),
  });

  // 3. Get current apps.json
  const appsFile = await ghFetch(
    `/repos/${OWNER}/${REPO}/contents/src/data/apps.json?ref=${branchName}`,
  );
  const appsData = JSON.parse(base64ToUtf8(appsFile.content.replace(/\n/g, '')));

  // 4. Add new app and commit updated apps.json
  appsData.apps.push(newApp);
  const updatedContent = utf8ToBase64(JSON.stringify(appsData, null, 2) + '\n');

  await ghFetch(`/repos/${OWNER}/${REPO}/contents/src/data/apps.json`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Add ${name} to apps catalog`,
      content: updatedContent,
      sha: appsFile.sha,
      branch: branchName,
    }),
  });

  // 5. Upload binary file if android/ios
  if (file) {
    const base64 = await fileToBase64(file);
    const filePath = `public/apps/${platform}/${file.name}`;

    await ghFetch(`/repos/${OWNER}/${REPO}/contents/${filePath}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: `Add ${file.name}`,
        content: base64,
        branch: branchName,
      }),
    });
  }

  // 6. Create pull request
  const pr = await ghFetch(`/repos/${OWNER}/${REPO}/pulls`, {
    method: 'POST',
    body: JSON.stringify({
      title: `Add new app: ${name}`,
      body: [
        '## New App Submission',
        '',
        `- **Name:** ${name}`,
        `- **Description:** ${description}`,
        `- **Platform:** ${platform}`,
        `- **Subcategory:** ${subcategory}`,
        `- **Made by:** ${madeBy}`,
        platform === 'web' ? `- **URL:** ${url}` : `- **File:** ${file.name}`,
      ].join('\n'),
      head: branchName,
      base: 'main',
    }),
  });

  return pr;
}
