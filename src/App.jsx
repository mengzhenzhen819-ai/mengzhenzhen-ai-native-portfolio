import { useEffect, useRef, useState } from "react";

const ASSET = "/figma-resume";
const asset = (name) => `${ASSET}/${name}`;

const experiences = [
  {
    period: "2026/5-至今",
    company: "即时设计",
    role: "AI海外业务设计负责人",
    points: [
      "负责 AI 海外业务 App 设计，搭建 AI 工具、Skill 建设进行矩阵包生产提效，单包设计由 2–3pd 降低至 1pd，人力成本降低 50–60%，并沉淀 SOP 工作流",
      "深度协同产品业务，拆解业务目标，通过设计专项手段推动用户增长及商业化付费转化",
      "负责公司整体 UX 体验设计体系搭建与团队管理，统筹用户全链路设计工作，主导交互及视觉方案",
      "负责团队管理，包括需求拆解、资源分配、方案评审、设计质量把控、绩效考核及人才培养",
    ],
  },
  {
    period: "2026/1-2026/5",
    company: "AI Exploration",
    role: "",
    points: [
      "使用 ChatGPT、Claude、Cursor、Codex 等 AI 工具探索设计工作流",
      "将作品集从静态 PDF 升级为 AI-Native 动态网页作品集，总结沉淀 AI 学习使用方法",
      "内化与精进：阅读、上课、旅行、设计工作室兼职",
    ],
  },
  {
    period: "2022/8 - 2025/9",
    company: "字节跳动",
    role: "抖音app体验设计",
    points: [
      "主导抖音 App 激励端核心增长体系玩法优化，推动玩法体验升级，带动 LT 的有效增长",
      "0–1 搭建抖音 App 激励端中台能力系统与设计规范，提升增长效率与多端复用能力",
      "负责团队相关流程问题发现及治理工作，优化流程为团队提效",
      "主动积极，期间获得过涨薪激励",
    ],
  },
  {
    period: "2020/5 - 2022/8",
    company: "阿里巴巴集团",
    role: "BtoC大型影视产品设计",
    points: [
      "主导灯塔专业版 App 大型项目 0–1 改版",
      "管理 3 人外包团队",
      "改版取得不错数据收益，工作成果因突出获涨薪",
    ],
  },
  {
    period: "2019/7 - 2020/5",
    company: "滴滴出行",
    role: "B端企业级数据产品交互设计",
    points: [
      "企业级数据产品体验设计：解读 BI 数据工具的使用场景及用户画像，帮助产品体验提效",
      "滴滴云官网设计、带教 1 名实习生",
    ],
  },
  {
    period: "2017/1 - 2019/7",
    company: "易点天下",
    role: "UI设计",
    points: [
      "Dipbit App 区块链项目 UI 设计、Yeahtarger 等项目网站设计",
      "荣获公司「最佳工作新人」荣誉称号",
    ],
  },
  {
    period: "2016/6 - 2016/12",
    company: "中兴通讯",
    role: "UI设计实习",
    points: ["实习期间负责手机桌面图标、系统设置图标及系统界面设计"],
  },
];

const skillTags = [
  { label: "AI 平台搭建", width: 159 },
  { label: "增长设计", width: 152 },
  { label: "0-1建中台体系", width: 150 },
  { label: "0-1大项目改版", width: 163 },
  { label: "B端数据后台", width: 141 },
  { label: "协作流程优化", width: 159 },
];

const leftProjects = [
  { id: "matrix", title: "矩阵包AI平台搭建", description: "单包设计由2-3pd降低至1pd，人力成本降低50-60%", width: 494, height: 401, mediaHeight: 277.071, detailLayout: "longform" },
  { id: "signin", title: "提签到连签率流程优化升级", description: "三端LT30留存1.48pp，人均连签天数提升1.2天", width: 494, height: 401, mediaHeight: 277.071 },
  { id: "lighthouse", title: "主导灯塔专业版项目改版", description: "挖掘业务策略机会点，推动全链路体验升级", width: 494, height: 491, mediaHeight: 362.672 },
  { id: "governance", title: "建立体验问题治理闭环", description: "体验问题由零散反馈升级为可治理的问题池,闭环效率显著提升，问题闭环率+13%,投诉/负反馈下降10%", width: 494.821, height: 476.827, mediaHeight: 331.693 },
];

