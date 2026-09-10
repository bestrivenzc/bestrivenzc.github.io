(function () {
  const profile = window.SITE_PROFILE || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const text = (value, fallback = "") => {
    if (value === undefined || value === null || value === "") return fallback;
    return String(value);
  };

  const initialsFromName = (name) =>
    text(name, "CZ")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  const escapeHtml = (value) =>
    text(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const anchor = (label, url) => {
    if (!url) return "";
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
  };

  const iconMarkup = (name) => {
    const icons = window.SITE_ICONS || {};
    const nodes = icons[name] || icons.Link || [];
    return `<svg class="profile-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${nodes.map(([tag, attributes]) => `<${tag} ${Object.entries(attributes).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ')}></${tag}>`).join('')}</svg>`;
  };

  const setProfileText = () => {
    const name = text(profile.name, "Chi Zhang");
    const initials = text(profile.initials, initialsFromName(name));
    const shortName = text(profile.shortName, initials);

    document.title = name;
    $$("[data-profile='name']").forEach((el) => (el.textContent = name));
    $$("[data-profile='shortName']").forEach((el) => (el.textContent = shortName));
    $$("[data-profile='role']").forEach((el) => (el.textContent = text(profile.role, "Researcher")));
    $$("[data-profile='affiliation']").forEach((el) => {
      el.textContent = text(profile.affiliation);
      el.hidden = !el.textContent;
    });
    $$("[data-profile='location']").forEach((el) => {
      el.textContent = text(profile.location);
      el.closest('.location').hidden = !el.textContent;
    });
    $$("[data-profile='sidebarBio']").forEach((el) => {
      el.textContent = text(profile.sidebarBio);
      el.hidden = !el.textContent;
    });
    $$('[data-icon]').forEach((el) => {
      el.innerHTML = iconMarkup(el.dataset.icon);
    });
    $$("[data-profile='lastUpdated']").forEach((el) => {
      el.textContent = text(profile.lastUpdated, "2026");
    });
  };

  const renderLinks = () => {
    const target = $("#profile-links");
    const links = (profile.links || []).filter((item) => item && item.url);
    target.innerHTML = links.map((item) => {
      const isEmail = item.url.startsWith('mailto:');
      const destination = isEmail ? item.url.slice(7) : item.label;
      return `<a href="${escapeHtml(item.url)}" title="${escapeHtml(destination)}"${isEmail ? '' : ' target="_blank" rel="noreferrer"'}>${iconMarkup(item.icon)}<span>${escapeHtml(item.label)}</span></a>`;
    }).join('');
  };

  const renderMetrics = () => {
    const target = $("#profile-metrics");
    const metrics = profile.metrics || [];
    target.innerHTML = metrics
      .map(
        (item) => `
          <div>
            <dt>${escapeHtml(item.label)}</dt>
            <dd>${escapeHtml(item.value)}</dd>
          </div>
        `,
      )
      .join("");
    target.hidden = profile.showMetrics !== true || !metrics.length;
  };

  const renderAbout = () => {
    const about = $("#about-content");
    if (profile.aboutHtml && profile.aboutHtml.length) {
      about.innerHTML = profile.aboutHtml.map((p) => `<p>${p}</p>`).join("");
    } else {
      const paragraphs = profile.about && profile.about.length
      ? profile.about
      : [
          "I am a researcher working on machine learning and its real-world applications. My homepage is currently being updated.",
        ];
      about.innerHTML = paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
    }

    const tags = $("#research-tags");
    tags.innerHTML = (profile.researchInterests || [])
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("");
  };

  const renderNews = () => {
    const news = $("#news-list");
    const items = profile.news || [];
    news.innerHTML = items
      .map(
        (item) =>
          `<li><span class="news-date">${escapeHtml(item.date)}:</span><span class="news-icon" aria-hidden="true">&#127881;</span><span>${item.title ? anchor(item.title, item.url) + ' ' : ''}${escapeHtml(item.text)}${item.congrats ? ` Congrats to ${escapeHtml(item.congrats)}!` : ''}</span></li>`,
      )
      .join("");
  };

  const paperLinks = (links = []) =>
    links
      .filter((item) => item && item.url)
      .map((item) => anchor(item.label, item.url))
      .join("");

  const paperAuthors = (authors) => text(authors).split(', ').map((author) => {
    if (author === 'Chi Zhang' || author === 'C. Zhang') {
      return '<strong class="self-author">Chi Zhang</strong>';
    }
    return escapeHtml(author);
  }).join(', ');

  const renderPaper = (paper) => {
    const links = paper.links && paper.links.length ? paper.links : [{ label: 'Paper', url: paper.url }];
    const highlights = paper.highlights || (paper.note ? [paper.note] : []);
    const hasMedia = paper.video || paper.image;
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const videoWidth = Number(paper.videoWidth);
    const videoHeight = Number(paper.videoHeight);
    const videoRatio = paper.video && Number.isFinite(videoWidth) && videoWidth > 0
      && Number.isFinite(videoHeight) && videoHeight > 0
      ? ` style="aspect-ratio: ${videoWidth} / ${videoHeight};"` : '';
    let media = '';
    if (paper.video) {
      media = `<div class="paper-video-frame"${videoRatio}>
        <video class="paper-video" src="${escapeHtml(paper.video)}"${paper.videoPoster ? ` poster="${escapeHtml(paper.videoPoster)}"` : ''}${reducedMotion ? '' : ' autoplay'} muted loop playsinline controls preload="metadata" aria-label="${escapeHtml(paper.videoAlt || paper.title)}">${anchor('Video', paper.video)}</video>
      </div>
      ${paper.videoLabels && paper.videoLabels.length ? `<div class="paper-video-labels">${paper.videoLabels.map((label) => `<span>${escapeHtml(label)}</span>`).join('')}</div>` : ''}`;
    } else if (paper.image) {
      const width = Number(paper.imageWidth);
      const height = Number(paper.imageHeight);
      const dimensions = Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0
        ? ` width="${width}" height="${height}"` : '';
      media = `<a class="paper-image-link" href="${escapeHtml(paper.url)}" target="_blank" rel="noreferrer"><img src="${escapeHtml(paper.image)}" alt="${escapeHtml(paper.imageAlt || paper.title)}"${dimensions} loading="lazy" decoding="async" /></a>`;
    }
    return `
      <article class="paper-row" id="${escapeHtml(paper.id)}">
        <div class="paper-visual${hasMedia ? '' : ' is-placeholder'}${paper.video ? ' has-video' : paper.image ? ' has-image' : ''}">
          <div class="figure-placeholder" role="img" aria-label="Figure reserved for ${escapeHtml(paper.title)}"></div>
          ${media}
          <span class="venue-badge">${escapeHtml(paper.badge || paper.venue || 'Paper')}</span>
        </div>
        <div class="paper-copy">
          <h3>${anchor(paper.title, paper.url)}</h3>
          <p class="authors">${paperAuthors(paper.authors)}</p>
          <p class="paper-meta">${escapeHtml(paper.meta)}</p>
          <div class="paper-links">${paperLinks(links)}</div>
          ${highlights.length ? `<ul class="paper-highlights">${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
        </div>
      </article>`;
  };

  const renderPublications = () => {
    const featured = $("#featured-publications");
    const compact = $("#publication-list");
    const isFirstAuthor = (paper) => {
      const firstAuthor = text(paper.authors).split(',')[0].trim();
      return firstAuthor === text(profile.name, 'Chi Zhang') || firstAuthor === 'C. Zhang';
    };
    const byAuthorAndYear = (a, b) => Number(isFirstAuthor(b)) - Number(isFirstAuthor(a))
      || (Number(b.year) || 0) - (Number(a.year) || 0);
    const papers = [...(profile.featuredPublications || []), ...(profile.publications || [])]
      .sort(byAuthorAndYear);
    const allPapers = [...papers, ...(profile.additionalPublications || [])].sort(byAuthorAndYear);
    compact.innerHTML = allPapers.map((paper) => {
      const links = (paper.links && paper.links.length ? paper.links : [{ label: 'Paper', url: paper.url }])
        .filter((link) => link && link.url && link.label !== 'DOI')
        .map((link) => ({ ...link, label: link.label === 'Project' ? 'Website' : link.label }));
      return `<li id="paper-list-${escapeHtml(paper.id)}">
        <span class="paper-list-badge" title="${escapeHtml(paper.venue)}">${escapeHtml(paper.badge || paper.venue)}</span>
        ${anchor(paper.title, paper.url)}, ${paperAuthors(paper.authors)}.
        ${links.length ? `<span class="paper-list-separator" aria-hidden="true">|</span> <span class="paper-list-links">${paperLinks(links)}</span>` : ''}
      </li>`;
    }).join('');
    compact.hidden = !allPapers.length;

    if (!papers.length) {
      featured.innerHTML = `
        <div class="empty-state">
          <p>Selected publications will be added here soon. For the complete and latest list, please visit Google Scholar.</p>
          ${anchor("Google Scholar", profile.scholarUrl)}
        </div>
      `;
      return;
    }

    featured.innerHTML = papers.map(renderPaper).join('');
    $$('.paper-visual img').forEach((img) => {
      img.addEventListener('error', () => {
        img.closest('.paper-visual').classList.add('is-placeholder');
        img.closest('.paper-image-link').hidden = true;
      });
    });
    $$('.paper-visual video').forEach((video) => {
      video.addEventListener('error', () => {
        video.closest('.paper-visual').classList.add('is-placeholder');
        video.hidden = true;
      });
    });
  };

  const renderGroupedList = (selector, groups, className) => {
    const target = $(selector);
    target.innerHTML = (groups || [])
      .map(
        (group) => `
          <article class="${className}">
            <h3>${escapeHtml(group.title)}</h3>
            <ul>
              ${(group.items || []).map((item) => `<li>${typeof item === 'string' ? escapeHtml(item) : item.url ? anchor(item.label, item.url) : escapeHtml(item.label)}</li>`).join("")}
            </ul>
          </article>
        `,
      )
      .join("");
  };

  const renderMisc = () => {
    const misc = profile.misc || {};
    const quote = misc.quote;
    // Like aboutHtml, itemsHtml is trusted content maintained in data/profile.js.
    $("#misc-list").innerHTML = `
      <ul class="misc-list">${(misc.itemsHtml || []).map((item) => `<li>${item}</li>`).join('')}</ul>
      ${quote ? `<figure class="personal-quote">
        <blockquote cite="${escapeHtml(quote.url)}">&ldquo;${escapeHtml(quote.text)}&rdquo;</blockquote>
        <figcaption>${anchor(quote.author, quote.authorUrl || quote.url)} <span>(excerpt; ${anchor('source', quote.url)})</span></figcaption>
      </figure>` : ''}`;
  };

  setProfileText();
  renderLinks();
  renderMetrics();
  renderAbout();
  renderNews();
  renderPublications();
  renderGroupedList("#service-list", profile.services, "service-card");
  renderMisc();
})();
