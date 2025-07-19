import { motion } from 'framer-motion'
import { User, MapPin, Calendar, Award, Code, Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SpaceModule from '../SpaceModule'
import About3DScene from '../3d/About3DScene'

interface BioLabModuleProps {
  isActive: boolean
}

const bioMetrics = [
  { label: 'Experience Level', value: '95%', color: '#0ea5e9' },
  { label: 'Code Quality', value: '98%', color: '#10b981' },
  { label: 'Problem Solving', value: '92%', color: '#a855f7' },
  { label: 'Team Compatibility', value: '89%', color: '#f59e0b' },
]

const personalData = [
  { icon: MapPin, label: 'Origin', value: 'Earth Sector 7' },
  { icon: Calendar, label: 'Active Since', value: '2019.04.15' },
  { icon: Code, label: 'Primary Language', value: 'JavaScript' },
  { icon: Heart, label: 'Passion Protocol', value: 'Problem Solving' },
]

export default function BioLabModule({ isActive }: BioLabModuleProps) {
  const { t } = useTranslation()

  return (
    <SpaceModule
      moduleId="BIO-LAB-02"
      title={t('about.title')}
      subtitle="BIOLOGICAL ANALYSIS & PERSONAL DATA"
      isActive={isActive}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bio Scanner - 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="lg:col-span-1"
        >
          <div className="glow-card p-6 h-[400px] relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10">
              <div className="text-xs font-mono space-y-1">
                <div className="text-accent">BIO-SCAN: ACTIVE</div>
                <div className="text-muted-foreground">STATUS: ANALYZING</div>
                <div className="text-primary">PROGRESS: 100%</div>
              </div>
            </div>
            <About3DScene />
            
            {/* Scanner Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ y: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Analysis Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Data */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="glow-card p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              PERSONAL DATA MATRIX
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalData.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-background/50 rounded border border-primary/20"
                >
                  <item.icon className="w-5 h-5 text-accent" />
                  <div>
                    <div className="text-xs text-muted-foreground font-mono">{item.label}</div>
                    <div className="text-sm font-medium text-foreground">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="glow-card p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              PERFORMANCE METRICS
            </h3>
            <div className="space-y-4">
              {bioMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  transition={{ delay: 0.9 + index * 0.2, duration: 0.8 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className="text-sm font-mono" style={{ color: metric.color }}>
                      {metric.value}
                    </span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden border border-primary/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: metric.value }}
                      transition={{ delay: 1 + index * 0.2, duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="glow-card p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">ANALYSIS REPORT</h3>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="mb-4 leading-relaxed">
                {t('about.description')}
              </p>
              <p className="leading-relaxed">
                Bio-scan indicates high compatibility with advanced technological systems and 
                exceptional problem-solving capabilities. Recommended for complex mission assignments 
                requiring innovative solutions and adaptability.
              </p>
            </div>
            
            {/* DNA Helix Animation */}
            <div className="mt-6 flex justify-center">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 relative"
              >
                <div className="absolute inset-0 border-2 border-accent/30 rounded-full"></div>
                <div className="absolute inset-2 border-2 border-primary/50 rounded-full"></div>
                <div className="absolute inset-4 bg-accent/20 rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </SpaceModule>
  )
}