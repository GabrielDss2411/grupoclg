'use client';
import { gsap } from 'gsap';

const EASE = 'power3.out';

/**
 * Animações do site (migradas do script GSAP original), adaptadas para React.
 * Roda no mount de cada página e devolve uma função de limpeza que desconecta
 * os observers criados.
 */
export function initAnimations() {
  const reduce = typeof window !== 'undefined' && window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof window === 'undefined' || reduce || !gsap) return () => {};

  const observers = [];

  // Hero: entrada em timeline
  (function heroIn() {
    const col = document.querySelector('[data-hero-col]');
    if (!col || col.__anim) return;
    col.__anim = true;
    const tl = gsap.timeline({ defaults: { ease: EASE } });
    tl.fromTo(col.children, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.09 }, 0.08);
    const photo = document.querySelector('[data-hero-photo]');
    if (photo) tl.fromTo(photo, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.15, ease: 'power2.out' }, 0.12);
  })();

  // Revelações ao rolar
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      gsap.to(e.target, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  observers.push(io);

  (function collectReveals() {
    const sel = '[data-reveal], h2, [style*="border-radius:18px"], [style*="border-radius:20px"], [style*="border-radius:22px"], [style*="border-radius:28px"], [style*="border-radius:30px"]';
    let list = Array.prototype.slice.call(document.querySelectorAll(sel)).filter((el) => {
      if (el.__rev) return false;
      if (el.closest('[style*="position:fixed"]')) return false;   // navbar
      if (el.closest('[style*="min-height:100vh"]')) return false; // hero
      return true;
    });
    list = list.filter((el) => !list.some((o) => o !== el && o.contains(el)));
    list.forEach((el) => { el.__rev = true; gsap.set(el, { opacity: 0, y: 24 }); io.observe(el); });
  })();

  // Trilha de percurso
  const trilhaIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      trilhaIO.unobserve(e.target);
      const nodes = e.target.querySelectorAll('[data-trilha-node]');
      const line = e.target.querySelector('[data-trilha-line]');
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (line) tl.to(line, { scaleX: 1, duration: 1.0, ease: 'power2.inOut' }, 0.1);
      tl.fromTo(nodes, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.28 }, 0.1);
    });
  }, { threshold: 0.35 });
  observers.push(trilhaIO);

  document.querySelectorAll('[data-trilha]').forEach((t) => {
    if (t.__trilha) return; t.__trilha = true;
    gsap.set(t.querySelectorAll('[data-trilha-node]'), { opacity: 0, scale: 0.4 });
    trilhaIO.observe(t);
  });

  // Hover dos motivos
  const motivoCleanups = [];
  document.querySelectorAll('[data-motivo]').forEach((m) => {
    if (m.__hover) return; m.__hover = true;
    const ico = m.querySelector('[data-motivo-ico]');
    const enter = () => {
      gsap.to(m, { y: -5, borderColor: 'rgba(233,198,90,0.4)', duration: 0.3, ease: 'power2.out' });
      if (ico) gsap.to(ico, { color: '#F0D171', borderColor: 'rgba(233,198,90,0.85)', duration: 0.3 });
    };
    const leave = () => {
      gsap.to(m, { y: 0, borderColor: 'rgba(255,255,255,0.09)', duration: 0.36, ease: 'power2.out' });
      if (ico) gsap.to(ico, { color: '#E9C65A', borderColor: 'rgba(233,198,90,0.5)', duration: 0.36 });
    };
    m.addEventListener('mouseenter', enter);
    m.addEventListener('mouseleave', leave);
    motivoCleanups.push(() => { m.removeEventListener('mouseenter', enter); m.removeEventListener('mouseleave', leave); });
  });

  // Barra CTA fixa (In Company)
  (function setupStickyCta() {
    const bar = document.querySelector('[data-sticky-cta]');
    if (!bar || bar.__sticky) return;
    const hero = document.querySelector('[data-incompany-hero]');
    if (!hero) return;
    bar.__sticky = true;
    gsap.set(bar, { yPercent: 160 });
    const so = new IntersectionObserver((entries) => {
      entries.forEach((e) => gsap.to(bar, { yPercent: e.isIntersecting ? 160 : 0, duration: 0.45, ease: 'power3.out' }));
    }, { threshold: 0 });
    so.observe(hero);
    observers.push(so);
  })();

  return () => {
    observers.forEach((o) => o.disconnect());
    motivoCleanups.forEach((fn) => fn());
  };
}
