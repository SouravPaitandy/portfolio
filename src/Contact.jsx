import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, Check, MessageSquare, Mail, User } from 'lucide-react';
import { z } from 'zod';
import Social from './Components/Social';
// Remove EmailJS import
// import emailjs from '@emailjs/browser';
// Add Formspree import
import { useForm } from '@formspree/react';

// Enhanced Zod schema with more detailed validations
const ContactSchema = z.object({
  from_name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s'.-]+$/, { message: "Name contains invalid characters" }),
  from_email: z.string()
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email is too long" }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message cannot exceed 500 characters" })
});

export default function Contact() {
  // Initialize formspree with your form ID
  const [formspreeState, formspreeSubmit] = useForm("mvgaanrg"); // Replace with your Formspree form ID
  
  const [formState, setFormState] = useState({
    status: 'idle',
    errors: {},
    message: '',
    characterCount: {
      message: 0
    }
  });

  const form = useRef(null);

  // Improved validation with character counting
  const validateForm = useCallback(() => {
    if (!form.current) return { errors: {}, characterCount: { message: 0 } };

    const formData = {
      from_name: form.current.from_name.value.trim(),
      from_email: form.current.from_email.value.trim(),
      message: form.current.message.value.trim()
    };

    try {
      ContactSchema.parse(formData);
      return { 
        errors: {}, 
        characterCount: { 
          message: formData.message.length 
        }
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          errors: error.flatten().fieldErrors,
          characterCount: { 
            message: formData.message.length 
          }
        };
      }
      return { errors: {}, characterCount: { message: 0 } };
    }
  }, []);

  // Update sendEmail function to use Formspree
  const sendEmail = async (e) => {
    e.preventDefault();
    
    // Validate and get character count (keep this part)
    const validation = validateForm();
    setFormState(prev => ({ 
      ...prev, 
      status: 'submitting', 
      errors: validation.errors,
      characterCount: validation.characterCount
    }));

    // Early return if validation fails (keep this part)
    if (Object.keys(validation.errors).length > 0) {
      setFormState(prev => ({ 
        ...prev, 
        status: 'idle'
      }));
      return;
    }

    // Replace EmailJS with Formspree submission
    const formData = {
      name: form.current.from_name.value,
      email: form.current.from_email.value,
      message: form.current.message.value
    };
    
    await formspreeSubmit(formData);
    
    // Handle response based on Formspree state
    if (formspreeState.succeeded) {
      // Success handling
      setFormState({
        status: 'success',
        errors: {},
        message: "Message sent successfully! I'll get back to you soon.",
        characterCount: { message: 0 }
      });

      // Reset form
      form.current.reset();

      // Auto-clear success message
      setTimeout(() => {
        setFormState(prev => ({ ...prev, status: 'idle', message: '' }));
      }, 3000);
    } else if (formspreeState.errors) {
      // Error handling
      setFormState({
        status: 'error',
        errors: {},
        message: `Submission failed. Please check your connection and try again.`,
        characterCount: { message: 0 }
      });

      // Auto-clear error message
      setTimeout(() => {
        setFormState(prev => ({ ...prev, status: 'idle', message: '' }));
      }, 3000);
    }
  };

  function useParallax(ref, rate = 0.03) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const handleMove = (e) => {
        if (ref.current) {
          const { left, top, width, height } = ref.current.getBoundingClientRect();
          const x = (e.clientX - (left + width / 2)) * rate;
          const y = (e.clientY - (top + height / 2)) * rate;
          setOffset({ x, y });
        }
      };
  
      const debouncedMove = debounce(handleMove, 10);
      window.addEventListener('mousemove', debouncedMove);
      return () => window.removeEventListener('mousemove', debouncedMove);
    }, [ref, rate]);
  
    return offset;
  }
  
  function debounce(func, wait) {
    let timeout = null;
    return function executedFunction(...args) {
      const later = () => {
        if (timeout) clearTimeout(timeout);
        func(...args);
      };
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const contactRef = useRef(null);
  // console.log(contactRef)
  const { x: parallaxX, y: parallaxY } = useParallax(contactRef);

  // Dynamic input field rendering with advanced feedback
  const renderInputField = (name, label, icon, type = 'text', isTextArea = false) => {
    const hasError = formState.errors[name];
    const Component = isTextArea ? 'textarea' : 'input';
    const IconComponent = icon;

    return (
      <motion.div 
      initial={document.body.clientWidth > 640 ? isTextArea ? { opacity: 0, x: -50} : { opacity: 0, x: 50}: 
               isTextArea ? { opacity: 0, x: -20} : { opacity: 0, x: 20}}
      whileInView={{ opacity: 1, x:0 }}
      transition={{ duration: 0.5 }}
        className="relative group">
        <div className={`absolute inset-y-0 left-0 pl-3 flex ${isTextArea ? 'items-start pt-4' : 'items-center'} pointer-events-none`}>
          <IconComponent 
            className={`
              w-5 h-5 transition-all duration-300 
              ${hasError 
                ? 'text-red-500' 
                : 'text-gray-400 group-focus-within:text-teal-600 dark:group-focus-within:text-teal-400'}
            `} 
          />
        </div>
        <Component
          id={name}
          name={name}
          type={type}
          rows={isTextArea ? 5 : undefined}
          maxLength={isTextArea ? 500 : undefined}
          className={`
            w-full pl-10 pr-3 py-3 border rounded-lg 
            bg-white dark:bg-gray-800 
            ${hasError 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-teal-700 focus:ring-teal-500'}
            focus:outline-none focus:ring-2 
            transition-all duration-300 ease-in-out
            ${isTextArea && 'resize-none'}
          `}
          placeholder={`Enter your ${label.toLowerCase()}`}
          required
          onChange={(e) => {
            if (isTextArea) {
              setFormState(prev => ({
                ...prev,
                characterCount: { 
                  ...prev.characterCount, 
                  message: e.target.value.length 
                }
              }));
            }
          }}
        />
        {isTextArea && (
          <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1 mr-2">
            {formState.characterCount.message}/500
          </div>
        )}
        {hasError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center mt-2 text-red-600 dark:text-red-400 pl-10"
          >
            <AlertCircle className="mr-2 w-4 h-4" />
            <span className="text-xs">{formState.errors[name][0]}</span>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <section 
      id='contact-section' 
      className="section footer pt-24 pb-6 flex flex-col justify-between items-center"
    >
      <motion.h1 
        initial={{opacity:0, y: -30}}
        whileInView={{opacity:1, y: 0, transition:{duration:0.6}}}
        className="about-h1 text-5xl font-bold text-center text-cyan-800 dark:text-cyan-200"
      >
        Contact Me
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, x: 100 }} 
        whileInView={{ opacity: 1, x: 0, transition: { duration: .4 } }}
        className="bg-gradient-to-r from-cyan-500 to-teal-500
          h-1.5 w-24 sm:w-32 border-none mt-6 mb-12 sm:mb-16 rounded-full mx-auto"
      ></motion.div>

      <div
        ref={document.body.clientWidth > 640 ? contactRef : null} 
        style={document.body.clientWidth > 640 ? {
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          transition: 'transform 0.1s ease-out'
        } : {}}
        className="w-full md:max-w-xl mb-10 bg-slate-100/50 dark:bg-gray-900/50 shadow-2xl rounded-2xl p-8 md:p-12">
        <motion.div 
          initial={{ scale: 0.7, opacity: 0, y:20 }}
          whileInView={{ scale: 1, opacity: 1, y:0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400">
            Get In Touch
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Have a question, valuable feedback or want to collaborate? Send me a message!
          </p>
        </motion.div>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          {renderInputField('from_name', 'Name', User)}
          {renderInputField('from_email', 'Email', Mail, 'email')}
          {renderInputField('message', 'Message/Feedback', MessageSquare, 'text', true)}

        <AnimatePresence>
          {formState.message && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`
                flex items-center p-4 rounded-lg text-sm 
                ${formState.status === 'success' 
                  ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-300' 
                  : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-300'}
              `}
            >
              {formState.status === 'success' ? <Check className="mr-2" /> : <AlertCircle className="mr-2" />}
              {formState.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0.7, opacity: 0, y:20 }}
          whileInView={{ scale: 1, opacity: 1, y:0 }}
          transition={{ duration: 0.2 }} 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          type="submit" 
          disabled={formState.status === 'submitting'}
          className={`
            w-full flex justify-center items-center p-3 rounded-lg 
            transition duration-300 ease-in-out 
            text-white font-semibold
            ${formState.status === 'submitting' 
              ? 'bg-cyan-900 text-white dark:bg-cyan-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700'}
          `}
        >
          {formState.status === 'submitting' ? (
            <div className="animate-pulse">Sending...</div>
          ) : (
            <>
              <Send className="mr-2 w-5 h-5" />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </div>

    {/* Social Links Section */}
    {/* <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-8"
    > */}
    <div className='footer-hr mt-16 mb-8 h-px w-4/5 dark:bg-slate-400 bg-slate-900 rounded-md opacity-30'></div>
      <Social />
    {/* </motion.div> */}
  </section>
  );
}