/* ==========================================================================
   Criyxen UNIFIED PORTFOLIO & MANAGER CONTROLLER
   ========================================================================== */

(function initAssetShield() {
    document.addEventListener('contextmenu', (e) => {
        if (localStorage.getItem('user_role') !== 'admin') e.preventDefault();
    });
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });
    document.addEventListener('keydown', (e) => {
        const isAdmin = localStorage.getItem('user_role') === 'admin';
        if (e.key === 'PrintScreen') {
            document.body.classList.add('privacy-shield-active');
            setTimeout(() => document.body.classList.remove('privacy-shield-active'), 2500);
        }
        if (!isAdmin && (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) ||
            (e.ctrlKey && ['u', 'U', 's', 'S', 'p', 'P'].includes(e.key))
        )) {
            e.preventDefault();
        }
    });
    window.addEventListener('blur', () => {
        if (localStorage.getItem('user_role') !== 'admin') document.body.classList.add('privacy-shield-active');
    });
    window.addEventListener('focus', () => document.body.classList.remove('privacy-shield-active'));
})();

document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('user_role');
    const inPagesFolder = window.location.pathname.includes('/pages/');
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const loginPath = inPagesFolder ? '../index.html' : 'index.html';
    const homePath = inPagesFolder ? 'home.html' : 'pages/home.html';

    const homeAvatarPath = inPagesFolder ? '../Profile pic/Me.JPG' : 'Profile pic/Me.JPG';
    const profileAvatarPath = inPagesFolder ? '../02_character_and_cat_pack/6.png' : '02_character_and_cat_pack/6.png';
    const avatarScope = currentPage === 'profile.html' ? 'profile' : 'home';
    const defaultPageAvatar = avatarScope === 'profile' ? profileAvatarPath : homeAvatarPath;

    // ------------------------------------------------------------------
    // 1. ROUTE GUARD & DATA STORE INITIALIZATION
    // ------------------------------------------------------------------
    if (!userRole && inPagesFolder) {
        if (window.self !== window.top) {
            window.top.location.replace(loginPath);
        } else {
            window.location.replace(loginPath);
        }
        return;
    }

    const DEFAULTS = {
        siteConfig: {
            brandTitle: 'Criyxen',
            creatorName: 'Michael D. Ebin Jr.',
            courseSubtitle: 'BSEMC-DAT • 1st Year',
            heroHeading: 'MICHAEL D. EBIN JR.',
            heroTagline: '"Turning imagination into motion, one frame at a time."',
            statusText: 'Working on animation...',
            dailyUpdateSub: 'BSEMC-DAT • Bukidnon State University',
            dailyUpdateBody: 'Just finished keyframing the intro sequence & updated my live streaming schedule!',
            contactEmail: 'michaelebin20@gmail.com',
            calendlyUrl: 'https://calendly.com/2090034-student/30min',
            footerText: '© 2026 Criyxen • Michael D. Ebin Jr. All Rights Reserved. BSEMC-DAT'
        },
        checklist: [
            { label: 'Principles of Animation', done: true },
            { label: 'Basic Animation Concepts', done: true },
            { label: 'Digital Illustration', done: true },
            { label: 'Character Animation', done: false },
            { label: '3D Animation', done: false }
        ],
        roadmap: [
            {
                phase: 'PHASE 01 • Q1 2026',
                title: 'Foundation & Visual Genesis',
                status: 'completed',
                desc: 'Established core drawing fundamentals, perspective anatomy, color theory, and digital brand identity.',
                deliverables: ['Criyxen Visual Identity & Persona', '12 Principles of Animation Studies', 'Core Front-End Web Architecture']
            },
            {
                phase: 'PHASE 02 • Q2–Q3 2026',
                title: '2D Motion Lab & Interactive Ecosystem',
                status: 'in-progress',
                desc: 'Producing frame-by-frame keyframe motion tests, live art streams, and community vault infrastructure.',
                deliverables: ['Dreamscape 2D Animatic', 'Live Streaming & Community Hub', 'Supporter Vault & Digital Gallery']
            },
            {
                phase: 'PHASE 03 • Q4 2026',
                title: 'Character Rigging & Dynamic Lip-Sync',
                status: 'upcoming',
                desc: 'Building production-ready 2D/3D character rigs, facial expression libraries, and combat choreography.',
                deliverables: ['Original Character Turnaround Sheets', '2D & 3D Rigging Pipeline', 'Voice & Lip-Sync Acting Reel']
            },
            {
                phase: 'PHASE 04 • 2027+',
                title: '3D Cinematography & Flagship Short Film',
                status: 'upcoming',
                desc: 'Scaling into stylized 3D environments, shader lighting, and releasing an original animated short film.',
                deliverables: ['Stylized 3D Environment Showcase', 'Original Animated Short Film Release', 'Open Commission & Studio Pipeline']
            }
        ],
        streamSchedule: [
            { day: 'NOV 18, 2026 • 7:00 PM', isoDate: '2026-11-18', time: '19:00', activity: '2D Animation & Keyframing Lab', isLiveDay: true },
            { day: 'NOV 20, 2026 • 8:00 PM', isoDate: '2026-11-20', time: '20:00', activity: 'Digital Illustration & OC Design', isLiveDay: false },
            { day: 'NOV 22, 2026 • 9:00 PM', isoDate: '2026-11-22', time: '21:00', activity: 'Chill Gaming & Community Q&A', isLiveDay: false },
            { day: 'NOV 24, 2026 • 3:00 PM', isoDate: '2026-11-24', time: '15:00', activity: '3D Modeling & Portfolio Dev', isLiveDay: false }
        ],
        games: ['Valorant', 'Genshin Impact', 'Wuthering Waves', 'League of Legends', 'Minecraft'],
        hobbies: ['2D Frame-by-Frame Animation', 'Character Concept Art', '3D Environment Modeling', 'Lo-Fi Music Mixing', 'UI/UX Web Design'],
        supporters: [
            { name: 'Ariane', amount: 500, message: 'Keep going! Your art is amazing!' },
            { name: 'James', amount: 350, message: 'Keep up the BSEMC-DAT grind!' },
            { name: 'Kael', amount: 250, message: 'Love the aesthetic!' },
            { name: 'Mika', amount: 200, message: 'Excited for your 2D animatic!' },
            { name: 'Renz', amount: 180, message: 'BukSU pride! Keep animating!' },
            { name: 'Sora', amount: 150, message: 'Clean portfolio and motion work!' },
            { name: 'Liam', amount: 120, message: 'Supporting your 3D journey!' },
            { name: 'Chloe', amount: 100, message: 'Love the live art streams!' },
            { name: 'Dante', amount: 75, message: 'Keep pushing frames!' },
            { name: 'Yuna', amount: 50, message: 'Rooting for Criyxen!' }
        ],
        galleryDefaults: [
            {
                id: 'default_art_1',
                title: 'Criyxen Persona',
                caption: 'Official digital character avatar and crimson-obsidian portrait.',
                img: profileAvatarPath,
                access: 'public',
                views: 428
            },
            {
                id: 'default_art_2',
                title: 'Dreamscape Keyframe',
                caption: '2D animation lighting and atmosphere concept frame.',
                img: profileAvatarPath,
                access: 'public',
                views: 315
            },
            {
                id: 'default_art_3',
                title: 'Neon Divide Concept',
                caption: 'Character silhouette and crimson energy study.',
                img: profileAvatarPath,
                access: 'public',
                views: 264
            }
        ]
    };

    const loadJSON = (key, fallback) => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch {
            return fallback;
        }
    };
    const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    const escapeHTML = (str) => String(str).replace(/[&<>"']/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[tag]));

    let siteConfig = { ...DEFAULTS.siteConfig, ...loadJSON('criyxen_site_config', {}) };
    if (siteConfig.calendlyUrl === 'https://calendly.com/criyxen') {
        siteConfig.calendlyUrl = DEFAULTS.siteConfig.calendlyUrl;
        saveJSON('criyxen_site_config', siteConfig);
    }

    let checklistData = loadJSON('criyxen_checklist', DEFAULTS.checklist);
    let roadmapData = loadJSON('criyxen_roadmap', DEFAULTS.roadmap);
    let streamSchedule = loadJSON('criyxen_stream_schedule', DEFAULTS.streamSchedule);
    let gamesList = loadJSON('criyxen_games', DEFAULTS.games);
    let hobbiesList = loadJSON('criyxen_hobbies', DEFAULTS.hobbies);
    let supportersData = loadJSON('criyxen_supporters', DEFAULTS.supporters);

    // Ensure Top 10 Leaderboard is populated if older storage only had the initial 3 defaults
    if (!localStorage.getItem('criyxen_top10_seeded')) {
        const existingNames = new Set(supportersData.map(s => s.name.trim().toLowerCase()));
        DEFAULTS.supporters.forEach(defSup => {
            if (!existingNames.has(defSup.name.trim().toLowerCase()) && supportersData.length < 10) {
                supportersData.push(defSup);
                existingNames.add(defSup.name.trim().toLowerCase());
            }
        });
        saveJSON('criyxen_supporters', supportersData);
        localStorage.setItem('criyxen_top10_seeded', 'true');
    }

    let registeredMembers = loadJSON('criyxen_members_db', []);
    let activeMember = loadJSON('criyxen_active_member', null);
    let customProjects = loadJSON('criyxen_custom_projects', []);
    let galleryItems = loadJSON('criyxen_gallery_items', DEFAULTS.galleryDefaults);

    if (activeMember && userRole === 'member') {
        const freshRecord = registeredMembers.find(m => m.username.toLowerCase() === activeMember.username.toLowerCase());
        if (freshRecord && (freshRecord.status === 'banned' || freshRecord.status === 'deactivated')) {
            alert(`Your account (${freshRecord.username}) is ${freshRecord.status.toUpperCase()}.`);
            localStorage.removeItem('criyxen_active_member');
            localStorage.removeItem('user_role');
            (window.top || window).location.replace(loginPath);
            return;
        }
    }

    function applySiteConfigToDOM() {
        document.querySelectorAll('[data-cfg]').forEach(el => {
            const key = el.getAttribute('data-cfg');
            if (siteConfig[key] !== undefined) el.textContent = siteConfig[key];
        });
        const calendlyLink = document.getElementById('calendly-booking-link');
        if (calendlyLink && siteConfig.calendlyUrl) {
            calendlyLink.href = siteConfig.calendlyUrl;
        }
    }
    applySiteConfigToDOM();

    // ------------------------------------------------------------------
    // 2. SUPPORTER & LEVEL RANKING HELPERS
    // ------------------------------------------------------------------
    const hasDonated = (username) => Boolean(username && supportersData.some(s => s.name.trim().toLowerCase() === username.trim().toLowerCase()));
    const calculateLevel = (xp) => Math.max(1, Math.floor((xp || 0) / 100) + 1);

    function getTop3DonorRank(username) {
        if (!username) return null;
        const clean = username.trim().toLowerCase();
        const totals = {};
        supportersData.forEach(s => {
            const k = s.name.trim().toLowerCase();
            totals[k] = (totals[k] || 0) + (Number(s.amount) || 0);
        });
        const idx = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 3).map(e => e[0]).indexOf(clean);
        return idx !== -1 ? idx + 1 : null;
    }

    function getTop3LevelRank(username) {
        if (!username || !registeredMembers.length) return null;
        const clean = username.trim().toLowerCase();
        const idx = [...registeredMembers]
            .filter(m => (m.status || 'active') === 'active' && (m.xp || 0) > 0)
            .sort((a, b) => (b.xp || 0) - (a.xp || 0))
            .slice(0, 3)
            .map(m => m.username.trim().toLowerCase())
            .indexOf(clean);
        return idx !== -1 ? idx + 1 : null;
    }

    function buildSpecialRankBadgesHTML(username, isAdmin) {
        if (isAdmin) return '';
        let badges = '';
        const donorRank = getTop3DonorRank(username);
        if (donorRank === 1) badges += `<span class="chat-badge badge-top-donor-1">#1 TOP DONOR</span>`;
        else if (donorRank === 2) badges += `<span class="chat-badge badge-top-donor-2">#2 TOP DONOR</span>`;
        else if (donorRank === 3) badges += `<span class="chat-badge badge-top-donor-3">#3 TOP DONOR</span>`;
        else if (hasDonated(username)) badges += `<span class="chat-badge badge-donor">SUPPORTER</span>`;

        const lvlRank = getTop3LevelRank(username);
        if (lvlRank === 1) badges += `<span class="chat-badge badge-top-lvl-1">#1 TOP LVL</span>`;
        else if (lvlRank === 2) badges += `<span class="chat-badge badge-top-lvl-2">#2 TOP LVL</span>`;
        else if (lvlRank === 3) badges += `<span class="chat-badge badge-top-lvl-3">#3 TOP LVL</span>`;
        return badges;
    }

    function canAccessTier(requiredTier) {
        const tier = requiredTier || 'public';
        if (userRole === 'admin' || tier === 'public') return true;
        if (activeMember) {
            if (tier === 'member') return true;
            if (tier === 'supporter') return hasDonated(activeMember.username);
        }
        return false;
    }

    const mobileNavBtn = document.getElementById('mobile-nav-toggle');
    const mainNavEl = document.querySelector('header nav');
    if (mobileNavBtn && mainNavEl) {
        mobileNavBtn.addEventListener('click', () => mainNavEl.classList.toggle('nav-open'));
    }

    // ------------------------------------------------------------------
    // 3. UNIFIED SPLIT-SCREEN LOGIN GATE (index.html)
    // ------------------------------------------------------------------
    const errorMsg = document.getElementById('error-message');
    const showGateError = (msg) => {
        if (!errorMsg) return;
        errorMsg.textContent = msg;
        errorMsg.style.display = 'block';
    };
    const isReservedName = (name) => ['criyxen', 'michaelebin', 'michaelebinjr', 'admin', 'moderator'].includes(name.toLowerCase().replace(/[^a-z0-9]/g, ''));

    const unifiedLoginForm = document.getElementById('unified-login-form');
    const unifiedSignupForm = document.getElementById('unified-signup-form');
    const authPanelHeading = document.getElementById('auth-panel-heading');
    const switchToSignupText = document.getElementById('switch-to-signup-text');
    const switchToLoginText = document.getElementById('switch-to-login-text');

    document.getElementById('show-signup-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (errorMsg) errorMsg.style.display = 'none';
        unifiedLoginForm.style.display = 'none';
        unifiedSignupForm.style.display = 'block';
        authPanelHeading.textContent = 'Sign Up';
        switchToSignupText.style.display = 'none';
        switchToLoginText.style.display = 'block';
    });

    document.getElementById('show-login-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (errorMsg) errorMsg.style.display = 'none';
        unifiedSignupForm.style.display = 'none';
        unifiedLoginForm.style.display = 'block';
        authPanelHeading.textContent = 'Login';
        switchToLoginText.style.display = 'none';
        switchToSignupText.style.display = 'block';
    });

    document.getElementById('forgot-pass-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        showGateError('Contact Criyxen via Live Chat or michaelebin20@gmail.com to reset your member password.');
    });

    unifiedLoginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('unified-user').value.trim();
        const password = document.getElementById('unified-pass').value.trim();

        if (username === 'Criyxen' && password === 'Admin1234') {
            localStorage.removeItem('criyxen_active_member');
            localStorage.setItem('user_role', 'admin');
            localStorage.setItem('username', 'Michael Ebin Jr');
            localStorage.setItem('admin_is_online', 'true');
            sessionStorage.setItem('criyxen_autoplay_music', 'true');
            window.location.href = homePath;
            return;
        }

        const found = registeredMembers.find(
            m => m.username.toLowerCase() === username.toLowerCase() && m.password === password
        );
        if (!found) {
            return showGateError('Invalid username or password.');
        }
        if (found.status === 'banned') {
            return showGateError('This account has been BANNED.');
        }
        if (found.status === 'deactivated') {
            return showGateError('This account is DEACTIVATED.');
        }

        saveJSON('criyxen_active_member', found);
        localStorage.setItem('user_role', 'member');
        localStorage.setItem('username', found.username);
        sessionStorage.setItem('criyxen_autoplay_music', 'true');
        window.location.href = homePath;
    });

    unifiedSignupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('gate-reg-user').value.trim();
        const email = document.getElementById('gate-reg-email').value.trim();
        const password = document.getElementById('gate-reg-pass').value.trim();

        if (isReservedName(username)) {
            return showGateError('"Criyxen" is reserved for the creator.');
        }
        if (registeredMembers.some(m => m.username.toLowerCase() === username.toLowerCase())) {
            return showGateError('Username already exists.');
        }

        const newMem = { username, email, password, provider: 'Member', xp: 0, status: 'active' };
        registeredMembers.push(newMem);
        saveJSON('criyxen_members_db', registeredMembers);
        saveJSON('criyxen_active_member', newMem);
        localStorage.setItem('user_role', 'member');
        localStorage.setItem('username', username);
        sessionStorage.setItem('criyxen_autoplay_music', 'true');
        window.location.href = homePath;
    });

    document.getElementById('guest-btn')?.addEventListener('click', () => {
        localStorage.removeItem('criyxen_active_member');
        localStorage.setItem('user_role', 'guest');
        localStorage.setItem('username', 'Guest Viewer');
        sessionStorage.setItem('criyxen_autoplay_music', 'true');
        window.location.href = homePath;
    });

    // ------------------------------------------------------------------
    // 4. VISITOR LOG COUNTER, LIVE CLOCK, AVATAR & ADMIN ACCESS CONTROLS
    // ------------------------------------------------------------------
    const counterElement = document.getElementById('counter');
    let visitorLogs = loadJSON('criyxen_visitor_logs', []);

    function logPortfolioVisit(roleOverride, nameOverride, pageLabel) {
        let visits = parseInt(localStorage.getItem('site_visits') || '1248', 10);
        visits++;
        localStorage.setItem('site_visits', visits);

        const activeRole = roleOverride || localStorage.getItem('user_role') || 'guest';
        const activeName = nameOverride ||
            (activeMember ? activeMember.username : (localStorage.getItem('username') || 'Guest Viewer'));

        const now = new Date();
        visitorLogs.unshift({
            visitor: activeName,
            role: activeRole.toUpperCase(),
            page: pageLabel || currentPage,
            date: now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        });

        if (visitorLogs.length > 200) visitorLogs.length = 200;
        saveJSON('criyxen_visitor_logs', visitorLogs);
        return visits;
    }

    if (inPagesFolder) {
        const updatedVisits = logPortfolioVisit(userRole, null, currentPage);
        if (counterElement) {
            counterElement.innerText = String(updatedVisits).padStart(6, '0');
            counterElement.style.cursor = 'pointer';
            counterElement.title = 'Click to view recent Visitors log';

            const logDrawer = document.createElement('div');
            logDrawer.id = 'visitor-log-drawer';
            logDrawer.style.cssText = 'display:none; margin-top:10px; max-height:175px; overflow-y:auto; background:var(--bg-surface); border:1px solid var(--purple-border); border-radius:6px; padding:8px; text-align:left; font-size:0.72rem;';
            counterElement.parentElement.appendChild(logDrawer);

            const renderMiniVisitorLog = () => {
                logDrawer.innerHTML = `<div style="font-family:'Orbitron'; font-size:0.62rem; color:var(--purple-bright); margin-bottom:6px; display:flex; justify-content:space-between;"><span>RECENT VISITORS LOG</span><span>${visitorLogs.length} LOGGED</span></div>` +
                    visitorLogs.slice(0, 25).map(v => `
                        <div style="padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.06); display:flex; justify-content:space-between; gap:6px;">
                            <span><strong style="color:${v.role === 'ADMIN' ? 'var(--red-bright)' : v.role === 'MEMBER' ? 'var(--purple-bright)' : 'var(--text-main)'};">${escapeHTML(v.visitor)}</strong> <span style="font-size:0.62rem; color:var(--text-muted);">(${escapeHTML(v.role)})</span></span>
                            <span style="color:var(--text-muted); font-size:0.64rem; white-space:nowrap;">${v.time}</span>
                        </div>
                    `).join('');
            };
            renderMiniVisitorLog();

            counterElement.addEventListener('click', () => {
                renderMiniVisitorLog();
                logDrawer.style.display = logDrawer.style.display === 'none' ? 'block' : 'none';
            });
        }
    }

    const deviceClockEl = document.getElementById('device-live-clock');
    if (deviceClockEl) {
        const tick = () => {
            const now = new Date();
            deviceClockEl.textContent = `${now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} • ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
        };
        tick();
        setInterval(tick, 1000);
    }

    const savedAvatarSrc = localStorage.getItem(`criyxen_avatar_src_${avatarScope}`);
    const savedTransform = loadJSON(`criyxen_avatar_transform_${avatarScope}`, { zoom: 1, x: 0, y: 0 });
    document.querySelectorAll('.profile-avatar').forEach(img => {
        img.src = savedAvatarSrc || defaultPageAvatar;
        img.style.transform = `scale(${savedTransform.zoom}) translate(${savedTransform.x}px, ${savedTransform.y}px)`;
    });

    const authBtn = document.getElementById('auth-btn');
    const adminPanel = document.getElementById('admin-control-panel');
    const onlineStatusBadge = document.getElementById('online-status-badge');
    const avatarEditTriggers = document.querySelectorAll('.avatar-edit-trigger');
    const adminOnlyElements = document.querySelectorAll('.admin-only');

    if (onlineStatusBadge) {
        onlineStatusBadge.style.display = localStorage.getItem('admin_is_online') === 'true' ? 'inline-block' : 'none';
    }

    if (authBtn) {
        if (userRole === 'admin') {
            authBtn.textContent = 'Sign Out';
            if (adminPanel) adminPanel.style.display = 'block';
            avatarEditTriggers.forEach(btn => btn.style.display = 'flex');
            adminOnlyElements.forEach(el => el.style.display = 'block');

            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Sign out of Admin Mode?')) {
                    localStorage.removeItem('user_role');
                    localStorage.removeItem('username');
                    localStorage.setItem('admin_is_online', 'false');
                    sessionStorage.removeItem('criyxen_autoplay_music');
                    (window.top || window).location.href = loginPath;
                }
            });
        } else {
            authBtn.textContent = 'Switch Role';
            if (adminPanel) adminPanel.style.display = 'none';
            avatarEditTriggers.forEach(btn => btn.style.display = 'none');
            adminOnlyElements.forEach(el => el.style.display = 'none');

            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user_role');
                localStorage.removeItem('criyxen_active_member');
                sessionStorage.removeItem('criyxen_autoplay_music');
                (window.top || window).location.href = loginPath;
            });
        }
    }

    // ------------------------------------------------------------------
    // 5. CHECKLIST, PROFESSIONAL ROADMAP, STREAM SCHEDULE, GAMES & TOP 10 LEADERBOARD
    // ------------------------------------------------------------------
    function renderChecklistAndRoadmap() {
        const checklistContainer = document.getElementById('checklist-container');
        const checklistPctEl = document.getElementById('checklist-pct');
        if (checklistContainer) {
            checklistContainer.innerHTML = '';
            let doneCount = 0;
            checklistData.forEach(item => {
                if (item.done) doneCount++;
                const row = document.createElement('div');
                row.className = 'checklist-item';
                row.innerHTML = `<span class="check-dot ${item.done ? 'done' : ''}"></span><span>${escapeHTML(item.label)}</span>`;
                checklistContainer.appendChild(row);
            });
            if (checklistPctEl) {
                const pct = checklistData.length ? Math.round((doneCount / checklistData.length) * 100) : 0;
                checklistPctEl.textContent = `${pct}%`;
            }
        }

        const proRoadmapEl = document.getElementById('pro-roadmap-timeline');
        if (proRoadmapEl) {
            proRoadmapEl.innerHTML = '';

            // On Home page, show ONLY the current roadmap phase being worked on
            let phasesToRender = roadmapData;
            if (currentPage === 'home.html') {
                const activePhases = roadmapData.filter(s => s.status === 'in-progress' || s.status === 'active');
                phasesToRender = activePhases.length ? activePhases : roadmapData.slice(0, 1);
            }

            phasesToRender.forEach((step) => {
                const status = step.status || 'upcoming';
                const statusLabel = status === 'completed' ? 'COMPLETED' : status === 'in-progress' ? 'IN PROGRESS' : 'UPCOMING';
                const deliverablesHTML = (step.deliverables || []).map(d => `<li>${escapeHTML(d)}</li>`).join('');
                const card = document.createElement('div');
                card.className = `pro-phase-card phase-${status}`;
                card.innerHTML = `
                    <div class="pro-phase-node"></div>
                    <div class="pro-phase-header">
                        <span class="phase-tag">${escapeHTML(step.phase || 'PHASE')}</span>
                        <span class="phase-status-pill status-${status}">${statusLabel}</span>
                    </div>
                    <h3 style="color:#fff; font-size:1.02rem; margin-bottom:6px;">${escapeHTML(step.title)}</h3>
                    <p style="font-size:0.84rem; color:var(--text-muted);">${escapeHTML(step.desc || '')}</p>
                    ${deliverablesHTML ? `<ul class="pro-deliverables-list">${deliverablesHTML}</ul>` : ''}
                `;
                proRoadmapEl.appendChild(card);
            });
        }
    }
    renderChecklistAndRoadmap();

    function renderProfileInterests() {
        const gamesContainer = document.getElementById('profile-games-list');
        if (gamesContainer) {
            gamesContainer.innerHTML = '';
            gamesList.forEach(game => {
                const span = document.createElement('span');
                span.className = 'interest-pill';
                span.innerHTML = `<i class="fas fa-gamepad"></i> ${escapeHTML(game)}`;
                gamesContainer.appendChild(span);
            });
        }

        const hobbiesContainer = document.getElementById('profile-hobbies-list');
        if (hobbiesContainer) {
            hobbiesContainer.innerHTML = '';
            hobbiesList.forEach(hobby => {
                const span = document.createElement('span');
                span.className = 'interest-pill';
                span.innerHTML = `<i class="fas fa-star"></i> ${escapeHTML(hobby)}`;
                hobbiesContainer.appendChild(span);
            });
        }
    }
    renderProfileInterests();

    function renderStreamScheduleAndLeaderboard() {
        const schedEl = document.getElementById('streaming-schedule-list');
        if (schedEl) {
            schedEl.innerHTML = '';
            streamSchedule.forEach(slot => {
                const div = document.createElement('div');
                div.className = `schedule-slot ${slot.isLiveDay ? 'live-day' : ''}`;
                div.innerHTML = `
                    <div class="schedule-day">
                        <span>${escapeHTML(slot.day)}</span>
                        ${slot.isLiveDay ? '<span>● NEXT LIVE</span>' : ''}
                    </div>
                    <div style="color:var(--text-main); margin-top:2px;">${escapeHTML(slot.activity)}</div>
                `;
                schedEl.appendChild(div);
            });
        }

        // Aggregate total donations per supporter (case-insensitive) for Top 10 ranking
        const donorTotalsMap = new Map();
        supportersData.forEach(entry => {
            const rawName = (entry.name || 'Anonymous').trim();
            const key = rawName.toLowerCase();
            const amt = Number(entry.amount) || 0;
            if (donorTotalsMap.has(key)) {
                donorTotalsMap.get(key).amount += amt;
            } else {
                donorTotalsMap.set(key, { name: rawName, amount: amt });
            }
        });

        const sortedDonors = Array.from(donorTotalsMap.values())
            .sort((a, b) => b.amount - a.amount);

        const sidebarLeaderboard = document.getElementById('supporter-leaderboard');
        if (sidebarLeaderboard) {
            sidebarLeaderboard.innerHTML = '';
            sortedDonors.slice(0, 10).forEach((donor, index) => {
                const rankClass = index < 3 ? `rank-${index + 1}` : '';
                const li = document.createElement('li');
                li.className = `leaderboard-item ${rankClass}`;
                li.innerHTML = `
                    <span><span class="rank-badge">#${index + 1}</span>${escapeHTML(donor.name)}</span>
                    <span class="donor-amount-tag">₱${Number(donor.amount).toLocaleString()}</span>
                `;
                sidebarLeaderboard.appendChild(li);
            });
        }
    }
    renderStreamScheduleAndLeaderboard();

    const donationModal = document.getElementById('donation-modal');
    const donorNameInput = document.getElementById('donor-name');
    if (donorNameInput && activeMember) donorNameInput.value = activeMember.username;

    document.getElementById('open-donate-modal-btn')?.addEventListener('click', () => {
        if (donationModal) donationModal.style.display = 'flex';
    });
    document.getElementById('close-donate-modal')?.addEventListener('click', () => {
        if (donationModal) donationModal.style.display = 'none';
    });
    donationModal?.addEventListener('click', (e) => {
        if (e.target === donationModal) donationModal.style.display = 'none';
    });

    document.getElementById('donation-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const donorName = document.getElementById('donor-name').value.trim();
        const amount = parseInt(document.getElementById('donation-amount').value.trim(), 10);
        const donorMsg = document.getElementById('donor-message').value.trim() || `Supporting ${siteConfig.brandTitle}!`;

        if (donorName && amount >= 10) {
            supportersData.push({ name: donorName, amount, message: donorMsg });
            saveJSON('criyxen_supporters', supportersData);
            alert(`Thank you, ${donorName}! Your ₱${amount} support has been recorded.`);
            e.target.reset();
            if (donationModal) donationModal.style.display = 'none';
            renderStreamScheduleAndLeaderboard();
        }
    });

    document.getElementById('visitor-message-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`Message sent to ${siteConfig.creatorName} (${siteConfig.contactEmail})!`);
        e.target.reset();
    });

    // ------------------------------------------------------------------
    // 6. LIGHTBOX, PROJECTS & EDITORIAL GALLERY VAULT
    // ------------------------------------------------------------------
    const lightbox = document.getElementById('asset-lightbox');
    const lbImg = document.getElementById('lb-img');
    const lbMediaWrap = document.getElementById('lb-media-wrap');
    const lbTitle = document.getElementById('lb-title');
    const lbDesc = document.getElementById('lb-desc');
    const lbTierBadge = document.getElementById('lb-tier-badge');
    const lbDownloadBtn = document.getElementById('lb-download-btn');
    const lbWatermark = document.getElementById('lb-watermark');

    function openAssetLightbox({ id, title, desc, imgSrc, tier, downloadable }) {
        if (!lightbox) return;
        if (!canAccessTier(tier)) {
            return alert(`Restricted Content: Only ${tier === 'supporter' ? 'Supporters' : 'Registered Members'} can view this resource.`);
        }

        if (id) {
            const artIdx = galleryItems.findIndex(g => g.id === id);
            if (artIdx !== -1) {
                galleryItems[artIdx].views = (galleryItems[artIdx].views || 0) + 1;
                saveJSON('criyxen_gallery_items', galleryItems);
                renderGalleryContainers();
            }
        }

        lbTitle.textContent = title;
        lbDesc.textContent = desc;
        if (imgSrc) {
            lbMediaWrap.style.display = 'flex';
            lbImg.src = imgSrc;
        } else {
            lbMediaWrap.style.display = 'none';
            lbImg.src = '';
        }
        const viewerTag = activeMember ? activeMember.username : (userRole === 'admin' ? 'ADMIN' : 'GUEST');
        if (lbWatermark) lbWatermark.textContent = `${siteConfig.brandTitle} • ${viewerTag.toUpperCase()}`;
        lbTierBadge.className = `access-tier-pill tier-${tier}`;
        lbTierBadge.textContent = tier === 'supporter' ? 'SUPPORTERS ONLY' : tier === 'member' ? 'MEMBERS ONLY' : 'PUBLIC';

        if (downloadable && imgSrc && canAccessTier(tier)) {
            lbDownloadBtn.style.display = 'inline-flex';
            lbDownloadBtn.href = imgSrc;
            lbDownloadBtn.setAttribute('download', `${title.replace(/\s+/g, '_')}.png`);
        } else {
            lbDownloadBtn.style.display = 'none';
        }
        lightbox.style.display = 'flex';
    }

    const closeAssetLightbox = () => {
        if (lightbox) {
            lightbox.style.display = 'none';
            if (lbImg) lbImg.src = '';
        }
    };
    document.getElementById('lb-close-btn')?.addEventListener('click', closeAssetLightbox);
    document.getElementById('lb-close-btn-2')?.addEventListener('click', closeAssetLightbox);
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeAssetLightbox(); });

    const getTierLabelHTML = (tier) => {
        if (tier === 'supporter') return `<span class="access-tier-pill tier-supporter">SUPPORTERS</span>`;
        if (tier === 'member') return `<span class="access-tier-pill tier-member">MEMBERS</span>`;
        return `<span class="access-tier-pill tier-public">PUBLIC</span>`;
    };

    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        customProjects.forEach(proj => {
            const tier = proj.access || 'public';
            const card = document.createElement('div');
            if (!canAccessTier(tier)) {
                card.className = 'locked-vault-card';
                card.innerHTML = `${getTierLabelHTML(tier)}<strong>Locked Project</strong><span style="font-size:0.74rem; color:var(--text-muted);">${tier === 'supporter' ? 'Supporter access required.' : 'Register as Member to unlock.'}</span>`;
            } else {
                card.className = 'project-thumb';
                card.innerHTML = `${getTierLabelHTML(tier)}<strong>${escapeHTML(proj.title)}</strong><span style="font-size:0.72rem; color:var(--text-muted);">${escapeHTML(proj.category)}</span>`;
                card.addEventListener('click', () => openAssetLightbox({ title: proj.title, desc: proj.desc, imgSrc: proj.img || '', tier, downloadable: Boolean(proj.img) }));
            }
            projectsGrid.appendChild(card);
        });
    }

    document.querySelectorAll('.project-thumb[data-desc]').forEach(proj => {
        proj.addEventListener('click', () => openAssetLightbox({
            title: proj.getAttribute('data-title'),
            desc: proj.getAttribute('data-desc'),
            imgSrc: '',
            tier: 'public',
            downloadable: false
        }));
    });

    document.getElementById('add-project-btn')?.addEventListener('click', () => {
        if (userRole !== 'admin') return;
        const title = prompt('Project Title:');
        if (!title) return;
        const category = prompt('Category Badge (e.g. 2D ANIMATION, 3D, WEB):', 'ANIMATION') || 'ANIMATION';
        const desc = prompt('Project Description:') || `Created by ${siteConfig.creatorName}`;
        const tierInput = (prompt('Access Level (public, member, supporter):', 'public') || 'public').toLowerCase();
        const access = ['public', 'member', 'supporter'].includes(tierInput) ? tierInput : 'public';
        customProjects.push({ title, category: category.toUpperCase(), desc, access });
        saveJSON('criyxen_custom_projects', customProjects);
        location.reload();
    });

    let activeGalleryTierFilter = 'all';
    let activeGallerySearchQuery = '';
    let heroCarouselIndex = 0;

    function buildEditorialTileElement(item) {
        const tier = item.access || 'public';
        const card = document.createElement('div');

        if (!canAccessTier(tier)) {
            card.className = 'editorial-tile tile-locked';
            card.innerHTML = `
                ${getTierLabelHTML(tier)}
                <i class="fas fa-lock" style="font-size:1.4rem; color:var(--red-bright);"></i>
                <h3 class="editorial-tile-title" style="font-size:0.88rem;">LOCKED ARCHIVE</h3>
                <p style="font-size:0.74rem; color:var(--text-muted);">${tier === 'supporter' ? 'Available to Supporters.' : 'Available to Registered Members.'}</p>
            `;
            return card;
        }

        const imgSrc = item.img || profileAvatarPath;
        card.className = 'editorial-tile';
        card.innerHTML = `
            <img src="${imgSrc}" alt="${escapeHTML(item.title)}" class="protected-asset">
            <div class="editorial-tile-gradient"></div>
            <div class="editorial-tile-top">
                ${getTierLabelHTML(tier)}
                <span class="views-pill"><i class="fas fa-eye"></i> ${(item.views || 0).toLocaleString()}</span>
            </div>
            <div class="editorial-tile-overlay">
                <span class="editorial-tile-kicker">${escapeHTML(item.caption)}</span>
                <h3 class="editorial-tile-title">${escapeHTML(item.title)}</h3>
                <span class="editorial-tile-year">2026</span>
            </div>
        `;
        card.addEventListener('click', () => openAssetLightbox({
            id: item.id,
            title: item.title,
            desc: item.caption,
            imgSrc,
            tier,
            downloadable: true
        }));
        return card;
    }

    function updateEditorialHeroShowcase() {
        const heroBg = document.getElementById('editorial-hero-bg');
        if (!heroBg) return;
        const unlockedItems = galleryItems.filter(g => canAccessTier(g.access || 'public'));
        if (!unlockedItems.length) return;

        heroCarouselIndex = ((heroCarouselIndex % unlockedItems.length) + unlockedItems.length) % unlockedItems.length;
        const featured = unlockedItems[heroCarouselIndex];
        heroBg.src = featured.img || profileAvatarPath;

        const subEl = document.getElementById('editorial-hero-sub');
        const descEl = document.getElementById('editorial-hero-desc');
        if (subEl) subEl.textContent = featured.title.toUpperCase().split('').join(' ');
        if (descEl) descEl.textContent = featured.caption;
    }

    document.getElementById('gal-hero-prev')?.addEventListener('click', () => {
        heroCarouselIndex--;
        updateEditorialHeroShowcase();
    });
    document.getElementById('gal-hero-next')?.addEventListener('click', () => {
        heroCarouselIndex++;
        updateEditorialHeroShowcase();
    });

    document.querySelectorAll('#gal-tier-filters .rail-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#gal-tier-filters .rail-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeGalleryTierFilter = btn.getAttribute('data-tier') || 'all';
            renderGalleryContainers();
        });
    });

    document.getElementById('gal-search-input')?.addEventListener('input', (e) => {
        activeGallerySearchQuery = e.target.value.trim().toLowerCase();
        renderGalleryContainers();
    });

    function renderGalleryContainers() {
        const fullGalleryGrid = document.getElementById('gallery-grid');
        if (fullGalleryGrid) {
            fullGalleryGrid.innerHTML = '';
            const filtered = galleryItems.filter(item => {
                const tier = item.access || 'public';
                const matchesTier = activeGalleryTierFilter === 'all' || tier === activeGalleryTierFilter;
                const matchesSearch = !activeGallerySearchQuery ||
                    item.title.toLowerCase().includes(activeGallerySearchQuery) ||
                    item.caption.toLowerCase().includes(activeGallerySearchQuery);
                return matchesTier && matchesSearch;
            });

            if (!filtered.length) {
                fullGalleryGrid.innerHTML = '<p style="color:var(--text-muted); font-size:0.84rem; grid-column:1/-1;">No artworks match your filter.</p>';
            } else {
                filtered.forEach(item => fullGalleryGrid.appendChild(buildEditorialTileElement(item)));
            }
            updateEditorialHeroShowcase();
        }

        const homePopularGallery = document.getElementById('home-popular-gallery');
        if (homePopularGallery) {
            homePopularGallery.innerHTML = '';
            const popularSorted = [...galleryItems]
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, 3);
            popularSorted.forEach(item => homePopularGallery.appendChild(buildEditorialTileElement(item)));
        }
    }
    renderGalleryContainers();

    document.getElementById('upload-gallery-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (userRole !== 'admin') return;
        const file = document.getElementById('gal-file').files[0];
        const title = document.getElementById('gal-title').value.trim();
        const caption = document.getElementById('gal-caption').value.trim();
        const access = document.getElementById('gal-access')?.value || 'public';
        if (file && title) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                galleryItems.unshift({
                    id: `art_${Date.now()}`,
                    img: ev.target.result,
                    title,
                    caption,
                    access,
                    views: 1
                });
                saveJSON('criyxen_gallery_items', galleryItems);
                location.reload();
            };
            reader.readAsDataURL(file);
        }
    });

    // ------------------------------------------------------------------
    // 7. PER-PAGE AVATAR CROPPER, INLINE EDITING & PERSISTENT MUSIC PLAYER
    // ------------------------------------------------------------------
    const avatarModal = document.getElementById('avatar-modal');
    if (avatarEditTriggers.length > 0 && avatarModal && userRole === 'admin') {
        const cropPreviewImg = document.getElementById('crop-preview-img');
        const zoomSlider = document.getElementById('zoom-slider');
        const posXSlider = document.getElementById('pos-x-slider');
        const posYSlider = document.getElementById('pos-y-slider');
        let tempAvatarDataUrl = savedAvatarSrc || defaultPageAvatar;

        avatarEditTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                cropPreviewImg.src = savedAvatarSrc || defaultPageAvatar;
                zoomSlider.value = savedTransform.zoom;
                posXSlider.value = savedTransform.x;
                posYSlider.value = savedTransform.y;
                cropPreviewImg.style.transform = `scale(${savedTransform.zoom}) translate(${savedTransform.x}px, ${savedTransform.y}px)`;
                avatarModal.style.display = 'flex';
            });
        });

        document.getElementById('avatar-file-input')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    tempAvatarDataUrl = ev.target.result;
                    cropPreviewImg.src = tempAvatarDataUrl;
                };
                reader.readAsDataURL(file);
            }
        });

        const updatePreview = () => {
            cropPreviewImg.style.transform = `scale(${zoomSlider.value}) translate(${posXSlider.value}px, ${posYSlider.value}px)`;
        };
        [zoomSlider, posXSlider, posYSlider].forEach(s => s?.addEventListener('input', updatePreview));

        document.getElementById('save-avatar-btn')?.addEventListener('click', () => {
            const t = { zoom: parseFloat(zoomSlider.value), x: parseInt(posXSlider.value, 10), y: parseInt(posYSlider.value, 10) };
            localStorage.setItem(`criyxen_avatar_src_${avatarScope}`, tempAvatarDataUrl);
            saveJSON(`criyxen_avatar_transform_${avatarScope}`, t);
            document.querySelectorAll('.profile-avatar').forEach(img => {
                img.src = tempAvatarDataUrl;
                img.style.transform = `scale(${t.zoom}) translate(${t.x}px, ${t.y}px)`;
            });
            avatarModal.style.display = 'none';
        });

        document.getElementById('close-avatar-modal')?.addEventListener('click', () => avatarModal.style.display = 'none');
    }

    const editableFields = document.querySelectorAll('.editable-field');
    editableFields.forEach((field, idx) => {
        const savedText = localStorage.getItem(`criyxen_edit_${currentPage}_${idx}`);
        if (savedText) field.innerHTML = savedText;
    });

    const editToggleBtn = document.getElementById('edit-content-btn');
    if (editToggleBtn && userRole === 'admin') {
        let isEditing = false;
        editToggleBtn.addEventListener('click', () => {
            isEditing = !isEditing;
            editableFields.forEach((field, idx) => {
                field.setAttribute('contenteditable', isEditing);
                field.classList.toggle('editable-active', isEditing);
                if (!isEditing) {
                    localStorage.setItem(`criyxen_edit_${currentPage}_${idx}`, field.innerHTML);
                    const cfgKey = field.getAttribute('data-cfg');
                    if (cfgKey) {
                        siteConfig[cfgKey] = field.textContent.trim();
                        saveJSON('criyxen_site_config', siteConfig);
                    }
                }
            });
            editToggleBtn.textContent = isEditing ? 'Save Edits' : 'Enable Live Editing';
        });
    }

    // Music Folder Player (../Music/)
    const isInsidePersistentFrame = window.self !== window.top;

    if (inPagesFolder && isInsidePersistentFrame) {
        const childHeader = document.querySelector('header');
        if (childHeader) childHeader.style.display = 'none';
        try {
            window.top.postMessage({ type: 'criyxen_page_loaded', page: currentPage, title: document.title }, '*');
        } catch {}
    } else if (inPagesFolder && !isInsidePersistentFrame) {
        const audioElem = document.getElementById('bg-audio');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const skipBtn = document.getElementById('skip-btn');
        const trackDisplay = document.getElementById('track-name');

        const musicBasePath = '../Music/';
        const musicFiles = [
            'instrumental-drift-phonk-145-bpm-dark.mp3',
            'REDLINE DRIFT - REDLINE DRIFT - Treblo.mp3',
            'REDLINE DRIFT - Track 1 - Treblo.mp3',
            'REDLINE DRIFT - Track 2 - Treblo.mp3'
        ];

        const playlist = musicFiles.map(file => ({
            name: file.replace(/\.[^/.]+$/, ''),
            src: `${musicBasePath}${encodeURIComponent(file)}`
        }));

        let trackIdx = 0;

        function loadTrack(index, autoPlay = false) {
            if (!audioElem || !playlist.length) return;
            trackIdx = (index + playlist.length) % playlist.length;
            audioElem.src = playlist[trackIdx].src;
            audioElem.load();
            sessionStorage.setItem('criyxen_track_idx', String(trackIdx));
            if (trackDisplay) {
                trackDisplay.textContent = playlist[trackIdx].name;
                trackDisplay.title = playlist[trackIdx].name;
            }
            if (autoPlay) {
                audioElem.play()
                    .then(() => {
                        sessionStorage.setItem('criyxen_autoplay_music', 'true');
                        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    })
                    .catch(err => console.warn('Audio playback blocked or file missing:', err));
            }
        }

        if (audioElem && playlist.length > 0) {
            const savedTrack = parseInt(sessionStorage.getItem('criyxen_track_idx') || '0', 10);
            const savedTime = parseFloat(sessionStorage.getItem('criyxen_track_time') || '0');
            const userPaused = sessionStorage.getItem('criyxen_autoplay_music') === 'false';

            loadTrack(savedTrack, false);

            audioElem.addEventListener('loadedmetadata', () => {
                if (savedTime > 0 && savedTime < audioElem.duration) {
                    audioElem.currentTime = savedTime;
                }
            }, { once: true });

            audioElem.addEventListener('timeupdate', () => {
                sessionStorage.setItem('criyxen_track_idx', String(trackIdx));
                sessionStorage.setItem('criyxen_track_time', String(audioElem.currentTime));
            });

            audioElem.addEventListener('ended', () => {
                sessionStorage.setItem('criyxen_track_time', '0');
                loadTrack(trackIdx + 1, true);
            });

            if (!userPaused) {
                audioElem.play()
                    .then(() => {
                        sessionStorage.setItem('criyxen_autoplay_music', 'true');
                        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    })
                    .catch(() => {
                        const unlockOnFirstInteraction = () => {
                            if (sessionStorage.getItem('criyxen_autoplay_music') === 'false') return;
                            audioElem.play().then(() => {
                                sessionStorage.setItem('criyxen_autoplay_music', 'true');
                                if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            }).catch(() => {});
                            document.removeEventListener('pointerdown', unlockOnFirstInteraction);
                            document.removeEventListener('keydown', unlockOnFirstInteraction);
                        };
                        document.addEventListener('pointerdown', unlockOnFirstInteraction, { once: true });
                        document.addEventListener('keydown', unlockOnFirstInteraction, { once: true });
                    });
            } else if (playPauseBtn) {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }

        playPauseBtn?.addEventListener('click', () => {
            if (!audioElem) return;
            if (!audioElem.src) loadTrack(0, false);

            if (audioElem.paused) {
                audioElem.play()
                    .then(() => {
                        sessionStorage.setItem('criyxen_autoplay_music', 'true');
                        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    })
                    .catch(err => console.warn('Audio playback error:', err));
            } else {
                audioElem.pause();
                sessionStorage.setItem('criyxen_autoplay_music', 'false');
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        skipBtn?.addEventListener('click', () => {
            sessionStorage.setItem('criyxen_track_time', '0');
            loadTrack(trackIdx + 1, true);
        });

        let pageFrame = null;

        const updateActiveNavHighlight = (targetFile) => {
            document.querySelectorAll('header nav a').forEach(a => {
                const hrefFile = (a.getAttribute('href') || '').split('/').pop().split('?')[0];
                a.classList.toggle('active', hrefFile === targetFile);
            });
        };

        const openPageInShell = (url) => {
            const targetFile = url.split('/').pop().split('?')[0];
            if (!pageFrame) {
                const headerEl = document.querySelector('header');
                const headerH = headerEl ? headerEl.offsetHeight : 64;
                document.querySelectorAll('main, footer, .container').forEach(el => el.remove());

                pageFrame = document.createElement('iframe');
                pageFrame.id = 'criyxen-page-frame';
                pageFrame.style.cssText = `width:100%; height:calc(100vh - ${headerH}px); border:none; display:block; background:transparent;`;
                document.body.style.overflow = 'hidden';
                document.body.appendChild(pageFrame);
            }
            pageFrame.src = url;
            updateActiveNavHighlight(targetFile);
            mainNavEl?.classList.remove('nav-open');
            try {
                history.pushState({ url }, '', url);
            } catch {}
        };

        window.addEventListener('message', (ev) => {
            if (ev.data?.type === 'criyxen_page_loaded') {
                if (ev.data.title) document.title = ev.data.title;
                if (ev.data.page) updateActiveNavHighlight(ev.data.page);
            }
        });

        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            if (link.id === 'auth-btn' || link.target === '_blank' || link.hasAttribute('download')) return;

            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.includes('index.html')) return;

            e.preventDefault();
            openPageInShell(link.href);
        });

        window.addEventListener('popstate', () => {
            if (pageFrame) {
                openPageInShell(window.location.href);
            }
        });
    }

    // ------------------------------------------------------------------
    // 8. GLOBAL MODERATED POP-UP LIVE CHAT
    // ------------------------------------------------------------------
    if (inPagesFolder && !isInsidePersistentFrame && !document.getElementById('chat-toggle-btn')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="chat-widget-container">
                <button id="chat-toggle-btn" class="chat-toggle-btn">LIVE CHAT</button>
                <div id="chat-popup-box" class="chat-popup-box">
                    <div class="chat-popup-header">
                        <span style="font-family:'Orbitron'; font-size:0.78rem; color:var(--red-bright);">LIVE COMMUNITY CHAT</span>
                        <button id="chat-close-btn" class="chat-close-btn" aria-label="Close Chat">&times;</button>
                    </div>
                    <div class="chat-identity-bar">
                        <div style="display:flex; align-items:center; gap:4px; flex-wrap:wrap;">
                            <strong id="chat-current-user">Guest</strong>
                            <span id="chat-lvl-badge" class="chat-badge badge-lvl" style="display:none;">LVL 1</span>
                            <span id="chat-role-badge" class="chat-badge badge-member" style="display:none;">MEMBER</span>
                            <span id="chat-special-ranks" style="display:inline-flex; gap:4px; flex-wrap:wrap;"></span>
                        </div>
                        <button id="open-connect-btn" class="btn-neon btn-sm" style="padding:2px 8px; font-size:0.62rem;">Join / Connect</button>
                    </div>
                    <div id="chat-connect-drawer" class="chat-connect-drawer">
                        <div class="drawer-tabs">
                            <button type="button" id="tab-register-btn" class="drawer-tab active">Register</button>
                            <button type="button" id="tab-login-btn" class="drawer-tab">Sign In</button>
                            <button type="button" id="tab-social-btn" class="drawer-tab">Social</button>
                        </div>
                        <div id="panel-register" class="mini-form">
                            <input type="text" id="reg-username" placeholder="Choose unique username">
                            <input type="email" id="reg-email" placeholder="Email address">
                            <input type="password" id="reg-password" placeholder="Create password">
                            <button type="button" id="submit-register-btn" class="btn-neon btn-sm">Create Account</button>
                        </div>
                        <div id="panel-login" class="mini-form" style="display:none;">
                            <input type="text" id="mem-login-user" placeholder="Registered username">
                            <input type="password" id="mem-login-pass" placeholder="Password">
                            <button type="button" id="submit-mem-login-btn" class="btn-neon btn-crimson btn-sm">Sign In</button>
                        </div>
                        <div id="panel-social" class="mini-form" style="display:none;">
                            <select id="connect-provider" class="chat-select">
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                                <option value="TikTok">TikTok</option>
                                <option value="Discord">Discord</option>
                            </select>
                            <input type="text" id="connect-handle" placeholder="Social handle (@username)">
                            <input type="text" id="connect-custom-name" placeholder="Display username">
                            <button type="button" id="save-connect-btn" class="btn-neon btn-sm">Link Social</button>
                        </div>
                        <div id="connect-error" style="color:#fda4af; font-size:0.7rem; margin-top:6px; display:none;"></div>
                        <div style="display:flex; justify-content:space-between; margin-top:8px;">
                            <button type="button" id="member-logout-btn" class="btn-neon btn-crimson btn-sm" style="display:none;">Log Out</button>
                            <button type="button" id="cancel-connect-btn" class="btn-neon btn-sm" style="margin-left:auto;">Close</button>
                        </div>
                    </div>
                    <div class="chat-messages" id="chat-messages"></div>
                    <div id="chat-mod-warning" class="chat-mod-warning"></div>
                    <form class="chat-input-area" id="chat-send-form">
                        <input type="text" id="chat-msg-input" placeholder="Write a message..." maxlength="220" autocomplete="off">
                        <button type="submit" class="btn-neon btn-crimson btn-sm">Send</button>
                    </form>
                </div>
            </div>
        `);
    }

    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatPopupBox = document.getElementById('chat-popup-box');
    const chatMessagesEl = document.getElementById('chat-messages');

    let guestNumber = parseInt(localStorage.getItem('criyxen_guest_counter') || '0', 10);
    let sessionGuestName = sessionStorage.getItem('criyxen_session_guest_name');
    if (!sessionGuestName) {
        guestNumber++;
        localStorage.setItem('criyxen_guest_counter', guestNumber);
        sessionGuestName = `Guest${guestNumber}`;
        sessionStorage.setItem('criyxen_session_guest_name', sessionGuestName);
    }

    function addMemberXP(points) {
        if (!activeMember || userRole === 'admin') return;
        activeMember.xp = (activeMember.xp || 0) + points;
        saveJSON('criyxen_active_member', activeMember);
        const idx = registeredMembers.findIndex(m => m.username.toLowerCase() === activeMember.username.toLowerCase());
        if (idx !== -1) {
            registeredMembers[idx].xp = activeMember.xp;
            saveJSON('criyxen_members_db', registeredMembers);
        }
        updateChatIdentityUI();
        renderChatMessages();
    }
    setInterval(() => { if (activeMember && userRole !== 'admin') addMemberXP(10); }, 15000);

    function getActiveChatIdentity() {
        if (userRole === 'admin') return { name: siteConfig.brandTitle, role: 'admin', level: null, isDonor: false };
        if (activeMember) {
            return {
                name: activeMember.username,
                role: 'member',
                level: calculateLevel(activeMember.xp),
                provider: activeMember.provider || 'Member',
                isDonor: hasDonated(activeMember.username)
            };
        }
        return { name: sessionGuestName, role: 'guest', level: null, isDonor: hasDonated(sessionGuestName) };
    }

    function updateChatIdentityUI() {
        const userEl = document.getElementById('chat-current-user');
        if (!userEl) return;
        const id = getActiveChatIdentity();
        const lvlBadge = document.getElementById('chat-lvl-badge');
        const roleBadge = document.getElementById('chat-role-badge');
        const ranksEl = document.getElementById('chat-special-ranks');
        const openBtn = document.getElementById('open-connect-btn');
        const logoutBtn = document.getElementById('member-logout-btn');

        userEl.textContent = id.name;
        if (id.role === 'admin') {
            userEl.style.color = 'var(--red-bright)';
            lvlBadge.style.display = 'none';
            roleBadge.style.display = 'inline-block';
            roleBadge.className = 'chat-badge badge-admin';
            roleBadge.textContent = 'CREATOR';
            ranksEl.innerHTML = '';
            openBtn.style.display = 'none';
        } else if (id.role === 'member') {
            userEl.style.color = id.isDonor ? 'var(--rank-gold)' : 'var(--purple-bright)';
            lvlBadge.style.display = 'inline-block';
            lvlBadge.textContent = `LVL ${id.level}`;
            roleBadge.style.display = 'inline-block';
            roleBadge.className = 'chat-badge badge-member';
            roleBadge.textContent = id.provider === 'Member' ? 'MEMBER' : id.provider.toUpperCase();
            ranksEl.innerHTML = buildSpecialRankBadgesHTML(id.name, false);
            openBtn.textContent = 'Account';
            logoutBtn.style.display = 'inline-block';
        } else {
            userEl.style.color = 'var(--text-main)';
            lvlBadge.style.display = 'none';
            roleBadge.style.display = 'none';
            ranksEl.innerHTML = buildSpecialRankBadgesHTML(id.name, false);
            openBtn.textContent = 'Join / Connect';
            logoutBtn.style.display = 'none';
        }
    }

    let chatHistory = loadJSON('criyxen_chat_history', [
        { sender: 'Criyxen', role: 'admin', level: null, provider: 'CREATOR', isDonor: false, text: 'Welcome to Criyxen! Top 3 Donors & Top 3 Highest Level members earn special badges.', date: new Date().toISOString().slice(0, 10), time: '12:00 AM' }
    ]);

    function renderChatMessages() {
        if (!chatMessagesEl) return;
        chatMessagesEl.innerHTML = '';
        chatHistory.forEach(msg => {
            const bubble = document.createElement('div');
            const isAdmin = msg.role === 'admin';
            const donorLive = msg.isDonor || hasDonated(msg.sender);
            bubble.className = `chat-msg-bubble ${isAdmin ? 'admin-user' : donorLive ? 'donor-user' : msg.role === 'member' ? 'connected-user' : ''}`;
            const memberRecord = registeredMembers.find(m => m.username.toLowerCase() === msg.sender.toLowerCase());
            const liveLevel = memberRecord ? calculateLevel(memberRecord.xp) : msg.level;
            const lvlBadge = (msg.role === 'member' && liveLevel) ? `<span class="chat-badge badge-lvl">LVL ${liveLevel}</span>` : '';
            const roleBadge = isAdmin ? `<span class="chat-badge badge-admin">CREATOR</span>` : msg.role === 'member' ? `<span class="chat-badge badge-member">${escapeHTML(msg.provider || 'MEMBER')}</span>` : '';
            const nameColor = isAdmin ? 'var(--red-bright)' : donorLive ? 'var(--rank-gold)' : msg.role === 'member' ? 'var(--purple-bright)' : 'var(--text-main)';

            bubble.innerHTML = `
                <div class="chat-msg-meta">
                    <span style="color:${nameColor};">${escapeHTML(msg.sender)}</span>
                    ${lvlBadge}${roleBadge}${buildSpecialRankBadgesHTML(msg.sender, isAdmin)}
                    <span class="chat-msg-time">${msg.time}</span>
                </div>
                <div style="color:var(--text-main); word-break:break-word;">${escapeHTML(msg.text)}</div>
            `;
            chatMessagesEl.appendChild(bubble);
        });
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
    }

    if (chatToggleBtn && chatPopupBox) {
        updateChatIdentityUI();
        renderChatMessages();

        if (sessionStorage.getItem('criyxen_chat_open') === 'true') {
            chatPopupBox.style.display = 'flex';
            chatToggleBtn.style.display = 'none';
        }
        chatToggleBtn.addEventListener('click', () => {
            chatPopupBox.style.display = 'flex';
            chatToggleBtn.style.display = 'none';
            sessionStorage.setItem('criyxen_chat_open', 'true');
            renderChatMessages();
        });
        document.getElementById('chat-close-btn')?.addEventListener('click', () => {
            chatPopupBox.style.display = 'none';
            chatToggleBtn.style.display = 'inline-flex';
            sessionStorage.setItem('criyxen_chat_open', 'false');
        });

        const drawer = document.getElementById('chat-connect-drawer');
        document.getElementById('open-connect-btn')?.addEventListener('click', () => drawer.style.display = drawer.style.display === 'block' ? 'none' : 'block');
        document.getElementById('cancel-connect-btn')?.addEventListener('click', () => drawer.style.display = 'none');

        const switchDrawer = (tab) => {
            ['register', 'login', 'social'].forEach(t => {
                document.getElementById(`tab-${t}-btn`).classList.toggle('active', t === tab);
                document.getElementById(`panel-${t}`).style.display = t === tab ? 'flex' : 'none';
            });
            document.getElementById('connect-error').style.display = 'none';
        };
        document.getElementById('tab-register-btn')?.addEventListener('click', () => switchDrawer('register'));
        document.getElementById('tab-login-btn')?.addEventListener('click', () => switchDrawer('login'));
        document.getElementById('tab-social-btn')?.addEventListener('click', () => switchDrawer('social'));

        const showChatErr = (m) => {
            const el = document.getElementById('connect-error');
            el.textContent = m;
            el.style.display = 'block';
        };

        document.getElementById('submit-register-btn')?.addEventListener('click', () => {
            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value.trim();
            if (!username || !email || !password) return showChatErr('Fill in all fields.');
            if (isReservedName(username)) return showChatErr('"Criyxen" is locked.');
            if (registeredMembers.some(m => m.username.toLowerCase() === username.toLowerCase())) return showChatErr('Username taken.');
            const m = { username, email, password, provider: 'Member', xp: 0, status: 'active' };
            registeredMembers.push(m);
            saveJSON('criyxen_members_db', registeredMembers);
            saveJSON('criyxen_active_member', m);
            localStorage.setItem('user_role', 'member');
            location.reload();
        });

        document.getElementById('submit-mem-login-btn')?.addEventListener('click', () => {
            const username = document.getElementById('mem-login-user').value.trim();
            const password = document.getElementById('mem-login-pass').value.trim();
            const found = registeredMembers.find(m => m.username.toLowerCase() === username.toLowerCase() && m.password === password);
            if (!found) return showChatErr('Invalid credentials.');
            if (found.status !== 'active') return showChatErr(`Account is ${found.status}.`);
            saveJSON('criyxen_active_member', found);
            localStorage.setItem('user_role', 'member');
            location.reload();
        });

        document.getElementById('save-connect-btn')?.addEventListener('click', () => {
            const provider = document.getElementById('connect-provider').value;
            const handle = document.getElementById('connect-handle').value.trim();
            const customName = document.getElementById('connect-custom-name').value.trim();
            if (!handle || !customName) return showChatErr('Enter handle and display name.');
            if (isReservedName(customName)) return showChatErr('"Criyxen" is locked.');
            let existing = registeredMembers.find(m => m.username.toLowerCase() === customName.toLowerCase());
            if (!existing) {
                existing = { username: customName, handle, provider, xp: 0, status: 'active' };
                registeredMembers.push(existing);
                saveJSON('criyxen_members_db', registeredMembers);
            }
            saveJSON('criyxen_active_member', existing);
            localStorage.setItem('user_role', 'member');
            location.reload();
        });

        document.getElementById('member-logout-btn')?.addEventListener('click', () => {
            localStorage.removeItem('criyxen_active_member');
            localStorage.setItem('user_role', 'guest');
            location.reload();
        });
    }

    const blockedWords = ['fuck', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'pussy', 'slut', 'whore', 'porn', 'xxx', 'nude', 'nsfw', 'nigger', 'nigga', 'faggot', 'retard', 'chink', 'spic', 'kike', 'wetback'];
    let lastMsg = '';
    let lastTime = 0;

    document.getElementById('chat-send-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-msg-input');
        const warn = document.getElementById('chat-mod-warning');
        const text = input.value.trim();
        if (!text) return;

        let err = null;
        if (/(https?:\/\/|www\.|[a-zA-Z0-9-]+\.(com|net|org|io|gg|xyz|ph|tv|me|co|info|biz|link)(\/|\b))/i.test(text)) err = 'Links and URLs are not allowed.';
        else if (blockedWords.some(w => new RegExp(`\\b${w}\\b`, 'i').test(text))) err = 'Explicit or racist language is prohibited.';
        else if (Date.now() - lastTime < 3000 && userRole !== 'admin') err = 'Wait 3 seconds between messages.';
        else if (text.toLowerCase() === lastMsg.toLowerCase() && userRole !== 'admin') err = 'Do not spam duplicate messages.';

        if (err) {
            warn.textContent = err;
            warn.style.display = 'block';
            setTimeout(() => warn.style.display = 'none', 3500);
            return;
        }

        if (activeMember && userRole !== 'admin') addMemberXP(25);
        const id = getActiveChatIdentity();
        const now = new Date();
        chatHistory.push({
            sender: id.name,
            role: id.role,
            level: id.level,
            provider: id.provider || '',
            isDonor: id.isDonor,
            text,
            date: now.toISOString().slice(0, 10),
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        lastMsg = text;
        lastTime = Date.now();
        saveJSON('criyxen_chat_history', chatHistory);
        input.value = '';
        updateChatIdentityUI();
        renderChatMessages();
    });

    // ------------------------------------------------------------------
    // 9. FULL PORTFOLIO MANAGER (pages/manager.html)
    // ------------------------------------------------------------------
    const managerRoot = document.getElementById('manager-root');
    if (managerRoot && userRole === 'admin') {

        const cfgFields = ['brandTitle', 'creatorName', 'courseSubtitle', 'heroHeading', 'heroTagline', 'statusText', 'dailyUpdateSub', 'dailyUpdateBody', 'contactEmail', 'calendlyUrl', 'footerText'];
        cfgFields.forEach(key => {
            const el = document.getElementById(`cfg-${key}`);
            if (el) el.value = siteConfig[key] || '';
        });

        const onlineToggle = document.getElementById('cfg-online-status');
        if (onlineToggle) onlineToggle.value = localStorage.getItem('admin_is_online') === 'true' ? 'true' : 'false';

        document.getElementById('save-site-config-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            cfgFields.forEach(key => {
                const el = document.getElementById(`cfg-${key}`);
                if (el) siteConfig[key] = el.value.trim();
            });
            saveJSON('criyxen_site_config', siteConfig);
            if (onlineToggle) localStorage.setItem('admin_is_online', onlineToggle.value);
            applySiteConfigToDOM();
            alert('Site identity, profile, Calendly & status updated across all pages!');
        });

        document.getElementById('mgr-add-game-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = document.getElementById('mgr-game-input').value.trim();
            if (!val) return;
            gamesList.push(val);
            saveJSON('criyxen_games', gamesList);
            document.getElementById('mgr-game-input').value = '';
            renderManager();
        });

        document.getElementById('mgr-add-hobby-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = document.getElementById('mgr-hobby-input').value.trim();
            if (!val) return;
            hobbiesList.push(val);
            saveJSON('criyxen_hobbies', hobbiesList);
            document.getElementById('mgr-hobby-input').value = '';
            renderManager();
        });

        document.getElementById('mgr-add-check-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const label = document.getElementById('mgr-check-label').value.trim();
            if (!label) return;
            checklistData.push({ label, done: false });
            saveJSON('criyxen_checklist', checklistData);
            document.getElementById('mgr-check-label').value = '';
            renderManager();
        });

        document.getElementById('mgr-add-rm-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const phase = document.getElementById('mgr-rm-phase').value.trim().toUpperCase() || 'PHASE';
            const title = document.getElementById('mgr-rm-title').value.trim();
            const status = document.getElementById('mgr-rm-status').value;
            const desc = document.getElementById('mgr-rm-desc').value.trim();
            const delivRaw = document.getElementById('mgr-rm-deliv').value.trim();
            const deliverables = delivRaw ? delivRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
            if (!title) return;
            roadmapData.push({ phase, title, status, desc, deliverables });
            saveJSON('criyxen_roadmap', roadmapData);
            e.target.reset();
            renderManager();
        });

        // --- Interactive Streaming Schedule Calendar Controller ---
        const schedDateInput = document.getElementById('mgr-sched-date');
        const schedTimeInput = document.getElementById('mgr-sched-time');
        const calGridEl = document.getElementById('sched-cal-grid');
        const calMonthLabel = document.getElementById('cal-month-label');
        const schedListHeading = document.getElementById('mgr-sched-list-heading');

        const toISODateLocal = (d) => {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        };

        const formatScheduleDisplay = (isoDate, time24) => {
            const [y, m, d] = isoDate.split('-').map(Number);
            const dateObj = new Date(y, m - 1, d);
            const datePart = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
            if (!time24) return datePart;
            const [hh, mm] = time24.split(':').map(Number);
            const ampm = hh >= 12 ? 'PM' : 'AM';
            const h12 = hh % 12 || 12;
            return `${datePart} • ${h12}:${String(mm).padStart(2, '0')} ${ampm}`;
        };

        let calViewDate = new Date();
        let selectedCalDate = toISODateLocal(new Date());
        let filterBySelectedDate = false;

        if (schedDateInput) schedDateInput.value = selectedCalDate;

        function renderScheduleCalendar() {
            if (!calGridEl || !calMonthLabel) return;
            const year = calViewDate.getFullYear();
            const month = calViewDate.getMonth();
            calMonthLabel.textContent = calViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

            const firstDayOfWeek = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const todayISO = toISODateLocal(new Date());

            calGridEl.innerHTML = '';

            for (let i = 0; i < firstDayOfWeek; i++) {
                const empty = document.createElement('div');
                empty.className = 'sched-cal-empty';
                calGridEl.appendChild(empty);
            }

            for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
                const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                const hasEvent = streamSchedule.some(s => s.isoDate === iso);
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'sched-cal-day';
                if (iso === todayISO) btn.classList.add('is-today');
                if (iso === selectedCalDate) btn.classList.add('is-selected');
                if (hasEvent) btn.classList.add('has-event');
                btn.textContent = dayNum;

                btn.addEventListener('click', () => {
                    selectedCalDate = iso;
                    filterBySelectedDate = true;
                    if (schedDateInput) schedDateInput.value = iso;
                    renderScheduleCalendar();
                    renderManager();
                });

                calGridEl.appendChild(btn);
            }
        }

        document.getElementById('cal-prev-month')?.addEventListener('click', () => {
            calViewDate = new Date(calViewDate.getFullYear(), calViewDate.getMonth() - 1, 1);
            renderScheduleCalendar();
        });

        document.getElementById('cal-next-month')?.addEventListener('click', () => {
            calViewDate = new Date(calViewDate.getFullYear(), calViewDate.getMonth() + 1, 1);
            renderScheduleCalendar();
        });

        document.getElementById('cal-show-all-btn')?.addEventListener('click', () => {
            filterBySelectedDate = false;
            renderManager();
        });

        schedDateInput?.addEventListener('change', (e) => {
            if (!e.target.value) return;
            selectedCalDate = e.target.value;
            const [y, m] = selectedCalDate.split('-').map(Number);
            calViewDate = new Date(y, m - 1, 1);
            filterBySelectedDate = true;
            renderScheduleCalendar();
            renderManager();
        });

        document.getElementById('mgr-add-sched-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const isoDate = schedDateInput?.value;
            const timeVal = schedTimeInput?.value;
            const activity = document.getElementById('mgr-sched-act').value.trim();
            if (!isoDate || !timeVal || !activity) return;

            const dayLabel = formatScheduleDisplay(isoDate, timeVal);
            streamSchedule.push({
                day: dayLabel,
                isoDate,
                time: timeVal,
                activity,
                isLiveDay: streamSchedule.length === 0
            });
            streamSchedule.sort((a, b) => {
                const keyA = `${a.isoDate || '9999-99-99'}T${a.time || '00:00'}`;
                const keyB = `${b.isoDate || '9999-99-99'}T${b.time || '00:00'}`;
                return keyA.localeCompare(keyB);
            });
            saveJSON('criyxen_stream_schedule', streamSchedule);
            document.getElementById('mgr-sched-act').value = '';
            renderScheduleCalendar();
            renderManager();
        });

        document.getElementById('mgr-add-sup-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('mgr-sup-name').value.trim();
            const amount = parseInt(document.getElementById('mgr-sup-amt').value, 10);
            const message = document.getElementById('mgr-sup-msg').value.trim() || `Supporting ${siteConfig.brandTitle}!`;
            if (!name || isNaN(amount) || amount <= 0) return;
            supportersData.push({ name, amount, message });
            saveJSON('criyxen_supporters', supportersData);
            e.target.reset();
            renderManager();
        });

        document.getElementById('mgr-add-proj-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('mgr-proj-title').value.trim();
            const category = document.getElementById('mgr-proj-cat').value.trim().toUpperCase() || 'ANIMATION';
            const desc = document.getElementById('mgr-proj-desc').value.trim();
            const access = document.getElementById('mgr-proj-tier').value;
            if (!title) return;
            customProjects.push({ title, category, desc, access });
            saveJSON('criyxen_custom_projects', customProjects);
            e.target.reset();
            renderManager();
        });

        document.getElementById('mgr-add-gal-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const file = document.getElementById('mgr-gal-file').files[0];
            const title = document.getElementById('mgr-gal-title').value.trim();
            const caption = document.getElementById('mgr-gal-caption').value.trim();
            const access = document.getElementById('mgr-gal-tier').value;
            if (!file || !title) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                galleryItems.unshift({ id: `art_${Date.now()}`, img: ev.target.result, title, caption, access, views: 1 });
                saveJSON('criyxen_gallery_items', galleryItems);
                e.target.reset();
                renderManager();
            };
            reader.readAsDataURL(file);
        });

        const chatFilterUser = document.getElementById('filter-chat-user');
        const chatFilterRole = document.getElementById('filter-chat-role');
        const chatFilterDate = document.getElementById('filter-chat-date');
        const chatFilterKeyword = document.getElementById('filter-chat-keyword');

        function renderChatModerationTable() {
            const tbody = document.getElementById('backend-chat-tbody');
            if (!tbody) return;
            const uQ = (chatFilterUser?.value || '').trim().toLowerCase();
            const rQ = chatFilterRole?.value || 'all';
            const dQ = chatFilterDate?.value || '';
            const kQ = (chatFilterKeyword?.value || '').trim().toLowerCase();

            tbody.innerHTML = '';
            let matches = 0;
            chatHistory.forEach((msg, idx) => {
                const effRole = msg.role === 'admin' ? 'admin' : (msg.isDonor || hasDonated(msg.sender)) ? 'supporter' : msg.role;
                if (uQ && !msg.sender.toLowerCase().includes(uQ)) return;
                if (rQ !== 'all' && effRole !== rQ) return;
                if (dQ && (msg.date || '') !== dQ) return;
                if (kQ && !msg.text.toLowerCase().includes(kQ)) return;
                matches++;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${escapeHTML(msg.sender)}</strong></td>
                    <td>${effRole.toUpperCase()}</td>
                    <td>${escapeHTML(msg.text)}</td>
                    <td>${msg.date || 'Today'} • ${msg.time}</td>
                    <td><button class="btn-danger-sm" data-del-chat="${idx}">Delete</button></td>
                `;
                tbody.appendChild(tr);
            });
            if (!matches) tbody.innerHTML = '<tr><td colspan="5">No chat messages match the filter.</td></tr>';
            tbody.querySelectorAll('[data-del-chat]').forEach(btn => {
                btn.addEventListener('click', () => {
                    chatHistory.splice(parseInt(btn.getAttribute('data-del-chat'), 10), 1);
                    saveJSON('criyxen_chat_history', chatHistory);
                    renderManager();
                });
            });
        }

        [chatFilterUser, chatFilterRole, chatFilterDate, chatFilterKeyword].forEach(el => {
            el?.addEventListener('input', renderChatModerationTable);
            el?.addEventListener('change', renderChatModerationTable);
        });
        document.getElementById('reset-chat-filters')?.addEventListener('click', () => {
            if (chatFilterUser) chatFilterUser.value = '';
            if (chatFilterRole) chatFilterRole.value = 'all';
            if (chatFilterDate) chatFilterDate.value = '';
            if (chatFilterKeyword) chatFilterKeyword.value = '';
            renderChatModerationTable();
        });

        function renderManager() {
            const visits = parseInt(localStorage.getItem('site_visits') || '1248', 10);
            const totalPhp = supportersData.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);
            document.getElementById('stat-visitors').textContent = visits.toLocaleString();
            document.getElementById('stat-donations').textContent = `₱${totalPhp.toLocaleString()}`;
            document.getElementById('stat-members').textContent = registeredMembers.length;
            document.getElementById('stat-chats').textContent = chatHistory.length;

            const gamesEl = document.getElementById('mgr-games-list');
            if (gamesEl) {
                gamesEl.innerHTML = '';
                gamesList.forEach((g, idx) => {
                    const row = document.createElement('div');
                    row.className = 'backend-list-row';
                    row.innerHTML = `<span>${escapeHTML(g)}</span><button class="btn-danger-sm" data-del-game="${idx}">Delete</button>`;
                    gamesEl.appendChild(row);
                });
                gamesEl.querySelectorAll('[data-del-game]').forEach(btn => btn.addEventListener('click', () => {
                    gamesList.splice(parseInt(btn.getAttribute('data-del-game'), 10), 1);
                    saveJSON('criyxen_games', gamesList);
                    renderManager();
                }));
            }

            const hobbiesEl = document.getElementById('mgr-hobbies-list');
            if (hobbiesEl) {
                hobbiesEl.innerHTML = '';
                hobbiesList.forEach((h, idx) => {
                    const row = document.createElement('div');
                    row.className = 'backend-list-row';
                    row.innerHTML = `<span>${escapeHTML(h)}</span><button class="btn-danger-sm" data-del-hobby="${idx}">Delete</button>`;
                    hobbiesEl.appendChild(row);
                });
                hobbiesEl.querySelectorAll('[data-del-hobby]').forEach(btn => btn.addEventListener('click', () => {
                    hobbiesList.splice(parseInt(btn.getAttribute('data-del-hobby'), 10), 1);
                    saveJSON('criyxen_hobbies', hobbiesList);
                    renderManager();
                }));
            }

            const chkList = document.getElementById('mgr-checklist-list');
            if (chkList) {
                chkList.innerHTML = '';
                checklistData.forEach((item, idx) => {
                    const row = document.createElement('div');
                    row.className = 'backend-list-row';
                    row.innerHTML = `
                        <span><strong style="color:${item.done ? 'var(--status-online)' : 'var(--text-muted)'};">[${item.done ? 'DONE' : 'PENDING'}]</strong> ${escapeHTML(item.label)}</span>
                        <div style="display:flex; gap:5px;">
                            <button class="btn-neon btn-sm" data-toggle-chk="${idx}">${item.done ? 'Pending' : 'Done'}</button>
                            <button class="btn-danger-sm" data-del-chk="${idx}">Delete</button>
                        </div>
                    `;
                    chkList.appendChild(row);
                });
                chkList.querySelectorAll('[data-toggle-chk]').forEach(btn => btn.addEventListener('click', () => {
                    const i = parseInt(btn.getAttribute('data-toggle-chk'), 10);
                    checklistData[i].done = !checklistData[i].done;
                    saveJSON('criyxen_checklist', checklistData);
                    renderManager();
                }));
                chkList.querySelectorAll('[data-del-chk]').forEach(btn => btn.addEventListener('click', () => {
                    checklistData.splice(parseInt(btn.getAttribute('data-del-chk'), 10), 1);
                    saveJSON('criyxen_checklist', checklistData);
                    renderManager();
                }));
            }

            const rmList = document.getElementById('mgr-roadmap-list');
            if (rmList) {
                rmList.innerHTML = '';
                roadmapData.forEach((step, idx) => {
                    const row = document.createElement('div');
                    row.className = 'backend-list-row';
                    row.innerHTML = `
                        <div>
                            <span class="phase-tag">${escapeHTML(step.phase || 'PHASE')}</span> • <strong>${escapeHTML(step.title)}</strong>
                            <div style="font-size:0.74rem; color:var(--text-muted);">${escapeHTML(step.desc || '')}</div>
                        </div>
                        <div style="display:flex; gap:5px; align-items:center;">
                            <select class="chat-select" style="padding:3px 6px; font-size:0.7rem; width:auto;" data-rm-status="${idx}">
                                <option value="completed" ${step.status === 'completed' ? 'selected' : ''}>Completed</option>
                                <option value="in-progress" ${step.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                <option value="upcoming" ${step.status === 'upcoming' ? 'selected' : ''}>Upcoming</option>
                            </select>
                            <button class="btn-danger-sm" data-del-rm="${idx}">Delete</button>
                        </div>
                    `;
                    rmList.appendChild(row);
                });
                rmList.querySelectorAll('[data-rm-status]').forEach(sel => sel.addEventListener('change', () => {
                    roadmapData[parseInt(sel.getAttribute('data-rm-status'), 10)].status = sel.value;
                    saveJSON('criyxen_roadmap', roadmapData);
                    renderManager();
                }));
                rmList.querySelectorAll('[data-del-rm]').forEach(btn => btn.addEventListener('click', () => {
                    roadmapData.splice(parseInt(btn.getAttribute('data-del-rm'), 10), 1);
                    saveJSON('criyxen_roadmap', roadmapData);
                    renderManager();
                }));
            }

            const schedList = document.getElementById('mgr-sched-list');
            if (schedList) {
                renderScheduleCalendar();
                schedList.innerHTML = '';
                const visibleSlots = streamSchedule
                    .map((slot, originalIdx) => ({ slot, originalIdx }))
                    .filter(({ slot }) => !filterBySelectedDate || slot.isoDate === selectedCalDate);

                if (schedListHeading) {
                    schedListHeading.textContent = filterBySelectedDate
                        ? `STREAMS ON ${formatScheduleDisplay(selectedCalDate, '')}`
                        : 'ALL SCHEDULED STREAMS';
                }

                if (!visibleSlots.length) {
                    schedList.innerHTML = `<p style="font-size:0.78rem; color:var(--text-muted);">${filterBySelectedDate ? 'No streams scheduled for this date yet. Use the form above to add one!' : 'No scheduled streams yet.'}</p>`;
                } else {
                    visibleSlots.forEach(({ slot, originalIdx }) => {
                        const row = document.createElement('div');
                        row.className = 'backend-list-row';
                        row.innerHTML = `
                            <div><strong>${escapeHTML(slot.day)}</strong> — ${escapeHTML(slot.activity)}</div>
                            <div style="display:flex; gap:5px;">
                                <button class="btn-warn-sm" data-live-sched="${originalIdx}">${slot.isLiveDay ? 'Next Live' : 'Set Next Live'}</button>
                                <button class="btn-danger-sm" data-del-sched="${originalIdx}">Delete</button>
                            </div>
                        `;
                        schedList.appendChild(row);
                    });
                }

                schedList.querySelectorAll('[data-live-sched]').forEach(btn => btn.addEventListener('click', () => {
                    const i = parseInt(btn.getAttribute('data-live-sched'), 10);
                    streamSchedule = streamSchedule.map((s, sIdx) => ({ ...s, isLiveDay: sIdx === i }));
                    saveJSON('criyxen_stream_schedule', streamSchedule);
                    renderManager();
                }));
                schedList.querySelectorAll('[data-del-sched]').forEach(btn => btn.addEventListener('click', () => {
                    streamSchedule.splice(parseInt(btn.getAttribute('data-del-sched'), 10), 1);
                    saveJSON('criyxen_stream_schedule', streamSchedule);
                    renderScheduleCalendar();
                    renderManager();
                }));
            }

            const projList = document.getElementById('backend-projects-list');
            if (projList) {
                projList.innerHTML = customProjects.length ? '' : '<p style="font-size:0.8rem; color:var(--text-muted);">No custom projects yet.</p>';
                customProjects.forEach((proj, idx) => {
                    const row = document.createElement('div');
                    row.className = 'backend-list-row';
                    row.innerHTML = `
                        <div><strong>${escapeHTML(proj.title)}</strong> <span class="proj-badge">${escapeHTML(proj.category)}</span></div>
                        <div style="display:flex; gap:6px; align-items:center;">
                            <select class="chat-select" style="padding:3px 6px; font-size:0.72rem; width:auto;" data-proj-tier="${idx}">
                                <option value="public" ${proj.access === 'public' ? 'selected' : ''}>Public</option>
                                <option value="member" ${proj.access === 'member' ? 'selected' : ''}>Members</option>
                                <option value="supporter" ${proj.access === 'supporter' ? 'selected' : ''}>Supporters</option>
                            </select>
                            <button class="btn-danger-sm" data-del-proj="${idx}">Delete</button>
                        </div>
                    `;
                    projList.appendChild(row);
                });
                projList.querySelectorAll('[data-proj-tier]').forEach(sel => sel.addEventListener('change', () => {
                    customProjects[parseInt(sel.getAttribute('data-proj-tier'), 10)].access = sel.value;
                    saveJSON('criyxen_custom_projects', customProjects);
                }));
                projList.querySelectorAll('[data-del-proj]').forEach(btn => btn.addEventListener('click', () => {
                    customProjects.splice(parseInt(btn.getAttribute('data-del-proj'), 10), 1);
                    saveJSON('criyxen_custom_projects', customProjects);
                    renderManager();
                }));
            }

            const galList = document.getElementById('backend-gallery-list');
            if (galList) {
                galList.innerHTML = '';
                galleryItems.forEach((art, idx) => {
                    const row = document.createElement('div');
                    row.className = 'backend-list-row';
                    row.innerHTML = `
                        <div style="display:flex; align-items:center; gap:10px;">
                            <img src="${art.img || profileAvatarPath}" alt="" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
                            <div><strong>${escapeHTML(art.title)}</strong><div style="font-size:0.72rem; color:var(--text-muted);">Views: ${art.views || 0}</div></div>
                        </div>
                        <div style="display:flex; gap:6px; align-items:center;">
                            <select class="chat-select" style="padding:3px 6px; font-size:0.72rem; width:auto;" data-gal-tier="${idx}">
                                <option value="public" ${art.access === 'public' ? 'selected' : ''}>Public</option>
                                <option value="member" ${art.access === 'member' ? 'selected' : ''}>Members</option>
                                <option value="supporter" ${art.access === 'supporter' ? 'selected' : ''}>Supporters</option>
                            </select>
                            <button class="btn-neon btn-sm" data-views-gal="${idx}">Set Views</button>
                            <button class="btn-danger-sm" data-del-gal="${idx}">Delete</button>
                        </div>
                    `;
                    galList.appendChild(row);
                });
                galList.querySelectorAll('[data-gal-tier]').forEach(sel => sel.addEventListener('change', () => {
                    galleryItems[parseInt(sel.getAttribute('data-gal-tier'), 10)].access = sel.value;
                    saveJSON('criyxen_gallery_items', galleryItems);
                }));
                galList.querySelectorAll('[data-views-gal]').forEach(btn => btn.addEventListener('click', () => {
                    const i = parseInt(btn.getAttribute('data-views-gal'), 10);
                    const v = parseInt(prompt('Set view count for popularity ranking:', galleryItems[i].views || 0), 10);
                    if (!isNaN(v) && v >= 0) {
                        galleryItems[i].views = v;
                        saveJSON('criyxen_gallery_items', galleryItems);
                        renderManager();
                    }
                }));
                galList.querySelectorAll('[data-del-gal]').forEach(btn => btn.addEventListener('click', () => {
                    galleryItems.splice(parseInt(btn.getAttribute('data-del-gal'), 10), 1);
                    saveJSON('criyxen_gallery_items', galleryItems);
                    renderManager();
                }));
            }

            const supTbody = document.getElementById('backend-supporters-tbody');
            if (supTbody) {
                supTbody.innerHTML = '';
                supportersData.forEach((sup, idx) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${escapeHTML(sup.name)}</strong></td>
                        <td style="color:#fda4af; font-weight:700;">₱${sup.amount}</td>
                        <td>${escapeHTML(sup.message)}</td>
                        <td style="display:flex; gap:6px;">
                            <button class="btn-neon btn-sm" data-edit-sup="${idx}">Edit</button>
                            <button class="btn-danger-sm" data-del-sup="${idx}">Delete</button>
                        </td>
                    `;
                    supTbody.appendChild(tr);
                });
                supTbody.querySelectorAll('[data-edit-sup]').forEach(btn => btn.addEventListener('click', () => {
                    const i = parseInt(btn.getAttribute('data-edit-sup'), 10);
                    const cur = supportersData[i];
                    const n = prompt('Edit Supporter Name:', cur.name);
                    if (!n) return;
                    const a = parseInt(prompt('Edit Amount (PHP):', cur.amount), 10);
                    const m = prompt('Edit Note:', cur.message);
                    supportersData[i] = { name: n.trim(), amount: !isNaN(a) ? a : cur.amount, message: m !== null ? m.trim() : cur.message };
                    saveJSON('criyxen_supporters', supportersData);
                    renderManager();
                }));
                supTbody.querySelectorAll('[data-del-sup]').forEach(btn => btn.addEventListener('click', () => {
                    supportersData.splice(parseInt(btn.getAttribute('data-del-sup'), 10), 1);
                    saveJSON('criyxen_supporters', supportersData);
                    renderManager();
                }));
            }

            const memTbody = document.getElementById('backend-members-tbody');
            if (memTbody) {
                memTbody.innerHTML = registeredMembers.length ? '' : '<tr><td colspan="5">No registered members yet.</td></tr>';
                registeredMembers.forEach((mem, idx) => {
                    const st = mem.status || 'active';
                    const badge = st === 'banned' ? `<span class="status-pill-banned">BANNED</span>` : st === 'deactivated' ? `<span class="status-pill-deactivated">DEACTIVATED</span>` : `<span class="status-pill-active">ACTIVE</span>`;
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td><strong>${escapeHTML(mem.username)}</strong></td>
                        <td>${escapeHTML(mem.email || mem.handle || mem.provider)}</td>
                        <td>${mem.xp || 0} XP (LVL ${calculateLevel(mem.xp)})</td>
                        <td>${badge}</td>
                        <td style="display:flex; gap:5px; flex-wrap:wrap;">
                            <button class="btn-neon btn-sm" data-edit-mem="${idx}">Edit</button>
                            <button class="btn-warn-sm" data-deact-mem="${idx}">${st === 'deactivated' ? 'Activate' : 'Deactivate'}</button>
                            <button class="btn-danger-sm" data-ban-mem="${idx}">${st === 'banned' ? 'Unban' : 'Ban'}</button>
                            <button class="btn-danger-sm" data-del-mem="${idx}">Remove</button>
                        </td>
                    `;
                    memTbody.appendChild(tr);
                });
                memTbody.querySelectorAll('[data-edit-mem]').forEach(btn => btn.addEventListener('click', () => {
                    const i = parseInt(btn.getAttribute('data-edit-mem'), 10);
                    const m = registeredMembers[i];
                    const u = prompt('Edit Username:', m.username);
                    if (!u) return;
                    const xp = parseInt(prompt('Edit XP Points:', m.xp || 0), 10);
                    registeredMembers[i].username = u.trim();
                    if (!isNaN(xp)) registeredMembers[i].xp = xp;
                    saveJSON('criyxen_members_db', registeredMembers);
                    renderManager();
                }));
                memTbody.querySelectorAll('[data-deact-mem]').forEach(btn => btn.addEventListener('click', () => {
                    const i = parseInt(btn.getAttribute('data-deact-mem'), 10);
                    registeredMembers[i].status = (registeredMembers[i].status || 'active') === 'deactivated' ? 'active' : 'deactivated';
                    saveJSON('criyxen_members_db', registeredMembers);
                    renderManager();
                }));
                memTbody.querySelectorAll('[data-ban-mem]').forEach(btn => btn.addEventListener('click', () => {
                    const i = parseInt(btn.getAttribute('data-ban-mem'), 10);
                    registeredMembers[i].status = (registeredMembers[i].status || 'active') === 'banned' ? 'active' : 'banned';
                    saveJSON('criyxen_members_db', registeredMembers);
                    renderManager();
                }));
                memTbody.querySelectorAll('[data-del-mem]').forEach(btn => btn.addEventListener('click', () => {
                    if (confirm('Permanently remove this member account?')) {
                        registeredMembers.splice(parseInt(btn.getAttribute('data-del-mem'), 10), 1);
                        saveJSON('criyxen_members_db', registeredMembers);
                        renderManager();
                    }
                }));
            }

            renderChatModerationTable();
        }

        renderManager();

        document.getElementById('clear-chat-btn')?.addEventListener('click', () => {
            if (confirm('Delete all chat messages?')) {
                chatHistory = [];
                saveJSON('criyxen_chat_history', chatHistory);
                renderManager();
            }
        });

        document.getElementById('reset-edits-btn')?.addEventListener('click', () => {
            if (confirm('Reset all site edits back to default?')) {
                Object.keys(localStorage).forEach(k => { if (k.startsWith('criyxen_edit_')) localStorage.removeItem(k); });
                localStorage.removeItem('criyxen_site_config');
                localStorage.removeItem('criyxen_checklist');
                localStorage.removeItem('criyxen_roadmap');
                localStorage.removeItem('criyxen_stream_schedule');
                localStorage.removeItem('criyxen_games');
                localStorage.removeItem('criyxen_hobbies');
                location.reload();
            }
        });

        document.getElementById('export-db-btn')?.addEventListener('click', () => {
            const blob = new Blob([JSON.stringify({
                exportedAt: new Date().toISOString(),
                siteConfig,
                checklistData,
                roadmapData,
                streamSchedule,
                gamesList,
                hobbiesList,
                site_visits: localStorage.getItem('site_visits'),
                visitorLogs,
                supporters: supportersData,
                members: registeredMembers,
                projects: customProjects,
                galleryItems,
                chatHistory
            }, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Criyxen_Manager_Backup_${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }
});