
import React, { useRef, useState } from 'react';

type Reading = {
  x: number;
  y: number;
  z: number;
  a: number;
  b: number;
  temperature: number;
};

const UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const UART_TX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

export const MicrobitMonitor: React.FC = () => {
  const [reading, setReading] = useState<Reading | null>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState(
    'Connect your micro:bit using Bluetooth.'
  );

  const deviceRef = useRef<any>(null);
  const characteristicRef = useRef<any>(null);
  const handlerRef = useRef<any>(null);
  const bufferRef = useRef('');

  const disconnect = async () => {
    const device = deviceRef.current;
    const characteristic = characteristicRef.current;

    try {
      if (characteristic && handlerRef.current) {
        characteristic.removeEventListener(
          'characteristicvaluechanged',
          handlerRef.current
        );
      }

      if (characteristic) {
        await characteristic.stopNotifications();
      }
    } catch {}

    try {
      if (device?.gatt?.connected) {
        device.gatt.disconnect();
      }
    } catch {}

    deviceRef.current = null;
    characteristicRef.current = null;
    handlerRef.current = null;
    bufferRef.current = '';

    setConnected(false);
    setMessage('Disconnected.');
  };

  const connect = async () => {
    const bluetooth = (navigator as any).bluetooth;

    if (!bluetooth) {
      setMessage(
        'Bluetooth Web API is unavailable. Try a supported Chrome browser.'
      );
      return;
    }

    try {
      setMessage('Searching for micro:bit...');

      const device = await bluetooth.requestDevice({
        filters: [{ services: [UART_SERVICE] }],
        optionalServices: [UART_SERVICE],
      });

      deviceRef.current = device;

      device.addEventListener('gattserverdisconnected', () => {
        deviceRef.current = null;
        characteristicRef.current = null;
        handlerRef.current = null;
        setConnected(false);
        setMessage('Bluetooth disconnected.');
      });

      setMessage('Connecting to micro:bit...');

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(UART_SERVICE);
      const characteristic = await service.getCharacteristic(UART_TX);

      characteristicRef.current = characteristic;

      await characteristic.startNotifications();

      const handler = (event: any) => {
        const value = event.target.value as DataView;
        const bytes = new Uint8Array(
          value.buffer,
          value.byteOffset,
          value.byteLength
        );

        bufferRef.current += new TextDecoder().decode(bytes);

        const lines = bufferRef.current.split(/\r?\n/);
        bufferRef.current = lines.pop() ?? '';

        for (const line of lines) {
          const values = line.trim().split(',').map(Number);

          if (
            values.length !== 6 ||
            values.some(v => !Number.isFinite(v))
          ) {
            continue;
          }

          const [x, y, z, a, b, temperature] = values;

          setReading({ x, y, z, a, b, temperature });
          setMessage('Live data received from micro:bit over Bluetooth.');
        }
      };

      handlerRef.current = handler;

      characteristic.addEventListener(
        'characteristicvaluechanged',
        handler
      );

      setConnected(true);
      setMessage('Bluetooth connected. Waiting for sensor data...');
    } catch (error) {
      console.error(error);

      setConnected(false);
      setMessage(
        'Connection failed. Check Bluetooth, micro:bit power and UART service.'
      );
    }
  };

  const tiltX = reading
    ? Math.max(-35, Math.min(35, reading.y / 25))
    : 0;

  const tiltY = reading
    ? Math.max(-35, Math.min(35, reading.x / 25))
    : 0;

  return (
    <section className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-5 space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-white">
            BBC micro:bit Live Monitor
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Bluetooth LE sensor demonstration
          </p>
        </div>

        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          connected
            ? 'bg-emerald-950 text-emerald-400'
            : 'bg-slate-800 text-slate-400'
        }`}>
          {connected ? 'CONNECTED' : 'DISCONNECTED'}
        </span>
      </div>

      <p className="text-sm text-cyan-300">{message}</p>

      <div className="bg-slate-950 border border-cyan-500/20 rounded-2xl p-6 flex flex-col items-center gap-4">
        <p className="text-sm font-semibold text-cyan-300">
          LIVE MOTION VISUALIZER
        </p>

        <div
          className="w-40 h-40 flex items-center justify-center"
          style={{ perspective: '500px' }}
        >
          <div
            className="w-28 h-28 rounded-2xl border-2 border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-900 flex items-center justify-center shadow-lg shadow-cyan-500/20"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transition: 'transform 150ms ease-out',
            }}
          >
            <span className="text-white text-3xl font-black">N</span>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          X: {reading?.x ?? '--'} | Y: {reading?.y ?? '--'}
        </p>

        <p className="text-xs text-slate-500">
          Move the micro:bit to control the visualizer
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          ['Accelerometer X', reading?.x],
          ['Accelerometer Y', reading?.y],
          ['Accelerometer Z', reading?.z],
          ['Button A', reading?.a],
          ['Button B', reading?.b],
          ['Processor Temp.', reading?.temperature],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            className="bg-slate-950 border border-slate-800 rounded-xl p-3"
          >
            <p className="text-xs text-slate-400">{label}</p>
            <p className="text-xl font-mono font-bold text-white mt-2">
              {value === undefined ? '--' : value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={connect}
          disabled={connected}
          className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-sm disabled:opacity-40"
        >
          Connect micro:bit
        </button>

        <button
          onClick={disconnect}
          disabled={!connected}
          className="px-4 py-2 rounded-lg bg-slate-700 text-white font-semibold text-sm disabled:opacity-40"
        >
          Disconnect
        </button>
      </div>

      <p className="text-xs text-amber-300 border-t border-slate-800 pt-3">
        Demonstration only: these are micro:bit accelerometer, button and
        processor-temperature readings. They are not EMG signals and do
        not represent a physical prosthetic hand.
      </p>
    </section>
  );
};