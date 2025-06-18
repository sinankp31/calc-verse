const tabButtons = document.querySelectorAll('.tab-button');
const contentContainer = document.getElementById('tab-content');
const loadedResources = new Set();

function loadCSS(path) {
  if (loadedResources.has(path)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = path;
  document.head.appendChild(link);
  loadedResources.add(path);
}

function loadJS(path) {
  if (loadedResources.has(path)) return;
  const script = document.createElement('script');
  script.src = path;
  script.defer = true;
  document.body.appendChild(script);
  loadedResources.add(path);
}

function loadTab(tabName) {
  const htmlPath = `tabs/${tabName}/${tabName}.html`;
  const cssPath = `tabs/${tabName}/${tabName}.css`;
  const jsPath = `tabs/${tabName}/${tabName}.js`;

  fetch(htmlPath)
    .then(res => {
      if (!res.ok) throw new Error(`Cannot load ${tabName}`);
      return res.text();
    })
    .then(html => {
      contentContainer.innerHTML = html;
      loadCSS(cssPath);
      loadJS(jsPath);
    })
    .catch(err => {
      contentContainer.innerHTML = `<p>Error loading ${tabName} tab: ${err.message}</p>`;
    });
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabName = button.getAttribute('data-tab');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    loadTab(tabName);
  });
});

loadTab('basic');
