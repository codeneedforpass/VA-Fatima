import {useEffect, useRef, type RefObject} from 'react';
import {animate, onScroll, stagger} from 'animejs';
import type {JSAnimation} from 'animejs';

export type RevealPreset = 'lift' | 'settle' | 'drift' | 'expoRise' | 'elasticCards';

const presetParams: Record<
  RevealPreset,
  {
    opacity: [number, number];
    y?: [string, number];
    scale?: [number, number];
    rotate?: [string, string];
    duration: number;
    ease: string;
  }
> = {
  lift: {opacity: [0, 1], y: ['1.15rem', 0], duration: 780, ease: 'outExpo'},
  settle: {opacity: [0, 1], scale: [0.96, 1], y: ['0.65rem', 0], duration: 820, ease: 'out(3)'},
  drift: {opacity: [0, 1], y: ['1.5rem', 0], duration: 860, ease: 'outQuart'},
  /** Blueprint-style bento rise: larger travel, longer ease-out (reference zip CommandCenter). */
  expoRise: {opacity: [0, 1], y: ['6.25rem', 0], duration: 1000, ease: 'outExpo'},
  /** Blueprint-style service cards: slight rotation + elastic settle (reference zip ServiceEcosystem). */
  elasticCards: {
    opacity: [0, 1],
    scale: [0.9, 1],
    rotate: ['2deg', '0deg'],
    duration: 1200,
    ease: 'outElastic(1, .8)',
  },
};

export type AnimeRevealOptions = {
  preset?: RevealPreset;
  selector?: string;
  staggerMs?: number;
  start?: number;
};

/**
 * One-shot scroll reveal using Anime.js v4 {@link https://animejs.com/documentation/scroll onScroll} + `animate` + `stagger`.
 */
export function useAnimeOnReveal<T extends HTMLElement = HTMLElement>(options: AnimeRevealOptions = {}) {
  const {preset = 'lift', selector = '[data-anime]', staggerMs = 72, start = 0} = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let animation: JSAnimation | null = null;
    let played = false;

    const scrollObs = onScroll({
      target: root,
      repeat: true,
      onEnter: () => {
        if (played) return;
        played = true;
        const nodes = root.querySelectorAll<HTMLElement>(selector);
        if (!nodes.length) {
          scrollObs.revert();
          return;
        }
        const p = presetParams[preset];
        animation = animate(nodes, {
          opacity: p.opacity,
          ...(p.y ? {y: p.y} : {}),
          ...(p.scale ? {scale: p.scale} : {}),
          ...(p.rotate ? {rotate: p.rotate} : {}),
          duration: p.duration,
          ease: p.ease,
          delay: stagger(staggerMs, {start}),
        });
        requestAnimationFrame(() => scrollObs.revert());
      },
    });

    return () => {
      scrollObs.revert();
      animation?.revert();
    };
  }, [preset, selector, staggerMs, start]);

  return ref;
}

const mountSelector = '[data-anime-mount]';

/**
 * One-shot stagger on mount (e.g. above-the-fold headers).
 */
export function useAnimeOnMount<T extends HTMLElement = HTMLElement>(staggerMs = 70) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = root.querySelectorAll<HTMLElement>(mountSelector);
    if (!nodes.length) return;
    const a = animate(nodes, {
      opacity: [0, 1],
      y: ['0.75rem', 0],
      duration: 720,
      ease: 'outExpo',
      delay: stagger(staggerMs, {start: 40}),
    });
    return () => {
      a.revert();
    };
  }, [staggerMs]);

  return ref;
}

/**
 * Fills a horizontal meter once when `observerRef` enters the scroll-tracked band (Anime.js `onScroll`).
 */
export function useAnimeMeter(
  observerRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
  widthTo: string,
  opts?: {duration?: number},
) {
  const duration = opts?.duration ?? 1450;

  useEffect(() => {
    const root = observerRef.current;
    const bar = barRef.current;
    if (!root || !bar) return;

    let a: JSAnimation | null = null;
    let played = false;

    const scrollObs = onScroll({
      target: root,
      repeat: true,
      onEnter: () => {
        if (played) return;
        played = true;
        a = animate(bar, {
          width: ['0%', widthTo],
          duration,
          ease: 'outQuart',
        });
        requestAnimationFrame(() => scrollObs.revert());
      },
    });

    return () => {
      scrollObs.revert();
      a?.revert();
    };
  }, [observerRef, barRef, widthTo, duration]);
}
