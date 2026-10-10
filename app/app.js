(function () {
  "use strict";

  const APP_VERSION = "v0.8";
  const STORAGE_KEY = "goose-choose-state-v1";
  const LANGUAGE_KEY = "goose-choose-language";
  const THEME_KEY = "goose-choose-theme";
  const FEEDBACK_URLS = {
    en: "https://forms.gle/shXHUqVE7TuhTRiY6",
    ko: "https://forms.gle/i6EoM8g2rrDAgMpXA",
    ga: "https://forms.gle/6etGaDZZS8YaDP8h6"
  };
  const UPDATE_LOG = [
    {
      version: "v0.8",
      date: "2026-10-10",
      items: {
        en: [
          "Added a welcome popup to introduce users to Goose Choose and explain how the decision-making tool works.",
          "Fixed an issue that prevented users from scrolling through the update log.",
          "Renumbered previous updates to accurately reflect the application's release history."
        ],
        ko: [
          "사용자에게 Goose Choose를 소개하고 의사 결정 도구의 작동 방식을 설명하는 환영 팝업을 추가했습니다.",
          "업데이트 기록을 스크롤할 수 없던 문제를 수정했습니다.",
          "애플리케이션의 출시 이력을 정확하게 반영하도록 이전 업데이트의 버전 번호를 변경했습니다."
        ],
        ga: [
          "Cuireadh preabfhuinneog fáilte leis chun Goose Choose a chur in aithne d’úsáideoirí agus míniú a thabhairt ar an gcaoi a n-oibríonn an uirlis cinnteoireachta.",
          "Ceartaíodh fadhb a chuir cosc ar úsáideoirí scrollú tríd an loga nuashonruithe.",
          "Athuimhríodh nuashonruithe roimhe seo chun stair eisiúintí an fheidhmchláir a léiriú go cruinn."
        ]
      }
    },
    {
      version: "v0.7",
      date: "2026-09-23",
      items: {
        en: [
          "Fixed an issue where custom decision options were displayed inconsistently in the dropdown menu when adding points."
        ],
        ko: [
          "포인트를 추가할 때 드롭다운 메뉴에서 사용자 지정 결정 선택지가 일관되지 않게 표시되던 문제를 수정했습니다."
        ],
        ga: [
          "Ceartaíodh fadhb ina dtaispeántaí roghanna cinnidh saincheaptha go neamh-chomhsheasmhach sa roghchlár anuas agus pointí á gcur leis."
        ]
      }
    },
    {
      version: "v0.6",
      date: "2026-09-19",
      items: {
        en: [
          "Optimized link previews for improved sharing across iMessage, Discord, and other compatible platforms."
        ],
        ko: [
          "iMessage, Discord 및 기타 호환 플랫폼에서 더 원활하게 공유할 수 있도록 링크 미리보기를 최적화했습니다."
        ],
        ga: [
          "Optamaíodh réamhamhairc nasc chun comhroinnt a fheabhsú ar iMessage, Discord agus ardáin chomhoiriúnacha eile."
        ]
      }
    },
    {
      version: "v0.5",
      date: "2026-08-31",
      items: {
        en: [
          "Introduced a feedback survey to gather user suggestions and improve the experience."
        ],
        ko: [
          "사용자 제안을 수집하고 사용 경험을 개선하기 위한 피드백 설문을 도입했습니다."
        ],
        ga: [
          "Tugadh suirbhé aiseolais isteach chun moltaí úsáideoirí a bhailiú agus an t-eispéireas a fheabhsú."
        ]
      }
    },
    {
      version: "v0.4",
      date: "2026-08-29",
      items: {
        en: [
          "Added a random decision-making page featuring slot machine and blackjack-style games with wildcard jokers for decisions that remain unresolved.",
          "Fixed a visual issue affecting header appearance on mobile and tablet devices.",
          "Added dedicated Privacy Policy and Terms of Service pages."
        ],
        ko: [
          "아직 해결되지 않은 결정을 위해 슬롯머신과 와일드카드 조커가 포함된 블랙잭 방식의 게임을 제공하는 무작위 결정 페이지를 추가했습니다.",
          "모바일 및 태블릿 기기에서 헤더 모양에 영향을 주던 시각적 문제를 수정했습니다.",
          "개인정보 처리방침 및 서비스 약관 전용 페이지를 추가했습니다."
        ],
        ga: [
          "Cuireadh leathanach cinnteoireachta randamaí leis ina bhfuil cluichí meaisín sliotán agus cluichí ar nós blackjack le jokers saoróg do chinntí atá fós gan réiteach.",
          "Ceartaíodh fadhb amhairc a chuir isteach ar chuma an cheanntásca ar ghléasanna soghluaiste agus táibléid.",
          "Cuireadh leathanaigh ar leith don Pholasaí Príobháideachais agus do na Téarmaí Seirbhíse leis."
        ]
      }
    },
    {
      version: "v0.3",
      date: "2026-08-22",
      items: {
        en: [
          "**Appearance settings:** Added the ability to switch between light mode, dark mode, and system default.",
          "**Markdown uploads:** Enabled users to resume previous decisions by uploading a previously saved Markdown file.",
          "**Custom decision options:** Allowed users to replace the default yea/nay labels with personalized alternatives.",
          "Corrected inconsistencies in the Irish-language naming.",
          "Introduced the update log to document new features, improvements, and fixes.",
          "Resolved interface inconsistencies across mobile and tablet devices."
        ],
        ko: [
          "**화면 설정:** 라이트 모드, 다크 모드, 시스템 기본값 간에 전환하는 기능을 추가했습니다.",
          "**Markdown 업로드:** 이전에 저장한 Markdown 파일을 업로드하여 기존 결정 작업을 이어갈 수 있도록 했습니다.",
          "**사용자 지정 결정 선택지:** 기본 yea/nay 라벨을 원하는 대안으로 바꿀 수 있도록 했습니다.",
          "아일랜드어 이름의 불일치를 수정했습니다.",
          "새로운 기능, 개선 사항 및 수정 사항을 기록하는 업데이트 기록을 도입했습니다.",
          "모바일 및 태블릿 기기의 인터페이스 불일치를 해결했습니다."
        ],
        ga: [
          "**Socruithe cuma:** Cuireadh leis an gcumas aistriú idir mód geal, mód dorcha agus réamhshocrú an chórais.",
          "**Uaslódálacha Markdown:** Cuireadh ar chumas úsáideoirí filleadh ar chinntí roimhe seo trí chomhad Markdown a sábháladh cheana a uaslódáil.",
          "**Roghanna cinnidh saincheaptha:** Tugadh cead d’úsáideoirí roghanna pearsantaithe a chur in áit na lipéad réamhshocraithe yea/nay.",
          "Ceartaíodh neamh-chomhsheasmhachtaí in ainmniú na Gaeilge.",
          "Tugadh an loga nuashonruithe isteach chun gnéithe nua, feabhsuithe agus ceartúcháin a thaifeadadh.",
          "Réitíodh neamh-chomhsheasmhachtaí sa chomhéadan ar ghléasanna soghluaiste agus táibléid."
        ]
      }
    },
    {
      version: "v0.2",
      date: "2026-08-21",
      items: {
        en: [
          "Released the initial minimum viable product (MVP), featuring yea/nay decision-making functionality.",
          "Established the core functionality and user interface.",
          "Launched with English as the default language, alongside Korean and Irish translations.",
          "Introduced Markdown file downloads to save decision details and preserve progress."
        ],
        ko: [
          "yea/nay 의사 결정 기능을 갖춘 초기 최소 기능 제품(MVP)을 출시했습니다.",
          "핵심 기능과 사용자 인터페이스를 구축했습니다.",
          "영어를 기본 언어로 출시하고 한국어 및 아일랜드어 번역을 함께 제공했습니다.",
          "결정 세부 정보와 진행 상황을 저장할 수 있도록 Markdown 파일 다운로드를 도입했습니다."
        ],
        ga: [
          "Eisíodh an chéad táirge inmharthana íosta (MVP), le feidhmiúlacht cinnteoireachta yea/nay.",
          "Bunaíodh an phríomhfheidhmiúlacht agus an comhéadan úsáideora.",
          "Seoladh é le Béarla mar an teanga réamhshocraithe, mar aon le haistriúcháin Chóiréise agus Ghaeilge.",
          "Tugadh íoslódálacha comhad Markdown isteach chun sonraí cinnidh a shábháil agus dul chun cinn a chaomhnú."
        ]
      }
    }
  ];

  const translations = {
    en: {
      welcomeLanguageLabel: "Language",
      welcomeAppearanceLabel: "Appearance",
      welcomeTitle: "Welcome to Goose Choose!",
      welcomeQuestion: "Having trouble making a decision?",
      welcomeIntro: "Let the goose help you weigh the pros and cons. Here's how:",
      welcomeStep1: "Ask your question",
      welcomeStep1Body: "Enter a decision, like “Should I switch to a new office?” or “Who should I vote for?” Stick with Yea and Nay or customize your options.",
      welcomeStep2: "Weigh your considerations",
      welcomeStep2Body: "Add reasons for or against your decision. Score each from -5 (strongly against) to +5 (strongly in favor). Neutral gets a 0.",
      welcomeStep3: "See where the goose leans",
      welcomeStep3Body: "Goose Choose organizes your points and adds up their scores. The goose’s recommendation changes as you weigh the evidence.",
      welcomeConclusion: "The final decision is always yours.",
      welcomeConclusionBody: "Goose Choose just helps you see things a little more clearly.",
      welcomeStart: "Let's Get Choosing!",
      welcomeRemember: "Don't show this again",
      howItWorks: "How It Works",
      welcomeClose: "Close welcome",

      addPointButton: "Add point",
      addPointHeading: "Add a point",
      addPointHelp: "Write one consideration, choose its score, and Goose Choose will place it in the right column.",
      appName: window.GooseChooseLocales.en.title,
      balancedHint: "The considerations are balancing each other for now.",
      chooseScore: "Choose score",
      clearAll: "Clear all",
      comingSoon: "Coming soon",
      confirmClear: "Clear this decision and all points?",
      cancel: "Cancel",
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
      feedback: "Feedback",
      loadMarkdown: "Load Markdown",
      loadMarkdownInvalid: "This Markdown file does not include Goose Choose state.",
      loadMarkdownReady: "Decision loaded",
      legalLastUpdated: "Last updated: August 29, 2026",
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
      backToDecision: "Back to decision",
      applyJoker: "Apply joker",
      blackjack: "Blackjack",
      blackjackBust: "{player} busted. {winner} is what the goose suggests.",
      blackjackFinalTie: "Both options tied at {score}. Deal again to break it.",
      blackjackHelp: "Each option plays face-up. Hit or stay, then let the closest hand decide.",
      blackjackHeading: "Closest to 21 chooses",
      blackjackReady: "Deal a round to begin.",
      blackjackStayed: "{player} stayed at {score}.",
      blackjackTieFirst: "Both options were equally close, so {player} goes first by suit order: Spades, Hearts, Diamonds, Clubs.",
      blackjackTurn: "{player}'s turn.",
      blackjackWin: "{winner} is closer to 21. The goose suggests {winner}.",
      dealRound: "Deal round",
      hit: "Hit",
      chooseJokerHelp: "{player} drew a joker. Pick the rank and suit this joker will become. Rank is the card term for number or face.",
      chooseJokerTitle: "Choose the joker",
      randomEyebrow: "Random chooser",
      randomHeading: "Still undecided?",
      randomSubtitle: "Let the goose break the tie with a little chance.",
      slotHelp: "The majority result is the goose's suggestion.",
      slotHeading: "Spin three wheels",
      joker: "Joker",
      rank: "Rank",
      slotSuggestionLabel: "The goose suggests {winner}.",
      slotMachine: "Slots",
      slots: "Slots",
      slotReady: "Ready when you are.",
      slotResult: "The goose suggests {winner}.",
      suit: "Suit",
      spinAgain: "Spin again",
      spinSlot: "Spin",
      spinning: "Spinning...",
      stay: "Stay",
      stillUndecided: "Still undecided?",
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
      welcomeLanguageLabel: "언어",
      welcomeAppearanceLabel: "화면 모드",
      welcomeTitle: "구스추즈에 오신 걸 환영해요!",
      welcomeQuestion: "결정하기 어려우신가요?",
      welcomeIntro: "거위와 함께 장단점을 차근차근 따져 보세요. 이렇게 시작하면 돼요:",
      welcomeStep1: "질문을 입력하세요",
      welcomeStep1Body: "“새 사무실로 옮길까?” 또는 “누구에게 투표할까?”처럼 고민 중인 결정을 적어 보세요. 찬성과 반대를 그대로 쓰거나 선택지를 직접 정할 수 있어요.",
      welcomeStep2: "고려 사항에 점수를 매겨 보세요",
      welcomeStep2Body: "찬성하거나 반대하는 이유를 포인트로 추가하세요. -5(강한 반대)부터 +5(강한 찬성)까지 점수를 매기고, 중립적인 내용은 0으로 두세요.",
      welcomeStep3: "거위가 어느 쪽으로 기우는지 보세요",
      welcomeStep3Body: "구스추즈가 포인트를 정리하고 총점을 계산해요. 고려 사항의 무게에 따라 거위의 추천도 달라져요.",
      welcomeConclusion: "최종 결정은 언제나 여러분의 몫이에요.",
      welcomeConclusionBody: "구스추즈는 생각을 조금 더 명확하게 정리하도록 도와줄 뿐이에요.",
      welcomeStart: "선택을 시작해 볼까요!",
      welcomeRemember: "다시 보지 않기",
      howItWorks: "사용 방법",
      welcomeClose: "환영 창 닫기",

      addPointButton: "포인트 추가",
      addPointHeading: "포인트 추가",
      addPointHelp: "고려할 내용을 하나 적고 점수를 고르면 구스추즈가 알맞은 칸에 넣어줍니다.",
      appName: window.GooseChooseLocales.ko.title,
      balancedHint: "현재 고려 사항들이 서로 균형을 이루고 있어요.",
      chooseScore: "점수 선택",
      clearAll: "모두 지우기",
      comingSoon: "곧 제공됩니다",
      confirmClear: "이 결정과 모든 포인트를 지울까요?",
      cancel: "취소",
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
      feedback: "피드백",
      loadMarkdown: "마크다운 불러오기",
      loadMarkdownInvalid: "이 마크다운 파일에는 구스추즈 상태가 포함되어 있지 않습니다.",
      loadMarkdownReady: "결정을 불러왔습니다",
      legalLastUpdated: "최종 업데이트: 2026년 8월 29일",
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
      backToDecision: "결정으로 돌아가기",
      applyJoker: "조커 적용",
      blackjack: "블랙잭",
      blackjackBust: "{player} 버스트. 거위는 {winner} 쪽을 추천합니다.",
      blackjackFinalTie: "두 선택지가 {score}점으로 동점입니다. 다시 딜해서 정하세요.",
      blackjackHelp: "각 선택지가 앞면 카드로 플레이합니다. 히트하거나 스테이한 뒤 21에 더 가까운 손패가 결정합니다.",
      blackjackHeading: "21에 더 가까운 쪽이 선택",
      blackjackReady: "라운드를 딜하면 시작합니다.",
      blackjackStayed: "{player} 스테이: {score}점.",
      blackjackTieFirst: "두 선택지가 똑같이 가까워서 수트 순서(스페이드, 하트, 다이아몬드, 클럽)에 따라 {player}부터 시작합니다.",
      blackjackTurn: "{player} 차례입니다.",
      blackjackWin: "{winner} 쪽이 21에 더 가깝습니다. 거위는 {winner} 쪽을 추천합니다.",
      dealRound: "라운드 딜",
      hit: "히트",
      chooseJokerHelp: "{player} 쪽이 조커를 뽑았습니다. 이 조커가 될 랭크와 수트를 고르세요. 랭크는 숫자나 그림을 뜻하는 카드 용어입니다.",
      chooseJokerTitle: "조커 선택",
      randomEyebrow: "랜덤 선택",
      randomHeading: "아직 못 정했나요?",
      randomSubtitle: "약간의 운으로 거위가 결정을 도와줄게요.",
      slotHelp: "다수로 나온 결과가 거위의 추천입니다.",
      slotHeading: "세 바퀴 돌리기",
      joker: "조커",
      rank: "숫자",
      slotSuggestionLabel: "거위는 {winner} 쪽을 추천합니다.",
      slotMachine: "슬롯",
      slots: "슬롯",
      slotReady: "준비됐어요.",
      slotResult: "거위는 {winner} 쪽을 추천합니다.",
      suit: "수트",
      spinAgain: "다시 돌리기",
      spinSlot: "돌리기",
      spinning: "돌리는 중...",
      stay: "스테이",
      stillUndecided: "아직 못 정했나요?",
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
      welcomeLanguageLabel: "Teanga",
      welcomeAppearanceLabel: "Cuma",
      welcomeTitle: "Fáilte go Gús Tsús!",
      welcomeQuestion: "An bhfuil sé deacair cinneadh a dhéanamh?",
      welcomeIntro: "Lig don ghé cabhrú leat na buntáistí agus na míbhuntáistí a mheá. Seo mar a oibríonn sé:",
      welcomeStep1: "Cuir do cheist",
      welcomeStep1Body: "Scríobh an cinneadh atá romhat, mar shampla “Ar cheart dom aistriú go hoifig nua?” nó “Cé dó ar cheart dom vótáil?” Is féidir Yea agus Nay a úsáid nó do roghanna féin a chur isteach.",
      welcomeStep2: "Meáigh na cúiseanna",
      welcomeStep2Body: "Cuir pointí leis ar son nó in aghaidh do chinnidh. Tabhair scór ó -5 (go láidir ina aghaidh) go +5 (go láidir ar a shon) do gach pointe. Tabhair 0 do phointí neodracha.",
      welcomeStep3: "Féach cén treo a bhfuil an ghé ag claonadh",
      welcomeStep3Body: "Eagraíonn Gús Tsús do chuid pointí agus suimíonn sé na scóir. Athraíonn moladh na gé de réir mar a mheánn tú na cúiseanna.",
      welcomeConclusion: "Is fútsa atá an cinneadh deiridh i gcónaí.",
      welcomeConclusionBody: "Ní dhéanann Gús Tsús ach cabhrú leat rudaí a fheiceáil níos soiléire.",
      welcomeStart: "Tosaímis ag roghnú!",
      welcomeRemember: "Ná taispeáin é seo arís",
      howItWorks: "Conas a oibríonn sé",
      welcomeClose: "Dún an fáiltiú",

      addPointButton: "Cuir pointe leis",
      addPointHeading: "Cuir pointe leis",
      addPointHelp: "Scríobh cúis amháin, roghnaigh a scór, agus cuirfidh Gús Tsús sa cholún ceart í.",
      appName: window.GooseChooseLocales.ga.title,
      balancedHint: "Tá na cúiseanna ag cothromú a chéile faoi láthair.",
      chooseScore: "Roghnaigh scór",
      clearAll: "Glan gach rud",
      comingSoon: "Ag teacht go luath",
      confirmClear: "An bhfuil fonn ort an cinneadh seo agus na pointí uile a ghlanadh?",
      cancel: "Cealaigh",
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
      feedback: "Aiseolas",
      loadMarkdown: "Lódáil Markdown",
      loadMarkdownInvalid: "Níl staid Gús Tsús sa chomhad Markdown seo.",
      loadMarkdownReady: "Lódáladh an cinneadh",
      legalLastUpdated: "Nuashonraithe go deireanach: 29 Lúnasa 2026",
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
      backToDecision: "Ar ais chuig an gcinneadh",
      applyJoker: "Cuir an joker i bhfeidhm",
      blackjack: "Blackjack",
      blackjackBust: "Chuaigh {player} thar 21. Is é {winner} moladh na gé.",
      blackjackFinalTie: "Tá an dá rogha cothrom ag {score}. Déileáil arís chun é a bhriseadh.",
      blackjackHelp: "Imríonn gach rogha le cártaí oscailte. Tarraing nó fan, ansin socraíonn an lámh is gaire do 21.",
      blackjackHeading: "Is gaire do 21 a roghnaíonn",
      blackjackReady: "Déileáil babhta chun tosú.",
      blackjackStayed: "D'fhan {player} ag {score}.",
      blackjackTieFirst: "Bhí an dá rogha chomh gar céanna, mar sin tosaíonn {player} de réir ord na ndathanna: Spades, Hearts, Diamonds, Clubs.",
      blackjackTurn: "Seal {player}.",
      blackjackWin: "Tá {winner} níos gaire do 21. Molann an ghé {winner}.",
      dealRound: "Déileáil babhta",
      hit: "Tarraing",
      chooseJokerHelp: "Tharraing {player} joker. Roghnaigh an chéim agus an dath a bheidh aige. Is é céim an téarma cártaí ar uimhir nó aghaidh.",
      chooseJokerTitle: "Roghnaigh an joker",
      randomEyebrow: "Roghnóir randamach",
      randomHeading: "Fós idir dhá chomhairle?",
      randomSubtitle: "Lig don ghé an ceangal a bhriseadh le beagán seans.",
      slotHelp: "Is é toradh an tromlaigh moladh na gé.",
      slotHeading: "Cas trí roth",
      joker: "Joker",
      rank: "Céim",
      slotSuggestionLabel: "Molann an ghé {winner}.",
      slotMachine: "Sliotáin",
      slots: "Sliotáin",
      slotReady: "Réidh nuair atá tú.",
      slotResult: "Molann an ghé {winner}.",
      suit: "Dath",
      spinAgain: "Cas arís",
      spinSlot: "Cas",
      spinning: "Ag casadh...",
      stay: "Fan",
      stillUndecided: "Fós idir dhá chomhairle?",
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

  const LEGAL_PAGES = {
    privacy: {
      en: [
        { heading: "", paragraphs: ["Goose Choose is designed to be simple and privacy-friendly. Goose Choose does not require an account and does not intentionally collect, store, sell, or share personal information about its users."] },
        { heading: "Information You Enter", paragraphs: ["Information you enter into Goose Choose, including decisions, options, considerations, scores, or other content, is used only to provide the application's functionality.", "Goose Choose does not intentionally transmit or store this information on its own servers.", "If you choose to download a file from Goose Choose, that file is saved to your device. If you later upload a file to Goose Choose, its contents are processed for the purpose of restoring or using the information contained in that file. Goose Choose does not intentionally retain uploaded files after they are processed.", "You are responsible for the information you choose to enter into or upload to Goose Choose. You should avoid entering sensitive or confidential information that you would not want exposed in the event of a browser, device, hosting-provider, or other technical security issue."] },
        { heading: "Cookies and Tracking", paragraphs: ["Goose Choose does not intentionally use cookies, advertising trackers, analytics services, or similar technologies to track users."] },
        { heading: "Hosting and Third Parties", paragraphs: ["Goose Choose may rely on third-party services to host or deliver the website. These services may collect or process certain technical information when you access Goose Choose, such as IP addresses, browser or device information, and information associated with requests to their systems.", "Any such processing is performed by the applicable third-party provider and is outside the direct control of Goose Choose. The provider's handling of information is governed by its own privacy policies and practices."] },
        { heading: "External Links", paragraphs: ["Goose Choose may contain links to websites or services operated by third parties. Goose Choose is not responsible for the privacy practices, security, or content of those third-party services."] },
        { heading: "Children's Privacy", paragraphs: ["Goose Choose does not knowingly collect personal information from children or any other users."] },
        { heading: "Changes to This Policy", paragraphs: ["This Privacy Policy may be updated from time to time to reflect changes to Goose Choose, its hosting, or applicable practices. The date at the top of this page indicates when the policy was most recently updated."] },
        { heading: "Contact", paragraphs: ["If you have questions about this Privacy Policy, you may contact the Goose Choose project through the contact information made available on the Goose Choose website."] }
      ],
      ko: [
        { heading: "", paragraphs: ["구스추즈는 단순하고 개인정보 친화적인 방식으로 설계되었습니다. 구스추즈는 계정을 요구하지 않으며, 사용자의 개인정보를 의도적으로 수집, 저장, 판매 또는 공유하지 않습니다."] },
        { heading: "입력한 정보", paragraphs: ["결정, 선택지, 고려 사항, 점수 또는 기타 콘텐츠를 포함해 사용자가 구스추즈에 입력하는 정보는 애플리케이션 기능을 제공하기 위해서만 사용됩니다.", "구스추즈는 이 정보를 자체 서버로 의도적으로 전송하거나 저장하지 않습니다.", "구스추즈에서 파일을 다운로드하면 해당 파일은 사용자의 기기에 저장됩니다. 이후 구스추즈에 파일을 업로드하면 그 파일의 내용은 파일에 담긴 정보를 복원하거나 사용하기 위한 목적으로 처리됩니다. 구스추즈는 업로드된 파일을 처리 후 의도적으로 보관하지 않습니다.", "구스추즈에 입력하거나 업로드하는 정보에 대한 책임은 사용자에게 있습니다. 브라우저, 기기, 호스팅 제공업체 또는 기타 기술적 보안 문제가 발생했을 때 노출되기를 원하지 않는 민감하거나 기밀인 정보는 입력하지 않는 것이 좋습니다."] },
        { heading: "쿠키 및 추적", paragraphs: ["구스추즈는 사용자를 추적하기 위해 쿠키, 광고 추적기, 분석 서비스 또는 이와 유사한 기술을 의도적으로 사용하지 않습니다."] },
        { heading: "호스팅 및 제3자", paragraphs: ["구스추즈는 웹사이트를 호스팅하거나 제공하기 위해 제3자 서비스를 이용할 수 있습니다. 이러한 서비스는 사용자가 구스추즈에 접속할 때 IP 주소, 브라우저 또는 기기 정보, 해당 시스템에 대한 요청과 관련된 정보 등 일부 기술 정보를 수집하거나 처리할 수 있습니다.", "그러한 처리는 해당 제3자 제공업체가 수행하며 구스추즈의 직접적인 통제 범위 밖에 있습니다. 해당 제공업체의 정보 처리 방식은 그 자체의 개인정보 보호정책과 관행을 따릅니다."] },
        { heading: "외부 링크", paragraphs: ["구스추즈에는 제3자가 운영하는 웹사이트 또는 서비스로 연결되는 링크가 포함될 수 있습니다. 구스추즈는 이러한 제3자 서비스의 개인정보 보호 관행, 보안 또는 콘텐츠에 대해 책임지지 않습니다."] },
        { heading: "아동 개인정보", paragraphs: ["구스추즈는 아동 또는 기타 사용자로부터 개인정보를 고의로 수집하지 않습니다."] },
        { heading: "정책 변경", paragraphs: ["이 개인정보 처리방침은 구스추즈, 호스팅 또는 관련 관행의 변경 사항을 반영하기 위해 수시로 업데이트될 수 있습니다. 이 페이지 상단의 날짜는 본 방침이 마지막으로 업데이트된 시점을 나타냅니다."] },
        { heading: "문의", paragraphs: ["이 개인정보 처리방침에 대해 질문이 있는 경우, 구스추즈 웹사이트에 제공된 연락처 정보를 통해 구스추즈 프로젝트에 문의할 수 있습니다."] }
      ],
      ga: [
        { heading: "", paragraphs: ["Tá Gús Tsús deartha le bheith simplí agus cairdiúil don phríobháideachas. Ní éilíonn Gús Tsús cuntas agus ní bhailíonn, ní stórálann, ní dhíolann ná ní roinneann sé faisnéis phearsanta faoi úsáideoirí d'aon ghnó."] },
        { heading: "Faisnéis a Chuireann Tú Isteach", paragraphs: ["Ní úsáidtear faisnéis a chuireann tú isteach i nGús Tsús, lena n-áirítear cinntí, roghanna, cúiseanna, scóir nó ábhar eile, ach chun feidhmiúlacht na haipe a chur ar fáil.", "Ní tharchuireann ná ní stórálann Gús Tsús an fhaisnéis seo ar a fhreastalaithe féin d'aon ghnó.", "Má roghnaíonn tú comhad a íoslódáil ó Ghús Tsús, sábháiltear an comhad sin ar do ghléas. Má uaslódálann tú comhad chuig Gús Tsús níos déanaí, próiseáiltear a ábhar chun an fhaisnéis atá sa chomhad sin a athbhunú nó a úsáid. Ní choinníonn Gús Tsús comhaid uaslódáilte d'aon ghnó tar éis iad a phróiseáil.", "Tá tú freagrach as an bhfaisnéis a roghnaíonn tú a chur isteach i nGús Tsús nó a uaslódáil chuige. Ba cheart duit faisnéis íogair nó rúnda nach mbeadh tú ag iarraidh a nochtadh i gcás fadhb slándála le brabhsálaí, gléas, soláthraí óstála nó teicneolaíocht eile a sheachaint."] },
        { heading: "Fianáin agus Rianú", paragraphs: ["Ní úsáideann Gús Tsús fianáin, lorgairí fógraíochta, seirbhísí anailísíochta ná teicneolaíochtaí comhchosúla chun úsáideoirí a rianú d'aon ghnó."] },
        { heading: "Óstáil agus Tríú Páirtithe", paragraphs: ["Féadfaidh Gús Tsús brath ar sheirbhísí tríú páirtí chun an suíomh gréasáin a óstáil nó a sheachadadh. Féadfaidh na seirbhísí sin faisnéis theicniúil áirithe a bhailiú nó a phróiseáil nuair a dhéanann tú rochtain ar Ghús Tsús, amhail seoltaí IP, faisnéis bhrabhsálaí nó ghléis, agus faisnéis a bhaineann le hiarratais chuig a gcórais.", "Is é an soláthraí tríú páirtí iomchuí a dhéanann aon phróiseáil den sórt sin, agus tá sí lasmuigh de rialú díreach Ghús Tsús. Tá láimhseáil faisnéise an tsoláthraí faoi réir a pholasaithe agus a chleachtas príobháideachais féin."] },
        { heading: "Naisc Sheachtracha", paragraphs: ["D'fhéadfadh naisc chuig suíomhanna gréasáin nó seirbhísí arna n-oibriú ag tríú páirtithe a bheith i nGús Tsús. Níl Gús Tsús freagrach as cleachtais phríobháideachais, slándáil ná ábhar na seirbhísí tríú páirtí sin."] },
        { heading: "Príobháideachas Leanaí", paragraphs: ["Ní bhailíonn Gús Tsús faisnéis phearsanta ó leanaí ná ó úsáideoirí eile go feasach."] },
        { heading: "Athruithe ar an bPolasaí Seo", paragraphs: ["Féadfar an Polasaí Príobháideachais seo a nuashonrú ó am go ham chun athruithe ar Ghús Tsús, ar a óstáil nó ar chleachtais infheidhme a léiriú. Léiríonn an dáta ag barr an leathanaigh seo cathain a nuashonraíodh an polasaí is déanaí."] },
        { heading: "Teagmháil", paragraphs: ["Má tá ceisteanna agat faoin bPolasaí Príobháideachais seo, is féidir leat teagmháil a dhéanamh le tionscadal Ghús Tsús tríd an bhfaisnéis teagmhála atá ar fáil ar shuíomh gréasáin Ghús Tsús."] }
      ]
    },
    terms: {
      en: [
        { heading: "", paragraphs: ["By using Goose Choose, you agree to these Terms of Service. If you do not agree with these terms, please do not use Goose Choose."] },
        { heading: "About Goose Choose", paragraphs: ["Goose Choose is a free decision-making tool intended to help users organize and evaluate considerations when making decisions.", "Goose Choose is provided as a general-purpose tool for informational and personal use. It does not make decisions for you, and its results should not be treated as professional advice or as a substitute for your own judgment."] },
        { heading: "No Professional Advice", paragraphs: ["Goose Choose does not provide legal, medical, financial, investment, mental health, safety, or other professional advice.", "You should consult an appropriately qualified professional when making decisions that require professional expertise."] },
        { heading: "Your Decisions Are Your Responsibility", paragraphs: ["Any scores, recommendations, results, or other outputs produced by Goose Choose depend on the information and preferences supplied by the user.", "You are solely responsible for evaluating those results and for any decisions or actions you take based on them. Goose Choose and its creator are not responsible for losses, damages, injuries, costs, or other consequences resulting from decisions made using the service."] },
        { heading: "User Content", paragraphs: ["You are responsible for any information or content you enter into or upload to Goose Choose.", "You should not use Goose Choose to enter, upload, or process content that you do not have the right to use or that violates applicable law."] },
        { heading: "Availability and Changes", paragraphs: ["Goose Choose is provided free of charge and may be changed, updated, suspended, or discontinued at any time without notice.", "There is no guarantee that Goose Choose will always be available, operate without errors, preserve compatibility with previously downloaded files, or continue to provide any particular feature."] },
        { heading: "No Warranties", paragraphs: ["Goose Choose is provided \"as is\" and \"as available\", without warranties of any kind, express or implied, to the fullest extent permitted by applicable law.", "No guarantee is made regarding the accuracy, reliability, availability, security, or suitability of Goose Choose or its results for any particular purpose."] },
        { heading: "Limitation of Liability", paragraphs: ["To the fullest extent permitted by applicable law, Goose Choose and its creator will not be liable for any direct, indirect, incidental, consequential, special, exemplary, or other damages arising from or related to your use of, inability to use, or reliance on Goose Choose."] },
        { heading: "Third-Party Services", paragraphs: ["Goose Choose may rely on or link to third-party services. Goose Choose does not control and is not responsible for the availability, security, content, policies, or practices of third-party services."] },
        { heading: "Changes to These Terms", paragraphs: ["These Terms of Service may be updated from time to time. The date at the top of this page indicates when the terms were most recently updated. Your continued use of Goose Choose after an update constitutes acceptance of the revised terms."] },
        { heading: "Governing Law", paragraphs: ["These Terms are governed by the laws applicable in the jurisdiction in which the creator of Goose Choose resides, without regard to conflict-of-law principles, except where applicable law requires otherwise."] },
        { heading: "Contact", paragraphs: ["If you have questions about these Terms of Service, you may contact the Goose Choose project through the contact information made available on the Goose Choose website."] }
      ],
      ko: [
        { heading: "", paragraphs: ["구스추즈를 사용하면 본 서비스 약관에 동의하는 것으로 간주됩니다. 본 약관에 동의하지 않는 경우 구스추즈를 사용하지 마세요."] },
        { heading: "구스추즈 소개", paragraphs: ["구스추즈는 사용자가 결정을 내릴 때 고려 사항을 정리하고 평가하도록 돕기 위한 무료 의사결정 도구입니다.", "구스추즈는 정보 제공 및 개인적 사용을 위한 범용 도구로 제공됩니다. 구스추즈가 사용자를 대신해 결정을 내리지는 않으며, 그 결과를 전문적인 조언이나 사용자의 판단을 대체하는 것으로 취급해서는 안 됩니다."] },
        { heading: "전문적 조언 아님", paragraphs: ["구스추즈는 법률, 의료, 금융, 투자, 정신건강, 안전 또는 기타 전문적인 조언을 제공하지 않습니다.", "전문 지식이 필요한 결정을 내릴 때는 적절한 자격을 갖춘 전문가와 상담해야 합니다."] },
        { heading: "사용자의 결정은 사용자의 책임", paragraphs: ["구스추즈가 생성하는 점수, 추천, 결과 또는 기타 출력은 사용자가 제공한 정보와 선호도에 따라 달라집니다.", "그 결과를 평가하고 이를 바탕으로 내리는 모든 결정이나 행동에 대한 책임은 전적으로 사용자에게 있습니다. 구스추즈와 그 제작자는 서비스를 사용해 내린 결정으로 인해 발생하는 손실, 손해, 부상, 비용 또는 기타 결과에 대해 책임지지 않습니다."] },
        { heading: "사용자 콘텐츠", paragraphs: ["구스추즈에 입력하거나 업로드하는 모든 정보 또는 콘텐츠에 대한 책임은 사용자에게 있습니다.", "사용할 권리가 없거나 관련 법률을 위반하는 콘텐츠를 구스추즈에 입력, 업로드 또는 처리해서는 안 됩니다."] },
        { heading: "가용성 및 변경", paragraphs: ["구스추즈는 무료로 제공되며, 사전 통지 없이 언제든 변경, 업데이트, 일시 중단 또는 종료될 수 있습니다.", "구스추즈가 항상 이용 가능하거나, 오류 없이 작동하거나, 이전에 다운로드한 파일과의 호환성을 유지하거나, 특정 기능을 계속 제공한다는 보장은 없습니다."] },
        { heading: "보증 없음", paragraphs: ["구스추즈는 관련 법률이 허용하는 최대 범위 내에서 명시적이든 묵시적이든 어떠한 종류의 보증 없이 \"있는 그대로\" 및 \"이용 가능한 상태\"로 제공됩니다.", "구스추즈 또는 그 결과의 정확성, 신뢰성, 가용성, 보안성 또는 특정 목적에 대한 적합성에 관해 어떠한 보장도 하지 않습니다."] },
        { heading: "책임의 제한", paragraphs: ["관련 법률이 허용하는 최대 범위 내에서, 구스추즈와 그 제작자는 구스추즈의 사용, 사용 불가 또는 의존과 관련하여 발생하는 직접, 간접, 부수적, 결과적, 특별, 징벌적 또는 기타 손해에 대해 책임지지 않습니다."] },
        { heading: "제3자 서비스", paragraphs: ["구스추즈는 제3자 서비스에 의존하거나 해당 서비스로 연결될 수 있습니다. 구스추즈는 제3자 서비스의 가용성, 보안, 콘텐츠, 정책 또는 관행을 통제하지 않으며 이에 대해 책임지지 않습니다."] },
        { heading: "약관 변경", paragraphs: ["본 서비스 약관은 수시로 업데이트될 수 있습니다. 이 페이지 상단의 날짜는 약관이 마지막으로 업데이트된 시점을 나타냅니다. 업데이트 후에도 구스추즈를 계속 사용하는 경우 개정된 약관에 동의한 것으로 간주됩니다."] },
        { heading: "준거법", paragraphs: ["본 약관은 관련 법률이 달리 요구하는 경우를 제외하고, 법률 충돌 원칙과 관계없이 구스추즈 제작자가 거주하는 관할권에 적용되는 법률의 지배를 받습니다."] },
        { heading: "문의", paragraphs: ["본 서비스 약관에 대해 질문이 있는 경우, 구스추즈 웹사이트에 제공된 연락처 정보를 통해 구스추즈 프로젝트에 문의할 수 있습니다."] }
      ],
      ga: [
        { heading: "", paragraphs: ["Trí Ghús Tsús a úsáid, aontaíonn tú leis na Téarmaí Seirbhíse seo. Mura n-aontaíonn tú leis na téarmaí seo, ná húsáid Gús Tsús."] },
        { heading: "Maidir le Gús Tsús", paragraphs: ["Is uirlis cinnteoireachta saor in aisce é Gús Tsús atá ceaptha cabhrú le húsáideoirí cúiseanna a eagrú agus a mheas agus cinntí á ndéanamh acu.", "Cuirtear Gús Tsús ar fáil mar uirlis ghinearálta le haghaidh úsáide faisnéisí agus pearsanta. Ní dhéanann sé cinntí ar do shon, agus níor cheart a thorthaí a mheas mar chomhairle ghairmiúil ná mar ionadach ar do bhreithiúnas féin."] },
        { heading: "Gan Chomhairle Ghairmiúil", paragraphs: ["Ní sholáthraíonn Gús Tsús comhairle dhlíthiúil, leighis, airgeadais, infheistíochta, mheabhairshláinte, sábháilteachta ná comhairle ghairmiúil eile.", "Ba cheart duit dul i gcomhairle le gairmí cuí cáilithe agus cinntí á ndéanamh agat a éilíonn saineolas gairmiúil."] },
        { heading: "Is Ort Féin atá Freagracht do Chinntí", paragraphs: ["Braitheann aon scóir, moltaí, torthaí nó aschuir eile a tháirgeann Gús Tsús ar an bhfaisnéis agus na roghanna a sholáthraíonn an t-úsáideoir.", "Is ortsa amháin atá an fhreagracht na torthaí sin a mheas agus aon chinntí nó gníomhartha a dhéanann tú bunaithe orthu a ghlacadh. Níl Gús Tsús ná a chruthaitheoir freagrach as caillteanais, damáistí, gortuithe, costais ná iarmhairtí eile a eascraíonn as cinntí a rinneadh trí úsáid na seirbhíse."] },
        { heading: "Ábhar Úsáideora", paragraphs: ["Tá tú freagrach as aon fhaisnéis nó ábhar a chuireann tú isteach i nGús Tsús nó a uaslódálann tú chuige.", "Níor cheart duit Gús Tsús a úsáid chun ábhar nach bhfuil ceart agat a úsáid, nó a sháraíonn dlí infheidhme, a chur isteach, a uaslódáil nó a phróiseáil."] },
        { heading: "Infhaighteacht agus Athruithe", paragraphs: ["Cuirtear Gús Tsús ar fáil saor in aisce agus féadfar é a athrú, a nuashonrú, a chur ar fionraí nó a scor am ar bith gan fógra.", "Níl aon ráthaíocht ann go mbeidh Gús Tsús ar fáil i gcónaí, go n-oibreoidh sé gan earráidí, go gcoinneoidh sé comhoiriúnacht le comhaid a íoslódáladh roimhe seo, nó go leanfaidh sé de ghné ar leith a chur ar fáil."] },
        { heading: "Gan Bharántais", paragraphs: ["Cuirtear Gús Tsús ar fáil \"mar atá\" agus \"mar atá ar fáil\", gan bharántais d'aon chineál, sainráite ná intuigthe, a mhéid is mó a cheadaítear faoin dlí infheidhme.", "Ní thugtar aon ráthaíocht maidir le cruinneas, iontaofacht, infhaighteacht, slándáil ná oiriúnacht Ghús Tsús nó a thorthaí d'aon chuspóir ar leith."] },
        { heading: "Teorainn le Dliteanas", paragraphs: ["A mhéid is mó a cheadaítear faoin dlí infheidhme, ní bheidh Gús Tsús ná a chruthaitheoir faoi dhliteanas as aon damáistí díreacha, indíreacha, teagmhasacha, iarmhartacha, speisialta, samplacha ná damáistí eile a eascraíonn as d'úsáid, d'éagumas úsáid a bhaint as, nó do spleáchas ar Ghús Tsús."] },
        { heading: "Seirbhísí Tríú Páirtí", paragraphs: ["Féadfaidh Gús Tsús brath ar sheirbhísí tríú páirtí nó nascadh leo. Ní rialaíonn Gús Tsús infhaighteacht, slándáil, ábhar, polasaithe ná cleachtais seirbhísí tríú páirtí, agus níl sé freagrach astu."] },
        { heading: "Athruithe ar na Téarmaí Seo", paragraphs: ["Féadfar na Téarmaí Seirbhíse seo a nuashonrú ó am go ham. Léiríonn an dáta ag barr an leathanaigh seo cathain a nuashonraíodh na téarmaí is déanaí. Is ionann leanúint d'úsáid Ghús Tsús tar éis nuashonraithe agus glacadh leis na téarmaí leasaithe."] },
        { heading: "Dlí Rialaithe", paragraphs: ["Tá na Téarmaí seo faoi rialú na ndlíthe is infheidhme sa dlínse ina bhfuil cruthaitheoir Ghús Tsús ina chónaí, gan aird ar phrionsabail choimhlinte dlíthe, ach amháin sa chás go n-éilíonn dlí infheidhme a mhalairt."] },
        { heading: "Teagmháil", paragraphs: ["Má tá ceisteanna agat faoi na Téarmaí Seirbhíse seo, is féidir leat teagmháil a dhéanamh le tionscadal Ghús Tsús tríd an bhfaisnéis teagmhála atá ar fáil ar shuíomh gréasáin Ghús Tsús."] }
      ]
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

  let currentLanguage = window.GooseChooseRoutes.language();
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
    feedbackLink: document.getElementById("feedbackLink"),
    updateLogButton: document.getElementById("updateLogButton"),
    updateLogModal: document.getElementById("updateLogModal"),
    updateLogContent: document.getElementById("updateLogContent"),
    closeUpdateLog: document.getElementById("closeUpdateLog"),
    comingSoonTip: document.getElementById("comingSoonTip"),
    themePicker: document.getElementById("themePicker"),
    themeOptions: document.querySelectorAll("[data-theme-choice]"),
    homeView: document.getElementById("homeView"),
    randomView: document.getElementById("randomView"),
    privacyView: document.getElementById("privacyView"),
    privacyContent: document.getElementById("privacyContent"),
    termsView: document.getElementById("termsView"),
    termsContent: document.getElementById("termsContent"),
    randomLinkWrap: document.getElementById("randomLinkWrap"),
    toolTabs: document.querySelectorAll("[data-tool-choice]"),
    slotReels: document.querySelectorAll("[data-slot-reel]"),
    slotResult: document.getElementById("slotResult"),
    spinSlot: document.getElementById("spinSlot"),
    slotTool: document.getElementById("slotTool"),
    blackjackTool: document.getElementById("blackjackTool"),
    blackjackStatus: document.getElementById("blackjackStatus"),
    blackjackNegativeLabel: document.getElementById("blackjackNegativeLabel"),
    blackjackPositiveLabel: document.getElementById("blackjackPositiveLabel"),
    blackjackNegativeScore: document.getElementById("blackjackNegativeScore"),
    blackjackPositiveScore: document.getElementById("blackjackPositiveScore"),
    blackjackNegativeCards: document.getElementById("blackjackNegativeCards"),
    blackjackPositiveCards: document.getElementById("blackjackPositiveCards"),
    dealBlackjack: document.getElementById("dealBlackjack"),
    hitBlackjack: document.getElementById("hitBlackjack"),
    stayBlackjack: document.getElementById("stayBlackjack"),
    jokerModal: document.getElementById("jokerModal"),
    jokerModalHelp: document.getElementById("jokerModalHelp"),
    jokerRankSelect: document.getElementById("jokerRankSelect"),
    jokerSuitSelect: document.getElementById("jokerSuitSelect"),
    applyJoker: document.getElementById("applyJoker"),
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
  const suits = [
    { name: "Spades", symbol: "♠", rank: 0 },
    { name: "Hearts", symbol: "♥", rank: 1 },
    { name: "Diamonds", symbol: "♦", rank: 2 },
    { name: "Clubs", symbol: "♣", rank: 3 }
  ];
  const cardRanks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let currentRoute = routeFromHash();
  let activeTool = "slot";
  let slotTimer = null;
  let blackjackState = createBlackjackState();

  function t(key, replacements = {}) {
    const dictionary = translations[currentLanguage] || translations.en;
    let value = dictionary[key] || translations.en[key] || key;
    for (const [name, replacement] of Object.entries(replacements)) {
      value = value.split(`{${name}}`).join(replacement);
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
    if (score === 0) return `0 ${t("neutral")}`;
    const displayScore = formatScore(isCustomMode() ? Math.abs(score) : score);
    const side = score < 0 ? "negative" : "positive";
    const label = Math.abs(score) === 5 ? strongSideLabel(side) : sideLabel(side);
    return `${displayScore} ${label}`;
  }

  function optionLabels() {
    return {
      negative: sideLabel("negative"),
      positive: sideLabel("positive")
    };
  }

  function slotOptionLabel(side) {
    const label = sideLabel(side);
    return isCustomMode() ? label : label.toLowerCase();
  }

  function routeFromHash() {
    if (window.location.hash === "#random") return "random";
    if (window.location.hash === "#privacy") return "privacy";
    if (window.location.hash === "#terms") return "terms";
    return "home";
  }

  function renderRoute() {
    currentRoute = routeFromHash();
    els.homeView.hidden = currentRoute !== "home";
    els.randomView.hidden = currentRoute !== "random";
    els.privacyView.hidden = currentRoute !== "privacy";
    els.termsView.hidden = currentRoute !== "terms";
    document.body.classList.toggle("random-route", currentRoute === "random");
    if (currentRoute === "random") {
      renderRandomTools();
    } else if (currentRoute === "privacy" || currentRoute === "terms") {
      renderLegalPage(currentRoute);
    }
  }

  function renderLegalPage(pageName) {
    const content = LEGAL_PAGES[pageName]?.[currentLanguage] || LEGAL_PAGES[pageName]?.en;
    const container = pageName === "privacy" ? els.privacyContent : els.termsContent;
    if (!content || !container) return;

    container.innerHTML = "";
    content.forEach((section) => {
      const sectionElement = document.createElement("section");
      sectionElement.className = "legal-section";

      if (section.heading) {
        const heading = document.createElement("h2");
        heading.textContent = section.heading;
        sectionElement.append(heading);
      }

      section.paragraphs.forEach((paragraphText) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = paragraphText;
        sectionElement.append(paragraph);
      });

      container.append(sectionElement);
    });
  }

  function renderRandomLink() {
    els.randomLinkWrap.hidden = state.points.length === 0;
  }

  function setActiveTool(tool) {
    activeTool = tool;
    els.toolTabs.forEach((button) => {
      const active = button.dataset.toolChoice === tool;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    els.slotTool.hidden = tool !== "slot";
    els.slotTool.classList.toggle("active", tool === "slot");
    els.blackjackTool.hidden = tool !== "blackjack";
    els.blackjackTool.classList.toggle("active", tool === "blackjack");
    renderRandomTools();
  }

  function renderRandomTools() {
    const labels = optionLabels();
    if (!slotTimer) {
      els.slotReels.forEach((reel, index) => {
        const side = reel.dataset.resultSide || (index === 1 ? "negative" : "positive");
        reel.textContent = labels[side];
      });
    }
    if (!els.slotResult.dataset.resultSide) {
      els.slotResult.textContent = t("slotReady");
    } else {
      els.slotResult.textContent = t("slotResult", { winner: slotOptionLabel(els.slotResult.dataset.resultSide) });
    }
    els.spinSlot.textContent = els.slotResult.dataset.resultSide ? t("spinAgain") : t("spinSlot");
    renderBlackjack();
  }

  function finishSlotSpin(results) {
    const positiveCount = results.filter((side) => side === "positive").length;
    const winner = positiveCount >= 2 ? "positive" : "negative";
    const labels = optionLabels();
    results.forEach((side, index) => {
      els.slotReels[index].dataset.resultSide = side;
      els.slotReels[index].textContent = labels[side];
      els.slotReels[index].classList.toggle("winning", side === winner);
    });
    els.slotResult.dataset.resultSide = winner;
    els.slotResult.textContent = t("slotResult", { winner: slotOptionLabel(winner) });
    els.spinSlot.textContent = t("spinAgain");
    els.spinSlot.disabled = false;
  }

  function spinSlot() {
    if (slotTimer) clearInterval(slotTimer);
    const labels = optionLabels();
    els.spinSlot.disabled = true;
    els.spinSlot.textContent = t("spinning");
    els.slotResult.textContent = t("spinning");
    delete els.slotResult.dataset.resultSide;
    els.slotReels.forEach((reel) => {
      delete reel.dataset.resultSide;
      reel.classList.remove("winning");
    });

    slotTimer = setInterval(() => {
      els.slotReels.forEach((reel) => {
        reel.textContent = Math.random() < 0.5 ? labels.negative : labels.positive;
      });
    }, 90);

    window.setTimeout(() => {
      clearInterval(slotTimer);
      slotTimer = null;
      const results = Array.from({ length: 3 }, () => Math.random() < 0.5 ? "negative" : "positive");
      finishSlotSpin(results);
    }, 1100);
  }

  function createBlackjackState() {
    return {
      deck: [],
      hands: { negative: [], positive: [] },
      stayed: { negative: false, positive: false },
      active: null,
      phase: "ready",
      pendingJoker: null,
      pendingJokerAfter: null,
      pendingJokerPlayer: null,
      statusKey: "blackjackReady",
      statusData: {}
    };
  }

  function createDeck() {
    const deck = [];
    suits.forEach((suit) => {
      cardRanks.forEach((rank) => {
        deck.push({ id: crypto.randomUUID(), rank, suit });
      });
    });
    for (let index = 0; index < 2; index += 1) {
      deck.push({
        id: crypto.randomUUID(),
        joker: true,
        rank: "Joker",
        suit: null,
        wildRank: "A",
        wildSuit: null,
        locked: false
      });
    }
    for (let index = deck.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
    }
    return deck;
  }

  function cardDisplayRank(card) {
    return card.joker && card.locked ? card.wildRank : card.rank;
  }

  function cardDisplaySuit(card) {
    if (card.joker) return card.locked ? card.wildSuit : null;
    return card.suit;
  }

  function cardValue(rank) {
    if (rank === "Joker") return 0;
    if (rank === "A") return 11;
    if (["J", "Q", "K"].includes(rank)) return 10;
    return Number(rank);
  }

  function handScore(hand) {
    let total = hand.reduce((sum, card) => sum + cardValue(cardDisplayRank(card)), 0);
    let aces = hand.filter((card) => cardDisplayRank(card) === "A").length;
    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }
    return total;
  }

  function distanceFromTwentyOne(hand) {
    const score = handScore(hand);
    return score > 21 ? Number.POSITIVE_INFINITY : 21 - score;
  }

  function bestSuitRank(hand) {
    return Math.min(...hand.map((card) => cardDisplaySuit(card).rank));
  }

  function nextPlayer(player) {
    return player === "negative" ? "positive" : "negative";
  }

  function blackjackPlayerLabel(player) {
    const labels = optionLabels();
    return labels[player];
  }

  function blackjackStatusText() {
    const data = { ...blackjackState.statusData };
    if (data.playerSide) data.player = blackjackPlayerLabel(data.playerSide);
    if (data.winnerSide) data.winner = blackjackPlayerLabel(data.winnerSide);
    return t(blackjackState.statusKey, data);
  }

  function unresolvedJokers() {
    return ["negative", "positive"].flatMap((player) => (
      blackjackState.hands[player]
        .filter((card) => card.joker && !card.locked)
        .map((card) => ({ player, card }))
    ));
  }

  function populateJokerSelects() {
    const selectedRank = els.jokerRankSelect.value || "A";
    const selectedSuit = els.jokerSuitSelect.value || "Spades";
    els.jokerRankSelect.innerHTML = "";
    cardRanks.forEach((rank) => {
      const option = document.createElement("option");
      option.value = rank;
      option.textContent = rank;
      els.jokerRankSelect.append(option);
    });

    els.jokerSuitSelect.innerHTML = "";
    suits.forEach((suit) => {
      const option = document.createElement("option");
      option.value = suit.name;
      option.textContent = `${suit.symbol} ${suit.name}`;
      if (suit.name === "Hearts" || suit.name === "Diamonds") option.className = "red-suit-option";
      els.jokerSuitSelect.append(option);
    });
    els.jokerRankSelect.value = selectedRank;
    els.jokerSuitSelect.value = selectedSuit;
    updateJokerSuitSelectColor();
  }

  function updateJokerSuitSelectColor() {
    const red = els.jokerSuitSelect.value === "Hearts" || els.jokerSuitSelect.value === "Diamonds";
    els.jokerSuitSelect.classList.toggle("red-suit-select", red);
  }

  function renderJokerModalCopy() {
    if (!blackjackState.pendingJokerPlayer) return;
    els.jokerModalHelp.textContent = t("chooseJokerHelp", {
      player: blackjackPlayerLabel(blackjackState.pendingJokerPlayer)
    });
  }

  function openJokerModal(player, card) {
    const anchor = document.querySelector(".blackjack-card .tool-copy");
    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      els.jokerModal.style.setProperty("--joker-modal-left", `${rect.left}px`);
      els.jokerModal.style.setProperty("--joker-modal-top", `${rect.top}px`);
    }
    blackjackState.phase = "choosing-joker";
    blackjackState.pendingJoker = card;
    blackjackState.pendingJokerPlayer = player;
    renderJokerModalCopy();
    els.jokerRankSelect.value = card.wildRank;
    els.jokerSuitSelect.value = card.wildSuit?.name || "Spades";
    updateJokerSuitSelectColor();
    els.jokerModal.hidden = false;
    els.jokerRankSelect.focus();
    renderBlackjack();
  }

  function promptNextJoker(after, preferredPlayer = null) {
    const pending = unresolvedJokers();
    const next = preferredPlayer
      ? pending.find((item) => item.player === preferredPlayer) || pending[0]
      : pending[0];
    if (!next) return false;
    blackjackState.pendingJokerAfter = after;
    openJokerModal(next.player, next.card);
    return true;
  }

  function resumeAfterJokers() {
    const after = blackjackState.pendingJokerAfter;
    const player = blackjackState.pendingJokerPlayer;
    blackjackState.pendingJoker = null;
    blackjackState.pendingJokerPlayer = null;

    if (promptNextJoker(after)) return;

    blackjackState.pendingJokerAfter = null;
    blackjackState.phase = "playing";

    if (after === "deal") {
      const first = chooseFirstPlayer();
      blackjackState.active = first.player;
      blackjackState.statusKey = first.tied ? "blackjackTieFirst" : "blackjackTurn";
      blackjackState.statusData = { playerSide: first.player };
    } else if (after === "hit") {
      if (!evaluateBlackjackRound()) advanceBlackjackTurn();
    } else if (after === "manual") {
      evaluateBlackjackRound();
    }

    renderBlackjack();
  }

  function applyPendingJoker() {
    const card = blackjackState.pendingJoker;
    if (!card) return;
    card.wildRank = els.jokerRankSelect.value;
    card.wildSuit = suits.find((suit) => suit.name === els.jokerSuitSelect.value) || suits[0];
    card.locked = true;
    els.jokerModal.hidden = true;
    resumeAfterJokers();
  }

  function chooseFirstPlayer() {
    const negativeDistance = distanceFromTwentyOne(blackjackState.hands.negative);
    const positiveDistance = distanceFromTwentyOne(blackjackState.hands.positive);
    if (negativeDistance < positiveDistance) return { player: "negative", tied: false };
    if (positiveDistance < negativeDistance) return { player: "positive", tied: false };
    return {
      player: bestSuitRank(blackjackState.hands.negative) <= bestSuitRank(blackjackState.hands.positive)
        ? "negative"
        : "positive",
      tied: true
    };
  }

  function dealBlackjackRound() {
    blackjackState = createBlackjackState();
    blackjackState.deck = createDeck();
    for (let index = 0; index < 2; index += 1) {
      blackjackState.hands.negative.push(blackjackState.deck.pop());
      blackjackState.hands.positive.push(blackjackState.deck.pop());
    }
    if (promptNextJoker("deal")) return;
    blackjackState.phase = "playing";
    const first = chooseFirstPlayer();
    blackjackState.active = first.player;
    blackjackState.statusKey = first.tied ? "blackjackTieFirst" : "blackjackTurn";
    blackjackState.statusData = { playerSide: first.player };
    renderBlackjack();
  }

  function completeBlackjackRound(messageKey, data = {}) {
    blackjackState.phase = "complete";
    blackjackState.active = null;
    blackjackState.statusKey = messageKey;
    blackjackState.statusData = data;
  }

  function evaluateBlackjackRound() {
    const negativeScore = handScore(blackjackState.hands.negative);
    const positiveScore = handScore(blackjackState.hands.positive);
    const negativeBust = negativeScore > 21;
    const positiveBust = positiveScore > 21;

    if (negativeBust) {
      completeBlackjackRound("blackjackBust", {
        playerSide: "negative",
        winnerSide: "positive"
      });
      return true;
    }
    if (positiveBust) {
      completeBlackjackRound("blackjackBust", {
        playerSide: "positive",
        winnerSide: "negative"
      });
      return true;
    }
    if (!blackjackState.stayed.negative || !blackjackState.stayed.positive) return false;

    const negativeDistance = 21 - negativeScore;
    const positiveDistance = 21 - positiveScore;
    if (negativeDistance === positiveDistance) {
      completeBlackjackRound("blackjackFinalTie", { score: String(negativeScore) });
      return true;
    }
    const winner = negativeDistance < positiveDistance ? "negative" : "positive";
    completeBlackjackRound("blackjackWin", { winnerSide: winner });
    return true;
  }

  function advanceBlackjackTurn() {
    const other = nextPlayer(blackjackState.active);
    if (!blackjackState.stayed[other]) {
      blackjackState.active = other;
      blackjackState.statusKey = "blackjackTurn";
      blackjackState.statusData = { playerSide: other };
      return;
    }
    evaluateBlackjackRound();
  }

  function hitBlackjack() {
    if (blackjackState.phase !== "playing" || !blackjackState.active) return;
    const card = blackjackState.deck.pop();
    blackjackState.hands[blackjackState.active].push(card);
    if (card.joker && !card.locked) {
      promptNextJoker("hit", blackjackState.active);
      return;
    }
    blackjackState.stayed[blackjackState.active] = handScore(blackjackState.hands[blackjackState.active]) > 21;
    if (!evaluateBlackjackRound()) advanceBlackjackTurn();
    renderBlackjack();
  }

  function stayBlackjack() {
    if (blackjackState.phase !== "playing" || !blackjackState.active) return;
    const player = blackjackState.active;
    blackjackState.stayed[player] = true;
    blackjackState.statusKey = "blackjackStayed";
    blackjackState.statusData = {
      playerSide: player,
      score: String(handScore(blackjackState.hands[player]))
    };
    advanceBlackjackTurn();
    renderBlackjack();
  }

  function renderCard(card) {
    const div = document.createElement("div");
    div.className = "playing-card";
    const displaySuit = cardDisplaySuit(card);
    if (displaySuit && (displaySuit.name === "Hearts" || displaySuit.name === "Diamonds")) div.classList.add("red");
    if (card.joker) div.classList.add("joker-card");

    const rank = document.createElement("span");
    rank.textContent = card.joker ? t("joker") : card.rank;
    div.append(rank);

    if (card.joker && !card.locked) {
      const jokerSymbol = document.createElement("span");
      jokerSymbol.className = "joker-symbol";
      jokerSymbol.textContent = "🃟";
      div.append(jokerSymbol);
    } else if (!card.joker) {
      const suit = document.createElement("span");
      suit.textContent = card.suit.symbol;
      div.append(suit);
    }

    if (card.joker && card.locked) {
      const lockedValue = document.createElement("span");
      lockedValue.className = "joker-as";
      lockedValue.textContent = `${card.wildRank} ${card.wildSuit.symbol}`;
      div.append(lockedValue);
    }
    return div;
  }

  function renderBlackjackHand(player, container, scoreElement) {
    container.innerHTML = "";
    blackjackState.hands[player].forEach((card) => container.append(renderCard(card)));
    const score = handScore(blackjackState.hands[player]);
    scoreElement.textContent = blackjackState.hands[player].length ? String(score) : "0";
  }

  function renderBlackjack() {
    const labels = optionLabels();
    els.blackjackNegativeLabel.textContent = labels.negative;
    els.blackjackPositiveLabel.textContent = labels.positive;
    els.blackjackStatus.textContent = blackjackStatusText();
    renderBlackjackHand("negative", els.blackjackNegativeCards, els.blackjackNegativeScore);
    renderBlackjackHand("positive", els.blackjackPositiveCards, els.blackjackPositiveScore);
    document.querySelectorAll("[data-blackjack-player]").forEach((hand) => {
      hand.classList.toggle("active", blackjackState.active === hand.dataset.blackjackPlayer);
      hand.classList.toggle("stayed", blackjackState.stayed[hand.dataset.blackjackPlayer]);
    });
    const playing = blackjackState.phase === "playing";
    els.hitBlackjack.disabled = !playing;
    els.stayBlackjack.disabled = !playing;
    els.dealBlackjack.disabled = blackjackState.phase === "choosing-joker";
    els.dealBlackjack.textContent = blackjackState.phase === "ready" ? t("dealRound") : t("dealRound");
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
    window.GooseChooseRoutes.sync(currentLanguage);
    document.documentElement.lang = currentLanguage === "ko" ? "ko" : currentLanguage === "ga" ? "ga" : "en";
    document.title = t("appName");
    document.querySelectorAll("[data-welcome-language]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.welcomeLanguage === currentLanguage));
    });
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-coming-soon]").forEach((element) => {
      element.setAttribute("title", t("comingSoon"));
    });
    document.querySelectorAll("[data-i18n-label]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nLabel));
    });
    els.feedbackLink.href = FEEDBACK_URLS[currentLanguage] || FEEDBACK_URLS.en;
    els.comingSoonTip.textContent = t("comingSoon");
    populateJokerSelects();
    renderJokerModalCopy();
    if (currentRoute === "random") renderRandomTools();
    if (currentRoute === "privacy" || currentRoute === "terms") renderLegalPage(currentRoute);
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
    document.querySelectorAll("[data-welcome-theme]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.welcomeTheme === currentTheme));
    });
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
    return state.decision.trim() || state.points.length ||
      state.customLabels.negative.trim() || state.customLabels.positive.trim() ||
      els.newPointText.value.trim();
  }

  function confirmClearDecision() {
    return new Promise((resolve) => {
      const dialog = document.createElement("dialog");
      dialog.className = "modal-card clear-dialog";
      dialog.setAttribute("aria-labelledby", "clearDecisionTitle");
      const title = document.createElement("h2");
      title.id = "clearDecisionTitle";
      title.textContent = t("confirmClear");
      const form = document.createElement("form");
      form.method = "dialog";
      form.className = "clear-dialog-actions";
      const cancel = document.createElement("button");
      cancel.className = "ghost-button";
      cancel.value = "cancel";
      cancel.textContent = t("cancel");
      cancel.autofocus = true;
      const confirmButton = document.createElement("button");
      confirmButton.className = "primary-button";
      confirmButton.value = "clear";
      confirmButton.textContent = t("clearAll");
      form.append(cancel, confirmButton);
      dialog.append(title, form);
      dialog.addEventListener("close", () => {
        const confirmed = dialog.returnValue === "clear";
        dialog.remove();
        resolve(confirmed);
      }, { once: true });
      document.body.append(dialog);
      dialog.showModal();
    });
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
      const column = list.closest(".point-column");
      column?.classList.toggle("has-points", points.length > 0);
      column?.classList.toggle("is-empty", points.length === 0);

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
    renderRandomLink();
    if (currentRoute === "random") renderRandomTools();
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
        const emphasizedLabel = item.match(/^\*\*(.+?)\*\*(.*)$/);
        if (emphasizedLabel) {
          const label = document.createElement("strong");
          label.textContent = emphasizedLabel[1];
          listItem.append(label, emphasizedLabel[2]);
        } else {
          listItem.textContent = item;
        }
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

  function setupWelcome() {
    const dialog = document.getElementById("welcomeDialog");
    const remember = document.getElementById("welcomeRemember");
    const settings = ["Theme", "Language"].map(kind => ({
      kind,
      trigger: document.getElementById(`welcome${kind}`),
      panel: document.getElementById(`welcome${kind}Options`)
    }));
    function closeSettings() {
      settings.forEach(({ trigger, panel }) => {
        panel.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
      });
    }
    settings.forEach(({ kind, trigger, panel }) => {
      trigger.addEventListener("click", () => {
        const opening = panel.hidden;
        closeSettings();
        if (opening) {
          panel.hidden = false;
          trigger.setAttribute("aria-expanded", "true");
          panel.querySelector('[aria-pressed="true"]').focus();
        }
      });
      panel.addEventListener("click", (event) => {
        const option = event.target.closest("button");
        if (!option) return;
        const picker = kind === "Language" ? els.languagePicker : els.themePicker;
        picker.value = option.dataset[`welcome${kind}`];
        picker.dispatchEvent(new Event("change"));
        closeSettings();
        trigger.focus();
      });
      panel.addEventListener("keydown", (event) => {
        const buttons = [...panel.querySelectorAll("button")];
        const index = buttons.indexOf(document.activeElement);
        const direction = { ArrowDown: 1, ArrowUp: -1 }[event.key];
        if (direction) {
          event.preventDefault();
          buttons[(index + direction + buttons.length) % buttons.length].focus();
        }
      });
    });
    dialog.addEventListener("click", (event) => {
      if (!event.target.closest(".welcome-settings")) closeSettings();
    });
    dialog.addEventListener("focusin", (event) => {
      if (!event.target.closest(".welcome-settings")) closeSettings();
    });
    dialog.addEventListener("keydown", (event) => {
      const active = settings.find(({ panel }) => !panel.hidden);
      if (event.key === "Escape" && active) {
        event.preventDefault();
        event.stopPropagation();
        closeSettings();
        active.trigger.focus();
      }
    });
    const preferenceKey = "goose-choose-welcome-hidden";
    const sessionKey = "goose-choose-welcome-seen";
    let returnFocus;
    // Storage may be unavailable in private browsing; the introduction still works.
    function readPreference(session, key) {
      try { return (session ? sessionStorage : localStorage).getItem(key) === "true"; }
      catch { return false; }
    }
    function openWelcome() {
      if (dialog.open) return;
      returnFocus = document.activeElement;
      remember.checked = readPreference(false, preferenceKey);
      dialog.showModal();
      document.body.classList.add("welcome-open");
      document.getElementById("welcomeTitle").focus();
      try { sessionStorage.setItem(sessionKey, "true"); } catch { /* Optional persistence. */ }
    }
    function dismissWelcome() {
      closeSettings();
      try {
        if (remember.checked) localStorage.setItem(preferenceKey, "true");
        else localStorage.removeItem(preferenceKey);
      } catch { /* Dismissal must work without storage. */ }
      dialog.close();
      document.body.classList.remove("welcome-open");
      const target = returnFocus && returnFocus !== document.body && returnFocus.isConnected
        ? returnFocus : els.decisionInput;
      target.focus({ preventScroll: true });
    }
    document.getElementById("howItWorksButton").addEventListener("click", openWelcome);
    document.getElementById("closeWelcome").addEventListener("click", dismissWelcome);
    document.getElementById("welcomeStart").addEventListener("click", dismissWelcome);
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      dismissWelcome();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const first = document.getElementById("closeWelcome");
      if (event.shiftKey && (document.activeElement === first || document.activeElement.id === "welcomeTitle")) {
        event.preventDefault();
        remember.focus();
      } else if (!event.shiftKey && document.activeElement === remember) {
        event.preventDefault();
        first.focus();
      }
    });
    if (!readPreference(false, preferenceKey) && !readPreference(true, sessionKey)) openWelcome();
    return function resetWelcome() {
      try { localStorage.removeItem(preferenceKey); } catch { /* Optional persistence. */ }
      try { sessionStorage.removeItem(sessionKey); } catch { /* Optional persistence. */ }
      openWelcome();
      remember.checked = false;
      dialog.scrollTop = 0;
    };
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
      renderRandomLink();
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

    els.clearAll.addEventListener("click", async () => {
      if (hasMeaningfulData() && !await confirmClearDecision()) return;
      state = { decision: "", decisionMode: "default", customLabels: { negative: "", positive: "" }, points: [] };
      els.decisionInput.value = "";
      els.newPointText.value = "";
      els.newPointScore.value = "";
      if (window.location.hash !== "#top") {
        window.location.hash = "top";
      } else {
        renderRoute();
      }
      update();
      renderNewPointScoreOptions();
      els.decisionInput.focus();
      resetWelcome();
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

    window.addEventListener("hashchange", renderRoute);
    window.addEventListener("popstate", () => {
      els.languagePicker.value = window.GooseChooseRoutes.language();
      els.languagePicker.dispatchEvent(new Event("change"));
      renderRoute();
    });

    els.toolTabs.forEach((button) => {
      button.addEventListener("click", () => setActiveTool(button.dataset.toolChoice));
    });

    els.spinSlot.addEventListener("click", spinSlot);
    els.dealBlackjack.addEventListener("click", dealBlackjackRound);
    els.hitBlackjack.addEventListener("click", hitBlackjack);
    els.stayBlackjack.addEventListener("click", stayBlackjack);
    els.jokerSuitSelect.addEventListener("change", updateJokerSuitSelectColor);
    els.applyJoker.addEventListener("click", applyPendingJoker);

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
  populateJokerSelects();
  els.decisionInput.value = state.decision;
  els.customNegative.value = state.customLabels.negative;
  els.customPositive.value = state.customLabels.positive;
  renderDecisionMode();
  renderLists();
  renderResult();
  renderLockState();
  renderRandomLink();
  renderRoute();

  const resetWelcome = setupWelcome();

  window.GooseChoose = {
    version: APP_VERSION,
    updateLog: UPDATE_LOG,
    calculate,
    classify,
    resultFor
  };
})();
