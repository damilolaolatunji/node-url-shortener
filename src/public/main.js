const form = document.querySelector('.url-form');
const result = document.querySelector('.result-section .container');
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const input = document.querySelector('.url-input');
  try {
    const response = await fetch('/shorten', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: input.value.trim(),
      }),
    });

    input.value = '';

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data = await response.json();

    const url = location.origin + '/' + data.shortID;

    result.insertAdjacentHTML(
      'afterbegin',
      `
          <div class="card mb-5">
            <div class="card-content">
              <div class="content">
                <h3 class="title">
<a class="has-text-black" target="_blank" rel="noopener" href="${data.shortID}"
>${url}</a>
                </h3>
                <p class="subtitle is-6 has-text-primary-dark">
${data.destination}
                </p>
                <div class="field is-grouped">
                  <p class="control">
                    <a
href="${data.shortID}"
                      target="_blank"
rel="noopener"
                      class="button is-link"
                    >
                      <span class="icon is-small">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                      </span>
                      <span>Visit</span>
                    </a>
                  </p>
                  <p class="control">
<button data-url="${url}" class="button copy-link js-copy-link is-success">
                      <span class="icon is-small">
                        <i class="fa-solid fa-copy"></i>
                      </span>
                      <span class="copy-text">Copy</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
    `
    );
  } catch (err) {
    alert(err);
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('js-copy-link')) return;
  const button = e.target;
  const copyText = button.querySelector('.copy-text');
  const url = button.dataset.url;
  navigator.clipboard.writeText(url);
  copyText.textContent = 'Copied!';

  setTimeout(() => {
    copyText.textContent = 'Copy';
  }, 2000);
});
