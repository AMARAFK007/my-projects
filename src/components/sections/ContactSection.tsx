import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Section } from '../ui/Section';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { useCursorStore } from '../../store/cursorStore';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const ContactSection: React.FC = () => {
  const { setCursorType } = useCursorStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    reset();
    alert('Message sent successfully! I will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: 'Email',
      value: 'amarjit@example.com',
      href: 'mailto:amarjit@example.com',
    },
    {
      icon: <Phone size={20} />,
      title: 'Phone',
      value: '+91 9876543210',
      href: 'tel:+919876543210',
    },
    {
      icon: <MapPin size={20} />,
      title: 'Location',
      value: 'Bhubaneswar, Odisha, India',
      href: 'https://maps.google.com/?q=Bhubaneswar+Odisha+India',
    },
  ];

  return (
    <Section id="contact" className="relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium mb-4"
          >
            Get In Touch
          </motion.span>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <AnimatedText
              text="Let's Create Something Amazing Together"
              once
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl text-foreground/80 text-lg"
          >
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you. Feel free to reach out and let's discuss how I can help bring your vision to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1"
                  onMouseEnter={() => setCursorType('text')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full ${errors.name ? 'border-error' : ''}`}
                  placeholder="John Doe"
                  {...register('name', { required: 'Name is required' })}
                  onMouseEnter={() => setCursorType('text')}
                  onMouseLeave={() => setCursorType('default')}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1"
                  onMouseEnter={() => setCursorType('text')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full ${errors.email ? 'border-error' : ''}`}
                  placeholder="john.doe@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  onMouseEnter={() => setCursorType('text')}
                  onMouseLeave={() => setCursorType('default')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-1"
                  onMouseEnter={() => setCursorType('text')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  className={`w-full ${errors.subject ? 'border-error' : ''}`}
                  placeholder="Project Inquiry"
                  {...register('subject', { required: 'Subject is required' })}
                  onMouseEnter={() => setCursorType('text')}
                  onMouseLeave={() => setCursorType('default')}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-1"
                  onMouseEnter={() => setCursorType('text')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full resize-none ${errors.message ? 'border-error' : ''}`}
                  placeholder="Hi Amarjit, I'd like to talk about..."
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 20, message: 'Message should be at least 20 characters' }
                  })}
                  onMouseEnter={() => setCursorType('text')}
                  onMouseLeave={() => setCursorType('default')}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-error flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={16} className="ml-2" />
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="flex items-start p-4 bg-background-light rounded-lg border border-foreground/10 hover:border-primary/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{info.title}</p>
                    <p className="text-sm text-foreground/80">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}; 