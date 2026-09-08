const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const publicDir = path.join(__dirname, 'public');

app.get('/download/교재.zip', (req, res) => {
  res.download(path.join(publicDir, 'download', '교재.zip'), '교재.zip');
});

app.get('/download/데이터.zip', (req, res) => {
  res.download(path.join(publicDir, 'download', '데이터.zip'), '데이터.zip');
});

app.use(express.static(publicDir));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const navItems = [
  {
    label: '문서자동화',
    icon: 'file-stack',
    children: [
      { label: '예시학습', href: '/learning-examples', icon: 'book-open' },
      { label: '템플릿생성', href: '/prompt-templates', icon: 'file-text' },
      { label: '문서요약분류', href: '/document-summary', icon: 'layers' },
      { label: '문서자동생성', href: '/document-generation', icon: 'sparkles' },
      { label: '데이터정제', href: '/data-cleaning', icon: 'filter' },
      { label: '데이터분석', href: '/data-analysis', icon: 'bar-chart-3' },
      { label: '제미나이 노트북', href: '/notebook-lm', icon: 'notebook-pen' },
    ],
  },
  { label: '이미지생성', href: '/image-generation', icon: 'image' },
  { label: '동영상생성', href: '/video', icon: 'video' },
  { label: '바이브코딩', href: '/vibe-coding', icon: 'notebook-pen' },
];

const registeredRoutes = new Set([
  '/',
  '/learning-examples',
  '/prompt-templates',
  '/document-summary',
  '/document-generation',
  '/data-cleaning',
  '/data-analysis',
  '/image-generation',
  '/video',
  '/notebook-lm',
  '/vibe-coding'
]);

function flattenNavLinks(items) {
  return items.flatMap((item) => (item.children ? item.children : [item]));
}

app.locals.site = {
  title: '업무자동화',
  tagline: 'AI로 문서 업무를 자동화하는 실전 학습 플랫폼',
  description:
    '프롬프트 설계부터 문서 생성, 요약·분류, 데이터 정제·분석까지 AI 문서자동화 핵심 역량을 단계별로 익혀 보세요.',
  heroImage: '/images/hero.jpg',
  heroImageAlt: '노트북과 문서가 놓인 깔끔한 업무 데스크',
  footer: {
    address: '서울특별시 강남구 테헤란로 123, AI문서빌딩 8층',
    phone: '02-1234-5678',
    copyright: '© 2026 문서자동화 학습센터. All rights reserved.',
  },
};

const site = app.locals.site;

app.use((req, res, next) => {
  res.locals.navItems = navItems;
  res.locals.currentPath = req.path;
  next();
});

app.get('/', (req, res) => {
  res.render('pages/index', {
    pageTitle: '홈',
    heroImage: site.heroImage,
    heroImageAlt: site.heroImageAlt,
    heroBadge: 'AI Document Automation',
    heroBadgeIcon: 'bot',
    heroTitle: `${site.title} 학습 플랫폼`,
    heroDescription: site.description,
    heroShowDownload: true,
  });
});

