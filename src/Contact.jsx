import React from "react";
import ContactForm from "./Components/client/ContactForm";
import ClientReveal from "./Components/client/ClientReveal";

export default function Contact({ dict }) {
  const t = dict.contact;

  return (
    <section
      id="contact-section"
      className="py-32 px-6 bg-white dark:bg-rich-black relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <ClientReveal
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-electric-indigo font-mono uppercase tracking-widest text-sm mb-4">
            {t.subtitle}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <span className="block mb-2 font-medium text-electric-indigo">
              {t.looking_for_opps}
            </span>
            {t.open_inbox}
          </p>
        </ClientReveal>

        <ContactForm />

        <div className="mt-24 pt-12 border-t border-black/5 dark:border-white/5 text-center text-gray-500 dark:text-gray-600 text-sm">
          <p>{dict.footer.credit}</p>
        </div>
      </div>
    </section>
  );
}
