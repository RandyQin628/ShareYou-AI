/* ============================================================
   ShareYou — shared client store + UI glue (no backend)
   - localStorage progress (XP / streak / active days / completed lessons)
   - language (en / zh) with a global toggle, persisted across pages
   - functional course search, log-out reset, tailored placeholder toasts
   ============================================================ */
(function () {
  var K = { xp: 'sy_xp', streak: 'sy_streak', done: 'sy_done', day: 'sy_lastday', days: 'sy_days', init: 'sy_init', lang: 'sy_lang' };
  function get(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function dayStr(d) { return (d || new Date()).toDateString(); }

  if (!get(K.init, null)) {
    set(K.init, '1'); set(K.streak, '2'); set(K.xp, '0'); set(K.day, dayStr());
    var y = new Date(); y.setDate(y.getDate() - 1);
    set(K.days, JSON.stringify([dayStr(y), dayStr()]));
  }

  var SY = window.SY = {
    XP_GOAL: 175,
    xp: function () { return parseInt(get(K.xp, '0'), 10) || 0; },
    streak: function () { return parseInt(get(K.streak, '0'), 10) || 0; },
    done: function () { try { return JSON.parse(get(K.done, '[]')) || []; } catch (e) { return []; } },
    isDone: function (id) { return this.done().indexOf(id) >= 0; },
    addXP: function (n) { set(K.xp, this.xp() + (n || 0)); },
    markDone: function (id) { var d = this.done(); if (d.indexOf(id) < 0) { d.push(id); set(K.done, JSON.stringify(d)); } },
    activeDays: function () { try { return JSON.parse(get(K.days, '[]')) || []; } catch (e) { return []; } },
    markToday: function () { var t = dayStr(), a = this.activeDays(); if (a.indexOf(t) < 0) { a.push(t); set(K.days, JSON.stringify(a)); } },
    bumpStreakToday: function () { var t = dayStr(); if (get(K.day, '') !== t) { set(K.streak, this.streak() + 1); set(K.day, t); return true; } return false; },
    reset: function () { try { ['xp', 'streak', 'done', 'day', 'days', 'init'].forEach(function (k) { localStorage.removeItem(K[k]); }); } catch (e) {} },
    lang: function () { return get(K.lang, 'en') === 'zh' ? 'zh' : 'en'; },
    setLang: function (l) { set(K.lang, l === 'zh' ? 'zh' : 'en'); applyI18n(); document.dispatchEvent(new CustomEvent('sy:lang', { detail: SY.lang() })); }
  };
  /* language-aware pick: T('English', '中文') */
  SY.T = function (en, zh) { return SY.lang() === 'zh' ? zh : en; };

  /* ----- Level 1 lesson registry + unlock logic (shared by the course map + player) ----- */
  SY.LESSONS = [
    { id: 'coord-sep', title: { en: 'Separation Between Points', zh: '点之间的间距' }, playable: true },
    { id: 'combining', title: { en: 'Combining Separations',     zh: '组合间距' },     playable: true },
    { id: 'distance',  title: { en: 'Distance on the Grid',      zh: '网格上的距离' }, playable: false }
  ];
  SY.lessonIndex = function (id) { for (var i = 0; i < SY.LESSONS.length; i++) if (SY.LESSONS[i].id === id) return i; return -1; };
  SY.lessonUnlocked = function (i) { return i === 0 || SY.isDone(SY.LESSONS[i - 1].id); };
  SY.lessonState = function (id) {
    var i = SY.lessonIndex(id); if (i < 0) return 'soon';
    if (!SY.LESSONS[i].playable) return 'soon';
    if (SY.isDone(id)) return 'done';
    return SY.lessonUnlocked(i) ? 'current' : 'locked';
  };
  SY.nextPlayable = function (id) {
    /* the next playable lesson in order (it unlocks once `id` is completed) */
    for (var j = SY.lessonIndex(id) + 1; j < SY.LESSONS.length; j++) {
      if (SY.LESSONS[j].playable) return SY.LESSONS[j];
    }
    return null;
  };

  /* ----- translations for static markup ([data-i18n] / [data-i18n-ph]) ----- */
  var I18N = {
    en: {
      'nav.home': 'Home', 'nav.courses': 'Courses', 'nav.admin': 'Admin', 'nav.premium': 'Go Premium',
      'menu.settings': 'Settings', 'menu.about': 'About', 'menu.help': 'Help', 'menu.logout': 'Log out',
      'home.continue': 'Jump back in',
      'home.ai.label': 'AI suggestion for today', 'home.ai.action': 'Follow suggestion',
      'goal.title': "Today's learning goal", 'goal.value': '1 / 2 lessons', 'goal.remaining': 'About 15 minutes remaining',
      'search.ph': 'What do you want to learn?', 'search.ask': 'Ask',
      'premium.title': 'Unlock all learning with Premium', 'premium.sub': 'to get smarter, faster', 'premium.explore': 'Explore Premium',
      'leagues.title': 'Unlock Leagues',
      'rec.title': 'Recommended',
      'rec.data': 'Exploring Data Visually', 'rec.data1': 'Reading Bar Charts', 'rec.data2': 'Analyzing Bar Charts',
      'rec.sci': 'Scientific Thinking', 'rec.sci1': 'Connecting Gears', 'rec.sci2': 'Gears Changing Speeds',
      'rec.prob': 'Probability and Chance', 'rec.prob1': 'Comparing Likelihoods', 'rec.prob2': 'Multiple Decks',
      'course.current': 'Current course',
      'course.title': 'Coordinate Geometry',
      'course.sub': "Use coordinates and the areas of shapes to derive Pythagoras' Theorem",
      'course.progress': 'Course progress', 'course.levelProgress': 'Current level',
      'course.timeRemaining': 'Estimated time remaining', 'course.timeValue': 'About 5 hr 20 min',
      'course.weakReview': 'Review 3 weak areas', 'difficulty.basic': 'Beginner',
      'meta.lessons': 'Lessons', 'meta.exercises': 'Exercises',
      'level.1': 'LEVEL 1', 'level.title': 'Measuring Separation',
      'checkpoint.label': 'Separation Between Points', 'lesson.title': 'Separation Between Points',
      'lesson.current': 'Up next', 'lesson.duration': 'About 12 minutes', 'lesson.mastery': 'Current mastery',
      'lesson.focusLabel': 'Knowledge point', 'lesson.focusValue': 'Reading coordinates',
      'lesson.aiLabel': 'AI recommendation', 'lesson.aiReason': 'Continue the current path and strengthen coordinate order.',
      'btn.start': 'Start', 'map.more': 'More in this level',
      'lesson.welcome1': 'Welcome to Coordinate Geometry.',
      'lesson.welcome2': "You'll learn how to pin down where points sit in the plane.",
      'lesson.q1': 'Place a point at the coordinates (2, 1).',
      'lesson.startover': 'Start over', 'done.title': 'Lesson complete!', 'done.back': 'Back to course'
    },
    zh: {
      'nav.home': '首页', 'nav.courses': '课程', 'nav.admin': '管理台', 'nav.premium': '升级会员',
      'menu.settings': '设置', 'menu.about': '关于', 'menu.help': '帮助', 'menu.logout': '退出登录',
      'home.continue': '继续学习',
      'home.ai.label': 'AI 今日建议', 'home.ai.action': '按建议学习',
      'goal.title': '今日学习目标', 'goal.value': '1 / 2 节', 'goal.remaining': '预计还需 15 分钟',
      'search.ph': '你想学些什么？', 'search.ask': '提问',
      'premium.title': '用会员解锁全部课程', 'premium.sub': '更快变得更聪明', 'premium.explore': '了解会员',
      'leagues.title': '解锁联赛',
      'rec.title': '为你推荐',
      'rec.data': '数据可视化探索', 'rec.data1': '读懂柱状图', 'rec.data2': '分析柱状图',
      'rec.sci': '科学思维', 'rec.sci1': '齿轮的联动', 'rec.sci2': '齿轮变速',
      'rec.prob': '概率与机会', 'rec.prob1': '比较可能性', 'rec.prob2': '多副牌',
      'course.current': '当前课程',
      'course.title': '坐标几何',
      'course.sub': '利用坐标和图形面积推导勾股定理',
      'course.progress': '课程进度', 'course.levelProgress': '当前关卡',
      'course.timeRemaining': '预计还需', 'course.timeValue': '约 5 小时 20 分钟',
      'course.weakReview': '复习 3 个薄弱点', 'difficulty.basic': '基础',
      'meta.lessons': '课时', 'meta.exercises': '练习',
      'level.1': '第 1 关', 'level.title': '测量间距',
      'checkpoint.label': '点之间的间距', 'lesson.title': '点之间的间距',
      'lesson.current': '接下来学习', 'lesson.duration': '预计 12 分钟', 'lesson.mastery': '当前掌握度',
      'lesson.focusLabel': '本节知识点', 'lesson.focusValue': '坐标读取',
      'lesson.aiLabel': 'AI 推荐', 'lesson.aiReason': '衔接当前课程，并巩固坐标顺序薄弱点。',
      'btn.start': '开始', 'map.more': '本关更多内容',
      'lesson.welcome1': '欢迎来到坐标几何。',
      'lesson.welcome2': '你将学会如何确定点在平面中的位置。',
      'lesson.q1': '在坐标 (2, 1) 处放置一个点。',
      'lesson.startover': '重新开始', 'done.title': '本节完成！', 'done.back': '返回课程'
    }
  };

  function qsa(sel) { return [].slice.call(document.querySelectorAll(sel)); }
  function applyI18n() {
    ensureStyle();   // make sure the toggle (and toast) styles are present on load
    var l = SY.lang(), d = I18N[l] || I18N.en;
    qsa('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (d[k] != null) el.textContent = d[k]; });
    qsa('[data-i18n-ph]').forEach(function (el) { var k = el.getAttribute('data-i18n-ph'); if (d[k] != null) el.placeholder = d[k]; });
    qsa('[data-sy-lang]').forEach(function (b) { b.classList.toggle('is-zh', l === 'zh'); });
    qsa('[data-sy-lang] .sy-lang__seg').forEach(function (s) { s.classList.toggle('is-on', s.getAttribute('data-l') === l); });
    var bd = document.body, tEn = bd && bd.getAttribute('data-title-en'), tZh = bd && bd.getAttribute('data-title-zh');
    if (tEn || tZh) document.title = (l === 'zh' ? (tZh || tEn) : (tEn || tZh));
    document.documentElement.setAttribute('lang', l === 'zh' ? 'zh-CN' : 'en');
    render();
  }
  SY.applyI18n = applyI18n;

  /* ----- toast ----- */
  var styled = false;
  function ensureStyle() {
    if (styled) return; styled = true;
    var s = document.createElement('style');
    s.textContent = '.sy-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(12px);' +
      'background:#19181c;color:#fff;padding:11px 18px;border-radius:999px;font:600 14px/1 "Poppins","Segoe UI",system-ui,sans-serif;' +
      'opacity:0;z-index:9999;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,.18);transition:opacity .25s ease,transform .25s ease;max-width:80vw;text-align:center}' +
      '.sy-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}' +
      '.sy-lang{position:relative;display:inline-flex;align-items:center;border:none;background:#eceef3;border-radius:999px;padding:3px;cursor:pointer;font:600 13px/1 "Poppins","Segoe UI",system-ui,sans-serif;-webkit-tap-highlight-color:transparent;transition:background .15s ease}' +
      '.sy-lang:hover{background:#e4e6ec}' +
      '.sy-lang:active{transform:scale(.97)}' +
      '.sy-lang::before{content:"";position:absolute;top:3px;left:3px;height:calc(100% - 6px);width:calc(50% - 3px);border-radius:999px;background:linear-gradient(135deg,#6f5be6,#4255ff);box-shadow:0 2px 7px rgba(79,63,224,.34);transition:transform .26s cubic-bezier(.34,1.25,.5,1)}' +
      '.sy-lang.is-zh::before{transform:translateX(100%)}' +
      '.sy-lang__seg{position:relative;z-index:1;min-width:26px;text-align:center;padding:6px 11px;color:#80838f;transition:color .2s ease}' +
      '.sy-lang__seg.is-on{color:#fff}';
    document.head.appendChild(s);
  }
  function toast(msg) {
    ensureStyle();
    var t = document.createElement('div');
    t.className = 'sy-toast'; t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { if (t.parentNode) t.remove(); }, 280); }, 2200);
  }
  SY.toast = toast;

  /* ----- clicks: language toggle, log-out, placeholder toasts ----- */
  document.addEventListener('click', function (e) {
    var lt = e.target.closest('[data-sy-lang]');
    if (lt) { e.preventDefault(); SY.setLang(SY.lang() === 'zh' ? 'en' : 'zh'); return; }
    var el = e.target.closest('a[href="#"], a[href=""], [data-soon], [data-action]');
    if (!el) return;
    e.preventDefault();
    if (el.getAttribute('data-action') === 'logout') {
      SY.reset();
      toast(SY.T('Logged out — progress reset', '已退出 — 进度已重置'));
      setTimeout(function () { location.reload(); }, 750);
      return;
    }
    var msg = SY.lang() === 'zh'
      ? (el.getAttribute('data-soon-zh') || el.getAttribute('data-soon') || '敬请期待')
      : (el.getAttribute('data-soon') || 'Coming soon');
    toast(msg);
  });

  /* ----- functional course search ----- */
  var COURSES = [{ t: 'Coordinate Geometry', zh: '坐标几何', kw: 'coordinate geometry separation points distance pythagoras plane axes 坐标 几何 间距 距离', href: 'index.html' }];
  function doSearch(q) {
    q = (q || '').trim();
    if (!q) { toast(SY.T('Type something to search', '请输入要搜索的内容')); return; }
    var lc = q.toLowerCase(), hit = null;
    for (var i = 0; i < COURSES.length; i++) {
      if ((COURSES[i].t + ' ' + COURSES[i].zh + ' ' + COURSES[i].kw).toLowerCase().indexOf(lc) >= 0) { hit = COURSES[i]; break; }
    }
    if (hit) { toast(SY.T('Opening ' + hit.t + '…', '正在打开' + hit.zh + '…')); setTimeout(function () { location.href = hit.href; }, 650); }
    else toast(SY.T('No courses match “' + q + '” yet', '暂时没有匹配“' + q + '”的课程'));
  }

  /* ----- streak calendar (last 5 days, real activity, localized weekday) ----- */
  var DOW = { en: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'], zh: ['日', '一', '二', '三', '四', '五', '六'] };
  function renderDays() {
    var wrap = document.querySelector('.streak__days');
    if (!wrap) return;
    var dow = DOW[SY.lang()] || DOW.en, active = SY.activeDays(), today = dayStr(), html = '';
    for (var i = 4; i >= 0; i--) {
      var d = new Date(); d.setDate(d.getDate() - i);
      var ds = dayStr(d), done = active.indexOf(ds) >= 0, isToday = ds === today, fill = done ? '#1a1a1a' : '#d9d9d9';
      html += '<div class="day' + (done ? ' is-done' : '') + (isToday ? ' is-today' : '') + '">' +
        '<span class="day__dot"><svg viewBox="0 0 24 24"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="' + fill + '"/></svg></span>' +
        '<span class="day__label">' + dow[d.getDay()] + '</span></div>';
    }
    wrap.innerHTML = html;
  }

  /* ----- lessons 2..n as compact nodes on a connecting line (lesson 1 is the deluxe hero above) ----- */
  var MASCOT = '<span class="lpath-node__mascot" aria-hidden="true"><img src="mascot-cutout.png?v=1" alt=""></span>';
  var LOCK = '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="10.5" width="12" height="9" rx="2" fill="#a9a9b2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="#a9a9b2" stroke-width="1.8"/></svg>';
  var courseMotionObserver = null;

  function observeCourseElements() {
    if (!courseMotionObserver) return;
    qsa('.motion-reveal, .level-map, .progress-animate').forEach(function (el, index) {
      if (el.dataset.motionObserved) return;
      el.dataset.motionObserved = '1';
      if (el.classList.contains('lpath-node')) el.style.setProperty('--reveal-delay', Math.min(index * 65, 260) + 'ms');
      courseMotionObserver.observe(el);
    });
  }

  function renderLevelMap() {
    var wrap = document.getElementById('level-map');
    if (!wrap || !SY.LESSONS) return;
    var zh = SY.lang() === 'zh', html = '';
    for (var i = 1; i < SY.LESSONS.length; i++) {
      var L = SY.LESSONS[i], st = SY.lessonState(L.id), title = zh ? L.title.zh : L.title.en;
      var playable = st === 'done' || st === 'current';
      var marker = playable ? MASCOT : LOCK;
      var stateLabel = st === 'done' ? SY.T('Completed', '已完成') :
        st === 'current' ? SY.T('Current', '当前') :
        st === 'locked' ? SY.T('Locked', '待解锁') : SY.T('Coming soon', '即将开放');
      var reason = st === 'done' ? SY.T('Available for review', '可随时复习') :
        st === 'current' ? SY.T('Next lesson · about 12 min', '下一节 · 预计 12 分钟') :
        st === 'locked' ? SY.T('Finish the previous lesson to unlock', '完成上一节后解锁') :
        SY.T('More content is being prepared', '后续内容正在准备');
      var tag = playable ? 'a' : 'button';
      var attrs = playable
        ? 'href="lesson.html?lesson=' + L.id + '&ui=2"'
        : 'type="button" data-soon="' + (st === 'locked' ? 'Finish the previous lesson first' : 'Coming soon') + '" data-soon-zh="' + (st === 'locked' ? '请先完成上一节' : '后续内容正在准备') + '"';
      html += '<' + tag + ' class="lpath-node is-' + st + ' motion-reveal" ' + attrs + '>' +
        '<span class="lpath-node__mark">' + marker + '</span>' +
        '<span class="lpath-node__card"><span class="lpath-node__copy"><span class="lpath-node__title">' + title + '</span>' +
        '<span class="lpath-node__reason">' + reason + '</span></span>' +
        '<span class="lpath-node__status">' + stateLabel + '</span></span></' + tag + '>';
    }
    wrap.innerHTML = html;
    observeCourseElements();
  }

  /* ----- render progress hooks (lang-aware dynamic strings) ----- */
  function render() {
    var streak = SY.streak(), xp = SY.xp(), pct = Math.min(100, Math.round(xp / SY.XP_GOAL * 100)), unlocked = xp >= SY.XP_GOAL;
    qsa('[data-sy="streak"]').forEach(function (el) { el.textContent = streak; });
    qsa('[data-sy="gems"]').forEach(function (el) { el.textContent = SY.done().length; });
    qsa('[data-sy="xp"]').forEach(function (el) { el.textContent = xp; });
    qsa('[data-sy="xp-label"]').forEach(function (el) { el.textContent = unlocked ? SY.T('Unlocked!', '已解锁！') : SY.T(xp + ' of ' + SY.XP_GOAL + ' XP', xp + ' / ' + SY.XP_GOAL + ' XP'); });
    qsa('[data-sy="xp-bar"]').forEach(function (el) { el.style.width = pct + '%'; });
    var courseDone = SY.LESSONS.filter(function (lesson) { return SY.isDone(lesson.id); }).length;
    var totalCourseLessons = 10;
    var coursePct = Math.min(100, Math.round(courseDone / totalCourseLessons * 100));
    var mastery = SY.isDone('coord-sep') ? 86 : 42;
    qsa('[data-sy="course-progress-value"]').forEach(function (el) { el.textContent = courseDone + ' / ' + totalCourseLessons; });
    qsa('[data-sy="course-progress-caption"]').forEach(function (el) {
      el.textContent = SY.T(courseDone + ' of ' + totalCourseLessons + ' lessons completed', '已完成 ' + courseDone + ' / ' + totalCourseLessons + ' 课时');
    });
    qsa('[data-sy="course-level-value"]').forEach(function (el) {
      el.textContent = SY.T('Level 1 · ' + courseDone + ' / ' + SY.LESSONS.length + ' lessons', '第 1 关 · ' + courseDone + ' / ' + SY.LESSONS.length + ' 节');
    });
    qsa('[data-sy="course-progress-track"]').forEach(function (el) {
      el.style.setProperty('--progress', coursePct + '%');
      el.setAttribute('aria-valuemax', totalCourseLessons);
      el.setAttribute('aria-valuenow', courseDone);
    });
    var levelDone = SY.LESSONS.filter(function (lesson) { return SY.isDone(lesson.id); }).length;
    var levelPct = Math.min(100, Math.round(levelDone / SY.LESSONS.length * 100));
    qsa('[data-sy="level-progress-value"]').forEach(function (el) {
      el.textContent = SY.T(levelDone + ' / ' + SY.LESSONS.length + ' lessons', levelDone + ' / ' + SY.LESSONS.length + ' 节');
    });
    qsa('[data-sy="level-progress-track"]').forEach(function (el) {
      el.style.setProperty('--progress', levelPct + '%');
      el.setAttribute('aria-valuenow', levelDone);
    });
    qsa('[data-sy="lesson-mastery-value"], [data-sy="lesson-mastery-label"]').forEach(function (el) { el.textContent = mastery + '%'; });
    qsa('[data-sy="lesson-mastery-track"]').forEach(function (el) {
      el.style.setProperty('--progress', mastery + '%');
      el.setAttribute('aria-valuenow', mastery);
    });
    var firstState = SY.lessonState('coord-sep');
    qsa('[data-sy-current-lesson]').forEach(function (el) {
      el.classList.remove('is-current', 'is-done', 'is-locked', 'is-soon', 'sy-done');
      el.classList.add('is-' + firstState);
      if (firstState === 'done') el.classList.add('sy-done');
    });
    qsa('[data-sy="lesson-state"]').forEach(function (el) {
      el.textContent = firstState === 'done' ? SY.T('Completed · review anytime', '已完成 · 可随时复习') : SY.T('Up next', '接下来学习');
    });
    qsa('[data-sy-current-lesson] .btn-start').forEach(function (el) {
      el.textContent = firstState === 'done' ? SY.T('Review', '复习') : SY.T('Start learning', '开始学习');
    });
    if (unlocked) qsa('.leagues__title').forEach(function (el) { el.textContent = SY.T('Leagues unlocked!', '联赛已解锁！'); });
    qsa('[data-sy-done]').forEach(function (el) {
      if (SY.isDone(el.getAttribute('data-sy-done'))) {
        el.classList.add('sy-done');
        var b = el.querySelector('.btn-start'); if (b) b.textContent = SY.T('Review', '复习');
      }
    });
    renderDays();
    renderLevelMap();
    observeCourseElements();
    var ask = document.querySelector('.search__ask');
    if (ask && !ask.dataset.wired) { ask.dataset.wired = '1'; ask.addEventListener('click', function () { doSearch(document.querySelector('.search input').value); }); }
    var si = document.querySelector('.search input');
    if (si && !si.dataset.wired) { si.dataset.wired = '1'; si.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); doSearch(si.value); } }); }
  }
  SY.render = render;

  function setupCourseMotion() {
    var path = document.querySelector('.path');
    if (!path) return;

    document.documentElement.classList.add('has-course-motion');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      qsa('.motion-reveal, .level-map, .progress-animate').forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      courseMotionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          courseMotionObserver.unobserve(entry.target);
        });
      }, { threshold: 0.24, rootMargin: '0px 0px -7% 0px' });
      observeCourseElements();
    }

    var levelMap = document.getElementById('level-map');
    if (levelMap && !levelMap.dataset.feedbackWired) {
      levelMap.dataset.feedbackWired = '1';
      levelMap.addEventListener('click', function (event) {
        var node = event.target.closest('.lpath-node[data-soon]');
        if (!node) return;
        node.classList.remove('is-feedback');
        void node.offsetWidth;
        node.classList.add('is-feedback');
        setTimeout(function () { node.classList.remove('is-feedback'); }, 650);
      });
    }
  }

  function setupCourseOverviewPin() {
    var rail = document.querySelector('.course-overview-rail');
    var card = rail && rail.querySelector('.info-card');
    if (!rail || !card) return;

    var desktop = window.matchMedia('(min-width: 901px)');
    function sync() {
      if (!desktop.matches) {
        card.classList.remove('is-viewport-fixed');
        card.style.removeProperty('left');
        card.style.removeProperty('width');
        return;
      }

      var rect = rail.getBoundingClientRect();
      card.style.left = rect.left + 'px';
      card.style.width = rect.width + 'px';
      card.classList.add('is-viewport-fixed');
    }

    sync();
    window.addEventListener('resize', sync);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', sync);
    if (desktop.addEventListener) desktop.addEventListener('change', sync);
    if (window.ResizeObserver) {
      var observer = new ResizeObserver(sync);
      observer.observe(rail);
    }
  }

  function boot() {
    applyI18n();
    setupCourseMotion();
    setupCourseOverviewPin();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
