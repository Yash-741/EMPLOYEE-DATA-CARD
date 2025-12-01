import Link from 'next/link';
import ParticleBackground from '@/components/ParticleBackground';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gold-50 overflow-hidden">
      <ParticleBackground className="opacity-50" />

      {/* Hero Section */}
      <section className="edc-container py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto fade-in-up">
          <div className="edc-emblem mx-auto mb-6 hover-lift" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
            EDC
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-animated pb-2">
            Employee Data Card
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-1">
            A revolutionary digital identity system designed to simplify and secure the hiring
            process through verified employee credentials and blockchain technology.
          </p>
          <div className="flex gap-4 justify-center flex-wrap fade-in-up stagger-2">
            <Link href="/dashboard" className="edc-button edc-button-primary text-lg px-8 py-3 button-press glow">
              Get Started
            </Link>
            <Link href="#features" className="edc-button edc-button-secondary text-lg px-8 py-3 button-press">
              Learn More
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-blue-100 fade-in-up stagger-3">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                <AnimatedCounter end={10000} suffix="+" />
              </div>
              <div className="text-sm text-gray-500 font-medium">Verified Employees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gold-600" style={{ color: 'var(--edc-gold-dark)' }}>
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-sm text-gray-500 font-medium">Partner Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                <AnimatedCounter end={99} suffix="%" />
              </div>
              <div className="text-sm text-gray-500 font-medium">Verification Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <div className="text-sm text-gray-500 font-medium">Secure Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="edc-section relative z-10">
        <div className="edc-container">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: 'var(--edc-primary)' }}>
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Credentials",
                desc: "Store and verify work experience, education, salary history, and performance with authenticated employer records.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                gradient: "linear-gradient(135deg, var(--edc-primary), var(--edc-primary-light))"
              },
              {
                title: "Blockchain Verified",
                desc: "Immutable records stored on blockchain ensure data integrity and prevent tampering or fraud.",
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                gradient: "linear-gradient(135deg, var(--edc-gold-dark), var(--edc-gold))"
              },
              {
                title: "EPF Integration",
                desc: "Seamlessly integrate with EPFO to automatically fetch and verify your provident fund details.",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
                gradient: "linear-gradient(135deg, var(--edc-success), #27ae60)"
              },
              {
                title: "Digital ID Card",
                desc: "Automatically generated EDC card with unique number, QR code, and government-style authentication.",
                icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
                gradient: "linear-gradient(135deg, var(--edc-info), #3498db)"
              },
              {
                title: "Background Verification",
                desc: "Comprehensive background checks including employment history and criminal record verification.",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                gradient: "linear-gradient(135deg, #e74c3c, var(--edc-error))"
              },
              {
                title: "Secure & Private",
                desc: "Advanced encryption and privacy controls ensure your data remains secure and only accessible to authorized parties.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                gradient: "linear-gradient(135deg, #f39c12, var(--edc-warning))"
              }
            ].map((feature, index) => (
              <div key={index} className="edc-glass-card text-center p-8 rounded-2xl hover:bg-white/40 transition-colors hover-lift group">
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300"
                  style={{ background: feature.gradient }}
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="edc-section animated-gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
        <div className="edc-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Why Employee Data Card?</h2>
            <p className="text-xl mb-12 opacity-90">
              Transform the hiring process with instant verification, reduced fraud, and complete
              transparency.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="edc-glass-surface bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">👨‍💼</span> For Employees
                </h3>
                <ul className="space-y-4">
                  {[
                    "Single source of truth for your career history",
                    "Faster hiring process with verified credentials",
                    "Complete control over your data privacy",
                    "Portable career record across companies"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="bg-green-400/20 p-1 rounded-full text-green-300">✓</span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="edc-glass-surface bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🏢</span> For Employers
                </h3>
                <ul className="space-y-4">
                  {[
                    "Instant verification of candidate credentials",
                    "Reduce fraud and fake documents",
                    "Save time and resources on background checks",
                    "Make informed hiring decisions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="bg-yellow-400/20 p-1 rounded-full text-yellow-300">✓</span>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="edc-section relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50 -z-10"></div>
        <div className="edc-container text-center">
          <div className="max-w-3xl mx-auto edc-glass-card rounded-3xl p-12 shadow-xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-100 rounded-full blur-3xl opacity-50 -ml-32 -mb-32"></div>

            <h2 className="text-4xl font-bold mb-6 relative z-10" style={{ color: 'var(--edc-primary)' }}>
              Get Your Employee Data Card Today
            </h2>
            <p className="text-xl text-gray-600 mb-10 relative z-10">
              Join the future of verified employment credentials. Create your EDC in minutes and
              experience the difference.
            </p>
            <Link href="/login" className="edc-button edc-button-gold text-lg px-10 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all relative z-10 inline-block">
              Create Your EDC →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="edc-container text-center relative z-10">
          <div className="edc-emblem mx-auto mb-6 glow" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
            EDC
          </div>
          <p className="text-gray-400 mb-6 text-lg">
            Employee Data Card - Digital Identity System
          </p>
          <div className="flex justify-center gap-6 mb-8">
            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((link) => (
              <a key={link} href="#" className="text-gray-500 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            © 2024 Employee Data Card. Research Prototype. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