const rightProjects = [
  { id: "incentive", title: "激励中台0-1搭建", description: "从多端激励玩法的共性问题出发,抽象底层能力、统一体验规则,并沉淀可配置化的设计方案，支撑玩法高效复用与快速上线", width: 495, height: 533, mediaHeight: 360.871 },
  { id: "treasure", title: "提宝箱开启率流程优化升级", description: "三端LT30留存+0.15pp，宝箱总PV+8.32%", width: 495, height: 411, mediaHeight: 277.071 },
  { id: "data", title: "B端数易数据平台", description: "优化复杂数据看板与分析工具的使用效率,帮助产品体验提效", width: 494.821, height: 524.06, mediaHeight: 369.429 },
];

const allProjects = [...leftProjects, ...rightProjects];
const projectImageAssets = {
  matrix: "matrix-final-v2.png",
  signin: "6270a.png",
  lighthouse: "lighthouse-final.png",
  governance: "governance-final-v2.png",
  incentive: "3c720.png",
  treasure: "cbef1.png",
  data: "834ea.png",
};

const lighthouseDetailImageModules = import.meta.glob("./ali-detail/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
});

const lighthouseDetailImages = [
  1, 5, 6, 7, 3, 4, 2,
  8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  29, 30, 28, 27,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
].map((number) => lighthouseDetailImageModules[`./ali-detail/ali-detail-${number}.jpg`]);

const didiDetailImageModules = import.meta.glob("./didi-detail/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
});

const didiDetailImages = Array.from(
  { length: 21 },
  (_, index) => didiDetailImageModules[`./didi-detail/didi-detail-${index + 1}.jpg`],
);

const governanceDetailImageModules = import.meta.glob("./governance-detail/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
});

const governanceDetailImages = [65, 66].map(
  (number) => governanceDetailImageModules[`./governance-detail/byte-page-00${number}.jpg`],
);

const matrixDetailImageModules = import.meta.glob("./matrix-detail-svg/*.svg", {
  eager: true,
  import: "default",
  query: "?url",
});

const matrixDetailImages = Array.from(
  { length: 12 },
  (_, index) => matrixDetailImageModules[`./matrix-detail-svg/matrix-detail-${index + 1}.svg`],
);

const aiInterfaceDetailImageModules = import.meta.glob("./ai-interface-detail/*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
});

const aiInterfaceDetailImages = [aiInterfaceDetailImageModules["./ai-interface-detail/monkey-clear.jpg"]];

const aiPortfolioDetailImageModules = import.meta.glob("./ai-portfolio-detail/*.png", {
  eager: true,
  import: "default",
  query: "?url",
});

const aiRestorationDetailImageModules = import.meta.glob("./ai-restoration-detail/*.png", {
  eager: true,
  import: "default",
  query: "?url",
});

const aiPortfolioDetailImages = [aiPortfolioDetailImageModules["./ai-portfolio-detail/ai-portfolio-detail.png"]];
const aiRestorationDetailImages = [aiRestorationDetailImageModules["./ai-restoration-detail/ai-native-restoration-detail.png"]];

const projectDetailGalleries = {
  matrix: matrixDetailImages,
  lighthouse: lighthouseDetailImages,
  data: didiDetailImages,
  governance: governanceDetailImages,
  "ai-interface": aiInterfaceDetailImages,
  "ai-portfolio": aiPortfolioDetailImages,
  "ai-restoration": aiRestorationDetailImages,
};

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const reveal = (node) => {
      node.dataset.revealed = "true";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(reveal);
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px 90px" });
    nodes.forEach((node) => observer.observe(node));
    const revealInitialViewport = () => {
      nodes.forEach((node) => {
        const bounds = node.getBoundingClientRect();
        if (bounds.top < window.innerHeight + 90 && bounds.bottom > -90) reveal(node);
      });
    };
    const frame = window.requestAnimationFrame(revealInitialViewport);
    const fallback = window.setTimeout(revealInitialViewport, 250);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, []);
}

