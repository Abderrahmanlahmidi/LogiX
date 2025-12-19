import React from 'react';
import { 
  Truck, 
  Target, 
  Users, 
  Shield, 
  Clock, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  CheckCircle,
  BarChart3,
  Fuel,
  Navigation,
  User,
  Briefcase,
  Heart,
  TrendingUp
} from 'lucide-react';

export default function About() {
  const teamMembers = [
    { name: "Alex Johnson", role: "CEO & Founder", icon: Briefcase, experience: "15+ years in logistics" },
    { name: "Sarah Williams", role: "Operations Director", icon: User, experience: "12+ years in fleet management" },
    { name: "Mike Chen", role: "Technology Lead", icon: BarChart3, experience: "10+ years in tech solutions" },
    { name: "Maria Garcia", role: "Customer Success", icon: Heart, experience: "8+ years in client relations" },
  ];

  const services = [
    { icon: Truck, title: "Fleet Management", description: "Real-time tracking and optimization of your entire fleet" },
    { icon: Shield, title: "Maintenance Scheduling", description: "Predictive maintenance to reduce downtime" },
    { icon: Fuel, title: "Fuel Management", description: "Optimize fuel consumption and reduce costs" },
    { icon: Navigation, title: "Route Optimization", description: "Smart routing to save time and resources" },
    { icon: Users, title: "Driver Management", description: "Comprehensive driver performance tracking" },
    { icon: Award, title: "Compliance Reporting", description: "Automated regulatory compliance documentation" },
  ];

  return (
    <div className="min-h-screen bg-bg pt-16">

      {/* Mission Section */}
      <section id="mission" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg border-b border-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-light mb-4">Our Mission & Vision</h2>
            <p className="text-text max-w-3xl mx-auto">
              Committed to revolutionizing fleet management through innovative solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-accent" />
                <h3 className="text-2xl font-semibold text-text-light">Our Mission</h3>
              </div>
              <p className="text-text mb-6">
                To empower businesses with intelligent fleet management solutions that 
                optimize operations, reduce costs, and enhance safety.
              </p>
              <ul className="space-y-3">
                {['Reduce operational costs', 'Increase fleet utilization', 'Achieve maximum uptime', 'Ensure safety compliance'].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-text">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="h-8 w-8 text-accent" />
                <h3 className="text-2xl font-semibold text-text-light">Our Vision</h3>
              </div>
              <p className="text-text">
                To become the global leader in fleet management technology, creating 
                a connected ecosystem for efficient and sustainable transportation.
              </p>
              <div className="mt-8 p-6 border border-secondary rounded-lg">
                <h4 className="text-lg font-semibold text-text-light mb-3">Core Values</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['Innovation', 'Integrity', 'Excellence', 'Sustainability'].map((value, index) => (
                    <div key={index} className="text-center p-3 border border-secondary rounded">
                      <div className="font-medium text-text-light">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg border-b border-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-light mb-4">Our Services</h2>
            <p className="text-text max-w-3xl mx-auto">
              Comprehensive solutions for modern fleet management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="p-6 border border-secondary rounded-lg hover:border-accent transition-colors">
                  <div className="p-3 border border-accent/30 rounded-lg w-fit mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-light mb-2">{service.title}</h3>
                  <p className="text-text">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-bg border-b border-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-light mb-4">Our Team</h2>
            <p className="text-text max-w-3xl mx-auto">
              Experts in logistics, technology, and customer service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => {
              const Icon = member.icon;
              return (
                <div key={index} className="text-center p-6 border border-secondary rounded-lg">
                  <div className="inline-flex items-center justify-center p-4 mb-4 border border-accent/30 rounded-full">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-light mb-1">{member.name}</h3>
                  <div className="text-accent mb-3">{member.role}</div>
                  <div className="text-sm text-text/80">{member.experience}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-light mb-4">Contact Us</h2>
            <p className="text-text max-w-3xl mx-auto">
              Ready to optimize your fleet operations? Get in touch with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-secondary rounded-lg">
              <div className="p-3 border border-accent/30 rounded-full w-fit mx-auto mb-4">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text-light mb-2">Call Us</h3>
              <p className="text-text">+1 (555) 123-4567</p>
              <p className="text-sm text-text/60 mt-2">Mon-Fri, 9am-6pm EST</p>
            </div>

            <div className="text-center p-6 border border-secondary rounded-lg">
              <div className="p-3 border border-accent/30 rounded-full w-fit mx-auto mb-4">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text-light mb-2">Email Us</h3>
              <p className="text-text">info@logix.com</p>
              <p className="text-sm text-text/60 mt-2">Response within 24 hours</p>
            </div>

            <div className="text-center p-6 border border-secondary rounded-lg">
              <div className="p-3 border border-accent/30 rounded-full w-fit mx-auto mb-4">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-text-light mb-2">Visit Us</h3>
              <p className="text-text">123 Tech Street</p>
              <p className="text-text">San Francisco, CA 94107</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-lg border border-accent hover:bg-accent/90 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}