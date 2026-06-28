import { useState, useEffect, useRef } from 'react';

export default function LiveMetrics() {
  const [cpu, setCpu] = useState(12);
  const [mem, setMem] = useState(45);
  const [net, setNet] = useState(250);
  const [activeTasks, setActiveTasks] = useState(8);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });
  const dragOffset = useRef({ x: 0, y: 0 });
  const panelRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.max(5, Math.min(95, prev + (Math.random() * 10 - 5))));
      setMem(prev => Math.max(30, Math.min(85, prev + (Math.random() * 4 - 2))));
      setNet(prev => Math.max(100, Math.min(900, prev + (Math.random() * 200 - 100))));
      setActiveTasks(prev => Math.max(4, Math.min(16, Math.floor(prev + (Math.random() * 3 - 1)))));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e) => {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]);

  const onDragStart = (e) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setIsDragging(true);
    if (position.x === null) {
      setPosition({ x: rect.left, y: rect.top });
    }
  };

  const style = position.x !== null ? {
    position: 'fixed',
    left: position.x + 'px',
    top: position.y + 'px',
    right: 'auto',
    bottom: 'auto',
  } : {};

  return (
    <div
      ref={panelRef}
      className={`live-metrics-overlay ${isDragging ? 'dragging' : ''}`}
      style={style}
    >
      <div className="metrics-drag-handle" onMouseDown={onDragStart}>
        ⣿⣿ DRAG ⣿⣿
      </div>
      <div className="metric-header">
        <span className="metric-dot blink"></span>
        SYSTEM_MONITOR_v2.4
      </div>
      <div className="metric-row">
        <span>CPU_USAGE</span>
        <span className="metric-val">[{cpu.toFixed(1)}%]</span>
      </div>
      <div className="metric-bar"><div className="metric-fill" style={{ width: `${cpu}%` }}></div></div>
      
      <div className="metric-row">
        <span>MEM_ALLOC</span>
        <span className="metric-val">[{mem.toFixed(1)}%]</span>
      </div>
      <div className="metric-bar"><div className="metric-fill" style={{ width: `${mem}%` }}></div></div>
      
      <div className="metric-row">
        <span>NET_I/O</span>
        <span className="metric-val">[{net.toFixed(0)} KB/s]</span>
      </div>
      
      <div className="metric-row">
        <span>DOCKER_CTRS</span>
        <span className="metric-val">[{activeTasks} RUNNING]</span>
      </div>
    </div>
  );
}
