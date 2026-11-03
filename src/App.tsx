/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import GradientASCII from './components/GradientASCII';

const R2 = 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/';

interface ProjectItem {
  title: string;
  url: string;
  screenshot: string;
  cardVideo?: string;
  fullVideo?: string;
  r2Video: string;
  category: string;
  categoryTag: string;
  description: string;
  number: number;
  procedural3DPreview?: boolean;
}

const WORK: ProjectItem[] = [
  {
    title: 'School of Future Skills',
    url: 'https://schooloffutureskills.netlify.app/',
    screenshot: '/sites/site1.png',
    cardVideo: '/videos/v1_futureskills.mp4',
    fullVideo: '/assets/aistudio/Future_Skills__61e8c9c6.mp4',
    r2Video: 'designs/roadster-3d-car-landing.mp4',
    category: 'EDUCATION & EDTECH',
    categoryTag: 'Education',
    description: 'A digital learning experience focused on future-ready education, technology and skill development.',
    number: 1,
  },
  {
    title: 'Binary Battle Club',
    url: 'https://binarybattelclub.wasmer.app/',
    screenshot: '/sites/site2.png',
    cardVideo: '/videos/v2_binarybattle.mp4',
    fullVideo: '/assets/aistudio/Binary_BAttle_4edb1ebe.mp4',
    r2Video: 'aaaf/living-portrait-hero.mp4',
    category: 'AI & TECHNOLOGY COMMUNITY',
    categoryTag: 'AI & Tech',
    description: 'The digital platform of Binary Battle Club, showcasing its student community, AI learning initiatives, activities and technology engagement.',
    number: 2,
  },
  {
    title: 'Cyber Shiksha SGSU',
    url: 'https://cybershikshasgsu.netlify.app/',
    screenshot: '/sites/site3.png',
    cardVideo: '/videos/v3_cybershiksha.mp4',
    fullVideo: '/assets/aistudio/Cyber_interns_2f7ef8ab.mp4',
    r2Video: 'aaaf/oraciteslArea.mp4',
    category: 'CYBERSECURITY & DIGITAL AWARENESS',
    categoryTag: 'Cybersecurity',
    description: 'A cybersecurity awareness initiative focused on educating students and communities about online safety, cyber threats and responsible digital practices.',
    number: 3,
  },
  {
    title: 'EduTrack Pro',
    url: 'https://project-cpp.netlify.app/',
    screenshot: '/sites/site4.png',
    cardVideo: '/videos/v4_edutrack.mp4',
    fullVideo: '/assets/aistudio/EduTrack_bf9c2e0b.mp4',
    r2Video: 'aaaf/medusa-jellyfish-hero.mp4',
    category: 'EDUCATION & STUDENT MANAGEMENT',
    categoryTag: 'Education',
    description: 'A student attendance and management dashboard designed to organize student records, monitor attendance and simplify academic administration.',
    number: 4,
  },
  {
    title: 'SpendWise',
    url: 'https://magenta-flan-77eae8.netlify.app/',
    screenshot: '/sites/site5.png',
    cardVideo: '/videos/v5_spendwise.mp4',
    fullVideo: '/videos/v5_spendwise.mp4',
    r2Video: 'designs/ink-reveal-hover.mp4',
    category: 'FINANCE & PRODUCTIVITY',
    categoryTag: 'Finance',
    description: 'A personal finance project focused on expense management, spending awareness and smarter financial organization.',
    number: 5,
  },
  {
    title: 'Aegis 3D',
    url: 'https://aegis-3d.beacon.host/app.html',
    screenshot: '/sites/site6.png',
    r2Video: 'designs/space-voyage-video.mp4',
    category: '3D & INTERACTIVE EXPERIENCE',
    categoryTag: '3D & Interactive',
    description: 'A three-dimensional digital experience exploring immersive visuals and interactive web presentation.',
    number: 6,
    procedural3DPreview: true,
  },
  {
    title: 'Aashima Mall Website',
    url: 'https://aashima-mall.netlify.app/',
    screenshot: '/sites/site7.png',
    cardVideo: '/videos/v7_aashima.mp4',
    fullVideo: '/assets/aistudio/Aashima_85092836.mp4',
    r2Video: 'designs/helion-dispatch-landing.mp4',
    category: 'BUSINESS & RETAIL',
    categoryTag: 'Business',
    description: 'A digital platform presenting the shopping, dining and entertainment experience of Aashima Mall, Bhopal.',
    number: 7,
  },
  {
    title: 'PixelMeFaizan',
    url: 'https://pixelmefaizan.vercel.app/',
    screenshot: '/sites/site8.png',
    cardVideo: '/videos/v8_pixelmefaizan.mp4',
    fullVideo: '/assets/aistudio/pixelmefaizan_video_0c38267a.mp4',
    r2Video: 'designs/honey-bee-melli-landing.mp4',
    category: 'PORTFOLIO & CREATIVE DEVELOPMENT',
    categoryTag: 'Portfolio',
    description: 'A personal developer portfolio showcasing technical identity, creative design and selected digital work.',
    number: 8,
  },
  {
    title: "Dimpy's COSMOS",
    url: 'https://dimpycosmos.lovable.app/',
    screenshot: '/sites/site9.png',
    cardVideo: '/videos/v9_cosmos.mp4',
    fullVideo: '/assets/aistudio/cosmos_57fb51a5.mp4',
    r2Video: 'designs/space-voyage-video.mp4',
    category: 'SCIENCE & SPACE',
    categoryTag: 'Science',
    description: 'A space-inspired digital experience exploring astronomy, cosmic themes and creative science presentation.',
    number: 9,
  },
  {
    title: "Sarvagya's Portfolio",
    url: 'https://sarvagyanarayannema.netlify.app/',
    screenshot: '/sites/site10.png',
    cardVideo: '/videos/v10_sarvagya.mp4',
    fullVideo: '/assets/aistudio/sarvagya_porfolio_15450d80.mp4',
    r2Video: 'designs/roadster-3d-car-landing.mp4',
    category: 'PORTFOLIO & TECHNOLOGY',
    categoryTag: 'Portfolio',
    description: 'A personal portfolio showcasing technical interests, AI development and creative digital work.',
    number: 10,
  },
];

