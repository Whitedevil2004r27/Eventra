
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Calendar, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/', icon: Calendar },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Bookings', href: '/bookings', icon: Users },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Whitedevil2004r27', icon: Github },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ravi-kumar-j-b29467276', icon: Linkedin },
    { name: 'mail', href: 'mailto:ravikumarofficial227@gmail.com', icon: Twitter },
  ];

  return (
    <footer className="bg-gradient-to-t from-slate-900 to-slate-800 text-white py-16 px-4 mt-24 border-t border-slate-700/50 glass-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">About Eventra</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Eventra is your all-in-one event discovery and booking solution. 
              Discover amazing events, book tickets seamlessly, and create unforgettable experiences 
              with our cutting-edge platform.
            </p>
            <div className="flex items-center gap-2 text-purple-400">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">Trusted by 50K+ users worldwide</span>
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-3 text-slate-300 hover:text-purple-400 transition-all duration-300 hover:translate-x-2 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-lg">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:support@eventra.app"
                className="flex items-center gap-3 text-slate-300 hover:text-purple-400 transition-all duration-300 hover:scale-105 group"
              >
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-lg">support@eventra.app</span>
              </a>
              
              <div className="pt-4">
                <p className="text-slate-400 mb-4">Follow us on:</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-purple-400 hover:text-white border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-slate-700/50 text-center"
        >
          <p className="text-slate-400 text-lg">
            © {currentYear} Eventra. All rights reserved. Built with ❤️ for amazing events.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
