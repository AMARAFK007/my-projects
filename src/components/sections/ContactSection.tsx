import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Section } from '../ui/Section';
import { AnimatedText } from '../ui/AnimatedText';
import { Button } from '../ui/Button';
import { useCursorStore } from '../../store/cursorStore';
import emailjs from '@emailjs/browser';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const ContactSection: React.FC = () => {
  const { setCursorType } = useCursorStore();
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!formRef.current) return;
    
    try {
      // Initialize EmailJS with your public key
      emailjs.init("your-emailjs-public-key");
      
      // Send the email using EmailJS
      const result = await emailjs.sendForm(
        "your-service-id",
        "your-template-id",
        formRef.current,
        "your-emailjs-public-key"
      );
      
      console.log('Email successfully sent!', result.text);
      reset();
      alert('Message sent successfully! I will get back to you soon.');
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: 'Email',
      value: 'amarjitpradhan007@gmail.com',
      href: 'mailto:amarjitpradhan007@gmail.com',
    },
    {
      icon: <Phone size={20} />,
      title: 'Phone',
      value: '+91 8260258997',
      href: 'tel:+918260258997',
    },
    {
      icon: <MapPin size={20} />,
      title: 'Location',
      value: 'Bhubaneswar, India',
      href: 'https://maps.google.com/?q=Bhubaneswar+India',
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
              text="Let's Work Together"
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
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
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
            
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  placeholder="Hi, I'd like to talk about..."
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
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  onMouseEnter={() => setCursorType('hover')}
                  onMouseLeave={() => setCursorType('default')}
                >
                  <div className="p-2 bg-background-lighter rounded-lg mr-4 text-primary">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    <p className="text-foreground/70">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Office Hours</h3>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 relative overflow-hidden rounded-lg h-72 border border-foreground/10">
              <iframe
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119811.46049550933!2d85.7435198671093!3d20.301177200631506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190908dd8c0777%3A0x73e088aa5b662ede!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1716123456789!5m2!1sen!2sin"
                className="border-0 w-full h-full"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}; 