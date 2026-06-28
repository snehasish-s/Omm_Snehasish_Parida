import { useState, useEffect } from 'react';

const deploySteps = [
  "[SYSTEM] Authenticating with AWS IAM...",
  "[AWS] Provisioning EC2 instances...",
  "[DOCKER] Pulling images from registry...",
  "[SPRING BOOT] Starting microservices...",
  "[DATA] Connecting to PostgreSQL & Redis...",
  "[GEO] Initializing satellite data pipelines...",
  "[NETWORK] Configuring API Gateway & Route53...",
  "[SYSTEM] All health checks passed.",
  "[DEPLOY] Launching portfolio environment..."
];

export default function DeployLoader({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Step text animation based on progress
    if (progress < 100) {
      const stepIndex = Math.floor((progress / 100) * (deploySteps.length - 1));
      setCurrentStep(stepIndex);
    } else {
      setCurrentStep(deploySteps.length - 1);
      
      // When 100% reached, wait a moment then trigger hide animation
      setTimeout(() => {
        setIsHiding(true);
        // After hide animation finishes, call onComplete
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 600);
    }
  }, [progress, onComplete]);

  return (
    <div className={`deploy-loader ${isHiding ? 'fade-out' : ''}`}>
      <div className="loader-container">
        <div className="loader-icon">
          <div className="cloud-ring"></div>
          <div className="cloud-ring delay"></div>
          <span className="cloud-emoji">☁️</span>
        </div>
        
        <h2 className="loader-title">
          Deploying <span className="accent">Portfolio</span>
        </h2>
        
        <div className="loader-terminal">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">deploy.sh — booting</span>
          </div>
          <div className="terminal-body">
            {deploySteps.slice(0, currentStep + 1).map((step, idx) => (
              <div key={idx} className="terminal-line">
                <span className="prompt">omm@cloud-engineer ~ bash $</span> <span className={idx === currentStep ? 'cyber-glitch text-cyan' : ''} data-text={step}>{step}</span>
              </div>
            ))}
            {progress < 100 && (
              <div className="terminal-line">
                <span className="prompt">omm@cloud-engineer ~ bash $</span> <span className="typing-cursor"></span>
              </div>
            )}
          </div>
        </div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${Math.min(100, progress)}%` }}></div>
        </div>
        <div className="progress-text">{Math.min(100, Math.floor(progress))}% COMPLETE</div>
      </div>
    </div>
  );
}
