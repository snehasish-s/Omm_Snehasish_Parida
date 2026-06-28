import { useState, useEffect, useRef } from 'react';

const nodes = [
  { id: 'satellite', label: 'MODIS Satellite', type: 'geo', x: 50, y: 50 },
  { id: 'apigw', label: 'AWS API Gateway', type: 'aws', x: 250, y: 50 },
  { id: 'lambda', label: 'Serverless NDVI', type: 'aws', x: 450, y: -20 },
  { id: 'docker', label: 'Docker Microservices', type: 'docker', x: 450, y: 120 },
  { id: 's3', label: 'S3 Data Lake', type: 'aws', x: 650, y: -20 },
  { id: 'db', label: 'PostgreSQL GIS', type: 'db', x: 650, y: 120 },
  { id: 'client', label: 'Disaster Dashboard', type: 'client', x: 850, y: 50 },
];

const edges = [
  { source: 'satellite', target: 'apigw' },
  { source: 'apigw', target: 'lambda' },
  { source: 'apigw', target: 'docker' },
  { source: 'lambda', target: 's3' },
  { source: 'docker', target: 'db' },
  { source: 's3', target: 'client' },
  { source: 'db', target: 'client' },
];

export default function InteractiveArchitecture() {
  const [activePackets, setActivePackets] = useState([]);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [nodeStatus, setNodeStatus] = useState({});
  const containerRef = useRef(null);

  const triggerPipeline = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setNodeStatus({});
    
    // Sequence the data flow
    let delays = [0, 800, 1600, 2400, 3200];
    
    // Level 1
    setTimeout(() => spawnPacket('satellite', 'apigw', 'raw_imagery'), delays[0]);
    setTimeout(() => setNodeStatus(prev => ({ ...prev, apigw: 'Receiving' })), delays[0] + 500);
    
    // Level 2
    setTimeout(() => {
      spawnPacket('apigw', 'lambda', 'auth_trigger');
      spawnPacket('apigw', 'docker', 'payload');
      setNodeStatus(prev => ({ ...prev, apigw: 'Routing', lambda: 'Processing NDVI', docker: 'Extracting Features' }));
    }, delays[1]);

    // Level 3
    setTimeout(() => {
      spawnPacket('lambda', 's3', 'raster_map');
      spawnPacket('docker', 'db', 'vector_data');
      setNodeStatus(prev => ({ ...prev, lambda: 'Done', docker: 'Done', s3: 'Storing', db: 'Indexing GIS' }));
    }, delays[2]);

    // Level 4
    setTimeout(() => {
      spawnPacket('s3', 'client', 'alert');
      spawnPacket('db', 'client', 'alert');
      setNodeStatus(prev => ({ ...prev, s3: 'Available', db: 'Available', client: 'Rendering Map' }));
    }, delays[3]);

    // Reset
    setTimeout(() => {
      setPipelineRunning(false);
      setNodeStatus(prev => ({ ...prev, client: 'Alert Deployed' }));
    }, delays[4] + 1000);
  };

  const spawnPacket = (sourceId, targetId, type) => {
    const id = Math.random().toString(36).substr(2, 9);
    setActivePackets(prev => [...prev, { id, sourceId, targetId, type }]);
    
    // Remove packet after animation finishes
    setTimeout(() => {
      setActivePackets(prev => prev.filter(p => p.id !== id));
    }, 1000); // matches CSS animation duration
  };

  return (
    <section className="section arch-sandbox-section" id="sandbox">
      <div className="container">
        <div className="section-header brutal-reveal">
          <div className="section-label">Interactive Sandbox</div>
          <h2 className="section-title">
            Live <span className="accent">Pipeline Simulator</span>
          </h2>
          <p className="section-subtitle">
            Most portfolios just list projects. Experience the architecture I built at ISRO/NESAC live.
            Click the button below to ingest simulated satellite imagery through a serverless AWS pipeline.
          </p>
        </div>

        <div className="sandbox-controls brutal-reveal delay-1">
          <button
            className={`btn btn-primary pipeline-btn ${pipelineRunning ? 'running' : ''}`}
            onClick={triggerPipeline}
            disabled={pipelineRunning}
          >
            {pipelineRunning ? '⚡ Processing Data Pipeline...' : '📡 Ingest Satellite Data'}
          </button>
        </div>

        <div className="sandbox-canvas-wrapper brutal-reveal delay-2" ref={containerRef}>
          <div className="sandbox-canvas">
            {/* SVG Edges */}
            <svg className="sandbox-svg" viewBox="0 -50 1000 250" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0, 212, 255, 0.2)" />
                  <stop offset="100%" stopColor="rgba(123, 45, 255, 0.2)" />
                </linearGradient>
              </defs>
              {edges.map((edge, idx) => {
                const source = nodes.find(n => n.id === edge.source);
                const target = nodes.find(n => n.id === edge.target);
                return (
                  <path 
                    key={idx}
                    d={`M ${source.x + 60} ${source.y + 30} C ${source.x + 150} ${source.y + 30}, ${target.x - 50} ${target.y + 30}, ${target.x} ${target.y + 30}`}
                    stroke="url(#lineGrad)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 4"
                    className="pipeline-path"
                  />
                );
              })}
              
              {/* Animated Packets */}
              {activePackets.map(packet => {
                const source = nodes.find(n => n.id === packet.sourceId);
                const target = nodes.find(n => n.id === packet.targetId);
                return (
                  <circle 
                    key={packet.id}
                    r="4" 
                    fill="var(--accent-green)"
                    style={{
                      filter: 'drop-shadow(0 0 8px var(--accent-green))',
                      animation: 'movePacket 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                      offsetPath: `path('M ${source.x + 60} ${source.y + 30} C ${source.x + 150} ${source.y + 30}, ${target.x - 50} ${target.y + 30}, ${target.x} ${target.y + 30}')`
                    }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map(node => (
              <div 
                key={node.id} 
                className={`pipeline-node ${node.type} ${nodeStatus[node.id] ? 'active' : ''}`}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
              >
                <div className="node-icon">
                  {node.type === 'geo' && '🛰️'}
                  {node.type === 'aws' && '☁️'}
                  {node.type === 'docker' && '🐳'}
                  {node.type === 'db' && '🗄️'}
                  {node.type === 'client' && '📊'}
                </div>
                <div className="node-label">{node.label}</div>
                {nodeStatus[node.id] && (
                  <div className="node-status">{nodeStatus[node.id]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
