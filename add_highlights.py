import io

ROOT = r"C:/Users/진세운/AppData/Local/Temp/pf2"
HTML = ROOT + "/index.html"
CSS = ROOT + "/assets/css/style.css"
JS = ROOT + "/assets/js/script.js"

# ── content: (english bullets), (korean bullets) — 2 each, kept very short ──
CONTENT = [
    ("QC Checklist Web App", [
        "10 lines, ~50 part numbers, in on-site pilot",
        "Spec validation, SPC charts, daily email reports",
    ], [
        "생산라인 10개·파트넘버 약 50종, 현장 파일럿 중",
        "규격 검증, SPC 관리도, 일일 자동 이메일 리포트",
    ]),
    ("Shift Scheduler", [
        "Replaces manual shift-assignment spreadsheets",
        "Adopted for production use on the floor",
    ], [
        "수작업 교대 배정 스프레드시트를 대체",
        "생산 현장에 도입되어 실사용 중",
    ]),
    ("Work Instruction Translator", [
        "Batch-translates DOCX / PPTX / XLSX / PDF",
        "Multi-language glossary via DeepL / OpenAI / Claude",
    ], [
        "DOCX·PPTX·XLSX·PDF 일괄 번역",
        "DeepL·OpenAI·Claude 기반 다국어 용어집 지원",
    ]),
    ("QC Macro Toolkit", [
        "Six recurring Excel reports automated",
        "~10 hours of monthly manual work cut to minutes",
    ], [
        "반복 Excel 보고서 6종 자동화",
        "월 약 10시간 수작업을 분 단위로 단축",
    ]),
    ("ERP Analysis &amp; Spec", [
        "SQL analysis of the plant ERP database",
        "ERD and table specs enabling reporting integrations",
    ], [
        "공장 ERP 데이터베이스 SQL 분석",
        "ERD·테이블 명세 문서화로 리포트 연동 기반 마련",
    ]),
    ("AI Dev Pipeline", [
        "Standardized AI-assisted workflow with security guardrails",
        "Won the company-wide Excellence Award",
    ], [
        "보안 가드레일을 갖춘 AI 활용 표준 개발 파이프라인",
        "사내 AI 활용 경진대회 우수상 수상",
    ]),
    ("Seoul Smoking Booth Siting", [
        "Random-forest scoring over a 500 m analysis grid",
        "Rebuilt a 2024 QGIS study into a one-command pipeline",
    ], [
        "500m 격자 기반 랜덤포레스트 입지 스코어링",
        "2024년 QGIS 연구를 원커맨드 파이프라인으로 재구축",
    ]),
]

# ── 1) index.html: insert <ul class="project-highlights"> after each .project-category ──
s = io.open(HTML, encoding="utf-8").read()
for title, en, ko in CONTENT:
    anchor = f'<p class="project-category">'
    # find the specific card by title proximity: locate title, then the next project-category paragraph
    ti = s.index(f'<h3 class="project-title">{title}</h3>')
    cat_start = s.index('<p class="project-category">', ti)
    cat_end = s.index("</p>", cat_start) + len("</p>")
    bullets_html = (
        '\n\n                <ul class="project-highlights">\n'
        + "".join(f'                  <li>{b}</li>\n' for b in en)
        + '                </ul>'
    )
    s = s[:cat_end] + bullets_html + s[cat_end:]
io.open(HTML, "w", encoding="utf-8", newline="").write(s)

# ── 2) CSS: compact bullet list styling ──
c = io.open(CSS, encoding="utf-8").read()
css_block = '''
.project-highlights {
  margin-left: 10px;
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.project-highlights li {
  position: relative;
  padding-left: 13px;
  color: var(--light-gray-70);
  font-size: var(--fs-7);
  font-weight: var(--fw-300);
  line-height: 1.4;
}

.project-highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--orange-yellow-crayola);
}
'''
anchor_css = ".project-category {\n  color: var(--light-gray-70);\n  font-size: var(--fs-6);\n  font-weight: var(--fw-300);\n}"
assert c.count(anchor_css) == 1, "css anchor %d" % c.count(anchor_css)
c = c.replace(anchor_css, anchor_css + "\n" + css_block)
io.open(CSS, "w", encoding="utf-8", newline="").write(c)

# ── 3) script.js: Korean dictionary entries, targeted by nth-child(N) li:nth-child(k) ──
j = io.open(JS, encoding="utf-8").read()
anchor_js = '    [".portfolio .article-title", "포트폴리오"],'
assert j.count(anchor_js) == 1, "js anchor %d" % j.count(anchor_js)
lines = [anchor_js]
for idx, (title, en, ko) in enumerate(CONTENT, start=1):
    for k, text in enumerate(ko, start=1):
        lines.append(f'    [".project-list .project-item:nth-child({idx}) .project-highlights li:nth-child({k})", "{text}"],')
j = j.replace(anchor_js, "\n".join(lines))
io.open(JS, "w", encoding="utf-8", newline="").write(j)

print("done")
