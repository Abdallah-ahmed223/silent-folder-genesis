
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

const contactInfo = [
  {
    icon: Mail,
    label: 'contact.info.email',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com'
  },
  {
    icon: Phone,
    label: 'contact.info.phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: MapPin,
    label: 'contact.info.location',
    value: 'San Francisco, CA',
    href: '#'
  }
]

export default function ContactInfo() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      {contactInfo.map((item, index) => (
        <motion.a
          key={item.label}
          href={item.href}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ x: 8 }}
          className="block"
        >
          <Card className="glow-card hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t(item.label)}
                  </p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.a>
      ))}
    </div>
  )
}
