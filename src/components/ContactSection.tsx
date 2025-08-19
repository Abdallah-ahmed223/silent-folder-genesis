import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense } from 'react'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';


const Contact3DScene = lazy(() => import('./3d/Contact3DScene'))

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

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
]

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const { t } = useTranslation();
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  // Form validation schema using Yup with translated error messages
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t('contact.form.errors.nameRequired'))
      .min(2, t('contact.form.errors.nameMin')),
    email: Yup.string()
      .email(t('contact.form.errors.emailInvalid'))
      .required(t('contact.form.errors.emailRequired')),
    subject: Yup.string()
      .required(t('contact.form.errors.subjectRequired'))
      .min(3, t('contact.form.errors.subjectMin')),
    message: Yup.string()
      .required(t('contact.form.errors.messageRequired'))
      .min(10, t('contact.form.errors.messageMin'))
  });

  // Initial form values
  const initialValues: FormValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const handleSubmit = async (values: FormValues, { resetForm, setSubmitting }: FormikHelpers<FormValues>) => {
    const formEl = form.current;
    if (!formEl) return;
    
    console.log('Submitting form data:', values);
    
    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formEl,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      console.log('✅ Email sent successfully!');
      // Reset form after successful submission
      resetForm();
      // Show success toast notification
      toast({
        title: t('contact.form.successTitle'),
        description: t('contact.form.successMessage'),
        variant: 'default',
      });
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      // Show error toast notification
      toast({
        title: t('contact.form.errorTitle'),
        description: t('contact.form.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Suspense fallback={<div />}>
          <Contact3DScene />
        </Suspense>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t('contact.title')} <span className="hero-text">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t('contact.letsConnect')}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('contact.connectDescription')}
              </p>
            </div>

            {/* Contact Info Cards */}
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

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold mb-4">{t('contact.followMe')}</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glow-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">{t('contact.sendMessage')}</h3>
                
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form ref={form} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          {t('contact.form.firstName')}
                        </label>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          type="text"
                          placeholder={t('contact.form.placeholders.firstName')}
                          className={`bg-background/50 ${errors.name && touched.name ? 'border-red-500' : ''}`}
                        />
                        <ErrorMessage name="name">
                          {msg => (
                            <div className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          {t('contact.form.email')}
                        </label>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('contact.form.placeholders.email')}
                          className={`bg-background/50 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                        />
                        <ErrorMessage name="email">
                          {msg => (
                            <div className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          {t('contact.form.subject')}
                        </label>
                        <Field
                          as={Input}
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder={t('contact.form.placeholders.subject')}
                          className={`bg-background/50 ${errors.subject && touched.subject ? 'border-red-500' : ''}`}
                        />
                        <ErrorMessage name="subject">
                          {msg => (
                            <div className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          {t('contact.form.message')}
                        </label>
                        <Field
                          as={Textarea}
                          id="message"
                          name="message"
                          placeholder={t('contact.form.placeholders.message')}
                          rows={5}
                          className={`bg-background/50 resize-none ${errors.message && touched.message ? 'border-red-500' : ''}`}
                        />
                        <ErrorMessage name="message">
                          {msg => (
                            <div className="text-red-500 text-sm mt-1 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full glow-card group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            {t('contact.form.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                            {t('contact.form.send')}
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}