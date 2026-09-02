'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables (guarded — section may be removed)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

if (modalContainer && modalCloseBtn && overlay) {

  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();

    });

  }

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);

}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// 언어 전환과 무관하게 필터가 동작하도록, 로드 시점의 영어 라벨을 데이터 속성에 고정
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].dataset.filterValue = filterBtn[i].innerText.trim().toLowerCase();
}
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].dataset.filterValue = selectItems[i].innerText.trim().toLowerCase();
}

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = (this.dataset.filterValue || this.innerText).toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = (this.dataset.filterValue || this.innerText).toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables (guarded — form replaced with direct links)
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  // add event to all form input field
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// 언어 전환과 무관하게 탭 전환이 동작하도록, 로드 시점의 영어 라벨을 데이터 속성에 고정
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].dataset.navTarget = navigationLinks[i].innerHTML.trim().toLowerCase();
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const target = (this.dataset.navTarget || this.innerHTML).trim().toLowerCase();
    for (let i = 0; i < pages.length; i++) {
      if (target === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



/* ─────────────────────────────────────────────────────────────
   i18n — 한국어/영어 토글
   토글 버튼은 네비바에 동적으로 추가되며, 선택 언어는 localStorage에 저장
   ───────────────────────────────────────────────────────────── */

(function () {

  // [selector, 한국어] — 셀렉터는 요소 하나만 가리켜야 함
  const KO = [
    // 사이드바
    [".sidebar .title", "제조 DX 엔지니어"],
    ["[data-sidebar-btn] span", "연락처 보기"],
    ["#resume-download span", "이력서 다운로드"],
    [".contacts-list .contact-item:nth-child(1) .contact-title", "이메일"],
    [".contacts-list .contact-item:nth-child(2) .contact-title", "링크드인"],
    [".contacts-list .contact-item:nth-child(3) .contact-title", "깃허브"],
    [".contacts-list .contact-item:nth-child(4) .contact-title", "위치"],
    [".contacts-list .contact-item:nth-child(4) address", "부산 · 원격 근무"],

    // 네비바
    [".navbar-list .navbar-item:nth-child(1) .navbar-link", "소개"],
    [".navbar-list .navbar-item:nth-child(2) .navbar-link", "이력"],
    [".navbar-list .navbar-item:nth-child(3) .navbar-link", "포트폴리오"],
    [".navbar-list .navbar-item:nth-child(4) .navbar-link", "연락처"],

    // About
    [".about .article-title", "소개"],
    [".about-text p:nth-of-type(1)", "현장에서 일하다, 그 현장에서 쓸 소프트웨어를 직접 만들었습니다. 품질관리(QC)와 IT의 교차점에서 종이 기반 현장 업무를 디지털화하고, 아무도 두 번 하고 싶지 않은 반복 보고 업무를 자동화합니다."],
    [".about-text p:nth-of-type(2)", "미시간의 자동차 부품사(Tier-1) Hansae Mobility USA에서 QC 인턴으로 근무하며 현장 감사, 리워크 재고 실사, 문서관리 등 품질 실무를 직접 수행했고, 부서의 디지털화 시스템 전반을 구축했습니다 — 생산라인 10개·파트넘버 약 50종을 관리하는 운영 웹앱, 월 약 10시간의 수작업을 줄인 Excel/VBA 자동화, 다국어 작업지시서 번역 도구까지. 인턴 종료 후에는 개인사업자를 등록했고, 회사와 컨설팅·소프트웨어 개발 외주 계약을 맺어 그 일을 이어가고 있습니다."],
    [".service-title", "하는 일"],
    [".service-list .service-item:nth-child(1) .service-item-title", "QC 디지털화"],
    [".service-list .service-item:nth-child(1) .service-item-text", "종이 체크시트를 운영 웹앱으로 — 규격 검증, SPC 관리도, 교대 추적, 자동 리포트."],
    [".service-list .service-item:nth-child(2) .service-item-title", "업무 자동화"],
    [".service-list .service-item:nth-child(2) .service-item-text", "Excel/VBA·Python 도구로 몇 시간짜리 반복 보고 업무를 몇 분으로 단축합니다."],
    [".service-list .service-item:nth-child(3) .service-item-title", "AI 활용 개발"],
    [".service-list .service-item:nth-child(3) .service-item-text", "설계 → 구현 → 검증 → 배포 표준 파이프라인(보안 가드레일 포함). 사내 대회 수상."],
    [".service-list .service-item:nth-child(4) .service-item-title", "데이터·ERP 분석"],
    [".service-list .service-item:nth-child(4) .service-item-text", "실제 공장 데이터 SQL 분석 — ERD 문서화, 테이블 명세, 보고서 연동."],

    // Resume
    [".resume .article-title", "이력"],
    [".resume section:nth-of-type(1) .title-wrapper h3", "경력"],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(1) .timeline-item-title", "컨설팅·소프트웨어 개발 외주 (개인사업자) — Hansae Mobility USA (원격)"],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(1) span", "2026.08 — 현재"],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(1) .timeline-text", "인턴십 종료 후 개인사업자를 등록해 B2B 외주 계약 체결. 미국 QC·IT팀과 원격으로 협업하며 SOP·품질 문서 작성과 프로젝트 마무리·인수인계를 지원하고, QC 디지털화 시스템을 유지·확장 중. 교대 스케줄러 앱은 생산 현장 도입 완료, QC 체크시트 웹앱은 전면 도입을 앞둔 최종 파일럿 진행 중."],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(2) .timeline-item-title", "품질관리(QC) 인턴 — Hansae Mobility USA (미시간 폰티악)"],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(2) span", "2026.01 — 2026.06"],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(2) .timeline-text", "현장 감사, 품질 알림 후속 조치, 리워크 재고 실사, 문서관리 등 품질 실무를 직접 수행한 뒤, 부서 유일의 개발 담당으로서 같은 업무를 디지털화. OEM 프로그램 2개·라인 10개·파트넘버 약 50종을 커버하는 QC 체크시트 웹앱(Next.js · Prisma · SQL Server) 구축, 반복 Excel 보고서 6종 VBA 자동화, 생산 관리자 약 15명 교육."],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(3) .timeline-item-title", "프로젝트 리더 — 국제 마케팅 프로젝트 (부산)"],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(3) span", "2024.09 — 2024.12"],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(3) .timeline-text", "AI 노트테이킹 디바이스의 스웨덴 시장 진출(GTM) 리서치 총괄 — 수요 추정, 경쟁 앱 6종 벤치마크, GDPR 리스크 평가 — 경영진 브리프 및 런칭 덱 산출."],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(4) .timeline-item-title", "1종 창고 보급병, 병장 — 대한민국 육군"],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(4) span", "2020.12 — 2022.06"],
    [".resume section:nth-of-type(1) .timeline-item:nth-child(4) .timeline-text", "12개 품목군의 부대 재보급을 촉박한 일정 속에서 관리 — 성과를 인정받아 조기진급, 병장 만기전역."],

    [".resume section:nth-of-type(2) .title-wrapper h3", "학력"],
    [".resume section:nth-of-type(2) .timeline-item:nth-child(1) .timeline-item-title", "부경대학교"],
    [".resume section:nth-of-type(2) .timeline-item:nth-child(1) span", "2027년 졸업예정"],
    [".resume section:nth-of-type(2) .timeline-item:nth-child(1) .timeline-text", "국제통상학·빅데이터융합 복수전공. 부산."],
    [".resume section:nth-of-type(2) .timeline-item:nth-child(2) .timeline-item-title", "Wayne State University — 교환학생"],
    [".resume section:nth-of-type(2) .timeline-item:nth-child(2) span", "2025.05 — 2025.12"],
    [".resume section:nth-of-type(2) .timeline-item:nth-child(2) .timeline-text", "미국 자동차 산업의 중심지, 디트로이트에서 교환학생 과정 수료."],
    [".resume section:nth-of-type(2) .timeline-item:nth-child(3) .timeline-item-title", "Georgia College & State University — 교환학생"],
    [".resume section:nth-of-type(2) .timeline-item:nth-child(3) span", "2025.01 — 2025.05"],
    [".resume section:nth-of-type(2) .timeline-item:nth-child(3) .timeline-text", "미국 조지아주 밀리지빌에서 교환학생 과정 수료."],

    [".resume section:nth-of-type(3) .title-wrapper h3", "수상"],
    [".resume section:nth-of-type(3) .timeline-item:nth-child(1) .timeline-item-title", "우수상 — AI 활용 경진대회"],
    [".resume section:nth-of-type(3) .timeline-item:nth-child(1) span", "Hansae Mobility · 2026"],
    [".resume section:nth-of-type(3) .timeline-item:nth-child(1) .timeline-text", "전사 대회 — 현장 자동화를 위한 AI 활용 표준 개발 파이프라인."],
    [".resume section:nth-of-type(3) .timeline-item:nth-child(2) .timeline-item-title", "1위 (First Prize) — BITLO"],
    [".resume section:nth-of-type(3) .timeline-item:nth-child(2) span", "부산연구원 · 부산항만공사 · 2024"],
    [".resume section:nth-of-type(3) .timeline-item:nth-child(2) .timeline-text", "부산국제무역물류전 — 도시 물류 혁신의 실현 가능성과 창의성을 인정받음."],
    [".resume section:nth-of-type(3) .timeline-item:nth-child(3) .timeline-item-title", "Best Debater & Best Project"],
    [".resume section:nth-of-type(3) .timeline-item:nth-child(3) span", "동원그룹 인재육성 프로그램 · 2023"],
    [".resume section:nth-of-type(3) .timeline-item:nth-child(3) .timeline-text", "기업 인재육성 프로그램에서 팀 케이스 프로젝트 2건과 임원 발표를 리드."],

    // Portfolio
    [".portfolio .article-title", "포트폴리오"],
    [".project-list .project-item:nth-child(1) .project-highlights li:nth-child(1)", "생산라인 10개·파트넘버 약 50종, 현장 파일럿 중"],
    [".project-list .project-item:nth-child(1) .project-highlights li:nth-child(2)", "규격 검증, SPC 관리도, 일일 자동 이메일 리포트"],
    [".project-list .project-item:nth-child(2) .project-highlights li:nth-child(1)", "수작업 교대 배정 스프레드시트를 대체"],
    [".project-list .project-item:nth-child(2) .project-highlights li:nth-child(2)", "생산 현장에 도입되어 실사용 중"],
    [".project-list .project-item:nth-child(3) .project-highlights li:nth-child(1)", "DOCX·PPTX·XLSX·PDF 일괄 번역"],
    [".project-list .project-item:nth-child(3) .project-highlights li:nth-child(2)", "DeepL·OpenAI·Claude 기반 다국어 용어집 지원"],
    [".project-list .project-item:nth-child(4) .project-highlights li:nth-child(1)", "반복 Excel 보고서 6종 자동화"],
    [".project-list .project-item:nth-child(4) .project-highlights li:nth-child(2)", "월 약 10시간 수작업을 분 단위로 단축"],
    [".project-list .project-item:nth-child(5) .project-highlights li:nth-child(1)", "공장 ERP 데이터베이스 SQL 분석"],
    [".project-list .project-item:nth-child(5) .project-highlights li:nth-child(2)", "ERD·테이블 명세 문서화로 리포트 연동 기반 마련"],
    [".project-list .project-item:nth-child(6) .project-highlights li:nth-child(1)", "보안 가드레일을 갖춘 AI 활용 표준 개발 파이프라인"],
    [".project-list .project-item:nth-child(6) .project-highlights li:nth-child(2)", "사내 AI 활용 경진대회 우수상 수상"],
    [".project-list .project-item:nth-child(7) .project-highlights li:nth-child(1)", "500m 격자 기반 랜덤포레스트 입지 스코어링"],
    [".project-list .project-item:nth-child(7) .project-highlights li:nth-child(2)", "2024년 QGIS 연구를 원커맨드 파이프라인으로 재구축"],
    [".filter-list .filter-item:nth-child(1) button", "전체"],
    [".filter-list .filter-item:nth-child(2) button", "웹 앱"],
    [".filter-list .filter-item:nth-child(3) button", "데스크톱 앱"],
    [".filter-list .filter-item:nth-child(4) button", "자동화·데이터"],
    ["[data-selecct-value]", "카테고리 선택"],
    [".select-list .select-item:nth-child(1) button", "전체"],
    [".select-list .select-item:nth-child(2) button", "웹 앱"],
    [".select-list .select-item:nth-child(3) button", "데스크톱 앱"],
    [".select-list .select-item:nth-child(4) button", "자동화·데이터"],
    [".project-list .project-item:nth-child(1) .project-category", "웹 앱 — Next.js · Prisma · SQL Server"],
    [".project-list .project-item:nth-child(2) .project-category", "데스크톱 앱 — Python · FastAPI · 현장 도입"],
    [".project-list .project-item:nth-child(3) .project-category", "데스크톱 앱 — Python · DeepL / OpenAI / Claude"],
    [".project-list .project-item:nth-child(4) .project-category", "자동화·데이터 — Excel · VBA"],
    [".project-list .project-item:nth-child(5) .project-category", "자동화·데이터 — SQL · ERD"],
    [".project-list .project-item:nth-child(6) .project-category", "자동화·데이터 — Claude · Codex · 우수상"],
    [".project-list .project-item:nth-child(7) .project-category", "자동화·데이터 — Python · GeoPandas · scikit-learn"],

    // Contact
    [".contact .article-title", "연락처"],
    [".form-title", "연락 주세요"],
    [".contact-form .timeline-text", "가장 빠른 연락 수단은 이메일과 링크드인입니다. 보통 하루 안에 답변드립니다."],
  ];

  // 영어 원문 백업
  const originals = new Map();

  // 현재 언어는 메모리에만 유지 — 페이지를 새로 열면 항상 영어로 시작
  let currentLang = "en";

  function applyLang(lang) {
    KO.forEach(function (pair) {
      const el = document.querySelector(pair[0]);
      if (!el) return;
      if (!originals.has(pair[0])) originals.set(pair[0], el.textContent);
      el.textContent = (lang === "ko") ? pair[1] : originals.get(pair[0]);
    });
    document.documentElement.lang = (lang === "ko") ? "ko" : "en";
    const btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = (lang === "ko") ? "English" : "한국어";
    // 이력서 다운로드는 언어와 무관하게 영문 PDF로 고정
    currentLang = lang;
  }

  // 토글 버튼을 네비바에 동적 추가
  const navList = document.querySelector(".navbar-list");
  if (navList) {
    const li = document.createElement("li");
    li.className = "navbar-item";
    const btn = document.createElement("button");
    btn.className = "navbar-link";
    btn.id = "lang-toggle";
    btn.textContent = "한국어";
    btn.addEventListener("click", function () {
      applyLang(currentLang === "ko" ? "en" : "ko");
    });
    li.appendChild(btn);
    navList.appendChild(li);
  }

})();