const ALL_CATEGORIES = ['All', 'Education', 'AI & Tech', 'Cybersecurity', 'Finance', '3D & Interactive', 'Business', 'Portfolio', 'Science'];

function drawAegis3DPreview(
  ctx: CanvasRenderingContext2D,
  cw: number,
  ch: number,
  timeSec: number,
) {
  const bg = ctx.createRadialGradient(cw * 0.5, ch * 0.45, 20, cw * 0.5, ch * 0.5, cw * 0.7);
  bg.addColorStop(0, '#121b28');
  bg.addColorStop(0.55, '#0b1017');
  bg.addColorStop(1, '#07090d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, cw, ch);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
  ctx.lineWidth = 1;
  const horizonY = ch * 0.56;
  for (let i = -8; i <= 8; i++) {
    ctx.beginPath();
    ctx.moveTo(cw * 0.5 + i * 35, horizonY);
    ctx.lineTo(cw * 0.5 + i * 145, ch);
    ctx.stroke();
  }
  for (let r = 1; r <= 6; r++) {
    const y = horizonY + (r / 6) ** 1.6 * (ch - horizonY);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(cw, y);
    ctx.stroke();
  }

  const cx = cw * 0.5;
  const cy = ch * 0.44;
  const rad = 135;
  const rotY = timeSec * 0.6;
  const rotX = 0.35 + Math.sin(timeSec * 0.4) * 0.12;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.22);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, rad * 1.45, rad * 0.48, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(244, 241, 234, 0.18)';
  ctx.setLineDash([6, 8]);
  ctx.beginPath();
  ctx.ellipse(0, 0, rad * 1.68, rad * 0.58, 0.35, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  const project = (x: number, y: number, z: number) => {
    const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
    const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
    const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
    const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
    const scale = 420 / (420 + z2);
    return { px: cx + x1 * scale, py: cy + y2 * scale, z: z2 };
  };

  ctx.lineWidth = 1.25;
  for (let lat = -60; lat <= 60; lat += 30) {
    const phi = (lat * Math.PI) / 180;
    ctx.beginPath();
    for (let lon = 0; lon <= 360; lon += 10) {
      const theta = (lon * Math.PI) / 180;
      const x = rad * Math.cos(phi) * Math.cos(theta);
      const y = rad * Math.sin(phi);
      const z = rad * Math.cos(phi) * Math.sin(theta);
      const { px, py } = project(x, y, z);
      if (lon === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.stroke();
  }

  for (let lon = 0; lon < 180; lon += 30) {
    const theta = (lon * Math.PI) / 180;
    ctx.beginPath();
    for (let deg = 0; deg <= 360; deg += 10) {
      const a = (deg * Math.PI) / 180;
      const x = rad * Math.cos(a) * Math.cos(theta);
      const y = rad * Math.sin(a);
      const z = rad * Math.cos(a) * Math.sin(theta);
      const { px, py } = project(x, y, z);
      if (deg === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = 'rgba(125, 211, 252, 0.32)';
    ctx.stroke();
  }

  ctx.fillStyle = 'rgba(244, 241, 234, 0.85)';
  ctx.font = '600 15px "Inter Tight", sans-serif';
  ctx.fillText('AEGIS 3D', 34, 42);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.font = '400 12px "IBM Plex Mono", monospace';
  ctx.fillText('SPATIAL SHIELD SIMULATION · WEBGL 2.0', cw - 310, 42);

  ctx.fillStyle = 'rgba(15, 23, 34, 0.78)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
  ctx.lineWidth = 1;
  ctx.fillRect(34, 78, 210, 94);
  ctx.strokeRect(34, 78, 210, 94);

  ctx.fillStyle = 'rgba(244, 241, 234, 0.55)';
  ctx.font = '400 11px "IBM Plex Mono", monospace';
  ctx.fillText('ORBITAL INTEGRITY', 50, 104);
  ctx.fillStyle = '#38bdf8';
  ctx.font = '600 24px "Inter Tight", sans-serif';
  ctx.fillText('99.4% ACTIVE', 50, 136);
  ctx.fillStyle = 'rgba(244, 241, 234, 0.45)';
  ctx.font = '400 11px "IBM Plex Mono", monospace';
  ctx.fillText('LATENCY: 4.2ms · 60 FPS', 50, 156);
}

export default function App() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<'video' | 'live'>('video');
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [showreelMode, setShowreelMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
        setMenuOpen(false);
        setContactOpen(false);
        setAboutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects = useMemo(() => {
    let results = WORK;
    if (activeCategory !== 'All') {
      results = results.filter(p => p.categoryTag === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryTag.toLowerCase().includes(q)
      );
    }
    return results;
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const $ = (id: string) => document.getElementById(id);
    const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const mix = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => t * t * (3 - 2 * t);
    const out = (t: number) => 1 - (1 - t) ** 3;
    const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

    /* ---------- software webgl check ---------- */
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    /* ---------- hidden DOM pool so Chromium never throttles concurrent <video> elements ---------- */
    const videoPool = document.createElement('div');
    videoPool.style.cssText =
      'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0.001;pointer-events:none;overflow:hidden;z-index:-1;';
    document.body.appendChild(videoPool);

    /* ---------- renderer ---------- */
    const canvas = $('gl') as HTMLCanvasElement;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0, 0);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const scene = new THREE.Scene();
    const FOV = 35;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);

    /* ---------- ribbon path ---------- */
    let path: THREE.CatmullRomCurve3;
    let PATH_L = 1;
    const SAMPLES = 1200;
    const pathP: THREE.Vector3[] = [];
    const pathT: THREE.Vector3[] = [];
    const PH0 = -1.5;
    const PH1 = Math.PI * 2 + 1.35;

    function buildPath() {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const ph = mix(PH0, PH1, t);
        const cs = Math.cos(ph);
        const u = 2 * t - 1;
        const depth = cs > 0 ? 7.6 + 16.4 * cs ** 0.9 : 7.6 + 2.2 * cs;
        const edge = 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
        pts.push(
          new THREE.Vector3(
            edge * Math.sin(ph) * depth * 0.561,
            0.5 * Math.sign(u) * Math.abs(u) ** 1.4 * depth * 0.63,
            -depth,
          ),
        );
      }
      path = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
      path.arcLengthDivisions = 1500;
      PATH_L = path.getLength();
      pathP.length = 0;
      pathT.length = 0;
      for (let i = 0; i <= SAMPLES; i++) {
        const u = i / SAMPLES;
        pathP.push(path.getPointAt(u));
        pathT.push(path.getTangentAt(u));
      }
    }

    const at = (s: number, op: THREE.Vector3, ot: THREE.Vector3) => {
      const f = clamp(s / PATH_L) * SAMPLES;
      const i = Math.min(SAMPLES - 1, Math.floor(f));
      const k = f - i;
      op.lerpVectors(pathP[i], pathP[i + 1], k);
      ot.lerpVectors(pathT[i], pathT[i + 1], k).normalize();
    };

    /* ---------- cards ---------- */
    const CARD_W = 2.1;
    const CARD_H = 1.32;
    const GAP = 0.03;
    const STEP = CARD_W + GAP;
    const NX = 28;
    const NY = 3;

    const vs = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
    const fs = `uniform sampler2D map;uniform vec2 cover;uniform float aspect,ready,radius;varying vec2 vUv;
void main(){
  vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
  float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
  float px=fwidth(d),a=1.-smoothstep(-px,px,d);
  if(a<.01)discard;
  vec2 uv=vUv;if(!gl_FrontFacing)uv.x=1.-uv.x;
  vec3 c=mix(vec3(.075),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
  float edge=smoothstep(-.012-px,-.012,d);
  gl_FragColor=vec4(mix(c,vec3(1.),edge*.1),a);
}`;

    interface GridRect {
      x: number;
      y: number;
      w: number;
      h: number;
      vw: number;
      vh: number;
      c: number;
      r: number;
      totalRows: number;
    }

    interface CardObj {
      i: number;
      item: ProjectItem;
      title: string;
      url: string;
      hasCardVideo: boolean;
      v: HTMLVideoElement;
      playPending: boolean;
      videoTex: THREE.VideoTexture;
      siteCanvas: HTMLCanvasElement;
      siteCtx: CanvasRenderingContext2D;
      siteTex: THREE.CanvasTexture;
      siteImg: HTMLImageElement;
      imgLoaded: boolean;
      geo: THREE.PlaneGeometry;
      mat: THREE.ShaderMaterial;
      mesh: THREE.Mesh;
      rect: GridRect | null;
      ensurePlaying: () => void;
      updateCardTexture: (timeSec: number) => void;
    }

    const cards: CardObj[] = WORK.map((item, i) => {
      const hasCardVideo = Boolean(item.cardVideo);
      const v = document.createElement('video');
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      if (!item.cardVideo) {
        v.crossOrigin = 'anonymous';
      }
      v.src = item.cardVideo ? item.cardVideo : R2 + item.r2Video;
      videoPool.appendChild(v);

      const videoTex = new THREE.VideoTexture(v);
      videoTex.colorSpace = THREE.NoColorSpace;
      videoTex.minFilter = THREE.LinearFilter;
      videoTex.magFilter = THREE.LinearFilter;
      videoTex.generateMipmaps = false;

      const siteCanvas = document.createElement('canvas');
      siteCanvas.width = 720;
      siteCanvas.height = 452;
      const siteCtx = siteCanvas.getContext('2d')!;
      const siteTex = new THREE.CanvasTexture(siteCanvas);
      siteTex.colorSpace = THREE.NoColorSpace;
      siteTex.minFilter = THREE.LinearFilter;
      siteTex.magFilter = THREE.LinearFilter;
      siteTex.generateMipmaps = false;

      const siteImg = new Image();
      siteImg.src = item.screenshot;

      const geo = new THREE.PlaneGeometry(1, 1, NX, NY);
      const mat = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          map: { value: siteTex },
          cover: { value: new THREE.Vector2(1, 1) },
          aspect: { value: CARD_W / CARD_H },
          ready: { value: 1 },
          radius: { value: 0.018 },
        },
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false;
      scene.add(mesh);

      const c: CardObj = {
        i,
        item,
        title: item.title,
        url: item.url,
        hasCardVideo,
        v,
        playPending: false,
        videoTex,
        siteCanvas,
        siteCtx,
        siteTex,
        siteImg,
        imgLoaded: false,
        geo,
        mat,
        mesh,
        rect: null,
        ensurePlaying() {
          if (!c.v.paused || c.playPending) return;
          c.playPending = true;
          const p = c.v.play();
          if (p !== undefined) {
            p.then(() => {
              c.playPending = false;
            }).catch(() => {
              c.playPending = false;
            });
          } else {
            c.playPending = false;
          }
        },
        updateCardTexture(timeSec: number) {
          const ctx = c.siteCtx;
          const cw = c.siteCanvas.width;
          const ch = c.siteCanvas.height;
          const reel = Boolean(
            (window as unknown as { __vanteShowreel?: boolean }).__vanteShowreel,
          );
          const videoReady = c.v.readyState >= 2 && c.v.videoWidth > 0 && c.v.videoHeight > 0;
          const shouldDrawVideo = videoReady && (c.hasCardVideo || reel);

          if (shouldDrawVideo) {
            const vw = c.v.videoWidth;
            const vh = c.v.videoHeight;
            const va = vw / vh;
            const ca = cw / ch;
            let sw = vw;
            let sh = vh;
            if (va > ca) {
              sw = vh * ca;
            } else {
              sh = vw / ca;
            }
            const sx = (vw - sw) * 0.5;
            const sy = (vh - sh) * 0.5;
            ctx.drawImage(c.v, sx, sy, sw, sh, 0, 0, cw, ch);
          } else if (c.item.procedural3DPreview) {
            drawAegis3DPreview(ctx, cw, ch, timeSec);
          } else if (c.imgLoaded && c.siteImg.naturalWidth > 0) {
            const iw = c.siteImg.naturalWidth;
            const ih = c.siteImg.naturalHeight;
            const zoom = 1.05 + 0.02 * Math.sin(timeSec * 0.65 + i * 0.9);
            const panX = Math.sin(timeSec * 0.45 + i * 1.3) * 0.02 * iw;
            const panY = Math.cos(timeSec * 0.55 + i * 0.7) * 0.02 * ih;

            const sw = iw / zoom;
            const sh = ih / zoom;
            const sx = (iw - sw) * 0.5 + panX;
            const sy = (ih - sh) * 0.5 + panY;

            ctx.drawImage(c.siteImg, sx, sy, sw, sh, 0, 0, cw, ch);
          } else {
            // Clean fallback
            ctx.fillStyle = '#141416';
            ctx.fillRect(0, 0, cw, ch);
            ctx.fillStyle = 'rgba(244,241,234,0.3)';
            ctx.font = '500 14px "IBM Plex Mono", monospace';
            ctx.fillText(c.title, 30, ch / 2);
          }

          // Subtle bottom gradient vignette
          const grad = ctx.createLinearGradient(0, ch * 0.44, 0, ch);
          grad.addColorStop(0, 'rgba(10,10,11,0)');
          grad.addColorStop(0.3, 'rgba(10,10,11,0.55)');
          grad.addColorStop(1, 'rgba(10,10,11,0.92)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, ch * 0.44, cw, ch * 0.56);

          // Project number badge (top-right)
          const numStr = String(i + 1).padStart(2, '0');
          ctx.fillStyle = 'rgba(12,12,14,0.78)';
          ctx.fillRect(cw - 64, 16, 48, 26);
          ctx.strokeStyle = 'rgba(244,241,234,0.22)';
          ctx.lineWidth = 1;
          ctx.strokeRect(cw - 64, 16, 48, 26);
          ctx.fillStyle = '#f4f1ea';
          ctx.font = '600 12px "IBM Plex Mono", monospace';
          ctx.fillText(numStr, cw - 51, 33);

          // Category tag
          ctx.fillStyle = 'rgba(244,241,234,0.55)';
          ctx.font = '500 10.5px "IBM Plex Mono", monospace';
          ctx.fillText(c.item.category, 26, ch - 82);

          // Title
          ctx.fillStyle = 'rgba(244,241,234,0.98)';
          ctx.font = '600 20px "Inter Tight", sans-serif';
          ctx.fillText(c.title, 26, ch - 56);

          // Short description
          ctx.fillStyle = 'rgba(244,241,234,0.65)';
          ctx.font = '400 11px "Inter Tight", sans-serif';
          const descText = c.item.description.length > 70 ? c.item.description.slice(0, 68) + '...' : c.item.description;
          ctx.fillText(descText, 26, ch - 34);

          // View Project button & External link icon
          ctx.fillStyle = 'rgba(244,241,234,0.12)';
          ctx.fillRect(26, ch - 22, 116, 18);
          ctx.fillStyle = '#f4f1ea';
          ctx.font = '500 9px "IBM Plex Mono", monospace';
          ctx.fillText('VIEW PROJECT ↗', 33, ch - 10);

          c.siteTex.needsUpdate = true;
        },
      };

      c.updateCardTexture(0);

      siteImg.addEventListener('load', () => {
        c.imgLoaded = true;
        c.updateCardTexture(0);
      });

      v.addEventListener('loadeddata', () => {
        c.ensurePlaying();
        c.updateCardTexture(0);
      });

      v.addEventListener('canplay', () => {
        c.ensurePlaying();
      });

      v.load();
      c.ensurePlaying();

      return c;
    });

    (window as unknown as { __setVanteMode?: (reel: boolean) => void }).__setVanteMode = (
      reel: boolean,
    ) => {
      (window as unknown as { __vanteShowreel?: boolean }).__vanteShowreel = reel;
    };

    /* ---------- layout ---------- */
    const GZ = 8;
    let W = 1;
    let H = 1;
    let asp = 1;
    let cols = 3;
    let rows = 2;
    let tanH = 0.3153;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      asp = W / H;
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H, false);
      camera.aspect = asp;
      camera.fov = asp < 16 / 9 ? (Math.atan(0.561 / asp) * 360) / Math.PI : FOV;
      camera.updateProjectionMatrix();
      tanH = Math.tan((camera.fov * Math.PI) / 360);
      cols = asp < 0.9 ? 2 : 3;
      rows = asp < 0.9 ? 3 : 2;
    }

    window.addEventListener('resize', resize);
    resize();
    buildPath();

    function grid(i: number, scrollPanY = 0): GridRect {
      const vh = 2 * GZ * tanH;
      const vw = vh * asp;
      const gw = vw * (cols === 3 ? 0.74 : 0.88);
      const gap = gw * 0.017;
      const cw = (gw - gap * (cols - 1)) / cols;
      const ch = cw / (CARD_W / CARD_H);
      const baseGh = ch * rows + gap * 1.6 * (rows - 1);
      const totalRows = Math.ceil(cards.length / cols);
      const r = Math.floor(i / cols);
      const itemsInRow = r === totalRows - 1 ? cards.length - r * cols || cols : cols;
      const colInRow = i % cols;
      const rowWidth = itemsInRow * cw + (itemsInRow - 1) * gap;
      const x = -rowWidth / 2 + cw / 2 + colInRow * (cw + gap);
      const y = baseGh / 2 - ch / 2 - r * (ch + gap * 1.6) + scrollPanY;

      return {
        x,
        y,
        w: cw,
        h: ch,
        vw,
        vh,
        c: colInRow,
        r,
        totalRows,
      };
    }

    /* ---------- scroll ---------- */
    let target = 0;
    let p = 0;
    const frozen = false;
    const readScroll = () => {
      const t = $('track');
      if (!t) return;
      target = clamp(window.scrollY / (t.offsetHeight - window.innerHeight));
      for (const c of cards) {
        if (c.mesh.visible) c.ensurePlaying();
      }
    };
    window.addEventListener('scroll', readScroll, { passive: true });
    readScroll();

    /* ---------- pose ---------- */
    const op = new THREE.Vector3();
    const ot = new THREE.Vector3();
    const up = new THREE.Vector3();
    const Y = new THREE.Vector3(0, 1, 0);
    const vp = new THREE.Vector3();

    function poseRibbon(c: CardObj, head: number) {
      const pos = c.geo.attributes.position;
      const centre = head - c.i * STEP;
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const lu = ix / NX - 0.5;
          const lv = 0.5 - iy / NY;
          at(centre + lu * CARD_W, op, ot);
          up.copy(Y).addScaledVector(ot, -Y.dot(ot)).normalize();
          vp.copy(op).addScaledVector(up, lv * CARD_H);
          pos.setXYZ(k, vp.x, vp.y, vp.z);
        }
      }
      pos.needsUpdate = true;
    }

    function poseGrid(c: CardObj, q: number, scrollPanY: number) {
      const g = grid(c.i, scrollPanY);
      const pos = c.geo.attributes.position;
      const dx = (g.c - (cols - 1) / 2) * 1.2;
      const dy = g.r < 1 ? 1 : -1;
      const ox = dx * g.vw * 0.62 * (1 - q);
      const oy = dy * g.vh * (g.c === 1 ? 0.95 : 0.34) * (1 - q);
      const tilt = (1 - q) * 0.22 * (g.c - 1 || 0.5) * dy;
      const cs = Math.cos(tilt);
      const sn = Math.sin(tilt);
      for (let iy = 0; iy <= NY; iy++) {
        for (let ix = 0; ix <= NX; ix++) {
          const k = iy * (NX + 1) + ix;
          const x = (ix / NX - 0.5) * g.w;
          const y = (0.5 - iy / NY) * g.h;
          pos.setXYZ(
            k,
            g.x + ox + x * cs - y * sn,
            g.y + oy + x * sn + y * cs,
            -GZ - (1 - q) * 0.6 * Math.sin((ix / NX) * Math.PI),
          );
        }
      }
      pos.needsUpdate = true;
      c.rect = g;
    }

    const RIB_A = 0.14;
    const RIB_B = 0.60;

    function render(timeSec: number) {
      const pp = p;
      setScrollProgress(pp);

      const rise = 1 - out(span(pp, 0, 0.12));
      const run = mix(-50, 76, span(pp, 0, 0.56));
      const l1 = $('l1');
      const l2 = $('l2');
      const cap = $('cap');
      const rule = $('rule');
      const hintGroup = $('hint-group');
      const showcaseHeader = $('showcase-header');

      if (l1) l1.style.transform = `translate3d(${run}vw,${rise * 34}vh,0)`;
      if (l2) l2.style.transform = `translate3d(${-run}vw,${rise * 34}vh,0)`;
      const capA = 1 - span(pp, 0.50, 0.55);
      if (cap) {
        cap.style.opacity = String(capA);
        cap.style.transform = `translate(-50%,calc(-50% + ${rise * 34}vh))`;
      }
      const intro = 1 - span(pp, 0, 0.05);
      for (const id of ['pager', 'cross', 'glow']) {
        const el = $(id);
        if (el) el.style.opacity = String(intro);
      }
      if (hintGroup) {
        hintGroup.style.opacity = String(intro);
      }

      // Smooth fade away of the ASCII gradient background as user scrolls down
      const asciiBg = $('ascii-bg');
      if (asciiBg) {
        const asciiA = 1 - span(pp, 0, 0.20);
        asciiBg.style.opacity = String(asciiA);
      }

      if (rule) {
        rule.style.transform = `scaleX(${ease(span(pp, 0.68, 0.80))})`;
        rule.style.top = '50%';
      }

      // Smooth fade in of the showcase header during grid view
      if (showcaseHeader) {
        const scOpacity = span(pp, 0.66, 0.76);
        showcaseHeader.style.opacity = String(scOpacity);
        showcaseHeader.style.pointerEvents = scOpacity > 0.5 ? 'auto' : 'none';
      }

      // Smooth vertical pan across all rows of the 10-card gallery grid
      const sampleRect = grid(0, 0);
      const totalRows = Math.ceil(cards.length / cols);
      const extraRows = Math.max(0, totalRows - rows);
      const rowStep = sampleRect.h + sampleRect.vw * (cols === 3 ? 0.74 : 0.88) * 0.017 * 1.6;
      const maxPanY = extraRows * rowStep;
      const scrollPanY = ease(span(pp, 0.77, 0.98)) * maxPanY;

      const pr = span(pp, RIB_A, RIB_B);
      const head = mix(0, PATH_L + cards.length * STEP, pr);
      for (const c of cards) {
        const s = head - c.i * STEP;
        const end = PATH_L - CARD_W;
        if (s < end) {
          c.mesh.visible = s > CARD_W;
          c.rect = null;
          if (c.mesh.visible) poseRibbon(c, head);
        } else {
          const st = mix(RIB_A, RIB_B, (end + c.i * STEP) / (PATH_L + cards.length * STEP));
          const q = out(span(pp, st, st + 0.12));
          c.mesh.visible = q > 0.001;
          if (c.mesh.visible) poseGrid(c, q, scrollPanY);
        }

        if (c.mesh.visible) {
          c.ensurePlaying();
          c.updateCardTexture(timeSec);
        }
      }
      renderer.render(scene, camera);
    }

    /* ---------- hover & click ---------- */
    const nameEl = $('name');
    const stageEl = $('stage');
    let hoveredCard: CardObj | null = null;

    const onPointerMove = (e: PointerEvent) => {
      let hit: CardObj | null = null;
      if (p > 0.68) {
        const nx = e.clientX / W - 0.5;
        const ny = 0.5 - e.clientY / H;
        for (const c of cards) {
          const g = c.rect;
          if (!g || !c.mesh.visible) continue;
          const x = nx * g.vw;
          const y = ny * g.vh;
          if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) {
            hit = c;
          }
        }
      }
      hoveredCard = hit;
      if (stageEl) {
        stageEl.style.cursor = hit ? 'pointer' : 'default';
      }
      if (nameEl) {
        nameEl.style.opacity = hit ? '1' : '0';
        if (hit) {
          nameEl.innerHTML = `${String(hit.item.number).padStart(2, '0')} · ${hit.title} &nbsp;<span style="color:#8d8b86">${hit.item.categoryTag}</span> &nbsp;↗`;
          nameEl.style.transform = `translate(${e.clientX + 14}px,${e.clientY + 16}px)`;
        }
      }
    };

    const onStageClick = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (targetEl.closest('header') || targetEl.closest('footer') || targetEl.closest('#hint-group') || targetEl.closest('#showcase-header')) {
        return;
      }
      if (p > 0.68 && hoveredCard) {
        setModalTab(hoveredCard.item.fullVideo ? 'video' : 'live');
        setActiveProject(hoveredCard.item);
      }
    };

    stageEl?.addEventListener('pointermove', onPointerMove);
    stageEl?.addEventListener('click', onStageClick);

    /* ---------- loop ---------- */
    let frameId = 0;
    const startTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const poll = () => {
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function loop() {
      if (!frozen) {
        p += (target - p) * 0.09;
        if (Math.abs(target - p) < 0.00005) p = target;
        const elapsedSec = (performance.now() - startTime) * 0.001;
        render(elapsedSec);
      }
      if (isSoftwareGl) {
        afterDraw(loop);
      } else {
        frameId = requestAnimationFrame(loop);
      }
    }
    loop();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', readScroll);
      stageEl?.removeEventListener('pointermove', onPointerMove);
      stageEl?.removeEventListener('click', onStageClick);
      for (const c of cards) {
        c.v.pause();
        c.videoTex.dispose();
        c.siteTex.dispose();
        c.geo.dispose();
        c.mat.dispose();
      }
      videoPool.remove();
      renderer.dispose();
    };
  }, []);

  const toggleShowreel = () => {
    const next = !showreelMode;
    setShowreelMode(next);
    const fn = (window as unknown as { __setVanteMode?: (reel: boolean) => void }).__setVanteMode;
    if (fn) fn(next);
  };

  const stepScroll = (dir: -1 | 1) => {
    const track = document.getElementById('track');
    if (!track) return;
    const maxScroll = track.offsetHeight - window.innerHeight;
    const stops = [0, 0.24, 0.42, 0.75, 0.98];
    const curr = window.scrollY / maxScroll;
    let nextStop = stops[0];
    if (dir > 0) {
      nextStop = stops.find(s => s > curr + 0.04) ?? stops[stops.length - 1];
    } else {
      nextStop = [...stops].reverse().find(s => s < curr - 0.04) ?? stops[0];
    }
    window.scrollTo({ top: nextStop * maxScroll, behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const track = document.getElementById('track');
    if (track) {
      window.scrollTo({
        top: (track.offsetHeight - window.innerHeight) * 0.75,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div id="track">
        <main className="stage" id="stage">
          {/* Ambient ASCII Gradient Background (React Bits - fades away on scroll) */}
          <div
            id="ascii-bg"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
              opacity: 1,
            }}
          >
            <GradientASCII
              colors={["#2b2c31", "#a1b4d8", "#5b7c90", "#3c4a4a"]}
              shape="horizon"
              characters=" =+xX0S8#@"
              cellSize={18}
              density={0.8}
            />
          </div>

          {/* Hero Section Animated Heading */}
          <h1 aria-label="Ideas to Innovation. Projects to Impact.">
            <div className="hl" id="l1" aria-hidden="true">
              <span>IDEAS TO INNOVATION.</span>
            </div>
            <div className="hl" id="l2" aria-hidden="true">
              <span>PROJECTS TO IMPACT.</span>
            </div>
          </h1>

          {/* Hero Section Label & Description */}
          <div id="cap">
            <span style={{ display: 'block', fontSize: 'clamp(8px, 0.65vw, 11px)', letterSpacing: '0.15em', color: 'var(--mid)', marginBottom: '12px', fontWeight: 500 }}>
              SCOPE GLOBAL SKILLS UNIVERSITY · BINARY BATTLE CLUB
            </span>
            Explore the creativity, technology and innovation built by the Binary Battle Club community. Discover student-developed websites, applications and digital experiences that turn ideas into reality.
          </div>

          <div id="glow"></div>
          <div id="cross">
            <i>+</i>
          </div>
          <div id="rule"></div>
          <canvas id="gl"></canvas>

          {/* Hero Action Buttons: Explore Projects & About the Club */}
          <div id="hint-group">
            <button
              id="hint"
              onClick={scrollToProjects}
              aria-label="Explore Projects"
            >
              EXPLORE PROJECTS &nbsp;→
            </button>
            <button
              id="hint-sub"
              onClick={() => setAboutOpen(true)}
              aria-label="About the Club"
            >
              ABOUT THE CLUB
            </button>
          </div>

          {/* Header Navigation */}
          <header className="top">
            <div
              className="logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              title="Binary Battle — SGSU"
            >
              <svg viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9.5 0.8L0 18H5.8L9.5 10.2V0.8Z" fill="currentColor" />
                <path d="M12.5 0.8V10.2L16.2 18H22L12.5 0.8Z" fill="currentColor" />
                <rect x="10" y="13.2" width="2" height="4.8" rx="0.5" fill="currentColor" />
              </svg>
              <span>Binary Battle</span>
            </div>
            <div id="pager">
              <span onClick={() => stepScroll(-1)} role="button" aria-label="Previous stage">
                ←
              </span>
              <span onClick={() => stepScroll(1)} role="button" aria-label="Next stage">
                →
              </span>
            </div>
            <nav className="acts">
              <a
                href="#projects"
                onClick={e => {
                  e.preventDefault();
                  scrollToProjects();
                }}
              >
                PROJECTS
              </a>
              <a
                href="#about"
                onClick={e => {
                  e.preventDefault();
                  setAboutOpen(true);
                }}
              >
                ABOUT
              </a>
              <a
                href="#contact"
                onClick={e => {
                  e.preventDefault();
                  setContactOpen(true);
                }}
              >
                <i></i>CONNECT
              </a>
              <a
                href="#menu"
                onClick={e => {
                  e.preventDefault();
                  setMenuOpen(true);
                }}
              >
                MENU<b></b>
              </a>
            </nav>
          </header>

          {/* Projects Showcase Section Overlay during 3D Grid View */}
          <div id="showcase-header" style={{ opacity: 0 }}>
            <div className="sc-left">
              <div className="sc-label">OUR PROJECT SHOWCASE</div>
              <h2 className="sc-title">Projects Built by Our Community.</h2>
              <p className="sc-desc">
                A collection of ideas, experiments and digital experiences developed by Binary Battle Club members.
              </p>
            </div>
            <div className="sc-right">
              <button
                className="sc-filter-btn"
                onClick={() => setMenuOpen(true)}
                aria-label="Search and filter projects"
              >
                ⌕ SEARCH &amp; FILTER ({WORK.length})
              </button>
            </div>
          </div>

          {/* Footer Bar */}
          <footer className="bot">
            <div className="bot-left">
              <div className="bot-name">Binary Battle Club Projects</div>
              <div className="bot-sub">A digital showcase celebrating student creativity, technology and innovation.</div>
              <div className="bot-loc">Scope Global Skills University, Bhopal, Madhya Pradesh, India.</div>
            </div>
            <div className="mid">
              <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</span>
              <s>/</s>
              <span onClick={scrollToProjects}>Projects</span>
              <s>/</s>
              <span onClick={() => setAboutOpen(true)}>About</span>
              <s>/</s>
              <span onClick={() => setContactOpen(true)}>Contact</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
              <div className="r" onClick={toggleShowreel} role="button" tabIndex={0}>
                {showreelMode ? 'VIEW PROJECTS' : 'VIEW SHOWREEL'}
              </div>
              <div className="bot-copy">
                © 2026 Binary Battle Club. All Rights Reserved.
              </div>
            </div>
          </footer>

          <div id="name"></div>
        </main>
      </div>

      {/* ========== PROJECT DETAIL MODAL ========== */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0b]/90 p-4 md:p-8"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative flex h-[86vh] w-full max-w-6xl flex-col overflow-hidden border border-[#f4f1ea]/20 bg-[#0a0a0b]"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'modalIn .3s ease-out' }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f4f1ea]/15 px-5 py-3.5">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs tracking-widest text-[#8d8b86]">
                  {String(activeProject.number).padStart(2, '0')} — {activeProject.category}
                </span>
                <span className="text-sm font-medium tracking-wide text-[#f4f1ea]">
                  {activeProject.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {activeProject.fullVideo && (
                  <div className="flex items-center border border-[#f4f1ea]/25 font-mono text-xs">
                    <button
                      onClick={() => setModalTab('video')}
                      className={`cursor-pointer px-3 py-1 transition-colors ${
                        modalTab === 'video'
                          ? 'bg-[#f4f1ea] text-[#0a0a0b]'
                          : 'text-[#8d8b86] hover:text-[#f4f1ea]'
                      }`}
                    >
                      VIDEO WALKTHROUGH
                    </button>
                    <button
                      onClick={() => setModalTab('live')}
                      className={`cursor-pointer px-3 py-1 transition-colors ${
                        modalTab === 'live'
                          ? 'bg-[#f4f1ea] text-[#0a0a0b]'
                          : 'text-[#8d8b86] hover:text-[#f4f1ea]'
                      }`}
                    >
                      LIVE SITE PREVIEW
                    </button>
                  </div>
                )}
                <a
                  href={activeProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#f4f1ea]/40 px-3.5 py-1 font-mono text-xs tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#f4f1ea] hover:text-[#0a0a0b]"
                  aria-label={`Open ${activeProject.title} live site in new tab`}
                >
                  OPEN LIVE SITE ↗
                </a>
                <button
                  onClick={() => setActiveProject(null)}
                  className="cursor-pointer font-mono text-xs tracking-wider text-[#8d8b86] transition-colors hover:text-[#f4f1ea]"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </div>
            {/* Project description bar */}
            <div className="border-b border-[#f4f1ea]/8 px-5 py-2.5">
              <p className="font-mono text-xs leading-relaxed text-[#8d8b86]">
                {activeProject.description}
              </p>
            </div>
            <div className="relative flex-1 bg-[#111113]">
              {activeProject.fullVideo && modalTab === 'video' ? (
                <video
                  src={activeProject.cardVideo || activeProject.fullVideo}
                  className="h-full w-full bg-[#0a0a0b] object-contain"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <iframe
                  src={activeProject.url}
                  title={activeProject.title}
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== ALL PROJECTS DRAWER (MENU) ========== */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#0a0a0b]/85"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="flex h-full w-full max-w-xl flex-col justify-between overflow-y-auto border-l border-[#f4f1ea]/15 bg-[#0a0a0b] p-8"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'drawerIn .35s ease-out' }}
          >
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-[#f4f1ea]/15 pb-4">
                <span className="font-mono text-xs tracking-widest text-[#8d8b86]">
                  OUR PROJECT SHOWCASE — {WORK.length} PROJECTS
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer font-mono text-xs tracking-widest text-[#f4f1ea] hover:opacity-70"
                >
                  CLOSE ×
                </button>
              </div>

              {/* Search bar in drawer */}
              <div className="mb-5">
                <div className="flex items-center gap-2 border border-[#f4f1ea]/15 px-3 py-2">
                  <span className="font-mono text-xs text-[#8d8b86]">⌕</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search projects..."
                    className="flex-1 bg-transparent font-mono text-xs tracking-wide text-[#f4f1ea] placeholder-[#8d8b86]/50 outline-none"
                    aria-label="Search projects"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="cursor-pointer font-mono text-xs text-[#8d8b86] hover:text-[#f4f1ea]"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Category filters in drawer */}
              <div className="mb-5 flex flex-wrap gap-2">
                {ALL_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all duration-200 ${
                      activeCategory === cat
                        ? 'border-[#f4f1ea]/60 bg-[#f4f1ea] text-[#0a0a0b]'
                        : 'border-[#f4f1ea]/15 text-[#8d8b86] hover:border-[#f4f1ea]/40 hover:text-[#f4f1ea]'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Project count */}
              <div className="mb-4 font-mono text-xs text-[#8d8b86]">
                {filteredProjects.length} of {WORK.length} projects
              </div>

              <div className="divide-y divide-[#f4f1ea]/10">
                {filteredProjects.map((item) => (
                  <div
                    key={item.title}
                    className="group flex items-center justify-between py-3.5 transition-colors"
                  >
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setModalTab(item.fullVideo ? 'video' : 'live');
                        setActiveProject(item);
                      }}
                      className="flex cursor-pointer items-baseline gap-4 text-left"
                    >
                      <span className="font-mono text-xs text-[#8d8b86]">
                        {String(item.number).padStart(2, '0')}
                      </span>
                      <span className="text-lg font-normal tracking-tight text-[#f4f1ea] group-hover:underline">
                        {item.title}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider text-[#8d8b86]">
                        {item.categoryTag}
                      </span>
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#8d8b86] transition-colors hover:text-[#f4f1ea]"
                      aria-label={`Visit ${item.title} website`}
                    >
                      VISIT ↗
                    </a>
                  </div>
                ))}
                {filteredProjects.length === 0 && (
                  <div className="py-8 text-center font-mono text-xs text-[#8d8b86]">
                    No projects match your search.
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 border-t border-[#f4f1ea]/15 pt-4">
              <div className="flex items-center justify-between font-mono text-xs text-[#8d8b86]">
                <span>BINARY BATTLE CLUB · SGSU</span>
                <button
                  onClick={() => {
                    toggleShowreel();
                    setMenuOpen(false);
                  }}
                  className="cursor-pointer text-[#f4f1ea] underline"
                >
                  {showreelMode ? 'SWITCH TO SITE CAPTURES' : 'SWITCH TO SHOWREEL'}
                </button>
              </div>
              <div className="mt-3 font-mono text-[10px] leading-relaxed text-[#8d8b86]/60">
                © 2026 Binary Battle Club. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== ABOUT OVERLAY ========== */}
      {aboutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0b]/88 p-4"
          onClick={() => setAboutOpen(false)}
        >
          <div
            className="w-full max-w-lg border border-[#f4f1ea]/20 bg-[#0a0a0b] p-8"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'modalIn .3s ease-out' }}
          >
            <div className="mb-6 flex items-center justify-between border-b border-[#f4f1ea]/15 pb-4">
              <span className="font-mono text-xs tracking-widest text-[#8d8b86]">
                ABOUT — BINARY BATTLE CLUB
              </span>
              <button
                onClick={() => setAboutOpen(false)}
                className="cursor-pointer font-mono text-xs text-[#f4f1ea]"
              >
                CLOSE ×
              </button>
            </div>
            <h2 className="mb-5 text-xl font-medium leading-snug tracking-tight text-[#f4f1ea]">
              More Than a Club.<br />A Community of Builders.
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-[#8d8b86]">
              <p>
                Binary Battle Club is a student-led coding and AI community at Scope Global Skills University. It brings together curious minds who explore emerging technologies, develop practical skills, collaborate on ideas and build meaningful digital experiences.
              </p>
              <p>
                Through hands-on learning, experimentation and project development, the community encourages students to move beyond learning technology and start creating with it.
              </p>
            </div>
            <div className="mt-6 space-y-3 border-t border-[#f4f1ea]/15 pt-5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#8d8b86]">INSTITUTION</span>
                <span className="text-[#f4f1ea]">Scope Global Skills University, Bhopal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d8b86]">COMMUNITY</span>
                <span className="text-[#f4f1ea]">Binary Battle Club</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d8b86]">TOTAL PROJECTS</span>
                <span className="text-[#f4f1ea]">{WORK.length} LIVE DEPLOYMENTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d8b86]">TAGLINE</span>
                <span className="text-[#f4f1ea] text-right" style={{ maxWidth: '60%' }}>Where Student Ideas Become Digital Experiences</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== CONTACT OVERLAY ========== */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0b]/85 p-4"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="w-full max-w-lg border border-[#f4f1ea]/20 bg-[#0a0a0b] p-8"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'modalIn .3s ease-out' }}
          >
            <div className="mb-6 flex items-center justify-between border-b border-[#f4f1ea]/15 pb-4">
              <span className="font-mono text-xs tracking-widest text-[#8d8b86]">
                SHOWCASE YOUR WORK — BINARY BATTLE CLUB
              </span>
              <button
                onClick={() => setContactOpen(false)}
                className="cursor-pointer font-mono text-xs text-[#f4f1ea]"
              >
                CLOSE ×
              </button>
            </div>
            <h2 className="mb-4 text-xl font-medium leading-snug tracking-tight text-[#f4f1ea]">
              Have a Project to Showcase?
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-[#8d8b86]">
              Have you created something interesting as part of Binary Battle Club? We believe every idea deserves an opportunity to be seen. Connect with the club to showcase your work and inspire others.
            </p>
            <div className="space-y-3 border-t border-[#f4f1ea]/15 pt-5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#8d8b86]">CLUB PLATFORM</span>
                <a
                  href="https://binarybattelclub.wasmer.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f4f1ea] underline"
                >
                  binarybattleclub.wasmer.app ↗
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d8b86]">TOTAL PROJECTS SHOWCASED</span>
                <span className="text-[#f4f1ea]">{WORK.length} LIVE DEPLOYMENTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8d8b86]">INSTITUTION</span>
                <span className="text-[#f4f1ea]">SGSU, Bhopal</span>
              </div>
            </div>
            <a
              href="https://binarybattelclub.wasmer.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 border border-[#f4f1ea]/40 px-4 py-2.5 font-mono text-xs tracking-wider text-[#f4f1ea] transition-colors hover:bg-[#f4f1ea] hover:text-[#0a0a0b]"
            >
              CONNECT WITH BINARY BATTLE CLUB ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
