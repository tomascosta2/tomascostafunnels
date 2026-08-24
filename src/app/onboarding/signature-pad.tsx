"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  /** Devuelve el PNG en dataURL, o null cuando el pad queda vacío. */
  onChange: (dataUrl: string | null) => void;
  disabled?: boolean;
};

const PEN_COLOR = "#111111";
const PEN_WIDTH = 2.4;

export default function SignaturePad({ onChange, disabled }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [hasStroke, setHasStroke] = useState(false);

  // El canvas se dibuja en píxeles físicos (dpr) para que el trazo no llegue
  // pixelado al PDF. Al cambiar el ancho hay que reescalar, y eso limpia el
  // buffer: por eso guardamos una copia y la volvemos a pintar encima.
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.round(rect.width * dpr);
    const height = Math.round(rect.height * dpr);
    if (canvas.width === width && canvas.height === height) return;

    const previo = canvas.width > 0 ? canvas.toDataURL("image/png") : null;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = PEN_COLOR;
    ctx.lineWidth = PEN_WIDTH;

    if (previo) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = previo;
    }
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  function posicion(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function empezar(e: React.PointerEvent<HTMLCanvasElement>) {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = posicion(e);
  }

  function mover(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || disabled) return;
    const ctx = canvasRef.current?.getContext("2d");
    const desde = last.current;
    if (!ctx || !desde) return;

    const hasta = posicion(e);
    ctx.beginPath();
    ctx.moveTo(desde.x, desde.y);
    ctx.lineTo(hasta.x, hasta.y);
    ctx.stroke();
    last.current = hasta;
    if (!hasStroke) setHasStroke(true);
  }

  function terminar() {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    const canvas = canvasRef.current;
    if (canvas) onChange(canvas.toDataURL("image/png"));
  }

  function limpiar() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStroke(false);
    onChange(null);
  }

  return (
    <div>
      <div className="relative rounded-[12px] bg-white overflow-hidden border border-white/[0.12]">
        <canvas
          ref={canvasRef}
          onPointerDown={empezar}
          onPointerMove={mover}
          onPointerUp={terminar}
          onPointerCancel={terminar}
          className={`block w-full h-[170px] touch-none ${disabled ? "cursor-not-allowed" : "cursor-crosshair"}`}
        />
        {!hasStroke && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-black/30 text-[14px]">Firmá acá con el mouse o con el dedo</p>
          </div>
        )}
        <div className="absolute bottom-3 left-6 right-6 border-t border-dashed border-black/20 pointer-events-none" />
      </div>

      <div className="flex justify-end mt-2">
        <button
          type="button"
          onClick={limpiar}
          disabled={disabled || !hasStroke}
          className="text-white/45 hover:text-white/80 disabled:opacity-40 disabled:hover:text-white/45 text-[13px] transition-colors"
        >
          Borrar firma
        </button>
      </div>
    </div>
  );
}
