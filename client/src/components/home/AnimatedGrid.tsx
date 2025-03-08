export default function AnimatedGrid() {
    return (
      <div className="animated-grid">
        <style>{`
          @keyframes moveLight {
            0% {
              background-position: -100% -100%;
            }
            100% {
              background-position: 200% 200%;
            }
          }
  
          .animated-grid {
            position: absolute;
            inset: 0;
            background-image:
              /* Grille de base */
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              /* Lumière (dégradé radial) */
              radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 100px);
            background-size: 20px 20px, 20px 20px, 100% 100%;
            animation: moveLight 5s linear infinite;
          }
        `}</style>
      </div>
    );
  }