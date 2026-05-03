(function () {
    const navItems = [
        { href: 'index.html', label: 'Home' },
        { href: 'projects.html', label: 'Projects' },
        { href: 'teams.html', label: 'Teams' },
        { href: 'photos.html', label: 'Photos' },
        { href: 'article.html', label: 'Articles' },
        { href: 'resume.html', label: 'Resume' },
        { href: 'about.html', label: 'About' },
    ];

    const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const menuIcon = `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
    const closeIcon = `<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

    // Small responsive CSS to render the nav as a centered "island" and
    // convert to a compact dropdown on small screens when `.mobile-open` is set.
    (function injectStyles() {
        const css = `
            #site-tabs { transition: all .18s ease; }
            /* Island appearance for >=640px */
            @media (min-width: 640px) {
                #site-tabs { display: flex !important; max-width: max-content; margin: 1.5rem auto; }
                #site-tabs.is-collapsed { display: none !important; }
            }
            /* Mobile dropdown when open */
            @media (max-width: 639px) {
                #site-tabs { display: none !important; }
                #site-tabs.mobile-open { display:flex !important; position:fixed; right:1rem; top:4rem; flex-direction:column; gap:.5rem; padding:.6rem; background:rgba(8,8,8,0.75); border-radius:.75rem; box-shadow:0 8px 24px rgba(0,0,0,.6); z-index:60; }
                #site-tabs.mobile-open .tab { white-space:nowrap; }
            }
        `;
        const style = document.createElement('style');
        style.setAttribute('data-generated','site-chrome-nav');
        style.appendChild(document.createTextNode(css));
        document.head ? document.head.appendChild(style) : document.documentElement.appendChild(style);
    })();

    const navMarkup = `
        <div class="fixed right-4 top-4 z-40">
            <button id="menu-btn" class="hidden rounded-full border border-white/12 bg-black/40 p-2 text-white backdrop-blur-md focus:outline-none" aria-label="Open navigation menu">
                ${menuIcon}
            </button>
        </div>
        <nav id="site-tabs" class="panel rounded-2xl px-3 py-2 text-sm bg-zinc-900/20 border border-white/5 backdrop-blur-md">
            ${navItems.map(item => `<a href="${item.href}" class="tab px-4 py-2 rounded-md text-white hover:text-red-300">${item.label}</a>`).join('')}
        </nav>
        <div id="top-fade"></div>
    `;

    const footerMarkup = `
        <footer class="relative z-[1] border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
            <div class="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <p class="mono text-sm uppercase tracking-[0.3em] text-zinc-400">Dylan Kwok / Digital Repository</p>
                <div class="flex flex-wrap gap-4 text-sm text-zinc-300">
                    <a href="mailto:dylankwok28@gmail.com" class="transition hover:text-red-300">Email</a>
                    <a href="https://github.com/earthrise8" target="_blank" rel="noreferrer" class="transition hover:text-red-300">GitHub</a>
                    <a href="https://www.linkedin.com/in/dylan-kwok-934316283/" target="_blank" rel="noreferrer" class="transition hover:text-red-300">LinkedIn</a>
                    <a href="tel:+13415002788" class="transition hover:text-red-300">Phone</a>
                </div>
            </div>
        </footer>
    `;

    const topMount = document.getElementById('site-chrome-top');
    if (topMount) {
        topMount.innerHTML = navMarkup;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navMarkup);
    }

    const bottomMount = document.getElementById('site-chrome-bottom');
    if (bottomMount) {
        bottomMount.innerHTML = footerMarkup;
    } else {
        document.body.insertAdjacentHTML('beforeend', footerMarkup);
    }

    const menuBtn = document.getElementById('menu-btn');
    const siteTabs = document.getElementById('site-tabs');

    if (!menuBtn || !siteTabs) {
        return;
    }

    function setMenuIcon(isOpen) {
        menuBtn.innerHTML = isOpen ? closeIcon : menuIcon;
    }

    function syncNavigationMode() {
        const shouldCollapse = window.innerWidth < 640 || siteTabs.scrollWidth > (window.innerWidth - 32);

        siteTabs.classList.toggle('is-collapsed', shouldCollapse);
        siteTabs.classList.toggle('hidden', shouldCollapse && window.innerWidth < 640);
        siteTabs.classList.toggle('mobile-open', false);
        menuBtn.classList.toggle('hidden', !shouldCollapse);
        setMenuIcon(false);
    }

    menuBtn.addEventListener('click', () => {
        const isOpen = siteTabs.classList.toggle('mobile-open');
        siteTabs.classList.toggle('hidden', !isOpen && window.innerWidth < 640);
        setMenuIcon(isOpen);
    });

    const tabs = document.querySelectorAll('#site-tabs .tab');
    tabs.forEach(tab => {
        const href = (tab.getAttribute('href') || '').toLowerCase();
        if (href.endsWith(currentFile) || (currentFile === '' && href.endsWith('index.html'))) {
            tab.classList.add('active');
        }

        tab.addEventListener('click', () => {
            tabs.forEach(otherTab => otherTab.classList.remove('active'));
            tab.classList.add('active');
            if (window.innerWidth < 640) {
                siteTabs.classList.add('hidden');
                siteTabs.classList.remove('mobile-open');
            }
        });
    });

    syncNavigationMode();
    window.addEventListener('resize', syncNavigationMode);
})();