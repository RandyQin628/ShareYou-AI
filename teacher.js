(function () {
  var DIAGNOSIS = {
    swapped_xy: {
      concept: 'x/y 坐标顺序',
      source: '坐标题错因',
      recommendation: '安排 6 分钟坐标读法微课，再做 2 道先 x 后 y 的定位题。'
    },
    wrong_x_direction: {
      concept: 'x 轴方向与正负号',
      source: '坐标题错因',
      recommendation: '先用数轴复盘左右方向，再指派负 x 坐标定位练习。'
    },
    wrong_y_direction: {
      concept: 'y 轴方向与正负号',
      source: '坐标题错因',
      recommendation: '用上下方向卡片复盘正负号，并追加 1 组 y 轴专项题。'
    },
    x_only: {
      concept: '只完成水平移动',
      source: 'AI 自动归因',
      recommendation: '让学生说出第二个坐标的含义，再完成同题重做。'
    },
    y_only: {
      concept: '只完成垂直移动',
      source: 'AI 自动归因',
      recommendation: '用原点到目标点的两步路径拆解，补 2 道 x 轴题。'
    },
    both_components_off: {
      concept: '坐标整体定位',
      source: '错题聚合',
      recommendation: '进入小组辅导名单，从读坐标、定方向、落点三步重建。'
    },
    single_axis_distance: {
      concept: '只比较单一方向距离',
      source: '远近比较题',
      recommendation: '指派对角距离演示题，让学生同时数水平和垂直间距。'
    },
    missed_diagonal: {
      concept: '对角距离组合',
      source: '远近比较题',
      recommendation: '用直角三角形路径解释斜边，再做 1 道候选点比较。'
    },
    compared_one_dimension_only: {
      concept: '忽略组合间距',
      source: '远近比较题',
      recommendation: '要求学生列出每个选项的横向与纵向间距后再判断。'
    },
    picked_shorter_combined_gap: {
      concept: '组合间距大小比较',
      source: '远近比较题',
      recommendation: '把两组横纵间距并排比较，追加 1 道挑战题。'
    },
    on_track: {
      concept: '学习状态稳定',
      source: '进度记录',
      recommendation: '保持当前节奏，可指派下一知识点。'
    }
  };

  var PRACTICE_LIBRARY = {
    swapped_xy: [
      '写出点 A(4, -2) 的横坐标和纵坐标，并说明读取顺序。',
      '在坐标系中标出点 B(-3, 5)，先写 x 再写 y。',
      '判断点 C(2, -6) 与 C(-6, 2) 是否表示同一位置，并说明原因。',
      '把“先向上 3 格，再向右 5 格”改写为正确的坐标。',
      '找出坐标记录 (-4, 7) 中的横坐标，并写出它所在的左右方向。'
    ],
    wrong_x_direction: [
      '从原点向左移动 4 格，写出终点的 x 坐标。',
      '比较点 A(-2, 1) 与 B(3, 1)，判断谁在更左侧。',
      '修正错误：点 (-5, 2) 应在 y 轴右侧。',
      '在数轴上标出 -3 和 2，并说明负 x 的方向。',
      '将点 (4, -1) 向左移动 7 格，写出新坐标。'
    ],
    wrong_y_direction: [
      '从原点向下移动 5 格，写出终点的 y 坐标。',
      '比较点 A(2, -4) 与 B(2, 3)，判断谁在更上方。',
      '修正错误：点 (1, -6) 应在 x 轴上方。',
      '将点 (-2, 4) 向下移动 7 格，写出新坐标。',
      '分别写出 y=5 与 y=-5 对应的上下方向。'
    ],
    x_only: [
      '从原点先向右 3 格、再向上 2 格，写出完整坐标。',
      '说明为什么只完成水平移动不能定位点 (4, -3)。',
      '补全路径：原点到 (-2, 5) 需要哪两个方向的移动？',
      '把点 (1, 1) 移到 (5, -2)，分别写出水平和垂直变化。',
      '根据坐标 (-4, -1) 画出两步定位路径。'
    ],
    y_only: [
      '从原点先向下 3 格、再向左 4 格，写出完整坐标。',
      '说明为什么只完成垂直移动不能定位点 (-5, 2)。',
      '补全路径：原点到 (3, -4) 需要哪两个方向的移动？',
      '把点 (-1, 2) 移到 (4, 5)，分别写出水平和垂直变化。',
      '根据坐标 (6, -2) 画出两步定位路径。'
    ],
    both_components_off: [
      '按“读 x、定左右、读 y、定上下”四步标出点 (-3, 4)。',
      '检查点 (5, -2) 的定位过程，并写出每一步依据。',
      '纠正把点 (-2, -6) 标到第二象限的错误。',
      '写出第四象限内任意两个整数坐标，并说明理由。',
      '从原点出发定位点 (4, 3)，记录完整移动路径。'
    ],
    single_axis_distance: [
      '比较 A(1, 1) 到 B(4, 5) 的横向与纵向间距。',
      '计算点 (0, 0) 与点 (3, 4) 的直线距离。',
      '判断只比较横向间距能否确定两点远近，并说明原因。',
      '比较点 P(2, 1) 到 Q(6, 4) 与 R(2, 6) 的距离。',
      '画出横纵间距形成的直角三角形并标注边长。'
    ],
    missed_diagonal: [
      '画出点 (0, 0) 到 (3, 4) 的对角线并计算长度。',
      '解释为什么横向 3 格、纵向 4 格的距离不是 7 格。',
      '比较边长组合 (3, 4) 与 (1, 5) 的对角距离。',
      '用勾股关系求点 (-1, 2) 到 (5, 10) 的距离。',
      '为一组横纵间距设计对应的直角三角形。'
    ],
    compared_one_dimension_only: [
      '比较两组间距 (2, 6) 与 (4, 4)，不能只看哪一个数？',
      '分别列出两个候选点的横向和纵向间距后判断远近。',
      '修正只依据横向间距选择最近点的解题过程。',
      '比较 A(0, 0) 到 B(1, 5) 与 C(4, 3) 的距离。',
      '写出判断组合间距时必须同时检查的两个维度。'
    ],
    picked_shorter_combined_gap: [
      '计算并比较横纵间距 (2, 3) 与 (1, 4) 的直线距离。',
      '找出两组组合间距中真正较短的一组，并写出计算过程。',
      '解释为什么 2+3 小于 1+5 不能直接代表直线距离。',
      '比较点 O 到 A(3, 4) 与 B(2, 5) 的距离。',
      '设计一组看似更短但实际更长的横纵间距。'
    ]
  };

  var LEARNER_AVATAR =
    '<svg viewBox="3.5 4 21 21" aria-hidden="true">' +
      '<path d="M5.5 10.8 14 6l8.5 4.8-8.5 4.8-8.5-4.8Z" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"/>' +
      '<path d="M8.8 14.1v5.1c1.7 1.9 3.4 2.8 5.2 2.8s3.5-.9 5.2-2.8v-5.1" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M22.5 10.8v5.6" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>' +
      '<circle cx="22.5" cy="18.9" r="1.45" fill="currentColor"/>' +
    '</svg>';

  var COHORTS = {
    'math-8a': {
      label: '八年级 A 班',
      type: '校内班级',
      summary: '坐标几何 · 第 1 关',
      automation: { submissions: 86, autoGraded: 82, generatedSets: 3, assignedSets: 2, practiceStatus: 'idle', reminderStatus: 'idle' },
      students: [
        student('陈一诺', '第 1 组', 42, 'swapped_xy', 'high', 7, 54, '今天 09:24'),
        student('李沐辰', '第 2 组', 58, 'wrong_x_direction', 'medium', 5, 68, '今天 10:11'),
        student('王若溪', '第 1 组', 76, 'on_track', 'low', 2, 91, '昨天 17:40'),
        student('赵景行', '第 3 组', 33, 'both_components_off', 'high', 8, 48, '今天 08:52'),
        student('林知夏', '第 2 组', 81, 'on_track', 'low', 1, 96, '今天 11:06'),
        student('周予安', '第 3 组', 49, 'y_only', 'medium', 4, 63, '昨天 20:19'),
        student('何嘉树', '第 4 组', 64, 'missed_diagonal', 'medium', 6, 66, '今天 09:59'),
        student('顾清越', '第 4 组', 88, 'on_track', 'low', 1, 94, '今天 12:02')
      ]
    },
    'math-8a-g1': {
      label: '八年级 A 班 · 第 1 组',
      type: '学习小组',
      summary: '坐标读法补救小组',
      automation: { submissions: 36, autoGraded: 35, generatedSets: 2, assignedSets: 1, practiceStatus: 'idle', reminderStatus: 'idle' },
      students: [
        student('陈一诺', '第 1 组', 42, 'swapped_xy', 'high', 7, 54, '今天 09:24'),
        student('王若溪', '第 1 组', 76, 'on_track', 'low', 2, 91, '昨天 17:40'),
        student('宋明澈', '第 1 组', 39, 'x_only', 'high', 6, 51, '今天 08:31'),
        student('沈栀宁', '第 1 组', 61, 'wrong_y_direction', 'medium', 3, 70, '今天 10:48')
      ]
    },
    'training-compliance': {
      label: '企业培训 · 新员工批次 07',
      type: '企业团队',
      summary: '数据可视化合规训练',
      automation: { submissions: 58, autoGraded: 55, generatedSets: 3, assignedSets: 2, practiceStatus: 'idle', reminderStatus: 'idle' },
      students: [
        student('Ava Chen', '运营组', 71, 'on_track', 'low', 2, 89, '今天 09:20'),
        student('Leo Wang', '销售组', 46, 'compared_one_dimension_only', 'high', 7, 57, '昨天 18:11'),
        student('Mia Liu', '客服组', 62, 'single_axis_distance', 'medium', 4, 69, '今天 10:05'),
        student('Noah Zhang', '销售组', 27, 'picked_shorter_combined_gap', 'high', 9, 44, '前天 15:30'),
        student('Iris Sun', '运营组', 84, 'on_track', 'low', 1, 96, '今天 11:42')
      ]
    }
  };

  var assignments = [
    { target: '八年级 A 班', course: 'Coordinate Geometry', point: 'x/y 坐标顺序', due: '2026-07-08', created: '今天 09:10', source: 'AI 补充练习', questionCount: 5 },
    { target: '第 1 组', course: 'Coordinate Geometry', point: '方向与正负号', due: '2026-07-06', created: '昨天 18:30', source: '常规任务', questionCount: 0 }
  ];

  var generationTimer = null;
  var state = {
    cohort: 'math-8a',
    risk: 'high',
    query: '',
    practice: { diagnosisId: null, count: 5 },
    draftPractice: null
  };

  function student(name, team, progress, stuck, risk, attempts, accuracy, lastSeen) {
    return { name: name, team: team, progress: progress, stuck: stuck, risk: risk, attempts: attempts, accuracy: accuracy, lastSeen: lastSeen };
  }

  function readJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function topDiagnosis(counts) {
    var keys = Object.keys(counts || {});
    if (!keys.length) return null;
    keys.sort(function (a, b) { return (counts[b] || 0) - (counts[a] || 0); });
    return keys[0];
  }

  function localLearner() {
    var events = readJSON('sy_learning_events', []);
    var misconceptions = readJSON('sy_misconceptions', {});
    var done = readJSON('sy_done', []);
    if (!events.length && !Object.keys(misconceptions).length && !done.length) return null;

    var wrong = events.filter(function (event) { return event && event.correct === false; });
    var latestWrong = wrong.length ? wrong[wrong.length - 1] : null;
    var diagnosisId = latestWrong ? latestWrong.diagnosisId : (topDiagnosis(misconceptions) || 'on_track');
    var attempts = Math.max(events.length, done.length + wrong.length, 1);
    var accuracy = events.length ? Math.round((events.length - wrong.length) / events.length * 100) : (done.length ? 88 : 70);
    var progress = Math.min(96, 36 + done.length * 22 + Math.max(0, accuracy - 60));
    var risk = wrong.length >= 3 || accuracy < 60 ? 'high' : wrong.length ? 'medium' : 'low';
    return student('本机学习者', '本地体验', progress, diagnosisId || 'both_components_off', risk, attempts, accuracy, '刚刚');
  }

  function cohortStudents() {
    var base = (COHORTS[state.cohort] || COHORTS['math-8a']).students.slice();
    var local = localLearner();
    if (local && state.cohort === 'math-8a') base.unshift(local);
    return base;
  }

  function diagnosisFor(id) {
    return DIAGNOSIS[id] || DIAGNOSIS.both_components_off;
  }

  function riskLabel(risk) {
    return risk === 'high' ? '高' : risk === 'medium' ? '中' : '低';
  }

  function average(list, key) {
    if (!list.length) return 0;
    return Math.round(list.reduce(function (sum, item) { return sum + (item[key] || 0); }, 0) / list.length);
  }

  function automationFor() {
    var cohort = COHORTS[state.cohort] || COHORTS['math-8a'];
    return cohort.automation;
  }

  function cohortStats(students) {
    var cohort = COHORTS[state.cohort] || COHORTS['math-8a'];
    var automation = cohort.automation;
    var localExtra = Math.max(0, students.length - cohort.students.length);
    var localAttempts = localExtra ? (students[0].attempts || 0) : 0;
    var submissions = automation.submissions + localAttempts;
    var autoGraded = Math.min(submissions, automation.autoGraded + localAttempts);
    var weakPoints = bottlenecks(students).length;
    var manual = students.filter(function (s) { return s.risk === 'high'; }).length;
    var incomplete = students.filter(function (s) { return s.progress < 60; }).length;
    var coverage = Math.round(autoGraded / Math.max(submissions, 1) * 100);
    var timeSavedMinutes = autoGraded * 2 + automation.generatedSets * 15;
    return {
      submissions: submissions,
      autoGraded: autoGraded,
      weakPoints: weakPoints,
      manual: manual,
      incomplete: incomplete,
      coverage: coverage,
      generatedSets: automation.generatedSets,
      assignedSets: automation.assignedSets,
      timeSavedMinutes: timeSavedMinutes,
      timeSavedHours: timeSavedMinutes / 60
    };
  }

  function formatHours(minutes) {
    var value = Math.round(minutes / 6) / 10;
    return value.toFixed(1).replace('.0', '') + 'h';
  }

  function practicePlan(id) {
    var diag = diagnosisFor(id);
    var questions = PRACTICE_LIBRARY[id] || [
      '基础辨析：用一句话说明「' + diag.concept + '」的关键规则。',
      '改错题：找出一个关于「' + diag.concept + '」的常见错误并修正。',
      '应用题：完成一道「' + diag.concept + '」基础题并标注每一步依据。',
      '变式题：改变一个条件后重新完成同类题。',
      '迁移题：解释「' + diag.concept + '」如何影响最终答案。'
    ];
    return {
      title: diag.concept + ' · 针对性补充练习',
      objective: '根据全班错题归因生成，重点解决「' + diag.concept + '」。',
      questions: questions
    };
  }

  function practiceQuestions(id, count) {
    var base = practicePlan(id).questions;
    var result = [];
    for (var i = 0; i < count; i += 1) {
      var question = base[i % base.length];
      if (i >= base.length) question += '（变式 ' + (i - base.length + 1) + '）';
      result.push(question);
    }
    return result;
  }

  function ensureSelectOption(select, value) {
    if (!select || !value) return;
    var exists = Array.prototype.some.call(select.options, function (option) { return option.value === value; });
    if (!exists) {
      var option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    }
  }

  function filteredStudents(students) {
    var query = state.query.trim().toLowerCase();
    return students.filter(function (s) {
      var diag = diagnosisFor(s.stuck);
      var matchesRisk = state.risk === 'all' || s.risk === state.risk;
      var text = [s.name, s.team, diag.concept, diag.source].join(' ').toLowerCase();
      return matchesRisk && (!query || text.indexOf(query) >= 0);
    });
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function currentNumber(text) {
    var match = String(text || '').match(/\d+(?:\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  }

  function setMetric(id, value, suffix, decimals) {
    var el = document.getElementById(id);
    if (!el) return;
    suffix = suffix || '';
    decimals = decimals || 0;
    if (el._metricFrame) cancelAnimationFrame(el._metricFrame);
    var end = parseFloat(value) || 0;
    function formatMetric(number) {
      return (decimals ? number.toFixed(decimals).replace(/\.0+$/, '') : Math.round(number)) + suffix;
    }
    if (prefersReducedMotion()) {
      el.textContent = formatMetric(end);
      return;
    }
    var start = currentNumber(el.textContent);
    if (start === end) {
      el.textContent = formatMetric(end);
      return;
    }
    var startTime = performance.now();
    var duration = 1150;
    function tick(now) {
      var p = Math.min(1, (now - startTime) / duration);
      var eased = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      el.textContent = formatMetric(start + (end - start) * eased);
      if (p < 1) {
        el._metricFrame = requestAnimationFrame(tick);
      } else {
        el._metricFrame = null;
      }
    }
    el._metricFrame = requestAnimationFrame(tick);
  }

  function pulseInsight() {
    var strip = document.getElementById('insightStrip');
    if (!strip || prefersReducedMotion()) return;
    strip.classList.remove('pulse');
    void strip.offsetWidth;
    strip.classList.add('pulse');
  }

  function animateMetricCards() {
    if (prefersReducedMotion()) return;
    var grid = document.querySelector('.metric-grid');
    if (!grid) return;
    if (grid.classList.contains('reveal-item') && !grid.classList.contains('is-revealed')) return;
    var cards = grid.querySelectorAll('.metric-card');
    cards.forEach(function (card, index) {
      if (card._metricPulseTimer) window.clearTimeout(card._metricPulseTimer);
      card.classList.remove('is-updating');
      card.style.setProperty('--metric-delay', (index * 55) + 'ms');
    });
    void grid.offsetWidth;
    cards.forEach(function (card) {
      card.classList.add('is-updating');
      card._metricPulseTimer = window.setTimeout(function () {
        card.classList.remove('is-updating');
        card._metricPulseTimer = null;
      }, 720);
    });
  }

  function renderSelectors() {
    var cohortSelect = document.getElementById('cohortSelect');
    var assignmentTarget = document.getElementById('assignmentTarget');
    var options = Object.keys(COHORTS).map(function (key) {
      return '<option value="' + key + '">' + COHORTS[key].label + '</option>';
    }).join('');
    cohortSelect.innerHTML = options;
    cohortSelect.value = state.cohort;
    assignmentTarget.innerHTML = options;
    assignmentTarget.value = state.cohort;
  }

  function renderMetrics(students) {
    var stats = cohortStats(students);
    setMetric('metricTimeSaved', stats.timeSavedHours, 'h', 1);
    setText('metricTimeSavedHint', '每份批改 2 分钟 + 每套练习 15 分钟');
    setMetric('metricAutoGraded', stats.autoGraded, '');
    setText('metricAutoGradedHint', stats.coverage + '% AI 处理覆盖率 · 共 ' + stats.submissions + ' 份');
    setMetric('metricWeakPoints', stats.weakPoints, '');
    setText('metricWeakPointsHint', '已完成全班错题自动归因');
    setMetric('metricManual', stats.manual, '');
    setText('metricManualHint', stats.manual ? '仅这些情况需要老师判断' : '本周暂无高风险项');
    animateMetricCards();
  }

  function renderDistribution(students) {
    var bins = [
      { label: '0-25%', min: 0, max: 25 },
      { label: '26-50%', min: 26, max: 50 },
      { label: '51-75%', min: 51, max: 75 },
      { label: '76-100%', min: 76, max: 100 }
    ].map(function (bin) {
      bin.count = students.filter(function (s) { return s.progress >= bin.min && s.progress <= bin.max; }).length;
      return bin;
    });
    var max = Math.max.apply(null, bins.map(function (b) { return b.count; }).concat([1]));
    document.getElementById('progressDistribution').innerHTML = bins.map(function (bin) {
      var width = Math.max(8, Math.round(bin.count / max * 100));
      return '<div class="dist-row">' +
        '<span class="dist-row__label">' + bin.label + '</span>' +
        '<span class="dist-row__track"><i class="dist-row__bar" style="width:' + width + '%"></i></span>' +
        '<span class="dist-row__count">' + bin.count + '</span>' +
      '</div>';
    }).join('');
    setText('distributionSummary', students.length + ' 名学习者，' + bins[3].count + ' 人完成度超过 75%。');
  }

  function bottlenecks(students) {
    var map = {};
    students.forEach(function (s) {
      if (s.stuck === 'on_track') return;
      var diag = diagnosisFor(s.stuck);
      if (!map[s.stuck]) map[s.stuck] = { id: s.stuck, concept: diag.concept, recommendation: diag.recommendation, count: 0, attempts: 0 };
      map[s.stuck].count += 1;
      map[s.stuck].attempts += s.attempts || 0;
    });
    return Object.keys(map).map(function (key) { return map[key]; }).sort(function (a, b) { return b.count - a.count; });
  }

  function renderBottlenecks(students) {
    var items = bottlenecks(students);
    var wrap = document.getElementById('bottleneckList');
    var automation = automationFor();
    if (!items.length) {
      wrap.innerHTML = '<div class="empty-state">AI 未发现需要集中补练的共同薄弱点。</div>';
      return;
    }
    wrap.innerHTML = items.map(function (item) {
      var isSelected = state.practice.diagnosisId === item.id;
      var label = isSelected && automation.practiceStatus === 'generating' ? '生成中' :
        isSelected && (automation.practiceStatus === 'ready' || automation.practiceStatus === 'assigned') ? '查看练习' : '生成练习';
      return '<div class="bottleneck-item' + (isSelected ? ' is-selected' : '') + '">' +
        '<div class="bottleneck-item__copy"><h4>' + item.concept + '</h4><p>' + item.count + ' 人集中出错 · 共 ' + item.attempts + ' 次作答记录</p></div>' +
        '<span class="bottleneck-count">' + item.count + ' 人</span>' +
        '<button class="bottleneck-action" type="button" data-generate-practice="' + item.id + '"' +
          (isSelected && automation.practiceStatus === 'generating' ? ' disabled' : '') + '>' + label + '</button>' +
      '</div>';
    }).join('');
  }

  function renderInsight(students) {
    var cohort = COHORTS[state.cohort] || COHORTS['math-8a'];
    var stats = cohortStats(students);
    var top = bottlenecks(students)[0];
    var title = top
      ? stats.autoGraded + ' 份提交已批改，主要错因是「' + top.concept + '」'
      : stats.autoGraded + ' 份提交已批改，未发现集中性错因';
    var body = top
      ? 'AI 已完成 ' + stats.coverage + '% 的提交处理，并把 ' + top.count + ' 名学习者的同类错误归为一个薄弱点。可直接生成补充练习；仅 ' + stats.manual + ' 人需要老师介入。'
      : cohort.label + ' 当前学习状态稳定，老师无需逐份检查，可继续推进下一知识点。';
    setText('insightTitle', title);
    setText('insightBody', body);
  }

  function renderWorkflow(students) {
    var stats = cohortStats(students);
    var automation = automationFor();
    var status = automation.practiceStatus;
    var reminderSent = automation.reminderStatus === 'sent';
    var labels = {
      idle: '练习待生成',
      generating: '正在生成练习',
      ready: '练习可指派',
      assigned: reminderSent ? '提醒已发送' : '可提醒未完成人员'
    };
    var progress = status === 'assigned' ? (reminderSent ? 100 : 88) : status === 'ready' ? 70 : status === 'generating' ? 56 : 40;
    var attributionText = stats.weakPoints
      ? stats.weakPoints + ' 个薄弱点 · 已按错因聚类'
      : '未发现集中性薄弱点';
    var reminderMeta = status !== 'assigned'
      ? '任务指派后可发送提醒'
      : reminderSent
        ? stats.incomplete + ' 人已收到提醒'
        : stats.incomplete
          ? stats.incomplete + ' 人尚未完成'
          : '当前所有人均已完成';
    var steps = [
      { index: 1, title: '自动批改', meta: stats.autoGraded + '/' + stats.submissions + ' 份提交', state: 'complete' },
      { index: 2, title: '自动归因', meta: attributionText, state: 'complete' },
      {
        index: 3,
        title: '生成补充练习',
        meta: status === 'generating' ? '正在按错因组织题目' : status === 'ready' || status === 'assigned' ? state.practice.count + ' 道题已生成' : '选择薄弱点即可生成',
        state: status === 'ready' || status === 'assigned' ? 'complete' : 'active'
      },
      {
        index: 4,
        title: '一键指派',
        meta: status === 'assigned' ? '已加入任务队列' : status === 'ready' ? '可直接发给当前班级' : '等待练习生成',
        state: status === 'assigned' ? 'complete' : status === 'ready' ? 'active' : 'pending'
      },
      {
        index: 5,
        title: '提醒未完成的人',
        meta: reminderMeta,
        state: status !== 'assigned' ? 'pending' : reminderSent || !stats.incomplete ? 'complete' : 'active',
        action: status === 'assigned' && !reminderSent && stats.incomplete > 0
      }
    ];
    document.getElementById('workflowSteps').innerHTML = steps.map(function (step) {
      var action = step.action
        ? '<button class="workflow-step__action" type="button" data-remind-incomplete>发送提醒</button>'
        : '';
      return '<div class="workflow-step is-' + step.state + '">' +
        '<span class="workflow-step__index">' + step.index + '</span>' +
        '<div><strong>' + step.title + '</strong><span>' + step.meta + '</span>' + action + '</div>' +
      '</div>';
    }).join('');
    setText('workflowStatus', labels[status] || labels.idle);
    setText('automationSummary', stats.autoGraded + ' 份提交已由 AI 批改，' + stats.weakPoints + ' 个薄弱点已完成归因，累计预计节省 ' + formatHours(stats.timeSavedMinutes) + '。当前 ' + stats.incomplete + ' 人尚未完成。');
    document.getElementById('workflowProgress').style.width = progress + '%';
  }

  function remindIncompleteLearners() {
    var students = cohortStudents();
    var incomplete = students.filter(function (student) { return student.progress < 60; });
    var automation = automationFor();
    if (automation.practiceStatus !== 'assigned') {
      showToast('请先完成任务指派');
      return;
    }
    if (!incomplete.length) {
      showToast('当前所有人均已完成');
      return;
    }
    automation.reminderStatus = 'sent';
    renderWorkflow(students);
    showToast('已提醒 ' + incomplete.length + ' 名未完成人员');
  }

  function renderPracticeQuestionList() {
    var list = document.getElementById('practiceQuestionList');
    if (!list || !state.practice.diagnosisId) return;
    list.innerHTML = practiceQuestions(state.practice.diagnosisId, state.practice.count).map(function (question) {
      return '<li>' + question + '</li>';
    }).join('');
  }

  function renderPractice() {
    var automation = automationFor();
    var status = automation.practiceStatus;
    var body = document.getElementById('practiceBuilderBody');
    var builder = document.getElementById('practiceBuilder');
    builder.setAttribute('data-state', status);
    if (!state.practice.diagnosisId || status === 'idle') {
      setText('practiceBuilderTitle', '选择一个薄弱点生成练习');
      setText('practiceBuilderDescription', '从上方薄弱点中选择后，AI 会按错因生成可直接指派的练习。');
      setText('practiceState', '待选择');
      body.innerHTML = '<div class="practice-empty">老师不需要自己出题：选择一个全班薄弱点，AI 会自动生成对应练习。</div>';
      return;
    }
    var plan = practicePlan(state.practice.diagnosisId);
    setText('practiceBuilderTitle', plan.title);
    setText('practiceBuilderDescription', plan.objective);
    if (status === 'generating') {
      setText('practiceState', '生成中');
      body.innerHTML = '<div class="practice-loading" role="status"><span></span><span></span><span></span><p>正在结合错题归因生成针对性题目...</p></div>';
      return;
    }
    setText('practiceState', status === 'assigned' ? '已指派' : '可指派');
    body.innerHTML =
      '<div class="practice-toolbar">' +
        '<label for="practiceCount">题量 <strong id="practiceCountValue">' + state.practice.count + ' 道</strong></label>' +
        '<input id="practiceCount" type="range" min="3" max="8" step="1" value="' + state.practice.count + '" aria-label="调整补充练习题量" />' +
      '</div>' +
      '<ol class="practice-questions" id="practiceQuestionList"></ol>' +
      '<div class="practice-actions">' +
        '<button class="soft-button" type="button" data-practice-action="edit">编辑后指派</button>' +
        '<button class="primary-button" type="button" data-practice-action="assign"' + (status === 'assigned' ? ' disabled' : '') + '>' +
          (status === 'assigned' ? '已加入任务队列' : '一键指派给当前班级') +
        '</button>' +
      '</div>';
    renderPracticeQuestionList();
  }

  function startPracticeGeneration(diagnosisId) {
    if (!diagnosisId) return;
    if (generationTimer) window.clearTimeout(generationTimer);
    state.practice.diagnosisId = diagnosisId;
    state.practice.count = 5;
    state.draftPractice = null;
    var automation = automationFor();
    automation.practiceStatus = 'generating';
    automation.reminderStatus = 'idle';
    renderBottlenecks(cohortStudents());
    renderWorkflow(cohortStudents());
    renderPractice();
    focusSection('practiceBuilder');
    generationTimer = window.setTimeout(function () {
      automation.generatedSets += 1;
      automation.practiceStatus = 'ready';
      generationTimer = null;
      renderMetrics(cohortStudents());
      renderBottlenecks(cohortStudents());
      renderWorkflow(cohortStudents());
      renderPractice();
      renderReport(cohortStudents());
      pulseInsight();
      showToast('补充练习已按错因生成');
    }, prefersReducedMotion() ? 0 : 900);
  }

  function fillAssignmentFromPractice() {
    if (!state.practice.diagnosisId) return;
    var plan = practicePlan(state.practice.diagnosisId);
    var questions = practiceQuestions(state.practice.diagnosisId, state.practice.count);
    var pointSelect = document.getElementById('assignmentPoint');
    ensureSelectOption(pointSelect, diagnosisFor(state.practice.diagnosisId).concept);
    document.getElementById('assignmentTarget').value = state.cohort;
    document.getElementById('assignmentCourse').value = 'Coordinate Geometry';
    pointSelect.value = diagnosisFor(state.practice.diagnosisId).concept;
    document.getElementById('assignmentContent').value = questions.map(function (question, index) {
      return (index + 1) + '. ' + question;
    }).join('\n');
    state.draftPractice = {
      diagnosisId: state.practice.diagnosisId,
      title: plan.title,
      questionCount: state.practice.count
    };
    focusSection('assignments');
    showToast('AI 练习已填入指派表单');
  }

  function markPracticeAssigned() {
    var automation = automationFor();
    if (automation.practiceStatus !== 'assigned') automation.assignedSets += 1;
    automation.practiceStatus = 'assigned';
    automation.reminderStatus = 'idle';
    state.draftPractice = null;
    renderMetrics(cohortStudents());
    renderAssignments();
    renderWorkflow(cohortStudents());
    renderPractice();
    renderReport(cohortStudents());
  }

  function assignPracticeNow() {
    if (!state.practice.diagnosisId || automationFor().practiceStatus !== 'ready') return;
    var concept = diagnosisFor(state.practice.diagnosisId).concept;
    var questions = practiceQuestions(state.practice.diagnosisId, state.practice.count);
    var cohort = COHORTS[state.cohort] || COHORTS['math-8a'];
    assignments.unshift({
      target: cohort.label,
      course: 'Coordinate Geometry',
      point: concept,
      due: document.getElementById('assignmentDue').value,
      created: '刚刚',
      source: 'AI 补充练习',
      questionCount: questions.length,
      content: questions
    });
    markPracticeAssigned();
    showToast('已将 ' + questions.length + ' 道补充练习指派给 ' + cohort.label);
  }

  function renderInterventions(students) {
    var rows = filteredStudents(students).sort(function (a, b) {
      var weight = { high: 3, medium: 2, low: 1 };
      return (weight[b.risk] - weight[a.risk]) || (a.progress - b.progress);
    });
    var body = document.getElementById('interventionRows');
    if (!rows.length) {
      body.innerHTML = '<tr><td colspan="5"><div class="empty-state">没有符合筛选条件的学习者。</div></td></tr>';
      return;
    }
    body.innerHTML = rows.map(function (s) {
      var diag = diagnosisFor(s.stuck);
      return '<tr class="risk-row risk-row--' + s.risk + '">' +
        '<td data-label="学习者"><div class="student-cell"><span class="student-avatar">' + LEARNER_AVATAR + '</span><div><strong>' + s.name + '</strong><span>' + s.team + ' · ' + s.lastSeen + '</span></div></div></td>' +
        '<td data-label="进度"><div class="progress-cell"><strong>' + s.progress + '%</strong><span class="progress-track"><i style="width:' + s.progress + '%"></i></span></div></td>' +
        '<td data-label="卡点知识点"><div class="diagnosis-cell"><strong>' + diag.concept + '</strong><span>' + s.attempts + ' 次作答 · 正确率 ' + s.accuracy + '%</span></div></td>' +
        '<td data-label="AI 归因"><span class="risk-pill risk-' + s.risk + '">' + riskLabel(s.risk) + '</span><div class="diagnosis-cell"><span>' + diag.source + '</span></div></td>' +
        '<td data-label="人工处理建议">' + diag.recommendation + '</td>' +
      '</tr>';
    }).join('');
  }

  function renderAssignments() {
    var wrap = document.getElementById('assignmentFeed');
    wrap.innerHTML = assignments.map(function (item) {
      var source = item.source || '常规任务';
      var count = item.questionCount ? ' · ' + item.questionCount + ' 道题' : '';
      return '<div class="assignment-item' + (item.created === '刚刚' ? ' is-new' : '') + '">' +
        '<div><span class="assignment-source">' + source + count + '</span><h4>' + item.point + '</h4><p>' + item.target + ' · ' + item.course + '</p></div>' +
        '<time>截止 ' + item.due + '</time>' +
      '</div>';
    }).join('');
  }

  function renderReport(students) {
    var cohort = COHORTS[state.cohort] || COHORTS['math-8a'];
    var avg = average(students, 'progress');
    var stats = cohortStats(students);
    var top = bottlenecks(students)[0];
    setText('reportCohort', cohort.label + ' · ' + cohort.summary);
    setText('reportDate', new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }));
    setText('reportProgress', avg + '%');
    setText('reportTimeSaved', formatHours(stats.timeSavedMinutes));
    setText('reportAutoGraded', stats.autoGraded + ' 份');
    setText('reportCoverage', stats.coverage + '%');
    setText('reportPractices', stats.generatedSets + ' 套');
    setText('reportRisk', String(stats.manual));
    document.getElementById('reportNarrative').innerHTML =
      '<p>本周期共覆盖 ' + students.length + ' 名学习者，AI 已自动批改 ' + stats.autoGraded + ' 份提交，处理覆盖率 ' + stats.coverage + '%，并生成 ' + stats.generatedSets + ' 套补充练习。</p>' +
      '<p>按每份批改节省 2 分钟、每套练习节省 15 分钟估算，本周期累计节省 <strong>' + formatHours(stats.timeSavedMinutes) + '</strong>。主要薄弱点为 <strong>' + (top ? top.concept : '暂无明显薄弱点') + '</strong>，仅 ' + stats.manual + ' 人需要老师人工介入。</p>';
  }

  function render() {
    var students = cohortStudents();
    var cohort = COHORTS[state.cohort] || COHORTS['math-8a'];
    setText('overviewSub', cohort.label + ' · ' + cohort.summary);
    renderMetrics(students);
    renderDistribution(students);
    renderBottlenecks(students);
    renderInsight(students);
    renderWorkflow(students);
    renderPractice();
    renderInterventions(students);
    renderAssignments();
    renderReport(students);
  }

  function showToast(message) {
    if (window.SY && SY.toast) {
      SY.toast(message);
      return;
    }
    var toast = document.getElementById('teacherToast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  function exportCSV() {
    var students = cohortStudents();
    var cohort = COHORTS[state.cohort] || COHORTS['math-8a'];
    var stats = cohortStats(students);
    var rows = [
      ['ShareYou 教学 ROI 报告', cohort.label],
      ['报告周期', new Date().toLocaleDateString('zh-CN')],
      ['预计节省时间', formatHours(stats.timeSavedMinutes)],
      ['自动批改份数', stats.autoGraded],
      ['AI 处理覆盖率', stats.coverage + '%'],
      ['已生成补充练习', stats.generatedSets + ' 套'],
      ['待人工介入', stats.manual + ' 人'],
      ['估算口径', '每份自动批改 2 分钟；每套自动生成练习 15 分钟'],
      [],
      ['班级/团队', '学习者', '分组', '进度', '风险', 'AI 错题归因', '作答次数', '正确率', '最近学习']
    ];
    students.forEach(function (s) {
      rows.push([cohort.label, s.name, s.team, s.progress + '%', riskLabel(s.risk), diagnosisFor(s.stuck).concept, s.attempts, s.accuracy + '%', s.lastSeen]);
    });
    var csv = rows.map(function (row) {
      return row.map(function (cell) {
        return '"' + String(cell).replace(/"/g, '""') + '"';
      }).join(',');
    }).join('\n');
    var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'shareyou-progress-' + state.cohort + '.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('进度报告 CSV 已生成');
  }

  function setDefaultDueDate() {
    var input = document.getElementById('assignmentDue');
    var date = new Date();
    date.setDate(date.getDate() + 7);
    input.value = date.toISOString().slice(0, 10);
  }

  function wireMenu() {
    var ham = document.querySelector('.hamburger');
    var dd = document.querySelector('.menu__dropdown');
    if (!ham || !dd) return;
    function setOpen(open) {
      dd.hidden = !open;
      ham.classList.toggle('is-open', open);
      ham.setAttribute('aria-expanded', open);
    }
    ham.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(dd.hidden);
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.menu')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function wireScrollReveal() {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    var targets = document.querySelectorAll('.metric-grid, .automation-panel, .dashboard-grid, .practice-builder, #interventions, #assignments, #reports');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        if (entry.target.classList.contains('metric-grid')) animateMetricCards();
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (target, index) {
      target.classList.add('reveal-item');
      target.style.setProperty('--reveal-delay', ((index % 3) * 55) + 'ms');
      observer.observe(target);
    });
  }

  function wireNavScrollState() {
    var nav = document.querySelector('.teacher-page .nav');
    if (!nav) return;
    var ticking = false;
    function update() {
      nav.classList.toggle('is-scrolled', window.scrollY > 18);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function renderWithTransition() {
    var app = document.getElementById('teacherApp');
    if (!app || prefersReducedMotion()) {
      render();
      return;
    }
    app.classList.add('is-transitioning');
    window.setTimeout(function () {
      render();
      requestAnimationFrame(function () { app.classList.remove('is-transitioning'); });
    }, 120);
  }

  function focusSection(id) {
    var target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
  function wireControls() {
    document.getElementById('cohortSelect').addEventListener('change', function (e) {
      if (generationTimer) {
        window.clearTimeout(generationTimer);
        generationTimer = null;
      }
      automationFor().practiceStatus = 'idle';
      state.cohort = e.target.value;
      state.practice = { diagnosisId: null, count: 5 };
      state.draftPractice = null;
      state.query = '';
      document.getElementById('studentSearch').value = '';
      document.getElementById('assignmentContent').value = '';
      document.getElementById('assignmentTarget').value = state.cohort;
      renderWithTransition();
    });
    document.getElementById('riskFilter').addEventListener('change', function (e) {
      state.risk = e.target.value;
      renderInterventions(cohortStudents());
    });
    document.getElementById('studentSearch').addEventListener('input', function (e) {
      state.query = e.target.value;
      renderInterventions(cohortStudents());
    });
    document.getElementById('refreshDiagnosis').addEventListener('click', function () {
      var button = this;
      button.classList.add('is-working');
      renderMetrics(cohortStudents());
      renderBottlenecks(cohortStudents());
      renderInsight(cohortStudents());
      renderWorkflow(cohortStudents());
      pulseInsight();
      window.setTimeout(function () { button.classList.remove('is-working'); }, 650);
      showToast('自动批改与错题归因结果已刷新');
    });
    document.getElementById('jumpInterventions').addEventListener('click', function () {
      focusSection('automation');
    });
    document.getElementById('workflowSteps').addEventListener('click', function (e) {
      var button = e.target.closest('[data-remind-incomplete]');
      if (!button) return;
      remindIncompleteLearners();
    });
    document.getElementById('bottleneckList').addEventListener('click', function (e) {
      var button = e.target.closest('[data-generate-practice]');
      if (!button) return;
      var diagnosisId = button.getAttribute('data-generate-practice');
      var status = automationFor().practiceStatus;
      if (state.practice.diagnosisId === diagnosisId && (status === 'ready' || status === 'assigned')) {
        focusSection('practiceBuilder');
        return;
      }
      startPracticeGeneration(diagnosisId);
    });
    document.getElementById('practiceBuilder').addEventListener('input', function (e) {
      if (e.target.id !== 'practiceCount') return;
      state.practice.count = parseInt(e.target.value, 10) || 5;
      setText('practiceCountValue', state.practice.count + ' 道');
      renderPracticeQuestionList();
      renderWorkflow(cohortStudents());
    });
    document.getElementById('practiceBuilder').addEventListener('click', function (e) {
      var button = e.target.closest('[data-practice-action]');
      if (!button) return;
      if (button.getAttribute('data-practice-action') === 'edit') fillAssignmentFromPractice();
      if (button.getAttribute('data-practice-action') === 'assign') assignPracticeNow();
    });
    document.getElementById('assignmentForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var targetKey = document.getElementById('assignmentTarget').value;
      var content = document.getElementById('assignmentContent').value.trim();
      var questionCount = content ? content.split(/\n+/).filter(Boolean).length : 0;
      assignments.unshift({
        target: (COHORTS[targetKey] || COHORTS['math-8a']).label,
        course: document.getElementById('assignmentCourse').value,
        point: document.getElementById('assignmentPoint').value,
        due: document.getElementById('assignmentDue').value,
        created: '刚刚',
        source: state.draftPractice ? 'AI 补充练习' : '常规任务',
        questionCount: questionCount,
        content: content
      });
      if (state.draftPractice && automationFor().practiceStatus === 'ready') {
        markPracticeAssigned();
      } else {
        renderAssignments();
      }
      state.draftPractice = null;
      document.getElementById('assignmentContent').value = '';
      pulseInsight();
      showToast('任务已发布到 ' + ((COHORTS[targetKey] || COHORTS['math-8a']).label));
    });
    document.querySelectorAll('[data-report-export]').forEach(function (button) {
      button.addEventListener('click', exportCSV);
    });
    document.querySelectorAll('[data-report-print]').forEach(function (button) {
      button.addEventListener('click', function () { window.print(); });
    });
    document.querySelectorAll('[data-scroll-target]').forEach(function (button) {
      button.addEventListener('click', function () {
        document.querySelectorAll('[data-scroll-target]').forEach(function (b) { b.classList.remove('is-active'); });
        button.classList.add('is-active');
        focusSection(button.getAttribute('data-scroll-target'));
      });
    });
  }

  function boot() {
    renderSelectors();
    setDefaultDueDate();
    wireMenu();
    wireControls();
    wireScrollReveal();
    render();
    wireNavScrollState();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