function useProjectReturnTarget() {
  useEffect(() => {
    if (!window.location.hash.startsWith("#project-")) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const target = document.querySelector(window.location.hash);
      if (!target) return;
      target.scrollIntoView({ block: "center", behavior: "auto" });
      target.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
}

function DraggableSticker({ src, className }) {
  const drag = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onPointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      pointerId: event.pointerId,
      originX: event.clientX,
      originY: event.clientY,
      startX: position.x,
      startY: position.y,
    };
  };

  const onPointerMove = (event) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    setPosition({
      x: drag.current.startX + event.clientX - drag.current.originX,
      y: drag.current.startY + event.clientY - drag.current.originY,
    });
  };

  const onPointerUp = (event) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  return (
    <span
      className={`sticker ${className}`}
      aria-hidden="true"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img src={src} alt="" draggable="false" />
    </span>
  );
}

function Header() {
  const [likes, setLikes] = useState(() => {
    if (typeof window === "undefined") return 1319;
    const savedLikes = Number.parseInt(window.localStorage.getItem("magic-meng-likes") ?? "", 10);
    return Number.isFinite(savedLikes) && savedLikes >= 1319 ? savedLikes : 1319;
  });
  const [likeClicks, setLikeClicks] = useState(0);
  const likeButton = useRef(null);

  useEffect(() => {
    window.localStorage.setItem("magic-meng-likes", String(likes));
  }, [likes]);

  const addLike = () => {
    setLikes((count) => count + 1);
    setLikeClicks((count) => count + 1);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    likeButton.current?.animate(
      [
        { transform: "scale(1)", boxShadow: "inset 0 1px 1px rgba(255,255,255,.1), 0 1px 3px rgba(10,10,10,.8)" },
        { transform: "scale(1.075)", boxShadow: "inset 0 1px 2px rgba(255,255,255,.16), 0 7px 20px rgba(0,0,0,.48)" },
        { transform: "scale(.985)" },
        { transform: "scale(1)" },
      ],
      { duration: 340, easing: "cubic-bezier(.2,.85,.25,1)" },
    );
  };

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="回到顶部">
        <img src={asset("91667.png")} alt="" />
        <span>Magic Meng</span>
      </a>
      <button
        ref={likeButton}
        className="like-button"
        onClick={addLike}
        type="button"
        aria-label={`${likes}人点赞，点击继续点赞`}
      >
        <span key={likes} className={`like-count ${likeClicks ? "is-ticking" : ""}`}>{likes}人 点赞</span>
        <span className="heart-wrap">
          <img key={likeClicks} className={likeClicks ? "is-popping" : ""} src={asset("01a0f.svg")} alt="" />
        </span>
      </button>
    </header>
  );
}

