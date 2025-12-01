import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gold-50">
      {/* Hero Section */}
      <section className="edc-container py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="edc-emblem mx-auto mb-6" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
            EDC
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--edc-primary)' }}>
            Employee Data Card
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A revolutionary digital identity system designed to simplify and secure the hiring
            process through verified employee credentials and blockchain technology.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/dashboard" className="edc-button edc-button-primary text-lg">
              Get Started
            </Link>
            <Link href="#features" className="edc-button edc-button-secondary text-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="edc-section bg-white">
        <div className="edc-container">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--edc-primary)' }}>
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--edc-primary), var(--edc-primary-light))' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Credentials</h3>
              <p className="text-gray-600">
                Store and verify work experience, education, salary history, and performance with
                authenticated employer records.
              </p>
            </div>

            <div className="text-center p-6">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--edc-gold-dark), var(--edc-gold))' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Blockchain Verified</h3>
              <p className="text-gray-600">
                Immutable records stored on blockchain ensure data integrity and prevent tampering
                or fraud.
              </p>
            </div>

            <div className="text-center p-6">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--edc-success), #27ae60)' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">EPF Integration</h3>
              <p className="text-gray-600">
                Seamlessly integrate with EPFO to automatically fetch and verify your provident fund
                details.
              </p>
            </div>

            <div className="text-center p-6">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--edc-info), #3498db)' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital ID Card</h3>
              <p className="text-gray-600">
                Automatically generated EDC card with unique number, QR code, and government-style
                authentication.
              </p>
            </div>

            <div className="text-center p-6">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #e74c3c, var(--edc-error))' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Background Verification</h3>
              <p className="text-gray-600">
                Comprehensive background checks including employment history and criminal record
                verification.
              </p>
            </div>

            <div className="text-center p-6">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f39c12, var(--edc-warning))' }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Advanced encryption and privacy controls ensure your data remains secure and only
                accessible to authorized parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="edc-section bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="edc-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Why Employee Data Card?</h2>
            <p className="text-xl mb-12 opacity-90">
              Transform the hiring process with instant verification, reduced fraud, and complete
              transparency.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-3">For Employees</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Single source of truth for your career history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Faster hiring process with verified credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Complete control over your data privacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Portable career record across companies</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-3">For Employers</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Instant verification of candidate credentials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Reduce fraud and fake documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Save time and resources on background checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300 mt-1">✓</span>
                    <span>Make informed hiring decisions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="edc-section">
        <div className="edc-container text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--edc-primary)' }}>
            Get Your Employee Data Card Today
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the future of verified employment credentials. Create your EDC in minutes and
            experience the difference.
          </p>
          <Link href="/dashboard" className="edc-button edc-button-gold text-lg">
            Create  Your EDC →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="edc-container text-center">
          <div className="edc-emblem mx-auto mb-4" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
            EDC
          </div>
          <p className="text-gray-400 mb-4">
            Employee Data Card - Digital Identity System
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Employee Data Card. Research Prototype. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
