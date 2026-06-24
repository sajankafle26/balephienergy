"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

interface SiteSettings {
  phone: string;
  email: string;
  headOffice: string;
  siteOffice: string;
}

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="pt-8 bg-slate-50 pb-16 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12">
            Contact <span className="text-primary">Us</span>
          </h1>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-heading font-bold text-dark mb-4">Head Office</h2>
                  <div className="space-y-3">
                    {settings?.headOffice && (
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-primary mt-1" />
                        <span className="text-gray-600 text-sm">{settings.headOffice}</span>
                      </div>
                    )}
                    {settings?.phone && (
                      <div className="flex items-start gap-3">
                        <FaPhone className="text-primary mt-1" />
                        <a href={`tel:${settings.phone}`} className="text-gray-600 text-sm hover:text-primary">{settings.phone}</a>
                      </div>
                    )}
                    {settings?.email && (
                      <div className="flex items-start gap-3">
                        <FaEnvelope className="text-primary mt-1" />
                        <a href={`mailto:${settings.email}`} className="text-gray-600 text-sm hover:text-primary">{settings.email}</a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-heading font-bold text-dark mb-4">Site Office</h2>
                  {settings?.siteOffice && (
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-primary mt-1" />
                      <span className="text-gray-600 text-sm">{settings.siteOffice}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-heading font-bold text-dark mb-4">Send us a Message</h2>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-4xl mb-4">✓</div>
                    <h3 className="text-lg font-heading font-bold text-dark">Message Sent!</h3>
                    <p className="text-gray-600 mt-2">We&apos;ll get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-1">Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primaryLight transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}