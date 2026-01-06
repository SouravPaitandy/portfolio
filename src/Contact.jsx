import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { useForm } from "@formspree/react";
import useAnalytics from "./Hooks/useAnalytics";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { trackEvent } = useAnalytics();
  const [formspreeState, formspreeSubmit] = useForm("mvgaanrg");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const { t } = useTranslation();

  if (formspreeState.succeeded) {
    trackEvent("Contact", "Form Submit", "Success");
    return (
      <section
        id="contact-section"
        className="py-32 px-6 bg-white dark:bg-rich-black text-center flex flex-col items-center justify-center transition-colors duration-300"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-electric-indigo mb-6"
        >
          <Check size={64} />
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t("contact.success_title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {t("contact.success_message")}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 text-electric-indigo hover:text-indigo-600 dark:hover:text-white transition-colors underline"
        >
          {t("contact.send_another")}
        </button>
      </section>
    );
  }

  return (
    <section
      id="contact-section"
      className="py-32 px-6 bg-white dark:bg-rich-black relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-electric-indigo font-mono uppercase tracking-widest text-sm mb-4">
            {t("contact.subtitle")}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <span className="block mb-2 font-medium text-electric-indigo">
              {t("contact.looking_for_opps")}
            </span>
            {t("contact.open_inbox")}
          </p>
        </motion.div>

        <motion.form
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
              {t("contact.form.name")}
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
              {t("contact.form.email")}
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
              {t("contact.form.message")}
            </label>
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={formspreeState.submitting}
              className="px-10 py-4 rounded-full border border-electric-indigo text-electric-indigo hover:bg-electric-indigo hover:text-white transition-all duration-300 text-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]"
            >
              {formspreeState.submitting
                ? t("contact.form.sending")
                : t("contact.form.send_btn")}
              {!formspreeState.submitting && <Send size={18} />}
            </button>
          </div>

          {formspreeState.errors && (
            <div className="text-red-500 text-center mt-4 flex items-center justify-center gap-2">
              <AlertCircle size={16} />
              <span>{t("contact.form.error")}</span>
            </div>
          )}
        </motion.form>

        <div className="mt-24 pt-12 border-t border-black/5 dark:border-white/5 text-center text-gray-500 dark:text-gray-600 text-sm">
          <p>{t("footer.credit")}</p>
        </div>
      </div>
    </section>
  );
}
