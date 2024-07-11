/* eslint-disable no-undef */
import './Styles/about.css'
import './Styles/contact.css'
import Social from './Components/Social'
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const REACT_APP_MY_SERVICE_ID = "service_nabtmcp"
  const REACT_APP_MY_TEMPLATE_ID = "template_5hhwfch"
  const REACT_APP_MY_PUBLIC_KEY = "V07nPluq-QhmfS8HU"

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true)
      emailjs
        .sendForm(
          REACT_APP_MY_SERVICE_ID,
          REACT_APP_MY_TEMPLATE_ID,
          form.current,
          { publicKey: REACT_APP_MY_PUBLIC_KEY }
        )
        .then(
          (response) => {
            console.log('SUCCESS!', response);
            setIsSubmitting(false)
            alert("Thank you for reaching out to me.");
          },
          (error) => {
            console.log('FAILED...', error.text);
            setIsSubmitting(false)
            alert("Something Went Wrong!")
          },
        );
    } else {
      setErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    const from_name = form.current.from_name.value.trim();
    const from_email = form.current.from_email.value.trim();

    if (!from_name) errors.name = 'Name is required!';
    if (!from_email || !/^\S+@\S+$/i.test(from_email)) errors.email = 'Invalid email address!';

    return errors;
  };

  return (
    <section id='contact-section' className=" section footer about pt-24 pb-6 flex flex-col justify-between items-center">
      <motion.h1 initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0, transition: { duration: .4 } }} className="about-h1 text-5xl font-bold text-center">Contact Me</motion.h1>
      <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0, transition: { duration: .4 } }} className="dark:bg-green-600 bg-[#1E90FF] h-1 w-12 border-none mt-6 mb-10 rounded-lg"></motion.div>
      <motion.div initial={{ opacity: 0, scale: .4 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: .4 }} className="form-container">
        <form className="form" ref={form} onSubmit={sendEmail}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="from_name" className='roboto-regular' />
            {errors.name && <div className="error bg-red-200 dark:bg-red-700 text-center w-full px-4 py-2 border border-red-700 dark:border-red-900 rounded-lg mt-2"><span className='text-lg text-red-600 dark:text-red-200 font-bold roboto-regular-italic'>{errors.name}</span></div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="from_email" className='roboto-regular' />
            {errors.email && <div className="error bg-red-200 dark:bg-red-700 text-center w-full px-4 py-2 border border-red-700 dark:border-red-900 rounded-lg mt-2"><span className='text-red-700 dark:text-red-200 font-bold roboto-regular-italic'>{errors.email}</span></div>}
          </div>
          <div className="form-group">
            <label htmlFor="textarea">How Can We Help You?</label>
            <textarea id="textarea" name='message' rows="10" cols="50" className='roboto-regular' ></textarea>
          </div>
          <button className="form-submit-btn" type="submit">
            {isSubmitting ? <span className="spinner-border"></span> : <p>Submit</p>}
          </button>
        </form>
      </motion.div>
      <div className='footer-hr mt-16 mb-8 h-px w-4/5 dark:bg-slate-400 bg-slate-900 rounded-md opacity-30'></div>
      <Social />
    </section>
  )
}