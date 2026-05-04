import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/content/site'

export default function AboutContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
        <p>{site.about.paragraph1}</p>
        <p>{site.about.paragraph2}</p>
        <p>{site.about.paragraph3}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button size="lg" asChild>
          <a href="/Abdallah_Ahmed_CV.pdf" download="Abdallah_Ahmed_Senior_Frontend_CV.pdf">
            <Download className="w-5 h-5 mr-2" />
            {site.about.downloadResume}
          </a>
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Mail className="w-5 h-5 mr-2" />
          {site.about.getInTouch}
        </Button>
      </div>
    </motion.div>
  )
}