app.get('/learning-examples', (req, res) => {
  res.render('pages/learning-examples', {
    pageTitle: '학습예시',
    heroImage: '/images/learning-examples-hero.png',
    heroImageAlt: '노트북과 학습 자료가 놓인 깔끔한 업무 데스크',
    heroBadge: 'Learning Examples',
    heroBadgeIcon: 'book-open',
    heroTitle: '예시학습',
    heroDescription:
      'AI 문서자동화 실전 학습 예제와 단계별 실습 가이드를 통해 업무에 바로 적용할 수 있는 역량을 키워 보세요.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});

app.get('/prompt-templates', (req, res) => {
  res.render('pages/prompt-templates', {
    pageTitle: '프롬프트템플릿',
    heroImage: '/images/prompt-templates-hero.png',
    heroImageAlt: '프롬프트 템플릿과 문서가 놓인 깔끔한 업무 데스크',
    heroBadge: 'Prompt Templates',
    heroBadgeIcon: 'file-text',
    heroTitle: '프롬프트템플릿',
    heroDescription:
      '업무에 바로 쓸 수 있는 AI 프롬프트 템플릿과 Few-shot 예시를 통해 문서 자동화 역량을 빠르게 익혀 보세요.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});

app.get('/document-summary', (req, res) => {
  res.render('pages/document-summary', {
    pageTitle: '문서요약분류',
    heroImage: '/images/document-summary-hero.png',
    heroImageAlt: '문서 요약과 분류 작업이 진행되는 깔끔한 업무 데스크',
    heroBadge: 'Document Summary',
    heroBadgeIcon: 'layers',
    heroTitle: '문서요약분류',
    heroDescription:
      '긴 문서를 핵심만 요약하고 유형별로 분류하는 AI 실무 방법을 익혀 보고서·이메일·계약서 처리 속도를 높여 보세요.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});

app.get('/document-generation', (req, res) => {
  res.render('pages/document-generation', {
    pageTitle: '문서자동생성',
    heroImage: '/images/document-generation-hero.png',
    heroImageAlt: 'AI가 문서를 자동 생성하는 깔끔한 업무 데스크',
    heroBadge: 'Document Generation',
    heroBadgeIcon: 'sparkles',
    heroTitle: '문서자동생성',
    heroDescription:
      '프롬프트 한 번으로 보고서·제안서·이메일 초안을 자동 생성하는 AI 실무 방법을 익혀 문서 작성 시간을 크게 줄여 보세요.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});

app.get('/data-cleaning', (req, res) => {
  res.render('pages/data-cleaning', {
    pageTitle: '데이터정제',
    heroImage: '/images/data-cleaning-hero.png',
    heroImageAlt: '스프레드시트 데이터를 정제하는 깔끔한 업무 데스크',
    heroBadge: 'Data Cleaning',
    heroBadgeIcon: 'filter',
    heroTitle: '데이터정제',
    heroDescription:
      '중복·누락·형식 오류가 섞인 원본 데이터를 AI로 정제하고 표준화하는 실무 방법을 익혀 분석 전 품질을 높여 보세요.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});

app.get('/data-analysis', (req, res) => {
  res.render('pages/data-analysis', {
    pageTitle: '데이터분석',
    heroImage: '/images/data-analysis-hero.png',
    heroImageAlt: '차트와 대시보드로 데이터를 분석하는 깔끔한 업무 데스크',
    heroBadge: 'Data Analysis',
    heroBadgeIcon: 'bar-chart-3',
    heroTitle: '데이터분석',
    heroDescription:
      '정제된 데이터에서 인사이트를 도출하고 차트·보고서로 시각화하는 AI 실무 방법을 익혀 의사결정 속도를 높여 보세요.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});

app.get('/image-generation', (req, res) => {
  res.render('pages/image-generation', {
    pageTitle: '이미지생성',
    heroImage: '/images/image-generation-hero.png',
    heroImageAlt: 'AI가 이미지를 생성하는 크리에이티브 업무 데스크',
    heroBadge: 'Image Generation',
    heroBadgeIcon: 'image',
    heroTitle: '이미지생성',
    heroDescription:
      '프롬프트로 업무용 이미지·일러스트·차트 시각물을 AI로 생성하는 실무 방법을 익혀 디자인 제작 시간을 줄여 보세요.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});

app.get('/video', (req, res) => {
  res.render('pages/video', {
    pageTitle: '동영상생성',
    heroImage: '/images/video-hero.png',
    heroImageAlt: 'AI로 동영상을 제작하는 크리에이티브 업무 데스크',
    heroBadge: 'Video Generation',
    heroBadgeIcon: 'video',
    heroTitle: '동영상생성',
    heroDescription:
      '프롬프트로 교육·홍보·업무용 영상을 AI로 생성하는 실무 방법을 익혀 영상 제작 시간과 비용을 줄여 보세요.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});

app.get('/notebook-lm', (req, res) => {
  res.render('pages/notebook-lm', {
    pageTitle: '제미나이 노트북',
    heroImage: '/images/notebook-lm-hero.png',
    heroImageAlt: 'AI 노트북으로 문서를 분석하고 학습하는 깔끔한 업무 데스크',
    heroBadge: 'NotebookLM',
    heroBadgeIcon: 'notebook-pen',
    heroTitle: '제미나이 노트북',
    heroDescription:
      '업로드한 문서·자료를 AI 노트북으로 정리하고 요약·질의응답·오디오 개요까지 생성하는 실무 방법을 익혀 보세요.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});


app.get('/vibe-coding', (req, res) => {
  res.render('pages/vibe-coding', {
    pageTitle: '바이브 코딩',
    heroImage: '/images/notebook-lm-hero.png',
    heroImageAlt: '일상적인 대화(자연어)로 AI에게 지시해 앱이나 프로그램을 만드는 AI 중심의 소프트웨어 개발 방식',
    heroBadge: '바이브 코딩',
    heroBadgeIcon: 'notebook-pen',
    heroTitle: '바이브 코딩',
    heroDescription:
      '바이브 코딩은 개발자가 직접 코드를 짜지 않고, 일상적인 대화(자연어)로 AI에게 지시해 앱이나 프로그램을 만드는 AI 중심의 소프트웨어 개발 방식입니다.',
    heroShowDownload: false,
    heroOverlayClass: 'hero-overlay--light',
  });
});

flattenNavLinks(navItems).forEach(({ href, label }) => {
  if (!href || registeredRoutes.has(href)) return;
  app.get(href, (req, res) => {
    res.render('pages/placeholder', {
      pageTitle: label,
      sectionTitle: label,
      sectionDescription: '해당 학습 콘텐츠는 추후 제작 예정입니다.',
    });
  });
});

app.use((req, res) => {
  res.status(404).render('pages/placeholder', {
    pageTitle: '페이지를 찾을 수 없습니다',
    sectionTitle: '404',
    sectionDescription: '요청하신 페이지가 존재하지 않습니다.',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
