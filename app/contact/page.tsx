"use client";

import { useState } from "react";
import {
  Mail,
  Clock,
  Users,
  MessageSquare,
  Building2,
  Phone,
  Globe,
  ChevronRight,
  ChevronLeft,
  Check,
  MapPin,
} from "lucide-react";

// Step indicator component
function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="contact-step-indicator">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`step ${i + 1 <= currentStep ? "active" : ""} ${
            i + 1 < currentStep ? "completed" : ""
          }`}
        >
          <div className="step-circle">
            {i + 1 < currentStep ? (
              <Check size={14} strokeWidth={3} />
            ) : (
              i + 1
            )}
          </div>
          {i < totalSteps - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  );
}

// Contact Card Component
function ContactCard({
  icon,
  title,
  description,
  email,
  responseTime,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  email: string;
  responseTime: string;
}) {
  return (
    <div className="contact-card">
      <div className="contact-card-icon">{icon}</div>
      <h3 className="contact-card-title">{title}</h3>
      <p className="contact-card-desc">{description}</p>
      <div className="contact-card-email">
        <Mail size={14} />
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <div className="contact-card-response">
        <Clock size={12} />
        <span>{responseTime}</span>
      </div>
    </div>
  );
}

// Office Location Component
function OfficeCard({
  region,
  city,
  address,
}: {
  region: string;
  city: string;
  address: string;
}) {
  return (
    <div className="office-card">
      <div className="office-card-header">
        <Globe size={18} />
        <span className="office-region">{region}</span>
      </div>
      <p className="office-city">{city}</p>
      <p className="office-address">{address}</p>
    </div>
  );
}

