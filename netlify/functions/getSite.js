const { getStore } = require('@netlify/blobs');

const defaultData = {
  title: 'Bizim Hikayemiz',
  subtitle: 'Seninle her an biraz daha güzel',
  mainImage: '',
  gallery: ['', '', '', ''],
  letter: 'Buraya ona yazmak istediğin uzun yazıyı admin panelinden girebilirsin.',
  theme: 'green',
  musicEnabled: true
};

exports.handler = async () => {
  try {
    const store = getStore('sevgili-site');
    const saved = await store.get('site-data', { type: 'json' });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
      body: JSON.stringify(saved || defaultData)
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
      body: JSON.stringify(defaultData)
    };
  }
};