function ProfileCard() {
  return (
    <section className="profile-wrap" data-reveal aria-label="个人介绍">
      <div className="profile-back" />
      <div className="profile-shell">
        <div className="profile-card">
          <div className="profile-copy">
            <h1>孟珍珍</h1>
            <div className="rule" />
            <p>Hi，我是Magic，产品体验设计师，先后经历滴滴 · 阿里 · 字节跳动。具备大型 ToC / ToB 项目全链路设计经验，横跨 B 端数据平台到 C端增长激励，目前正在负责 AI 出海业务产品设计工作，并有6人团队管理经验</p>
          </div>
          <div className="portrait-wrap">
            <img src={asset("5f44c.png")} alt="孟珍珍肖像" />
          </div>
          <div className="profile-tags">
            <span>AI产品</span><span>增长玩法</span><span>全链路设计思维</span><span>数据导向</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function useTallinnTime() {
  const format = () => new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Europe/Tallinn",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const timer = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

function LocationCard() {
  const time = useTallinnTime();
  return (
    <section className="location-wrap" data-reveal aria-label="当前位置">
      <DraggableSticker src={asset("23436.svg")} className="rocket-sticker" />
      <div className="location-shell">
        <img className="map-art" src={asset("094ef.svg")} alt="" />
        <div className="location-frame">
          <div className="location-line"><span>目前在</span><strong>塔林，东爱尔兰</strong></div>
          <div className="status-pill">
            <span><img src={asset("e0634.svg")} alt="" />{time}</span>
            <span><img src={asset("dd53a.svg")} alt="" />14 °C</span>
          </div>
        </div>
      </div>
    </section>
  );
}

async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const field = document.createElement("textarea");
    field.value = value;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }
}

function CopyButton({ icon, value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await copyToClipboard(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button className={`contact-button ${copied ? "is-copied" : ""}`} type="button" onClick={copy}>
      <span className="contact-button-inner">
        <img src={asset(icon)} alt="" /><span>{copied ? "已复制" : value}</span>
      </span>
    </button>
  );
}

function StatsCard() {
  return (
    <section className="stats-shell" data-reveal aria-label="职业数据">
      <DraggableSticker src={asset("d133d.svg")} className="glasses-sticker" />
      <DraggableSticker src={asset("2b24d.svg")} className="smile-sticker" />
      <div className="stats-card">
        <h2><img src={asset("f9755.svg")} alt="" />体验设计师 × AI 时代</h2>
        <div className="stats-grid">
          <div><strong>7+</strong><span>设计经验</span></div>
          <div><strong>3家</strong><span>头部互联网</span></div>
          <div><strong>亿+</strong><span>用户规模覆盖</span></div>
          <div><strong>硕士</strong><span>设计学</span></div>
        </div>
        <div className="stats-divider" />
        <div className="contact-grid">
          <CopyButton icon="2e5c2.svg" value="15291968365" />
          <CopyButton icon="02824.svg" value="15291968365@163.com" />
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ children }) {
  return <h2 className="section-title"><img src={asset("c8464.svg")} alt="" />{children}</h2>;
}

function ExperienceSection() {
  const [expanded, setExpanded] = useState(true);
  return (
    <section className={`experience-shell ${expanded ? "is-open" : "is-collapsed"}`} data-reveal>
      <div className="experience-card">
        <div className="experience-heading">
          <SectionTitle>工作经历</SectionTitle>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="experience-list"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "收起" : "展开"}
          </button>
        </div>
        <div className="experience-body" id="experience-list">
          {experiences.map((item, index) => (
            <article
              className="experience-item"
              data-reveal
              key={`${item.period}-${item.company}`}
              style={{ "--reveal-delay": `${(index % 3) * 80}ms` }}
            >
              <time>{item.period}</time>
              <div className="experience-role"><h3>{item.company}</h3>{item.role && <span>{item.role}</span>}</div>
              <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillSection() {
  return (
    <section className="skills-section" id="projects" data-reveal>
      <SectionTitle>项目经验</SectionTitle>
      <div className="skill-tags">
        {skillTags.map(({ label, width }) => (
          <button type="button" key={label} style={{ "--tag-width": `${width}px` }}>
            <span className="skill-tag-inner">
              <span>{label}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectMedia({ id }) {
  if (id === "matrix") return (
    <div className="scene scene-matrix"><img src={asset(projectImageAssets.matrix)} alt="" /></div>
  );
  if (id === "signin") return (
    <div className="scene scene-signin"><img src={asset(projectImageAssets.signin)} alt="" /></div>
  );
  if (id === "treasure") return (
    <div className="scene scene-treasure"><img src={asset(projectImageAssets.treasure)} alt="" /></div>
  );
  if (id === "lighthouse") return (
    <div className="scene scene-lighthouse"><img className="lighthouse-final" src={asset(projectImageAssets.lighthouse)} alt="" /></div>
  );
  if (id === "incentive") return (
    <div className="scene scene-incentive"><img src={asset(projectImageAssets.incentive)} alt="" /></div>
  );
  if (id === "data") return (
    <div className="scene scene-data"><img src={asset(projectImageAssets.data)} alt="" /></div>
  );
  if (id === "governance") return (
    <div className="scene scene-governance"><img src={asset(projectImageAssets.governance)} alt="" /></div>
  );
  return null;
}

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const move = (event) => {
    const node = cardRef.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--tilt-x", `${y * -2.2}deg`);
    node.style.setProperty("--tilt-y", `${x * 2.2}deg`);
    node.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    node.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  };
  const reset = () => {
    const node = cardRef.current;
    node?.style.setProperty("--tilt-x", "0deg");
    node?.style.setProperty("--tilt-y", "0deg");
  };
  return (
    <a
      ref={cardRef}
      id={`project-${project.id}`}
      className={`project-card project-${project.id}`}
      href={`/projects/${project.id}`}
      aria-label={`查看${project.title}项目详情`}
      style={{
        "--card-width": `${project.width}px`,
        "--card-height": `${project.height}px`,
        "--media-height": `${project.mediaHeight}px`,
        "--media-aspect": `${project.width} / ${project.mediaHeight}`,
      }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="project-media"><ProjectMedia id={project.id} /></div>
      <div className="project-copy"><h3>{project.title}</h3><p>{project.description}</p></div>
    </a>
  );
}

function ProjectsSection() {
  return (
    <section className="projects-grid" data-reveal aria-label="项目作品">
      <div className="project-column project-column-left">{leftProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      <div className="project-column project-column-right">{rightProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
    </section>
  );
}

const aiProjects = [
  { id: "ai-interface", title: "用AI生成高质量APP界面", description: "用清晰的提示词，让 AI 快速完成从界面构思到高质量视觉方案的生成", image: "1d1d4.png", detailLayout: "longform" },
  { id: "ai-portfolio", title: "如何用 vibe coding 做作品集（本站）", description: "用 AI 工具辅助设计并构建本动态作品集网站，以产品思维替代传统 PDF，记录 AI 协作全流程的方法", image: "2a4fd.png", detailLayout: "longform" },
  { id: "ai-restoration", title: "如何用AI高质量还原设计稿", description: "通过AI工具辅助前端还原与工作流拆解,沉淀高质量设计稿还原方法", image: "b4998.png", detailLayout: "longform" },
];

const detailProjects = [...allProjects, ...aiProjects.filter((project) => project.id)];

function AISection() {
  return (
    <section className="ai-section" data-reveal>
      <SectionTitle>AI 探索</SectionTitle>
      <div
        className="ai-viewport"
        role="region"
        aria-label="AI 探索项目，向左滑动查看更多"
        tabIndex="0"
      >
        <div className="ai-grid">
          {aiProjects.map((item) => {
            const content = (
              <>
                <div className="ai-media"><img src={asset(item.image)} alt="" draggable="false" /></div>
                <div className="ai-copy"><h3>{item.title}</h3><p>{item.description}</p></div>
              </>
            );
            return item.id ? (
              <a
                className="ai-card"
                id={`project-${item.id}`}
                href={`/projects/${item.id}`}
                aria-label={`查看${item.title}项目详情`}
                key={item.title}
                draggable="false"
              >
                {content}
              </a>
            ) : (
              <article className="ai-card" key={item.title} tabIndex="0">{content}</article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectDetailPage({ project }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.title = `${project.title} — Magic Meng`;
    return () => { document.title = "Magic Meng — 产品体验设计师"; };
  }, [project]);

  const detailImages = projectDetailGalleries[project.id];

  return (
    <div className="project-detail-page">
      <header className="project-detail-header">
        <a className="project-detail-back" href={`/#project-${project.id}`} aria-label={`返回${project.title}卡片`}>← 返回项目经验</a>
        <span>Magic Meng</span>
      </header>
      <main className="project-detail-main">
        <p className="project-detail-kicker">PROJECT EXPERIENCE</p>
        <h1>{project.title}</h1>
        <p className="project-detail-description">{project.description}</p>
        {detailImages ? (
          <div className={`project-detail-gallery ${project.detailLayout === "longform" ? "project-detail-gallery-longform" : ""}`} aria-label={`${project.title}项目完整方案`}>
            {detailImages.map((image, index) => (
              <figure className="project-detail-visual" key={image}>
                <img
                  src={image}
                  alt={`${project.title}项目方案第${index + 1}页`}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        ) : (
          <figure className="project-detail-visual">
            <img src={asset(projectImageAssets[project.id])} alt={`${project.title}项目主视觉`} />
          </figure>
        )}
      </main>
    </div>
  );
}

export function App() {
  useReveal();
  useProjectReturnTarget();
  const detailMatch = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
  const detailProject = detailMatch ? detailProjects.find((project) => project.id === detailMatch[1]) : null;
  if (detailProject) return <ProjectDetailPage project={detailProject} />;

  return (
    <div id="top" className="site-root">
      <Header />
      <main>
        <div className="resume-shell hero-layout">
          <div className="hero-left"><ProfileCard /><LocationCard /></div>
          <StatsCard />
        </div>
        <div className="resume-shell"><ExperienceSection /></div>
        <div className="resume-shell"><SkillSection /><ProjectsSection /></div>
        <div className="resume-shell"><AISection /></div>
      </main>
      <footer><span>© Magic Meng</span><span>AI-Native Portfolio · 2026</span></footer>
    </div>
  );
}
