'use client';
// Intro de logo do hero em 2 fases (ver hero-intro.css):
//   Fase 1 (preloader): 100% CSS, roda no 1º paint sem esperar o JS.
//   Fase 2 (logo gigante): GSAP, timeline única encadeando com a saída do
//   preloader; as camadas do logo sobem clipadas pelo overflow do <svg>.
// A logo é raster: cada camada (Camada_N.png, extraída do SVG original) é um
// <g> animável posicionado no viewBox da arte "43 119 1473 743".
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './hero-intro.css';

// viewBox da arte + offset de subida (altura da arte, em unidades de usuário)
const VIEWBOX = '43 119 1473 743';
const RISE = 743;

// Camadas em ordem de leitura (linha de cima -> de baixo), com geometria no viewBox.
const LAYERS = [
  { id: 'Camada_2', x: 43, y: 135, w: 261, h: 328 },
  { id: 'Camada_3', x: 368, y: 215, w: 144, h: 241 },
  { id: 'Camada_4', x: 543, y: 219, w: 235, h: 246 },
  { id: 'Camada_5', x: 845, y: 215, w: 227, h: 327 },
  { id: 'Camada_6', x: 926, y: 119, w: 532, h: 602 },
  { id: 'Camada_7', x: 1152, y: 215, w: 242, h: 227 },
  { id: 'Camada_8', x: 991, y: 358, w: 525, h: 504 },
  { id: 'Camada_11', x: 45, y: 527, w: 248, h: 308 },
  { id: 'Camada_10', x: 318, y: 531, w: 218, h: 299 },
  { id: 'Camada_9', x: 529, y: 527, w: 257, h: 308 },
  { id: 'Camada_12', x: 863, y: 571, w: 527, h: 264 },
];

function LogoSvg({ letterClass, initialTransform }) {
  return (
    <svg className="hi-svg" viewBox={VIEWBOX} role="img" aria-label="Grupo CLG">
      {LAYERS.map((l, i) => (
        <g key={l.id} className={letterClass} style={{ '--i': i, ...(initialTransform ? { transform: initialTransform } : null) }}>
          <image href={`/assets/logo-layers/${l.id}.png`} x={l.x} y={l.y} width={l.w} height={l.h} />
        </g>
      ))}
    </svg>
  );
}

export default function HeroIntro() {
  const rootRef = useRef(null);
  const preRef = useRef(null);
  const giantRef = useRef(null);
  const [gone, setGone] = useState(false);

  // Se a página carregou já rolada, pular preloader e intro por completo
  // (antes do paint, via useLayoutEffect) e liberar o scroll.
  useLayoutEffect(() => {
    const skip = window.scrollY > 0 ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (skip) setGone(true);
  }, []);

  useEffect(() => {
    if (gone) return;
    const root = rootRef.current;
    if (!root) return;

    // Trava o scroll enquanto a intro roda; o hero fica atrás.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let cancelled = false;
    let tl;
    const dismiss = () => {
      document.body.style.overflow = prevOverflow;
      setGone(true);
    };

    import('gsap')
      .then(({ gsap }) => {
        if (cancelled || !gsap) return;
        const giant = giantRef.current;
        const gLetters = giant ? giant.querySelectorAll('.hi-g-ltr') : [];
        const corners = root.querySelectorAll('.hi-corner');

        gsap.set(gLetters, { y: RISE });
        tl = gsap.timeline();
        // t=1.7s: preloader some (fade) e para de capturar cliques
        tl.to(preRef.current, {
          opacity: 0, duration: 0.3,
          onStart: () => { if (preRef.current) preRef.current.style.pointerEvents = 'none'; },
        }, 1.7);
        // t=1.75s: revela o container da logo gigante (letras ainda clipadas)
        tl.set(giant, { opacity: 1 }, 1.75);
        // t=1.8s: letras da logo gigante sobem (encadeia com a saída do preloader)
        tl.to(gLetters, { y: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out' }, 1.8);
        // t=2.0s: textos dos cantos entram
        tl.fromTo(corners, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power2.out' }, 2.0);
        // handoff: a intro sai e revela o hero (fundo navy -> navy, sem corte)
        tl.to(root, { opacity: 0, duration: 0.6, ease: 'power2.inOut', onComplete: dismiss }, 3.7);
      })
      .catch(() => { dismiss(); });

    return () => {
      cancelled = true;
      if (tl) tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div className="hi-root" ref={rootRef} aria-hidden="true">
      {/* Fase 2 (atrás do preloader): logo gigante */}
      <div className="hi-giant" ref={giantRef}>
        <LogoSvg letterClass="hi-g-ltr" />
      </div>

      {/* Textos dos cantos */}
      <div className="hi-corner hi-tl">Grupo CLG</div>
      <div className="hi-corner hi-tr">Licitações <b>&amp;</b> Gestão</div>
      <div className="hi-corner hi-bl">Lei 14.133/21 · TCU</div>
      <div className="hi-corner hi-br">Role para explorar</div>

      {/* Fase 1 (por cima): preloader */}
      <div className="hi-pre" ref={preRef}>
        <div className="hi-pre-logo">
          <LogoSvg letterClass="hi-pre-ltr" />
        </div>
      </div>
    </div>
  );
}
