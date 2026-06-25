import { useState, useEffect } from 'react';

export default function LiveMetrics() {
  const [cpu, setCpu] = useState(12);
  const [mem, setMem] = useState(45);
  const [net, setNet] = useState(250);
  const [activeTasks, setActiveTasks] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live fluctuating metrics
      setCpu(prev => Math.max(5, Math.min(95, prev + (Math.random() * 10 - 5))));
      setMem(prev => Math.max(30, Math.min(85, prev + (Math.random() * 4 - 2))));
      setNet(prev => Math.max(100, Math.min(900, prev + (Math.random() * 200 - 100))));
      setActiveTasks(prev => Math.max(4, Math.min(16, Math.floor(prev + (Math.random() * 3 - 1)))));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-metrics-overlay">
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
