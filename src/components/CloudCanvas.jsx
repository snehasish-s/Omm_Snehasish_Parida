import { useEffect, useRef } from 'react';

export default function CloudCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let cloudNodes = [];
    let connections = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Cloud service labels that float around
    const serviceLabels = [
      'S3', 'EC2', 'IAM', 'Lambda', 'RDS', 'CloudWatch',
      'Azure VM', 'Docker', 'K8s', 'API GW', 'DynamoDB',
      'ECS', 'Route53', 'SNS', 'SQS', 'CloudFront'
    ];

    // Create floating particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '0, 212, 255' : '123, 45, 255',
      });
    }

    // Create cloud nodes (larger floating elements)
    for (let i = 0; i < 6; i++) {
      cloudNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 3,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.3 + 0.1,
        label: serviceLabels[i],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const drawParticle = (p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.fill();
    };

    const drawCloudNode = (node, time) => {
      const pulse = Math.sin(time * 0.002 + node.pulsePhase) * 0.15 + 0.85;
      const currentSize = node.size * pulse;

      // Glow
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, currentSize * 8
      );
      gradient.addColorStop(0, `rgba(0, 212, 255, ${node.opacity * 0.3})`);
      gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(node.x - currentSize * 8, node.y - currentSize * 8, currentSize * 16, currentSize * 16);

      // Core dot
      ctx.beginPath();
      ctx.arc(node.x, node.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${node.opacity * pulse})`;
      ctx.fill();

      // Label
      ctx.font = '500 9px "JetBrains Mono", monospace';
      ctx.fillStyle = `rgba(0, 212, 255, ${node.opacity * 0.6 * pulse})`;
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + currentSize + 14);
    };

    const drawConnections = (time) => {
      // Connect nearby cloud nodes with lines
      for (let i = 0; i < cloudNodes.length; i++) {
        for (let j = i + 1; j < cloudNodes.length; j++) {
          const dx = cloudNodes[i].x - cloudNodes[j].x;
          const dy = cloudNodes[i].y - cloudNodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 350) {
            const opacity = (1 - dist / 350) * 0.08;
            ctx.beginPath();
            ctx.moveTo(cloudNodes[i].x, cloudNodes[i].y);
            ctx.lineTo(cloudNodes[j].x, cloudNodes[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 8]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Traveling data dot along connection
            const progress = (Math.sin(time * 0.001 + i + j) + 1) / 2;
            const dotX = cloudNodes[i].x + (cloudNodes[j].x - cloudNodes[i].x) * progress;
            const dotY = cloudNodes[i].y + (cloudNodes[j].y - cloudNodes[i].y) * progress;
            ctx.beginPath();
            ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 153, 0, ${opacity * 4})`;
            ctx.fill();
          }
        }
      }

      // Connect particles to nearest cloud node
      for (let p of particles) {
        for (let node of cloudNodes) {
          const dx = p.x - node.x;
          const dy = p.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.04;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(123, 45, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        drawParticle(p);
      });

      // Update & draw cloud nodes
      cloudNodes.forEach(node => {
        node.x += node.speedX;
        node.y += node.speedY;

        if (node.x < 50) node.speedX = Math.abs(node.speedX);
        if (node.x > canvas.width - 50) node.speedX = -Math.abs(node.speedX);
        if (node.y < 50) node.speedY = Math.abs(node.speedY);
        if (node.y > canvas.height - 50) node.speedY = -Math.abs(node.speedY);

        drawCloudNode(node, time);
      });

      drawConnections(time);

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="cloud-canvas" />;
}
