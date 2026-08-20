"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { useForm } from "@formspree/react";
import useAnalytics from "../../Hooks/useAnalytics";
import ClientReveal from "./ClientReveal";

export default function ContactForm({ dict }) {
  const { trackEvent } = useAnalytics();
  const [formspreeState, formspreeSubmit] = useForm("mvgaanrg");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const t = dict?.contact || {};

  if (formspreeState.succeeded) {
    trackEvent("Contact", "Form Submit", "Success");
    return (
      <div className="text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-electric-indigo mb-6"
        >
          <Check size={64} />
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.success_title || "Message Sent!"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {t.success_message || "Thanks for reaching out. I'll get back to you soon."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 text-electric-indigo hover:text-indigo-600 dark:hover:text-white transition-colors underline"
        >
          {t.send_another || "Send another message"}
        </button>
      </div>
    );
  }

  return (
    <ClientReveal
      as="form"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
      onSubmit={formspreeSubmit}
      className="max-w-xl mx-auto space-y-8"
    >
      <div className="group relative">
        <input
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-3 px-0 text-gray-900 dark:text-white placeholder-transparent focus:border-electric-indigo dark:focus:border-electric-indigo focus:outline-none transition-colors peer"
          placeholder="Name"
        />
        <label
          htmlFor="name"
          className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-electric-indigo peer-focus:text-sm"
        >
          {t.form?.name || "Name"}
        </label>
      </div>

      <div className="group relative">
        <input
          type="email"
          name="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-3 px-0 text-gray-900 dark:text-white placeholder-transparent focus:border-electric-indigo dark:focus:border-electric-indigo focus:outline-none transition-colors peer"
          placeholder="Email"
        />
        <label
          htmlFor="email"
          className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-electric-indigo peer-focus:text-sm"
        >
          {t.form?.email || "Email"}
        </label>
      </div>

      <div className="group relative">
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-3 px-0 text-gray-900 dark:text-white placeholder-transparent focus:border-electric-indigo dark:focus:border-electric-indigo focus:outline-none transition-colors peer resize-none"
          placeholder="Message"
        />
        <label
          htmlFor="message"
          className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-electric-indigo peer-focus:text-sm"
        >
          {t.form?.message || "Message"}
        </label>
      </div>

      <div className="flex justify-center pt-8">
        <button
          type="submit"
          disabled={formspreeState.submitting}
          className="px-10 py-4 rounded-full border border-electric-indigo text-electric-indigo hover:bg-electric-indigo hover:text-white transition-all duration-300 text-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]"
        >
          {formspreeState.submitting
            ? t.form?.sending || "Sending..."
            : t.form?.send_btn || "Send Message"}
          {!formspreeState.submitting && <Send size={18} />}
        </button>
      </div>

      {formspreeState.errors && (
        <div className="text-red-500 text-center mt-4 flex items-center justify-center gap-2">
          <AlertCircle size={16} />
          <span>{t.form?.error || "Something went wrong. Please try again."}</span>
        </div>
      )}
    </ClientReveal>
  );
}
