"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Check for success parameter and pre-filled message in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('success') === 'true') {
        setSubmitStatus("success");
        setFormData({ name: "", surname: "", email: "", message: "" });
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (urlParams.get('message')) {
        // Pre-fill message from URL parameter
        const preFilledMessage = decodeURIComponent(urlParams.get('message') || '');
        setFormData(prev => ({ ...prev, message: preFilledMessage }));
        // Clean up URL but keep the path
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, []);

  const handleFieldChange = (field: string) => (value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Client-side validation
    if (!formData.name.trim() || !formData.surname.trim()) {
      e.preventDefault();
      setSubmitStatus("error");
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      e.preventDefault();
      setSubmitStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!formData.message.trim()) {
      e.preventDefault();
      setSubmitStatus("error");
      setErrorMessage("Please enter a message.");
      return;
    }

    if (formData.message.length > 5000) {
      e.preventDefault();
      setSubmitStatus("error");
      setErrorMessage("Message is too long. Please keep it under 5000 characters.");
      return;
    }

    // If validation passes, let the form submit naturally to FormSubmit
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="min-h-full">
      <div className="p-6 md:p-10 pb-20">
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] uppercase tracking-[0.12em] text-black/60 mb-8">
          <a href="/" className="hover:text-black transition-colors">
            HOME
          </a>
          <span className="mx-2">&gt;</span>
          <span className="text-black font-medium">CONTACT</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Get In Touch</h1>
          <p className="text-lg text-black/70 max-w-2xl">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl">
          <form 
            action="https://formsubmit.co/shivambarkule.xyz@gmail.com" 
            method="POST" 
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            {/* Name and Surname Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black/80 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name")(e.target.value)}
                  placeholder="Your first name"
                  name="first_name"
                  required
                  className="w-full px-4 py-3 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black/40 focus:border-black/40 transition-colors bg-white text-black placeholder-black/50"
                />
              </div>
              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-black/80 mb-2">
                  Surname
                </label>
                <input
                  id="surname"
                  type="text"
                  value={formData.surname}
                  onChange={(e) => handleFieldChange("surname")(e.target.value)}
                  placeholder="Your last name"
                  name="last_name"
                  required
                  className="w-full px-4 py-3 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black/40 focus:border-black/40 transition-colors bg-white text-black placeholder-black/50"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black/80 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange("email")(e.target.value)}
                placeholder="your.email@example.com"
                name="email"
                required
                className="w-full px-4 py-3 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black/40 focus:border-black/40 transition-colors bg-white text-black placeholder-black/50"
              />
            </div>

            {/* Message */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="message" className="block text-sm font-medium text-black/80">
                  Message
                </label>
                <span className={`text-xs ${formData.message.length > 4500 ? 'text-red-600' : 'text-black/50'}`}>
                  {formData.message.length}/5000
                </span>
              </div>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleFieldChange("message")(e.target.value)}
                placeholder="Tell me about your project or just say hello..."
                name="message"
                rows={6}
                required
                maxLength={5000}
                className="w-full px-4 py-3 border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-black/40 focus:border-black/40 transition-colors bg-white text-black placeholder-black/50 resize-vertical"
              />
            </div>

            {/* Hidden FormSubmit Configuration Fields */}
            <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value={typeof window !== 'undefined' ? `${window.location.origin}/contact?success=true` : ''} />

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-black text-white rounded-md hover:bg-black/80 focus:outline-none focus:ring-1 focus:ring-black/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-sm">
                  Thank you for your message! I'll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">
                  {errorMessage || "Sorry, there was an error sending your message. Please try again."}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Alternative Contact Info */}
        <div className="mt-16 pt-8 border-t border-black/10">
          <h2 className="text-lg font-medium mb-4">Other Ways to Connect</h2>
          <div className="space-y-2 text-sm text-black/70">
            <p>You can also find me on social media:</p>
            <div className="flex flex-wrap gap-4 mt-3">
              <a
                href="https://www.linkedin.com/in/shivambarkule"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 select-none"
              >
                <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1">[</span>
                <span className="underline-offset-4 group-hover:underline">LinkedIn</span>
                <span className="text-black/70 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">↗</span>
                <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">]</span>
              </a>
              <a
                href="https://www.instagram.com/eclipsarielle"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 select-none"
              >
                <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1">[</span>
                <span className="underline-offset-4 group-hover:underline">Instagram</span>
                <span className="text-black/70 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">↗</span>
                <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">]</span>
              </a>
              <a
                href="https://github.com/shivambarkule"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 select-none"
              >
                <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1">[</span>
                <span className="underline-offset-4 group-hover:underline">GitHub</span>
                <span className="text-black/70 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">↗</span>
                <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">]</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}