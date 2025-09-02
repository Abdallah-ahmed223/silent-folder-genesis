
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

export default function ContactForm() {
  const { t } = useTranslation()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="glow-card">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold mb-6">{t('contact.sendMessage')}</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  {t('contact.form.firstName')}
                </label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder={t('contact.form.placeholders.firstName')}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  {t('contact.form.lastName')}
                </label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder={t('contact.form.placeholders.lastName')}
                  required
                  className="bg-background/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t('contact.form.email')}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t('contact.form.placeholders.email')}
                required
                className="bg-background/50"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                {t('contact.form.subject')}
              </label>
              <Input
                id="subject"
                type="text"
                placeholder={t('contact.form.placeholders.subject')}
                required
                className="bg-background/50"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t('contact.form.message')}
              </label>
              <Textarea
                id="message"
                placeholder={t('contact.form.placeholders.message')}
                rows={5}
                required
                className="bg-background/50 resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full glow-card group"
            >
              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
              {t('contact.form.send')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
