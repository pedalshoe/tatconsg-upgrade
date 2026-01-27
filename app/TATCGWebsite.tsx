"use client";
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Building2, TrendingUp, GraduationCap, 
  Mail, MapPin, Clock, Linkedin, Facebook, Send, 
  CheckCircle, AlertCircle, Loader, Briefcase, Shield
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const TATCGWebsite: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', company: '', serviceInterest: '', message: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Explore Our Services' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'jobs', label: 'Job Opportunities' },
    { id: 'privacy', label: 'Privacy' }
  ];
  const HERO_BG = `url("data:image/svg+xml,%3Csvg%20width%3D'60'%20height%3D'60'%20viewBox%3D'0%200%2060%2060'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Cg%20fill%3D'none'%20fill-rule%3D'evenodd'%3E%3Cg%20fill%3D'%23ffffff'%20fill-opacity%3D'1'%3E%3Cpath%20d%3D'M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;


  const services = [
    {
      icon: Building2,
      title: "Business Advisory",
      description: "Strategic and operational guidance for sustainable growth and business continuity.",
      details: ["Strategic Planning", "M&A Support", "Due Diligence", "Business Restructuring", "Process Design", "Asset Verification"]
    },
    {
      icon: TrendingUp,
      title: "Tax Advisory",
      description: "Transfer pricing, tax disputes, and compliance support across West Africa.",
      details: ["Transfer Pricing", "Tax Compliance", "Dispute Resolution", "Fiscal Modeling", "Cross-border Advisory", "Tax Risk Assessment"]
    },
    {
      icon: GraduationCap,
      title: "Professional Development",
      description: "Tailored training and internship programs bridging skills gaps.",
      details: ["Corporate Training", "Internship Programs", "Leadership Development", "Technical Skills", "Certification Support", "Capacity Building"]
    }
  ];

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submission:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', serviceInterest: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const HomePage = () => (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
                <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: HERO_BG,
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Empowering Businesses with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              Smart Business, Tax & Talent Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            TAT Consulting Group, Inc. delivers full-spectrum outsourcing, tax advisory, and professional development services — trusted by leading corporations across Liberia and Sierra Leone.
          </p>
          <button onClick={() => setCurrentPage('services')} className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105">
            Explore Our Services
          </button>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-lg text-gray-600">
            TAT Consulting Group, Inc. is a regional leader in tax, business, and human capital advisory services. We specialize in transfer pricing, dispute resolution, mergers and acquisitions, compliance, and strategic outsourcing.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose TAT</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Proven Expertise', 'HR Outsourcing', 'Sector Experience', 'Project Support'].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-gray-900 mb-2">{item}</h3>
                <p className="text-gray-600 text-sm">Excellence in consulting services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {['Asset Verification', 'Transfer Pricing', 'Concession Planning', 'HR Outsourcing'].map((item, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-blue-600 mb-2">{item}</div>
                <p className="text-gray-600 text-sm">Proven results</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const ServicesPage = () => (
    <section className="py-32 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Explore Our Services</h1>
        <p className="text-xl text-gray-600 mb-16">Comprehensive solutions for West Africa</p>
        <div className="space-y-16">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-12 shadow-xl">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {service.details.map((detail, didx) => (
                        <div key={didx} className="flex items-center gap-3">
                          <ChevronRight className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-16 text-center">
          <button onClick={() => setCurrentPage('contact')} className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700">
            Contact Us Today
          </button>
        </div>
      </div>
    </section>
  );

  const ContactPage = () => (
    <section className="py-32 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-16">Get in touch with our team</p>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Your full name" />
                {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="your.email@example.com" />
                {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="+231 XXX XXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Your company" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service of Interest</label>
                <select name="serviceInterest" value={formData.serviceInterest} onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                  <option value="">Select...</option>
                  <option value="business">Business Advisory</option>
                  <option value="tax">Tax Advisory</option>
                  <option value="training">Professional Development</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5}
                  className={`w-full px-4 py-3 border rounded-lg ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Tell us about your needs..." />
                {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
              </div>
              <button onClick={handleSubmit} disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader className="w-5 h-5 animate-spin" />Sending...</> : <><Send className="w-5 h-5" />Send Message</>}
              </button>
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <p>Thank you! We'll respond within 24-48 hours.</p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <p>Something went wrong. Please try again.</p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-8">
            {[
              { country: 'LIBERIA', address: '2nd Floor, Danny Horton Building', street: 'A-1254 Horton Avenue, Monrovia' },
              { country: 'SIERRA LEONE', address: '22 Wellington Street', street: 'Freetown, Sierra Leone' }
            ].map((office, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{office.country}</h3>
                <div className="flex items-start gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-gray-700">{office.address}</p>
                    <p className="text-gray-700">{office.street}</p>
                  </div>
                </div>
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Map: {office.country}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a href="mailto:frontdesk@tatconsg.com" className="text-gray-700 hover:text-blue-600">frontdesk@tatconsg.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Mon-Fri: 9am-6pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const JobsPage = () => (
    <section className="py-32 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Job Opportunities</h1>
        <p className="text-xl text-gray-600 mb-12">Join our team of professionals</p>
        <div className="bg-white rounded-2xl p-12 shadow-xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Opportunities</h2>
              <p className="text-lg text-gray-600 mb-6">
                We are always looking for talented professionals. Our internship programs and full-time positions offer growth opportunities.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Current Openings</h3>
              <p className="text-gray-600">We regularly update opportunities. Check back or send your CV.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Internship Programs</h3>
              <p className="text-gray-600">Structured programs designed to bridge skills gaps for graduates.</p>
            </div>
            <div className="border-t pt-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How to Apply</h3>
              <p className="text-gray-600 mb-4">Send CV and cover letter to:</p>
              <div className="flex items-center gap-3 text-blue-600">
                <Mail className="w-5 h-5" />
                <a href="mailto:frontdesk@tatconsg.com" className="font-semibold hover:underline">frontdesk@tatconsg.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button onClick={() => setCurrentPage('contact')} className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );

  const PrivacyPage = () => (
    <section className="py-32 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-xl text-gray-600 mb-12">Last updated: January 26, 2026</p>
        <div className="bg-white rounded-2xl p-12 shadow-xl space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Commitment to Privacy</h2>
            </div>
            <p className="text-gray-600">TAT Consulting Group is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Information We Collect</h3>
            <p className="text-gray-600 mb-3">We collect information you provide when you:</p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-gray-600">Submit a contact form</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-gray-600">Apply for positions</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-gray-600">Request services</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">How We Use Information</h3>
            <p className="text-gray-600">We use information to respond to inquiries, provide services, and improve our website.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Security</h3>
            <p className="text-gray-600">We implement security measures to protect your information.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Us</h3>
            <p className="text-gray-600 mb-3">Questions about privacy? Contact us:</p>
            <div className="flex items-center gap-3 text-blue-600">
              <Mail className="w-5 h-5" />
              <a href="mailto:frontdesk@tatconsg.com" className="font-semibold hover:underline">frontdesk@tatconsg.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'services': return <ServicesPage />;
      case 'contact': return <ContactPage />;
      case 'jobs': return <JobsPage />;
      case 'privacy': return <PrivacyPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full z-50 bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl text-white">TAT</div>
              <span className="font-bold text-xl text-gray-800">Consulting Group</span>
            </button>
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button key={item.id} onClick={() => setCurrentPage(item.id)}
                  className={`font-medium ${currentPage === item.id ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                  {item.label}
                </button>
              ))}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="text-gray-800" /> : <Menu className="text-gray-800" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl p-6">
              {menuItems.map((item) => (
                <button key={item.id} onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                  className={`block w-full text-left py-3 font-medium ${currentPage === item.id ? 'text-blue-600' : 'text-gray-700'}`}>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      <main>{renderPage()}</main>
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">TAT</div>
                <span className="font-bold text-white">Consulting Group</span>
              </div>
              <p className="text-gray-400 mb-4">Empowering businesses across West Africa</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-blue-400"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="hover:text-blue-400"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">LIBERIA</h3>
              <p className="text-gray-400 text-sm">2nd Floor, Danny Horton Building</p>
              <p className="text-gray-400 text-sm">A-1254 Horton Avenue, Monrovia</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">SIERRA LEONE</h3>
              <p className="text-gray-400 text-sm mb-4">22 Wellington Street, Freetown</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>frontdesk@tatconsg.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 9am-6pm</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 TAT Consulting Group, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TATCGWebsite;