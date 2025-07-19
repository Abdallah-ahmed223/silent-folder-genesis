import { Suspense, useState } from 'react'
import SpaceshipDashboard, { SpaceModule } from '@/components/SpaceshipDashboard'
import SpaceParticles from '@/components/SpaceParticles'
import BridgeModule from '@/components/modules/BridgeModule'
import BioLabModule from '@/components/modules/BioLabModule'

// Enhanced Loading component for space theme
function SpaceLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-space">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto nebula-pulse"></div>
          <div className="absolute inset-0 w-16 h-16 border-2 border-accent/30 rounded-full animate-ping mx-auto"></div>
        </div>
        <div className="space-y-2">
          <p className="text-primary font-bold text-lg">INITIALIZING STARSHIP</p>
          <p className="text-accent font-mono text-sm">◉ LOADING COSMIC INTERFACE...</p>
          <p className="text-muted-foreground font-mono text-xs">CONNECTING TO DEEP SPACE NETWORK</p>
        </div>
        
        {/* Loading Animation Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const Index = () => {
  const [activeModule, setActiveModule] = useState<SpaceModule>('bridge')

  const handleModuleChange = (module: SpaceModule) => {
    setActiveModule(module)
  }

  return (
    <Suspense fallback={<SpaceLoading />}>
      <div className="min-h-screen bg-gradient-space relative overflow-hidden">
        {/* Animated space particles background */}
        <SpaceParticles />
        
        {/* Main Spaceship Dashboard */}
        <SpaceshipDashboard 
          activeModule={activeModule} 
          onModuleChange={handleModuleChange} 
        />
        
        {/* Space Modules */}
        <BridgeModule 
          isActive={activeModule === 'bridge'} 
          onNavigate={handleModuleChange}
        />
        
        <BioLabModule 
          isActive={activeModule === 'bio-lab'} 
        />

        {/* TODO: Add other modules */}
        {/* <EngineeringModule isActive={activeModule === 'engineering'} /> */}
        {/* <TacticalModule isActive={activeModule === 'tactical'} /> */}
        {/* <CommunicationsModule isActive={activeModule === 'communications'} /> */}
        
        {/* Ambient Space Effects */}
        <div className="fixed inset-0 pointer-events-none z-[1]">
          {/* Floating UI Elements */}
          <div className="absolute top-1/4 right-8 w-2 h-2 bg-accent/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-12 w-3 h-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-green-400/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Scanning Lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
      </div>
    </Suspense>
  );
};

export default Index;