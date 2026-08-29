(function () {
  "use strict";

  const APP_VERSION = "v0.9.1";
  const STORAGE_KEY = "goose-choose-state-v1";
  const LANGUAGE_KEY = "goose-choose-language";
  const THEME_KEY = "goose-choose-theme";
  const UPDATE_LOG = [
    {
      version: "v0.9.1",
      date: "2026-08-29",
      items: {
        en: [
          "Fixed UI issue on mobile and tablet where the header was not properly blending in"
        ],
        ko: [
          "모바일 및 태블릿에서 헤더가 자연스럽게 어우러지지 않던 UI 문제 수정"
        ],
        ga: [
          "Ceartaíodh fadhb UI ar fhón póca agus ar tháibléad nach raibh an ceanntásc ag cumasc isteach i gceart"
        ]
      }
    },
    {
      version: "v0.9",
      date: "2026-08-22",
      items: {
        en: [
          "Appearance toggle: switch between light mode, dark mode, or your system default",
          "Markdown file uploads: continue working on a decision by uploading a previously downloaded Markdown file",
          "Custom decision fields: replace the fixed yea/nay labels with your own options for greater flexibility",
          "Fixed Irish naming inconsistency",
          "Enabled update log",
          "Fixed inconsistencies with the tablet and mobile web versions of the tool"
        ],
        ko: [
          "화면 표시 전환: 라이트 모드, 다크 모드 또는 시스템 기본값 중에서 선택",
          "마크다운 파일 업로드: 이전에 다운로드한 마크다운 파일을 업로드해 결정 작업 계속하기",
          "사용자 지정 결정 필드: 고정된 yea/nay 라벨을 원하는 선택지로 바꾸기",
          "아일랜드어 이름 불일치 수정",
          "업데이트 기록 활성화",
          "태블릿 및 모바일 웹 버전의 도구 불일치 수정"
        ],
        ga: [
          "Scorán cuma: aistrigh idir mód geal, mód dorcha, nó réamhshocrú do chórais",
          "Uaslódálacha comhad Markdown: lean ar aghaidh le cinneadh trí chomhad Markdown a íoslódáladh roimhe seo a uaslódáil",
          "Réimsí cinnidh saincheaptha: cuir do roghanna féin in áit na lipéad seasta yea/nay le haghaidh níos mó solúbthachta",
          "Ceartaíodh neamh-chomhsheasmhacht ainmniúcháin na Gaeilge",
          "Cumasaíodh loga nuashonruithe",
          "Ceartaíodh neamh-chomhsheasmhachtaí i leaganacha táibléid agus gréasáin soghluaiste na huirlise"
        ]
      }
    },
    {
      version: "v0.8",
      date: "2026-08-21",
      items: {
        en: [
          "MVP baseline version; make decisions using yea and nay as the default options",
          "Core site functionality established",
          "English as the default language; Korean and Irish translations offered",
          "Markdown file downloads to retain your decision-making process"
        ],
        ko: [
          "MVP 기준 버전: yea와 nay를 기본 선택지로 사용해 결정하기",
          "핵심 사이트 기능 구축",
          "영어를 기본 언어로 제공하고 한국어와 아일랜드어 번역 제공",
          "결정 과정을 보관할 수 있는 마크다운 파일 다운로드"
        ],
        ga: [
          "Leagan bonnlíne MVP; déan cinntí le yea agus nay mar na roghanna réamhshocraithe",
          "Bunaíodh príomhfheidhmiúlacht an tsuímh",
          "Béarla mar an teanga réamhshocraithe; aistriúcháin Chóiréise agus Ghaeilge ar fáil",
          "Íoslódálacha comhad Markdown chun do phróiseas cinnteoireachta a choinneáil"
        ]
      }
    }
  ];

  const translations = {
    en: {
      addPointButton: "Add point",
      addPointHeading: "Add a point",
      addPointHelp: "Write one consideration, choose its score, and Goose Choose will place it in the right column.",
      appName: "Goose Choose",
      balancedHint: "The considerations are balancing each other for now.",
      chooseScore: "Choose score",
      clearAll: "Clear all",
      comingSoon: "Coming soon",
      confirmClear: "Clear this decision and all points?",
      decisionHelp: "This should be a decision you can answer with a yea or a nay.",
      decisionLabel: "Decision",
      decisionPlaceholder: "Start typing here…",
      decisionPrompt: "What should the goose choose?",
      customNegativePlaceholder: "Option 1",
      customPositivePlaceholder: "Option 2",
      customDecisionHelp: "This decision is between {negative} and {positive}.",
      customScoringHelp: "Score each point from -5 (strongly {negative}) to +5 (strongly {positive}).",
      definitelyNay: "Definitely Nay",
      definitelyYay: "Definitely Yea",
      dragToReorder: "Drag to reorder",
      exportMarkdown: "Export Markdown",
      exportEmptyDecision: "Enter a decision before exporting.",
      exportTitle: "{appName} Decision",
      loadMarkdown: "Load Markdown",
      loadMarkdownInvalid: "This Markdown file does not include Goose Choose state.",
      loadMarkdownReady: "Decision loaded",
      leaningHint: "The weighted points currently lean {direction}.",
      moveDown: "Move point down",
      moveUp: "Move point up",
      modeCustom: "Custom",
      modeDefault: "Yea & Nay",
      nay: "Nay",
      nayArrow: "← Nay",
      nayHelp: "Reasons this might be a bad idea.",
      nayPoints: "Nay points",
      neutral: "Neutral",
      neutralHelp: "Facts or considerations that don't push either way.",
      neutralPoints: "Neutral points",
      noScoreHint: "Add considerations to help the goose choose.",
      pointDescription: "Point description",
      pointPlaceholder: "Add a consideration",
      pointScore: "Point score",
      privacy: "Privacy Policy",
      range: "Range: {min} to {max}",
      removePoint: "Delete point",
      resultLabelExport: "Result",
      resultHeading: "The goose is leaning...",
      scoreFor: "Score for {point}",
      scoringHeading: "Scoring guide",
      scoringHelp: "Score each point from -5 (strongly nay) to +5 (strongly yea).",
      stronglyNay: "Strongly Nay",
      stronglyYay: "Strongly Yea",
      terms: "Terms of Service",
      themeDark: "Dark",
      themeLight: "Light",
      themeSystem: "System",
      totalScore: "Total score",
      updateLog: "Update Log",
      versionLabel: "Version",
      yay: "Yea",
      yayArrow: "Yea →",
      yayHelp: "Reasons this might be a good idea.",
      yayPoints: "Yea points",
      lockedNotice: "Enter a decision above to start adding points."
    },
    ko: {
      addPointButton: "포인트 추가",
      addPointHeading: "포인트 추가",
      addPointHelp: "고려할 내용을 하나 적고 점수를 고르면 구스추즈가 알맞은 칸에 넣어줍니다.",
      appName: "구스추즈",
      balancedHint: "현재 고려 사항들이 서로 균형을 이루고 있어요.",
      chooseScore: "점수 선택",
      clearAll: "모두 지우기",
      comingSoon: "곧 제공됩니다",
      confirmClear: "이 결정과 모든 포인트를 지울까요?",
      decisionHelp: "이 결정은 찬성 또는 반대로 답할 수 있어야 합니다.",
      decisionLabel: "결정",
      decisionPlaceholder: "여기에 입력하세요…",
      decisionPrompt: "거위가 무엇을 고르면 좋을까요?",
      customNegativePlaceholder: "선택지 1",
      customPositivePlaceholder: "선택지 2",
      customDecisionHelp: "이 결정은 {negative}와 {positive} 사이의 선택입니다.",
      customScoringHelp: "각 포인트를 -5(강한 {negative})부터 +5(강한 {positive})까지 점수로 매겨보세요.",
      definitelyNay: "확실히 반대",
      definitelyYay: "확실히 찬성",
      dragToReorder: "드래그해서 순서 바꾸기",
      exportMarkdown: "마크다운 내보내기",
      exportEmptyDecision: "내보내기 전에 결정을 입력하세요.",
      exportTitle: "{appName} 결정",
      loadMarkdown: "마크다운 불러오기",
      loadMarkdownInvalid: "이 마크다운 파일에는 구스추즈 상태가 포함되어 있지 않습니다.",
      loadMarkdownReady: "결정을 불러왔습니다",
      leaningHint: "가중치를 더한 포인트는 현재 {direction} 쪽으로 기울고 있어요.",
      moveDown: "포인트 아래로 이동",
      moveUp: "포인트 위로 이동",
      modeCustom: "직접 입력",
      modeDefault: "찬성 & 반대",
      nay: "반대",
      nayArrow: "← 반대",
      nayHelp: "좋지 않은 선택일 수 있는 이유.",
      nayPoints: "반대 포인트",
      neutral: "중립",
      neutralHelp: "어느 쪽으로도 크게 기울지 않는 사실이나 고려 사항.",
      neutralPoints: "중립 포인트",
      noScoreHint: "고려 사항을 추가해서 거위가 선택하도록 도와주세요.",
      pointDescription: "포인트 설명",
      pointPlaceholder: "고려 사항 추가",
      pointScore: "포인트 점수",
      privacy: "개인정보 처리방침",
      range: "범위: {min}부터 {max}까지",
      removePoint: "포인트 삭제",
      resultLabelExport: "결과",
      resultHeading: "거위의 선택은...",
      scoreFor: "{point}의 점수",
      scoringHeading: "점수 안내",
      scoringHelp: "각 포인트를 -5(강한 반대)부터 +5(강한 찬성)까지 점수로 매겨보세요.",
      stronglyNay: "강한 반대",
      stronglyYay: "강한 찬성",
      terms: "서비스 약관",
      themeDark: "다크",
      themeLight: "라이트",
      themeSystem: "시스템",
      totalScore: "총점",
      updateLog: "업데이트 기록",
      versionLabel: "버전",
      yay: "찬성",
      yayArrow: "찬성 →",
      yayHelp: "좋은 선택일 수 있는 이유.",
      yayPoints: "찬성 포인트",
      lockedNotice: "위에 결정을 입력하면 포인트를 추가할 수 있어요."
    },
    ga: {
      addPointButton: "Cuir pointe leis",
      addPointHeading: "Cuir pointe leis",
      addPointHelp: "Scríobh cúis amháin, roghnaigh a scór, agus cuirfidh Gús Tsús sa cholún ceart í.",
      appName: "Gús Tsús",
      balancedHint: "Tá na cúiseanna ag cothromú a chéile faoi láthair.",
      chooseScore: "Roghnaigh scór",
      clearAll: "Glan gach rud",
      comingSoon: "Ag teacht go luath",
      confirmClear: "An bhfuil fonn ort an cinneadh seo agus na pointí uile a ghlanadh?",
      decisionHelp: "Ba cheart gur cinneadh é seo ar féidir leat yea nó nay a thabhairt air.",
      decisionLabel: "Cinneadh",
      decisionPlaceholder: "Tosaigh ag clóscríobh anseo…",
      decisionPrompt: "Cad ba cheart don ghé a roghnú?",
      customNegativePlaceholder: "Rogha 1",
      customPositivePlaceholder: "Rogha 2",
      customDecisionHelp: "Tá an cinneadh seo idir {negative} agus {positive}.",
      customScoringHelp: "Tabhair scór do gach pointe ó -5 ({negative} láidir) go +5 ({positive} láidir).",
      definitelyNay: "Nay go cinnte",
      definitelyYay: "Yea go cinnte",
      dragToReorder: "Tarraing chun an t-ord a athrú",
      exportMarkdown: "Easpórtáil Markdown",
      exportEmptyDecision: "Cuir cinneadh isteach roimh easpórtáil.",
      exportTitle: "Cinneadh {appName}",
      loadMarkdown: "Lódáil Markdown",
      loadMarkdownInvalid: "Níl staid Gús Tsús sa chomhad Markdown seo.",
      loadMarkdownReady: "Lódáladh an cinneadh",
      leaningHint: "Tá na pointí ualaithe ag claonadh i dtreo {direction} faoi láthair.",
      moveDown: "Bog an pointe síos",
      moveUp: "Bog an pointe suas",
      modeCustom: "Saincheaptha",
      modeDefault: "Yea & Nay",
      nay: "Nay",
      nayArrow: "← Nay",
      nayHelp: "Cúiseanna a d'fhéadfadh é seo a bheith ina dhroch-smaoineamh.",
      nayPoints: "Pointí Nay",
      neutral: "Neodrach",
      neutralHelp: "Fíricí nó cúiseanna nach mbrúnn ceachtar treo.",
      neutralPoints: "Pointí neodracha",
      noScoreHint: "Cuir cúiseanna leis chun cabhrú leis an ngé roghnú.",
      pointDescription: "Cur síos ar an bpointe",
      pointPlaceholder: "Cuir cúis leis",
      pointScore: "Scór an phointe",
      privacy: "Polasaí Príobháideachais",
      range: "Raon: {min} go {max}",
      removePoint: "Scrios an pointe",
      resultLabelExport: "Toradh",
      resultHeading: "Tá an ghé ag claonadh...",
      scoreFor: "Scór do {point}",
      scoringHeading: "Treoir scórála",
      scoringHelp: "Tabhair scór do gach pointe ó -5 (nay láidir) go +5 (yea láidir).",
      stronglyNay: "Nay láidir",
      stronglyYay: "Yea láidir",
      terms: "Téarmaí Seirbhíse",
      themeDark: "Dorcha",
      themeLight: "Geal",
      themeSystem: "Córas",
      totalScore: "Scór iomlán",
      updateLog: "Loga nuashonruithe",
      versionLabel: "Leagan",
      yay: "Yea",
      yayArrow: "Yea →",
      yayHelp: "Cúiseanna a d'fhéadfadh é seo a bheith ina dhea-smaoineamh.",
      yayPoints: "Pointí Yea",
      lockedNotice: "Cuir cinneadh isteach thuas chun pointí a chur leis."
    }
  };

  let state = {
    decision: "",
    decisionMode: "default",
    customLabels: {
      negative: "",
      positive: ""
    },
    points: []
  };

  let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "en";
  if (!translations[currentLanguage]) currentLanguage = "en";
  let currentTheme = localStorage.getItem(THEME_KEY) || "system";
  if (!["light", "dark", "system"].includes(currentTheme)) currentTheme = "system";
  const systemDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const els = {
    decisionInput: document.getElementById("decisionInput"),
    customNegative: document.getElementById("customNegative"),
    customPositive: document.getElementById("customPositive"),
    customLabelFields: document.getElementById("customLabelFields"),
    decisionModeOptions: document.querySelectorAll("[data-mode-choice]"),
    languagePicker: document.getElementById("languagePicker"),
    lockedWorkspace: document.getElementById("lockedWorkspace"),
    addPointForm: document.getElementById("addPointForm"),
    newPointText: document.getElementById("newPointText"),
    newPointScore: document.getElementById("newPointScore"),
    clearAll: document.getElementById("clearAll"),
    loadMarkdown: document.getElementById("loadMarkdown"),
    markdownFileInput: document.getElementById("markdownFileInput"),
    exportMarkdown: document.getElementById("exportMarkdown"),
    updateLogButton: document.getElementById("updateLogButton"),
    updateLogModal: document.getElementById("updateLogModal"),
    updateLogContent: document.getElementById("updateLogContent"),
    closeUpdateLog: document.getElementById("closeUpdateLog"),
    comingSoonTip: document.getElementById("comingSoonTip"),
    themePicker: document.getElementById("themePicker"),
    themeOptions: document.querySelectorAll("[data-theme-choice]"),
    lists: {
      nay: document.getElementById("nayList"),
      neutral: document.getElementById("neutralList"),
      yay: document.getElementById("yayList")
    },
    resultLabel: document.getElementById("resultLabel"),
    resultDecision: document.getElementById("resultDecision"),
    resultHint: document.getElementById("resultHint"),
    totalScore: document.getElementById("totalScore"),
    scoreRange: document.getElementById("scoreRange"),
    mainGoose: document.getElementById("mainGoose"),
    gooseMarker: document.getElementById("gooseMarker")
  };

  const scoreOptions = Array.from({ length: 11 }, (_, index) => index - 5);

  function t(key, replacements = {}) {
    const dictionary = translations[currentLanguage] || translations.en;
    let value = dictionary[key] || translations.en[key] || key;
    for (const [name, replacement] of Object.entries(replacements)) {
      value = value.replace(`{${name}}`, replacement);
    }
    return value;
  }

  function currentLocale() {
    if (currentLanguage === "ko") return "ko-KR";
    if (currentLanguage === "ga") return "ga-IE";
    return "en-US";
  }

  function isCustomMode() {
    return state.decisionMode === "custom";
  }

  function sideLabel(side) {
    if (isCustomMode()) {
      const value = side === "negative" ? state.customLabels.negative : state.customLabels.positive;
      if (value.trim()) return value.trim();
      return side === "negative" ? t("customNegativePlaceholder") : t("customPositivePlaceholder");
    }
    return side === "negative" ? t("nay") : t("yay");
  }

  function sidePointsLabel(side) {
    if (isCustomMode()) return `${sideLabel(side)} points`;
    return side === "negative" ? t("nayPoints") : t("yayPoints");
  }

  function strongSideLabel(side) {
    if (isCustomMode()) return `Strongly ${sideLabel(side)}`;
    return side === "negative" ? t("stronglyNay") : t("stronglyYay");
  }

  function definiteSideLabel(side) {
    if (isCustomMode()) return `Definitely ${sideLabel(side)}`;
    return side === "negative" ? t("definitelyNay") : t("definitelyYay");
  }

  function slightSideLabel(side) {
    if (isCustomMode()) return `Slightly ${sideLabel(side)}`;
    if (currentLanguage === "ko") return side === "negative" ? "약간 반대" : "약간 찬성";
    return side === "negative" ? "Slightly Nay" : "Slightly Yea";
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function classify(score) {
    if (score < 0) return "nay";
    if (score > 0) return "yay";
    return "neutral";
  }

  function formatScore(score) {
    return score > 0 ? `+${score}` : `${score}`;
  }

  function scoreLabel(score) {
    if (score === -5) return `-5 ${strongSideLabel("negative")}`;
    if (score === 5) return `+5 ${strongSideLabel("positive")}`;
    if (score === 0) return `0 ${t("neutral")}`;
    return `${formatScore(score)} ${score < 0 ? sideLabel("negative") : sideLabel("positive")}`;
  }

  function categoryDefaultScore(category, currentScore) {
    const magnitude = Math.max(1, Math.abs(currentScore || 1));
    if (category === "nay") return -magnitude;
    if (category === "yay") return magnitude;
    return 0;
  }

  function calculate(points) {
    const scoredPoints = points.filter((point) => point.score !== 0);
    const actualScore = points.reduce((total, point) => total + point.score, 0);
    const maximumPossibleAbsoluteScore = scoredPoints.length * 5;
    const normalizedScore = maximumPossibleAbsoluteScore
      ? clamp(actualScore / maximumPossibleAbsoluteScore, -1, 1)
      : 0;

    return {
      actualScore,
      maximumPossibleAbsoluteScore,
      normalizedScore,
      scoredCount: scoredPoints.length
    };
  }

  function resultFor(normalizedScore, scoredCount) {
    if (!scoredCount) {
      return {
        label: t("neutral"),
        hint: t("noScoreHint")
      };
    }

    const abs = Math.abs(normalizedScore);
    const direction = normalizedScore < 0 ? "Nay" : "Yay";

    if (abs < 0.08) {
      return {
        label: t("neutral"),
        hint: t("balancedHint")
      };
    }

    let strength = "";
    if (abs >= 0.82) strength = "Definitely ";
    else if (abs >= 0.58) strength = "Strongly ";
    else if (abs < 0.25) strength = "Slightly ";

    const labels = {
      "Definitely Nay": definiteSideLabel("negative"),
      "Strongly Nay": strongSideLabel("negative"),
      "Nay": sideLabel("negative"),
      "Slightly Nay": slightSideLabel("negative"),
      "Slightly Yay": slightSideLabel("positive"),
      "Yay": sideLabel("positive"),
      "Strongly Yay": strongSideLabel("positive"),
      "Definitely Yay": definiteSideLabel("positive")
    };
    const label = labels[`${strength}${direction}`] || `${strength}${direction}`;

    return {
      label,
      hint: t("leaningHint", { direction: normalizedScore < 0 ? sideLabel("negative") : sideLabel("positive") })
    };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function applyLanguage() {
    document.documentElement.lang = currentLanguage === "ko" ? "ko" : currentLanguage === "ga" ? "ga" : "en";
    document.title = t("appName");
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-coming-soon]").forEach((element) => {
      element.setAttribute("title", t("comingSoon"));
    });
    els.comingSoonTip.textContent = t("comingSoon");
  }

  function renderDecisionMode() {
    const custom = isCustomMode();
    els.customLabelFields.hidden = !custom;
    els.customNegative.value = state.customLabels.negative;
    els.customPositive.value = state.customLabels.positive;
    els.decisionModeOptions.forEach((button) => {
      const active = button.dataset.modeChoice === state.decisionMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-i18n='decisionHelp']").forEach((element) => {
      element.textContent = custom
        ? t("customDecisionHelp", { negative: sideLabel("negative"), positive: sideLabel("positive") })
        : t("decisionHelp");
    });
    document.querySelectorAll("[data-i18n='scoringHelp']").forEach((element) => {
      element.textContent = custom
        ? t("customScoringHelp", { negative: sideLabel("negative"), positive: sideLabel("positive") })
        : t("scoringHelp");
    });

    document.querySelectorAll("[data-i18n='nayPoints']").forEach((element) => {
      element.textContent = sidePointsLabel("negative");
    });
    document.querySelectorAll("[data-i18n='yayPoints']").forEach((element) => {
      element.textContent = sidePointsLabel("positive");
    });
    document.querySelectorAll("[data-i18n='stronglyNay']").forEach((element) => {
      element.textContent = strongSideLabel("negative");
    });
    document.querySelectorAll("[data-i18n='stronglyYay']").forEach((element) => {
      element.textContent = strongSideLabel("positive");
    });
    document.querySelectorAll("[data-i18n='definitelyNay']").forEach((element) => {
      element.textContent = definiteSideLabel("negative");
    });
    document.querySelectorAll("[data-i18n='definitelyYay']").forEach((element) => {
      element.textContent = definiteSideLabel("positive");
    });
    document.querySelectorAll("[data-i18n='nayArrow']").forEach((element) => {
      element.textContent = `← ${sideLabel("negative")}`;
    });
    document.querySelectorAll("[data-i18n='yayArrow']").forEach((element) => {
      element.textContent = `${sideLabel("positive")} →`;
    });
    document.getElementById("nayList").setAttribute("aria-label", sidePointsLabel("negative"));
    document.getElementById("yayList").setAttribute("aria-label", sidePointsLabel("positive"));
  }

  function resolvedTheme() {
    return currentTheme === "system"
      ? systemDarkQuery.matches ? "dark" : "light"
      : currentTheme;
  }

  function updateThemeColor() {
    const themeColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--theme-color")
      .trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColor);
  }

  function applyTheme() {
    const theme = resolvedTheme();
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themePreference = currentTheme;
    document.documentElement.style.colorScheme = theme;
    updateThemeColor();
    els.themeOptions.forEach((button) => {
      const active = button.dataset.themeChoice === currentTheme;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    els.themePicker.value = currentTheme;
  }

  function renderNewPointScoreOptions() {
    const selectedValue = els.newPointScore.value;
    els.newPointScore.innerHTML = "";

    const prompt = document.createElement("option");
    prompt.value = "";
    prompt.textContent = t("chooseScore");
    els.newPointScore.append(prompt);

    for (const value of scoreOptions) {
      const option = document.createElement("option");
      option.value = String(value);
      option.textContent = scoreLabel(value);
      els.newPointScore.append(option);
    }

    els.newPointScore.value = selectedValue;
  }

  function hasDecision() {
    return state.decision.trim().length > 0;
  }

  function renderLockState() {
    const locked = !hasDecision();
    els.lockedWorkspace.classList.toggle("is-locked", locked);
    els.lockedWorkspace.setAttribute("aria-disabled", String(locked));
    els.lockedWorkspace.querySelectorAll("input, select, button").forEach((control) => {
      control.disabled = locked;
    });
  }

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored && Array.isArray(stored.points)) {
        state = {
          decision: typeof stored.decision === "string" ? stored.decision : "",
          decisionMode: stored.decisionMode === "custom" ? "custom" : "default",
          customLabels: {
            negative: typeof stored.customLabels?.negative === "string" ? stored.customLabels.negative : "",
            positive: typeof stored.customLabels?.positive === "string" ? stored.customLabels.positive : ""
          },
          points: stored.points
            .filter((point) => typeof point.text === "string" && Number.isFinite(Number(point.score)))
            .map((point) => ({
              id: point.id || crypto.randomUUID(),
              text: point.text,
              score: clamp(Number(point.score), -5, 5)
            }))
        };
      }
    } catch {
      state = { decision: "", decisionMode: "default", customLabels: { negative: "", positive: "" }, points: [] };
    }
  }

  function hasMeaningfulData() {
    return state.decision.trim() || state.points.length;
  }

  function reorderPoint(id, direction) {
    const point = state.points.find((item) => item.id === id);
    if (!point) return;

    const category = classify(point.score);
    const ids = state.points.filter((item) => classify(item.score) === category).map((item) => item.id);
    const currentCategoryIndex = ids.indexOf(id);
    const swapId = ids[currentCategoryIndex + direction];
    if (!swapId) return;

    const currentGlobalIndex = state.points.findIndex((item) => item.id === id);
    const swapGlobalIndex = state.points.findIndex((item) => item.id === swapId);
    const next = [...state.points];
    [next[currentGlobalIndex], next[swapGlobalIndex]] = [next[swapGlobalIndex], next[currentGlobalIndex]];
    state.points = next;
    update();
  }

  function createPointElement(point) {
    const li = document.createElement("li");
    li.className = "point-item";
    li.draggable = true;
    li.dataset.id = point.id;

    const handle = document.createElement("span");
    handle.className = "drag-handle";
    handle.textContent = "⋮⋮";
    handle.setAttribute("aria-label", t("dragToReorder"));

    const main = document.createElement("div");
    main.className = "point-main";

    const input = document.createElement("input");
    input.className = "point-text";
    input.type = "text";
    input.value = point.text;
    input.placeholder = t("pointPlaceholder");
    input.setAttribute("aria-label", t("pointDescription"));
    input.addEventListener("input", () => {
      point.text = input.value;
      saveState();
    });

    const controls = document.createElement("div");
    controls.className = "point-controls";

    const select = document.createElement("select");
    select.className = "score-select";
    select.setAttribute("aria-label", t("scoreFor", { point: point.text || t("pointDescription") }));

    for (const value of scoreOptions) {
      const option = document.createElement("option");
      option.value = String(value);
      option.textContent = scoreLabel(value);
      option.selected = value === point.score;
      select.append(option);
    }

    select.addEventListener("change", () => {
      point.score = Number(select.value);
      update();
    });

    controls.append(select);
    main.append(input, controls);

    const actions = document.createElement("div");
    actions.className = "item-actions";

    const up = document.createElement("button");
    up.type = "button";
    up.className = "move-button";
    up.textContent = "↑";
    up.setAttribute("aria-label", t("moveUp"));
    up.addEventListener("click", () => reorderPoint(point.id, -1));

    const down = document.createElement("button");
    down.type = "button";
    down.className = "move-button";
    down.textContent = "↓";
    down.setAttribute("aria-label", t("moveDown"));
    down.addEventListener("click", () => reorderPoint(point.id, 1));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", t("removePoint"));
    remove.addEventListener("click", () => {
      state.points = state.points.filter((item) => item.id !== point.id);
      update();
    });

    actions.append(up, down, remove);
    li.append(handle, main, actions);

    li.addEventListener("dragstart", (event) => {
      li.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", point.id);
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");
    });

    return li;
  }

  function renderLists() {
    for (const [category, list] of Object.entries(els.lists)) {
      list.innerHTML = "";
      const points = state.points.filter((point) => classify(point.score) === category);

      if (!points.length) {
        continue;
      }

      for (const point of points) {
        list.append(createPointElement(point));
      }
    }
  }

  function renderResult() {
    const result = calculate(state.points);
    const copy = resultFor(result.normalizedScore, result.scoredCount);
    const markerPercent = ((result.normalizedScore + 1) / 2) * 100;

    els.resultLabel.textContent = copy.label;
    els.resultDecision.textContent = isCustomMode()
      ? `${state.decision.trim()} (${sideLabel("negative")} / ${sideLabel("positive")})`
      : state.decision.trim();
    els.resultHint.textContent = copy.hint;
    els.totalScore.textContent = formatScore(result.actualScore);
    els.scoreRange.textContent = t("range", {
      min: formatScore(-result.maximumPossibleAbsoluteScore),
      max: formatScore(result.maximumPossibleAbsoluteScore)
    });
    els.gooseMarker.style.left = `${markerPercent}%`;
    els.mainGoose.style.setProperty("--goose-offset", `${result.normalizedScore * 78}%`);
  }

  function update() {
    saveState();
    renderDecisionMode();
    renderLists();
    renderResult();
    renderLockState();
  }

  function addPoint(score) {
    const text = els.newPointText.value.trim();
    const point = {
      id: crypto.randomUUID(),
      text,
      score
    };

    state.points.push(point);
    els.newPointText.value = "";
    els.newPointScore.value = "";
    update();

    const input = document.querySelector(`[data-id="${point.id}"] .point-text`);
    if (input) input.focus();
  }

  function slugify(value) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "goose-choose";
  }

  function encodeStateBlock(value) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
  }

  function decodeStateBlock(value) {
    return JSON.parse(decodeURIComponent(escape(atob(value.trim()))));
  }

  function exportableState() {
    return {
      app: "goose-choose",
      version: APP_VERSION,
      language: currentLanguage,
      theme: currentTheme,
      decision: state.decision,
      decisionMode: state.decisionMode,
      customLabels: state.customLabels,
      points: state.points.map((point) => ({
        id: point.id,
        text: point.text,
        score: point.score
      }))
    };
  }

  function normalizeImportedState(imported) {
    if (!imported || imported.app !== "goose-choose" || !Array.isArray(imported.points)) return null;

    return {
      language: translations[imported.language] ? imported.language : currentLanguage,
      theme: ["light", "dark", "system"].includes(imported.theme) ? imported.theme : currentTheme,
      decision: typeof imported.decision === "string" ? imported.decision : "",
      decisionMode: imported.decisionMode === "custom" ? "custom" : "default",
      customLabels: {
        negative: typeof imported.customLabels?.negative === "string" ? imported.customLabels.negative : "",
        positive: typeof imported.customLabels?.positive === "string" ? imported.customLabels.positive : ""
      },
      points: imported.points
        .filter((point) => typeof point.text === "string" && Number.isFinite(Number(point.score)))
        .map((point) => ({
          id: point.id || crypto.randomUUID(),
          text: point.text,
          score: clamp(Number(point.score), -5, 5)
        }))
    };
  }

  function parseMarkdownState(markdown) {
    const match = markdown.match(/<!--\s*goose-choose-state\s*([A-Za-z0-9+/=\s]+?)\s*-->/);
    if (!match) return null;

    try {
      return normalizeImportedState(decodeStateBlock(match[1]));
    } catch {
      return null;
    }
  }

  function markdownSection(title, points) {
    const lines = [`## ${title}`];
    if (!points.length) {
      lines.push("");
      lines.push("_None_");
      return lines.join("\n");
    }

    for (const point of points) {
      lines.push(`- ${point.text || t("pointDescription")} (${formatScore(point.score)})`);
    }

    return lines.join("\n");
  }

  function buildMarkdownExport() {
    const result = calculate(state.points);
    const copy = resultFor(result.normalizedScore, result.scoredCount);
    const min = formatScore(-result.maximumPossibleAbsoluteScore);
    const max = formatScore(result.maximumPossibleAbsoluteScore);
    const groups = {
      nay: state.points.filter((point) => classify(point.score) === "nay"),
      neutral: state.points.filter((point) => classify(point.score) === "neutral"),
      yay: state.points.filter((point) => classify(point.score) === "yay")
    };

    return [
      "<!-- goose-choose-state",
      encodeStateBlock(exportableState()),
      "-->",
      "",
      `# ${t("exportTitle", { appName: t("appName") })}`,
      "",
      `**${t("versionLabel")}:** ${APP_VERSION}`,
      `**${t("decisionLabel")}:** ${state.decision.trim()}`,
      `**${t("resultLabelExport")}:** ${copy.label}`,
      `**${t("totalScore")}:** ${formatScore(result.actualScore)}`,
      `**${t("range", { min, max })}**`,
      "",
      markdownSection(sidePointsLabel("negative"), groups.nay),
      "",
      markdownSection(t("neutralPoints"), groups.neutral),
      "",
      markdownSection(sidePointsLabel("positive"), groups.yay),
      ""
    ].join("\n");
  }

  function exportMarkdown() {
    if (!hasDecision()) {
      showComingSoon(els.exportMarkdown, t("exportEmptyDecision"));
      els.decisionInput.focus();
      return;
    }

    const blob = new Blob([buildMarkdownExport()], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(state.decision)}-${APP_VERSION}.md`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function loadMarkdownFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imported = parseMarkdownState(String(reader.result || ""));
      if (!imported) {
        showComingSoon(els.loadMarkdown, t("loadMarkdownInvalid"));
        return;
      }

      currentLanguage = imported.language;
      currentTheme = imported.theme;
      localStorage.setItem(LANGUAGE_KEY, currentLanguage);
      localStorage.setItem(THEME_KEY, currentTheme);
      state = {
        decision: imported.decision,
        decisionMode: imported.decisionMode,
        customLabels: imported.customLabels,
        points: imported.points
      };
      els.languagePicker.value = currentLanguage;
      els.decisionInput.value = state.decision;
      applyLanguage();
      applyTheme();
      renderNewPointScoreOptions();
      update();
      showComingSoon(els.loadMarkdown, t("loadMarkdownReady"));
    });
    reader.readAsText(file);
  }

  function setupDragAndDrop() {
    for (const [category, list] of Object.entries(els.lists)) {
      list.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      });

      list.addEventListener("drop", (event) => {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData("text/plain");
        const targetItem = event.target.closest(".point-item");
        if (!draggedId || draggedId === targetItem?.dataset.id) return;

        const dragged = state.points.find((point) => point.id === draggedId);
        const target = targetItem ? state.points.find((point) => point.id === targetItem.dataset.id) : null;
        if (!dragged) return;

        const next = state.points.filter((point) => point.id !== draggedId);
        const targetIndex = target ? next.findIndex((point) => point.id === target.id) : next.length;
        dragged.score = categoryDefaultScore(category, dragged.score);
        next.splice(targetIndex, 0, dragged);
        state.points = next;
        update();
      });

      list.addEventListener("dragenter", (event) => {
        event.preventDefault();
        list.classList.add("drop-ready");
      });

      list.addEventListener("dragleave", (event) => {
        if (!list.contains(event.relatedTarget)) list.classList.remove("drop-ready");
      });

      list.addEventListener("drop", () => {
        list.classList.remove("drop-ready");
      });
    }
  }

  function setupAssets() {
    document.querySelectorAll("[data-asset]").forEach((img) => {
      const frame = img.closest(".asset-frame");
      img.addEventListener("error", () => frame.classList.add("missing"));
      img.addEventListener("load", () => frame.classList.remove("missing"));
      if (img.complete && img.naturalWidth === 0) frame.classList.add("missing");
    });
  }

  function showComingSoon(target, message = t("comingSoon")) {
    const rect = target.getBoundingClientRect();
    const showBelow = rect.top < 72;
    els.comingSoonTip.textContent = message;
    els.comingSoonTip.style.setProperty("--tip-left", `${rect.left + rect.width / 2}px`);
    els.comingSoonTip.style.setProperty("--tip-top", `${showBelow ? rect.bottom : rect.top}px`);
    els.comingSoonTip.style.setProperty("--tip-y", showBelow ? "0" : "-100%");
    els.comingSoonTip.style.setProperty("--tip-gap", showBelow ? "0.55rem" : "-0.55rem");
    els.comingSoonTip.style.setProperty("--tip-gap-active", showBelow ? "0.85rem" : "-0.85rem");
    els.comingSoonTip.classList.add("show");
    clearTimeout(showComingSoon.timer);
    showComingSoon.timer = setTimeout(() => {
      els.comingSoonTip.classList.remove("show");
    }, 1400);
  }

  function renderUpdateLog() {
    els.updateLogContent.innerHTML = "";
    const dateFormatter = new Intl.DateTimeFormat(currentLocale(), {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    UPDATE_LOG.forEach((release) => {
      const section = document.createElement("section");
      section.className = "update-log-release";

      const heading = document.createElement("h3");
      heading.textContent = release.version;
      section.append(heading);

      const date = document.createElement("p");
      date.className = "update-log-date";
      date.textContent = dateFormatter.format(new Date(`${release.date}T12:00:00`));
      section.append(date);

      const list = document.createElement("ul");
      const items = release.items[currentLanguage] || release.items.en;
      items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.append(listItem);
      });
      section.append(list);

      els.updateLogContent.append(section);
    });
  }

  function openUpdateLog() {
    renderUpdateLog();
    els.updateLogModal.hidden = false;
    els.closeUpdateLog.focus();
  }

  function closeUpdateLog() {
    els.updateLogModal.hidden = true;
    els.updateLogButton.focus();
  }

  function setupEvents() {
    els.decisionInput.addEventListener("input", () => {
      state.decision = els.decisionInput.value;
      update();
    });

    els.languagePicker.value = currentLanguage;
    els.languagePicker.addEventListener("change", () => {
      currentLanguage = els.languagePicker.value;
      localStorage.setItem(LANGUAGE_KEY, currentLanguage);
      applyLanguage();
      renderDecisionMode();
      renderNewPointScoreOptions();
      renderLists();
      renderResult();
      renderLockState();
      if (!els.updateLogModal.hidden) renderUpdateLog();
    });

    applyLanguage();
    renderDecisionMode();
    renderNewPointScoreOptions();

    els.decisionModeOptions.forEach((button) => {
      button.addEventListener("click", () => {
        state.decisionMode = button.dataset.modeChoice;
        update();
        renderNewPointScoreOptions();
      });
    });

    els.customNegative.addEventListener("input", () => {
      state.customLabels.negative = els.customNegative.value;
      update();
      renderNewPointScoreOptions();
    });

    els.customPositive.addEventListener("input", () => {
      state.customLabels.positive = els.customPositive.value;
      update();
      renderNewPointScoreOptions();
    });

    els.addPointForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!els.newPointText.value.trim()) {
        els.newPointText.focus();
        return;
      }
      if (els.newPointScore.value === "") {
        els.newPointScore.focus();
        return;
      }
      addPoint(Number(els.newPointScore.value));
    });

    els.clearAll.addEventListener("click", () => {
      if (hasMeaningfulData() && !confirm(t("confirmClear"))) return;
      state = { decision: "", decisionMode: "default", customLabels: { negative: "", positive: "" }, points: [] };
      els.decisionInput.value = "";
      update();
      renderNewPointScoreOptions();
    });

    els.themeOptions.forEach((button) => {
      button.addEventListener("click", () => {
        currentTheme = button.dataset.themeChoice;
        localStorage.setItem(THEME_KEY, currentTheme);
        applyTheme();
      });
    });

    els.themePicker.addEventListener("change", () => {
      currentTheme = els.themePicker.value;
      localStorage.setItem(THEME_KEY, currentTheme);
      applyTheme();
    });

    els.loadMarkdown.addEventListener("click", () => {
      els.markdownFileInput.click();
    });

    els.markdownFileInput.addEventListener("change", () => {
      const [file] = els.markdownFileInput.files;
      loadMarkdownFile(file);
      els.markdownFileInput.value = "";
    });

    els.exportMarkdown.addEventListener("click", (event) => {
      event.preventDefault();
      exportMarkdown();
    });

    els.updateLogButton.addEventListener("click", openUpdateLog);
    els.closeUpdateLog.addEventListener("click", closeUpdateLog);
    els.updateLogModal.addEventListener("click", (event) => {
      if (event.target === els.updateLogModal) closeUpdateLog();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !els.updateLogModal.hidden) closeUpdateLog();
    });

    document.querySelectorAll("[data-coming-soon]").forEach((element) => {
      element.setAttribute("title", t("comingSoon"));
      element.addEventListener("mouseenter", () => showComingSoon(element));
      element.addEventListener("focus", () => showComingSoon(element));
      element.addEventListener("click", (event) => {
        event.preventDefault();
        showComingSoon(element);
      });
    });

    const handleSystemThemeChange = () => {
      if (currentTheme === "system") applyTheme();
    };
    if (systemDarkQuery.addEventListener) {
      systemDarkQuery.addEventListener("change", handleSystemThemeChange);
    } else if (systemDarkQuery.addListener) {
      systemDarkQuery.addListener(handleSystemThemeChange);
    }
  }

  loadState();
  setupAssets();
  setupEvents();
  setupDragAndDrop();
  applyTheme();
  els.decisionInput.value = state.decision;
  els.customNegative.value = state.customLabels.negative;
  els.customPositive.value = state.customLabels.positive;
  renderDecisionMode();
  renderLists();
  renderResult();
  renderLockState();

  window.GooseChoose = {
    version: APP_VERSION,
    updateLog: UPDATE_LOG,
    calculate,
    classify,
    resultFor
  };
})();