export default function ContactPage() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    useCase: "",
    companySize: "",
    callVolume: "",
    message: "",
    contactMethod: "",
    bestTime: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const handleBack = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="max-w-7xl mx-auto px-6">
          <span className="section-eyebrow">Get in Touch</span>
          <h1 className="contact-hero-title">Let&apos;s Build Something Together</h1>
          <p className="contact-hero-subtitle">
            Get in touch with our team — we respond within hours, not days.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="contact-options-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="contact-cards-grid">
            <ContactCard
              icon={<MessageSquare size={24} />}
              title="Sales Inquiries"
              description="Talk to our sales team"
              email="sales@enlightlab.com"
              responseTime="Response within 4 hours"
            />
            <ContactCard
              icon={<Phone size={24} />}
              title="Technical Support"
              description="Get help with your implementation"
              email="support@enlightlab.com"
              responseTime="Response within 24 hours"
            />
            <ContactCard
              icon={<Users size={24} />}
              title="Partnerships"
              description="Explore partnership opportunities"
              email="partners@enlightlab.com"
              responseTime="Response within 48 hours"
            />
          </div>
        </div>
      </section>

      {/* Multi-Step Contact Form */}
      <section className="contact-form-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="contact-form-container">
            <div className="contact-form-header">
              <h2 className="contact-form-title">Send us a message</h2>
              <p className="contact-form-subtitle">
                Fill out the form below and we&apos;ll get back to you shortly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="contact-form-success">
                <div className="success-icon">
                  <Check size={32} />
                </div>
                <h3>Thank you for reaching out!</h3>
                <p>
                  We&apos;ve received your message and will get back to you within
                  the expected timeframe. Check your email for confirmation.
                </p>
              </div>
            ) : (
              <>
                <StepIndicator currentStep={formStep} totalSteps={3} />

                <form onSubmit={handleSubmit} className="contact-form">
                  {/* Step 1: Basic Info */}
                  <div className={`form-step ${formStep === 1 ? "active" : ""}`}>
                    <div className="form-step-header">
                      <span className="form-step-label">Step 1 of 3</span>
                      <h3 className="form-step-title">Basic Information</h3>
                    </div>

                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="fullName">Full Name *</label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Smith"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="workEmail">Work Email *</label>
                        <input
                          type="email"
                          id="workEmail"
                          name="workEmail"
                          value={formData.workEmail}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="companyName">Company Name *</label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Acme Corporation"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-primary-cta"
                        onClick={handleNext}
                      >
                        Continue
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Your Needs */}
                  <div className={`form-step ${formStep === 2 ? "active" : ""}`}>
                    <div className="form-step-header">
                      <span className="form-step-label">Step 2 of 3</span>
                      <h3 className="form-step-title">Your Needs</h3>
                    </div>

                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="useCase">Use Case *</label>
                        <select
                          id="useCase"
                          name="useCase"
                          value={formData.useCase}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a use case</option>
                          <option value="customer-support">Customer Support</option>
                          <option value="sales">Sales</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label htmlFor="companySize">Company Size *</label>
                        <select
                          id="companySize"
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select company size</option>
                          <option value="1-50">1-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-1000">201-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label htmlFor="callVolume">Monthly Call Volume *</label>
                        <select
                          id="callVolume"
                          name="callVolume"
                          value={formData.callVolume}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select call volume</option>
                          <option value="0-100">0 - 100 calls</option>
                          <option value="100-500">100 - 500 calls</option>
                          <option value="500-2000">500 - 2,000 calls</option>
                          <option value="2000-10000">2,000 - 10,000 calls</option>
                          <option value="10000+">10,000+ calls</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-secondary-form"
                        onClick={handleBack}
                      >
                        <ChevronLeft size={18} />
                        Back
                      </button>
                      <button
                        type="button"
                        className="btn-primary-cta"
                        onClick={handleNext}
                      >
                        Continue
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Message */}
                  <div className={`form-step ${formStep === 3 ? "active" : ""}`}>
                    <div className="form-step-header">
                      <span className="form-step-label">Step 3 of 3</span>
                      <h3 className="form-step-title">How can we help?</h3>
                    </div>

                    <div className="form-grid">
                      <div className="form-field form-field-full">
                        <label htmlFor="message">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your project, requirements, or questions..."
                          rows={5}
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="contactMethod">Preferred Contact Method *</label>
                        <select
                          id="contactMethod"
                          name="contactMethod"
                          value={formData.contactMethod}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select contact method</option>
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="video-call">Video Call</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label htmlFor="bestTime">Best Time to Reach You *</label>
                        <select
                          id="bestTime"
                          name="bestTime"
                          value={formData.bestTime}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select time preference</option>
                          <option value="morning">Morning (9AM - 12PM)</option>
                          <option value="afternoon">Afternoon (12PM - 5PM)</option>
                          <option value="evening">Evening (5PM - 8PM)</option>
                          <option value="anytime">Anytime</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-secondary-form"
                        onClick={handleBack}
                      >
                        <ChevronLeft size={18} />
                        Back
                      </button>
                      <button type="submit" className="btn-submit">
                        Send Message
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="office-locations-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Visit Us</span>
              <h2 className="section-title">Our Global Offices</h2>
            </div>
          </div>

          <div className="office-cards-grid">
            <OfficeCard
              region="Global HQ"
              city="San Francisco, CA"
              address="123 Market Street, Suite 500"
            />
            <OfficeCard
              region="EMEA"
              city="London, UK"
              address="45 Bishopsgate"
            />
            <OfficeCard
              region="APAC"
              city="Singapore"
              address="1 Raffles Place"
            />
          </div>
        </div>
      </section>

      {/* Response Commitment */}
      <section className="response-commitment-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="response-commitment-container">
            <div className="response-commitment-header">
              <Clock size={28} />
              <h2 className="response-commitment-title">Our Response Commitment</h2>
            </div>

            <div className="response-tiers">
              <div className="response-tier">
                <div className="response-tier-badge enterprise">Enterprise</div>
                <p className="response-tier-time">2-hour response</p>
              </div>
              <div className="response-tier">
                <div className="response-tier-badge standard">Standard</div>
                <p className="response-tier-time">4-hour response</p>
              </div>
              <div className="response-tier">
                <div className="response-tier-badge critical">Critical</div>
                <p className="response-tier-time">24/7 support</p>
                <p className="response-tier-note">For Enterprise customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="social-links-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="social-links-container">
            <p className="social-links-label">Connect with us</p>
            <div className="social-links-row">
              <a
                href="https://www.linkedin.com/company/enlightlab/posts/?feedView=all"
                
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Globe"
              >
                <Globe size={22} />
                <span>Globe</span>
              </a>
              
              <a
                href="https://youtube.com/@enlightlab"
                
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Globe"
              >
                <Globe size={22} />
                <span>Globe</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Contact Page Layout */
        .contact-page {
          min-height: 100vh;
          background: var(--bg-page);
        }

        .max-w-7xl {
          max-width: 80rem;
          margin: 0 auto;
        }

        .px-6 {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        /* Hero Section */
        .contact-hero {
          padding: 5rem 0 4rem;
          text-align: center;
          background: linear-gradient(180deg, var(--bg-page) 0%, var(--bg-section-alt) 100%);
        }

        .contact-hero-title {
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.1;
          color: var(--text-heading);
          margin-bottom: 1.25rem;
        }

        .contact-hero-subtitle {
          font-size: 1.125rem;
          color: var(--text-body);
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Section Eyebrow */
        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--blue);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }

        .section-eyebrow::before {
          content: "";
          display: inline-block;
          width: 18px;
          height: 2px;
          background: var(--blue);
          border-radius: 2px;
        }

        /* Contact Options */
        .contact-options-section {
          padding: 3rem 0 4rem;
        }

        .contact-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .contact-card {
          background: var(--bg-card);
          border: 1.5px solid var(--border-card);
          border-radius: var(--r-xl);
          padding: 2rem;
          text-align: center;
          box-shadow: var(--shadow-card);
          transition: all var(--dur-base) var(--ease-out);
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-card-hover);
          border-color: var(--blue-pale2);
        }

        .contact-card-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--r-lg);
          background: var(--blue-pale);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          color: var(--blue);
        }

        .contact-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 0.5rem;
        }

        .contact-card-desc {
          font-size: 0.9375rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }

        .contact-card-email {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9375rem;
          color: var(--blue);
          margin-bottom: 0.75rem;
        }

        .contact-card-email a {
          color: var(--blue);
          text-decoration: none;
          font-weight: 500;
        }

        .contact-card-email a:hover {
          text-decoration: underline;
        }

        .contact-card-response {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          color: var(--text-faint);
        }

        /* Contact Form Section */
        .contact-form-section {
          padding: 4rem 0;
          background: var(--bg-section-alt);
        }

        .contact-form-container {
          max-width: 720px;
          margin: 0 auto;
          background: var(--bg-card);
          border: 1.5px solid var(--border-card);
          border-radius: var(--r-xl);
          padding: 2.5rem;
          box-shadow: var(--shadow-card);
        }

        .contact-form-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .contact-form-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 0.5rem;
        }

        .contact-form-subtitle {
          font-size: 0.9375rem;
          color: var(--text-muted);
        }

        /* Step Indicator */
        .contact-step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .step {
          display: flex;
          align-items: center;
        }

        .step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          background: var(--bg-section-alt);
          color: var(--text-faint);
          border: 2px solid var(--border-card);
          transition: all var(--dur-base);
        }

        .step.active .step-circle {
          background: var(--blue);
          color: white;
          border-color: var(--blue);
        }

        .step.completed .step-circle {
          background: var(--live-text);
          color: white;
          border-color: var(--live-text);
        }

        .step-line {
          width: 60px;
          height: 2px;
          background: var(--border-card);
          margin: 0 0.5rem;
        }

        .step.completed + .step .step-line,
        .step.completed .step-line {
          background: var(--live-text);
        }

        /* Form Styles */
        .contact-form {
          width: 100%;
        }

        .form-step {
          display: none;
        }

        .form-step.active {
          display: block;
        }

        .form-step-header {
          margin-bottom: 1.5rem;
        }

        .form-step-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--blue);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .form-step-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-field-full {
          grid-column: 1 / -1;
        }

        .form-field label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-body);
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          padding: 0.75rem 1rem;
          border: 1.5px solid var(--border-card);
          border-radius: var(--r-md);
          font-size: 0.9375rem;
          color: var(--text-body);
          background: var(--bg-page);
          transition: border-color var(--dur-fast);
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--blue);
        }

        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: var(--text-faint);
        }

        .form-field textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-card);
        }

        /* Button Styles */
        .btn-primary-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: var(--blue);
          color: white;
          border-radius: var(--btn-radius);
          font-size: 0.9375rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background var(--dur-fast);
        }

        .btn-primary-cta:hover {
          background: var(--blue-hover);
        }

        .btn-secondary-form {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: transparent;
          color: var(--text-body);
          border: 1.5px solid var(--border-card);
          border-radius: var(--btn-radius);
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--dur-fast);
        }

        .btn-secondary-form:hover {
          background: var(--bg-section-alt);
          border-color: var(--border-strong);
        }

        .btn-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          background: var(--blue);
          color: white;
          border-radius: var(--btn-radius);
          font-size: 0.9375rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background var(--dur-fast);
        }

        .btn-submit:hover {
          background: var(--blue-hover);
        }

        /* Success State */
        .contact-form-success {
          text-align: center;
          padding: 3rem 2rem;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--live-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--live-text);
        }

        .contact-form-success h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 0.75rem;
        }

        .contact-form-success p {
          font-size: 0.9375rem;
          color: var(--text-muted);
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Section Header */
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
        }

        .section-title {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--text-heading);
        }

        /* Office Locations */
        .office-locations-section {
          padding: 5rem 0;
        }

        .office-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .office-card {
          background: var(--bg-card);
          border: 1.5px solid var(--border-card);
          border-radius: var(--r-lg);
          padding: 1.75rem;
          box-shadow: var(--shadow-card);
        }

        .office-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: var(--blue);
        }

        .office-region {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .office-city {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 0.375rem;
        }

        .office-address {
          font-size: 0.9375rem;
          color: var(--text-muted);
        }

        /* Response Commitment */
        .response-commitment-section {
          padding: 4rem 0;
          background: var(--bg-section-alt);
        }

        .response-commitment-container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .response-commitment-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          color: var(--blue);
        }

        .response-commitment-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .response-tiers {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .response-tier {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .response-tier-badge {
          padding: 0.375rem 1rem;
          border-radius: var(--r-full);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .response-tier-badge.enterprise {
          background: var(--blue-pale);
          color: var(--blue);
          border: 1px solid var(--blue-pale2);
        }

        .response-tier-badge.standard {
          background: var(--live-bg);
          color: var(--live-text);
          border: 1px solid var(--live-border);
        }

        .response-tier-badge.critical {
          background: rgba(220, 38, 38, 0.1);
          color: #dc2626;
          border: 1px solid rgba(220, 38, 38, 0.25);
        }

        .response-tier-time {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .response-tier-note {
          font-size: 0.75rem;
          color: var(--text-faint);
        }

        /* Social Links */
        .social-links-section {
          padding: 3rem 0 5rem;
        }

        .social-links-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .social-links-label {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .social-links-row {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: var(--bg-card);
          border: 1.5px solid var(--border-card);
          border-radius: var(--r-lg);
          color: var(--text-body);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all var(--dur-fast);
        }

        .social-link:hover {
          border-color: var(--blue);
          color: var(--blue);
          box-shadow: var(--shadow-card);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .contact-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .office-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .contact-hero {
            padding: 3.5rem 0 3rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-field-full {
            grid-column: 1;
          }

          .response-tiers {
            flex-direction: column;
            gap: 1.5rem;
          }

          .social-links-row {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .contact-cards-grid {
            grid-template-columns: 1fr;
          }

          .office-cards-grid {
            grid-template-columns: 1fr;
          }

          .contact-form-container {
            padding: 1.5rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .form-actions {
            flex-direction: column;
          }

          .form-actions button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </main>
  );
}