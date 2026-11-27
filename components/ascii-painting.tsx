"use client";

import { useEffect, useRef } from "react";
import { FONT, RAMP, clamp } from "@/lib/ascii";
import { type Frame, type Point, luminance, tourFrame, viewFor } from "@/lib/painting";

type Props = {
  src: string;
  /** Tamanho da letra, em px. */
  glyph?: number;
  /** Visita guiada: detalhes que o zoom percorre em ciclo. */
  tour?: Point[];
  /** Enquadramento fixo (sem visita). Padrão: a obra inteira. */
  focus?: Frame;
  /** Proporção (largura / altura) da caixa; sem ela, a altura vem do CSS. */
  aspect?: number;
  className?: string;
};

const WHOLE: Frame = { zoom: 1, x: 0.5, y: 0.5 };
const BG = "#05060a";

/**
 * Pintura desenhada com letras num canvas. Com `tour`, o zoom passeia pelos detalhes;
 * sem ele, a obra fica parada e, com o mouse ou o foco no link em volta, se aproxima e cintila.
 */
export const AsciiPainting = ({ src, glyph = 8, tour, focus = WHOLE, aspect, className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { zoom: fz, x: fx, y: fy } = focus;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const family = getComputedStyle(canvas).fontFamily || FONT;
    const host: HTMLElement = canvas.closest("a") ?? canvas;
    const colors = new Map<number, string>();
    const color = (r: number, g: number, b: number) => {
      const key = ((r & 0xf8) << 16) | ((g & 0xf8) << 8) | (b & 0xf8);
      let s = colors.get(key);
      if (!s) colors.set(key, (s = `rgb(${r & 0xf8},${g & 0xf8},${b & 0xf8})`));
      return s;
    };

    let px: Uint8ClampedArray | null = null;
    let iw = 0;
    let ih = 0;
    let raf = 0;
    let visible = false;
    let hover = false;
    let zoom = fz;
    let last = 0;
    let dirty = true;
    let t0 = 0;
    let cancelled = false;

    const draw = (frame: Frame, twinkle: number) => {
      if (!px) return;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      if (!W || !H) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const bw = Math.round(W * dpr);
      const bh = Math.round(H * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      const cw = glyph * 0.62;
      const ch = glyph * 1.1;
      const cols = Math.floor(W / cw);
      const rows = Math.floor(H / ch);
      const ox = (W - cols * cw) / 2;
      const oy = (H - rows * ch) / 2;
      const view = viewFor(W / H, iw / ih, frame);
      ctx.font = `700 ${glyph}px ${family}`;
      ctx.textBaseline = "top";
      const L = RAMP.length;
      for (let r = 0; r < rows; r++) {
        const sy = Math.min(ih - 1, Math.floor((view.y0 + ((r + 0.5) / rows) * view.v) * ih));
        for (let c = 0; c < cols; c++) {
          const sx = Math.min(iw - 1, Math.floor((view.x0 + ((c + 0.5) / cols) * view.u) * iw));
          const k = (sy * iw + sx) * 4;
          const R = px[k];
          const G = px[k + 1];
          const B = px[k + 2];
          const idx = clamp(Math.floor(Math.pow(luminance(R, G, B), 0.55) * L), 0, L - 1);
          const glyphChar = twinkle && Math.random() < twinkle ? RAMP[Math.floor(Math.random() * L)] : RAMP[idx];
          const x = ox + c * cw;
          const y = oy + r * ch;
          // Fundo da célula no tom escurecido da pintura; a letra no tom avivado.
          ctx.fillStyle = color(R * 0.42, G * 0.42, B * 0.42);
          ctx.fillRect(x, y, cw + 0.5, ch + 0.5);
          const boost = clamp(215 / Math.max(R, G, B, 1), 1, 2.2);
          ctx.fillStyle = color(Math.min(255, R * boost), Math.min(255, G * boost), Math.min(255, B * boost));
          ctx.fillText(glyphChar, x, y);
        }
      }
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !px) return;
      if (tour) {
        if (reduce) {
          if (dirty) draw(WHOLE, 0);
          dirty = false;
          return;
        }
        if (!dirty && now - last < 33) return;
        if (!t0) t0 = now;
        draw(tourFrame((now - t0) / 1000, tour), 0.004);
      } else {
        const target = hover && !reduce ? fz * 1.22 : fz;
        const moving = Math.abs(target - zoom) > 0.002;
        zoom = reduce ? target : zoom + (target - zoom) * 0.12;
        const due = hover ? 40 : 450;
        if (!dirty && !moving && (reduce || now - last < due)) return;
        draw({ zoom, x: fx, y: fy }, reduce ? 0 : hover ? 0.035 : 0.006);
      }
      last = now;
      dirty = false;
    };

    const onEnter = () => (hover = true);
    const onLeave = () => (hover = false);
    host.addEventListener("mouseenter", onEnter);
    host.addEventListener("mouseleave", onLeave);
    host.addEventListener("focus", onEnter);
    host.addEventListener("blur", onLeave);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => (dirty = true));
    ro.observe(canvas);

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      iw = img.naturalWidth;
      ih = img.naturalHeight;
      const off = document.createElement("canvas");
      off.width = iw;
      off.height = ih;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0);
      px = octx.getImageData(0, 0, iw, ih).data;
      dirty = true;
    };
    img.src = src;
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("mouseenter", onEnter);
      host.removeEventListener("mouseleave", onLeave);
      host.removeEventListener("focus", onEnter);
      host.removeEventListener("blur", onLeave);
    };
  }, [src, glyph, tour, fz, fx, fy]);

  return <canvas ref={canvasRef} aria-hidden className={`font-mono ${className ?? ""}`} style={{ background: BG, aspectRatio: aspect }} />;
};
