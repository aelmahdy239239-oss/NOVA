
import React, { useRef, useState } from 'react';

type Reading = {
  x: number;
  y: number;
  z: number;
  a: number;
  b: number;
  temperature: number;
};

export const MicrobitMonitor: React.FC = () => {
  const [reading, setReading] = useState<Reading | null>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('Connect your micro:bit using USB.');
  const portRef = useRef<any>(null);
  const readerRef = useRef<any>(null);

  const disconnect = async () => {
    try {
      await readerRef.current?.cancel();
      await portRef.current?.close();
    } catch {}
    readerRef.current = null;
    portRef.current = null;
    setConnected(false);
    setMessage('Disconnected.');
  };

  const connect = async () => {
    const serial = (navigator as any).serial;

    if (!serial) {
      setMessage('Use the latest Chrome or Edge on desktop.');
      return;
    }

    try {
      const port = await serial.requestPort();
      await port.open({ baudRate: 115200 });
      portRef.current = port;
      setConnected(true);
      setMessage('Waiting for live micro:bit data...');

      const decoder = new TextDecoder();
      let buffer = '';
      const reader = port.readable.getReader();
      readerRef.current = reader;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const values = line.trim().split(',').map(Number);
          if (values.length !== 6 || values.some(v => !Number.isFinite(v))) continue;

          const [x, y, z, a, b, temperature] = values;
          setReading({ x, y, z, a, b, temperature });
          setMessage('Live data received from micro:bit over USB.');
        }
      }
    } catch (error) {
      setMessage('Connection failed or was cancelled. Check the USB connection.');
      setConnected(false);
    } finally {
      try { readerRef.current?.releaseLock(); } catch {}
      readerRef.current = null;
    }
  };

  return (
    <section className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">BBC micro:bit Live Monitor</h2>
          <p className="text-xs text-slate-400 mt-1">USB serial sensor demonstration</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${connected ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
          {connected ? 'CONNECTED' : 'DISCONNECTED'}
        </span>
      </div>

      <p className="text-sm text-cyan-300">{message}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          ['Accelerometer X', reading?.x],
          ['Accelerometer Y', reading?.y],
          ['Accelerometer Z', reading?.z],
          ['Button A', reading?.a],
          ['Button B', reading?.b],
          ['Processor Temp.', reading?.temperature],
        ].map(([label, value]) => (
          <div key={String(label)} className="bg-slate-950 border border-slate-800 rounded-xl p-3">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="text-xl font-mono font-bold text-white mt-2">
              {value === undefined ? '--' : value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={connect} disabled={connected}
          className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-sm disabled:opacity-40">
          Connect micro:bit
        </button>
        <button onClick={disconnect} disabled={!connected}
          className="px-4 py-2 rounded-lg bg-slate-700 text-white font-semibold text-sm disabled:opacity-40">
          Disconnect
        </button>
      </div>

      <p className="text-xs text-amber-300 border-t border-slate-800 pt-3">
        Demonstration only: these are micro:bit accelerometer, button and processor-temperature readings. They are not EMG signals and do not represent a physical prosthetic hand.
      </p>
    </section>
  );
};