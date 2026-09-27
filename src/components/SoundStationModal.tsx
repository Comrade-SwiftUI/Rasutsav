import React, { useEffect, useRef, useState } from 'react';
import { audioEngine } from '../utils/audioEngine';
import { X, Play, Square, Music, Bell, Sparkles, Volume2, Sliders, Activity } from 'lucide-react';

interface SoundStationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoundStationModal: React.FC<SoundStationModalProps> = ({ isOpen, onClose }) => {
  const [engineState, setEngineState] = useState(audioEngine.getState());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const unsub = audioEngine.subscribe((state) => {
      setEngineState(state);
    });
    return unsub;
  }, []);

  // Real-time Audio Canvas Visualizer
  useEffect(() => {
    if (!isOpen) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = audioEngine.getAnalyser();

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.fillStyle = '#0a0d1d';
      ctx.fillRect(0, 0, width, height);

      if (analyser && engineState.isPlaying) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const barWidth = (width / bufferLength) * 2.2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height * 0.9;

          // Gradient color from gold to kumkum pink
          const grad = ctx.createLinearGradient(0, height, 0, height - barHeight);
          grad.addColorStop(0, '#d4af37');
          grad.addColorStop(0.6, '#f2ca50');
          grad.addColorStop(1, '#e11d48');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, height - barHeight, barWidth - 2, barHeight, [4, 4, 0, 0]);
          ctx.fill();

          x += barWidth;
        }
      } else {
        // Idle ambient waves
        const now = Date.now() / 300;
        const barCount = 24;
        const barWidth = width / barCount;
        for (let i = 0; i < barCount; i++) {
          const h = (Math.sin(now + i * 0.4) * 0.5 + 0.5) * 16 + 6;
          ctx.fillStyle = 'rgba(212, 175, 55, 0.25)';
          ctx.beginPath();
          ctx.roundRect(i * barWidth, height - h, barWidth - 3, h, [3, 3, 0, 0]);
          ctx.fill();
        }
      }
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOpen, engineState.isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#14172e] border border-[#f2ca50]/30 shadow-[0_0_50px_rgba(242,202,80,0.25)] overflow-hidden">
        {/* Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#26293a] bg-[#0f1222]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f2ca50]/15 text-[#f2ca50] flex items-center justify-center">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#e0e1f8]">
                Rasutsav Live Sound & Rhythm Station
              </h3>
              <p className="text-xs text-[#d0c5af]">
                Synthesized 50-Dhol Ensemble, Aarti Bells & Authentic Taals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#99907c] hover:text-[#e0e1f8] hover:bg-[#26293a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visualizer Canvas */}
        <div className="p-6 flex flex-col gap-5">
          <div className="relative rounded-xl overflow-hidden border border-[#f2ca50]/20 bg-[#0a0d1d] shadow-inner">
            <canvas ref={canvasRef} width={500} height={120} className="w-full h-28 block" />
            <div className="absolute top-2 left-3 flex items-center gap-1.5 text-[11px] text-[#f2ca50] uppercase tracking-wider font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>
                {engineState.isPlaying
                  ? `Active Track: ${engineState.mode.toUpperCase()} (${engineState.bpm} BPM)`
                  : 'Synthesizer Standby'}
              </span>
            </div>
          </div>

          {/* Preset Rhythm Modes */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => audioEngine.toggleRhythm('dhol')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                engineState.isPlaying && engineState.mode === 'dhol'
                  ? 'bg-[#d4af37]/20 border-[#f2ca50] text-[#f2ca50] shadow-[0_0_16px_rgba(242,202,80,0.3)]'
                  : 'bg-[#181b2b] border-[#26293a] text-[#e0e1f8] hover:border-[#f2ca50]/40'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#26293a] flex items-center justify-center">
                {engineState.isPlaying && engineState.mode === 'dhol' ? (
                  <Square className="w-4 h-4 text-[#f2ca50]" />
                ) : (
                  <Play className="w-4 h-4 text-[#f2ca50]" />
                )}
              </div>
              <span className="text-xs font-semibold">50-Dhol 3-Taali</span>
              <span className="text-[10px] text-[#99907c]">118 BPM Garba</span>
            </button>

            <button
              onClick={() => audioEngine.toggleRhythm('sanedo')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                engineState.isPlaying && engineState.mode === 'sanedo'
                  ? 'bg-[#e11d48]/20 border-[#e11d48] text-[#ffb3b6] shadow-[0_0_16px_rgba(225,29,72,0.3)]'
                  : 'bg-[#181b2b] border-[#26293a] text-[#e0e1f8] hover:border-[#e11d48]/40'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#26293a] flex items-center justify-center">
                {engineState.isPlaying && engineState.mode === 'sanedo' ? (
                  <Square className="w-4 h-4 text-[#e11d48]" />
                ) : (
                  <Play className="w-4 h-4 text-[#e11d48]" />
                )}
              </div>
              <span className="text-xs font-semibold">Sanedo Euphoria</span>
              <span className="text-[10px] text-[#99907c]">138 BPM Fast</span>
            </button>

            <button
              onClick={() => audioEngine.toggleRhythm('aarti')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                engineState.isPlaying && engineState.mode === 'aarti'
                  ? 'bg-[#d4af37]/20 border-[#f2ca50] text-[#f2ca50] shadow-[0_0_16px_rgba(242,202,80,0.3)]'
                  : 'bg-[#181b2b] border-[#26293a] text-[#e0e1f8] hover:border-[#f2ca50]/40'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#26293a] flex items-center justify-center">
                {engineState.isPlaying && engineState.mode === 'aarti' ? (
                  <Square className="w-4 h-4 text-[#f2ca50]" />
                ) : (
                  <Play className="w-4 h-4 text-[#f2ca50]" />
                )}
              </div>
              <span className="text-xs font-semibold">Maa Amba Aarti</span>
              <span className="text-[10px] text-[#99907c]">84 BPM Bells</span>
            </button>
          </div>

          {/* Interactive One-Shot Instrument Triggers */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#26293a]">
            <span className="text-xs font-semibold text-[#d0c5af] uppercase tracking-wider">
              Play Live Instruments (Click to Strike)
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => audioEngine.playDandiyaClack()}
                className="py-2.5 px-3 rounded-xl bg-[#1c1f2f] hover:bg-[#26293a] border border-[#26293a] hover:border-[#f2ca50]/50 text-xs font-medium text-[#e0e1f8] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
              >
                <span>🥢</span>
                <span>Dandiya Clack</span>
              </button>

              <button
                onClick={() => audioEngine.playTempleBell(880)}
                className="py-2.5 px-3 rounded-xl bg-[#1c1f2f] hover:bg-[#26293a] border border-[#26293a] hover:border-[#f2ca50]/50 text-xs font-medium text-[#e0e1f8] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
              >
                <Bell className="w-3.5 h-3.5 text-[#f2ca50]" />
                <span>Temple Ghant</span>
              </button>

              <button
                onClick={() => audioEngine.playShankhNaad()}
                className="py-2.5 px-3 rounded-xl bg-[#1c1f2f] hover:bg-[#26293a] border border-[#26293a] hover:border-[#f2ca50]/50 text-xs font-medium text-[#e0e1f8] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
              >
                <span>🐚</span>
                <span>Shankh Naad</span>
              </button>
            </div>
          </div>

          {/* Tempo BPM Adjuster */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#26293a]">
            <div className="flex items-center justify-between text-xs text-[#d0c5af]">
              <span className="flex items-center gap-1.5 font-semibold">
                <Sliders className="w-3.5 h-3.5 text-[#f2ca50]" />
                <span>Tempo Control</span>
              </span>
              <span className="font-bold text-[#f2ca50]">{engineState.bpm} BPM</span>
            </div>
            <input
              type="range"
              min={80}
              max={160}
              value={engineState.bpm}
              onChange={(e) => audioEngine.setBpm(Number(e.target.value))}
              className="w-full h-1.5 bg-[#26293a] rounded-lg appearance-none cursor-pointer accent-[#f2ca50]"
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#0a0d1d] border-t border-[#26293a] flex items-center justify-between text-xs text-[#99907c]">
          <span className="flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-[#f2ca50]" />
            <span>Pure Web Audio API (Zero buffering)</span>
          </span>
          <button
            onClick={() => audioEngine.stop()}
            className="text-xs text-[#ffb3b6] hover:underline"
          >
            Stop All Audio
          </button>
        </div>
      </div>
    </div>
  );
};
