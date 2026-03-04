import { useEffect, useRef, useState } from "react";
import PageTransition from "../components/PageTransition";
import Button from "../components/Button";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import gsap from "gsap";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal contact info from left
      gsap.from(infoRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Reveal form from right, staggering inputs
      gsap.from(formRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".form-input", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.4,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      if (formRef.current) {
        formRef.current.reset();

        // Success animation
        gsap.to(formRef.current, {
          scale: 1.02,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          borderColor: "#22c55e", // green-500
          borderWidth: "2px",
          backgroundColor: "rgba(34, 197, 94, 0.05)",
        });
      }
    }, 1500);
  };

  const contactDetails = [
    { icon: Mail, text: "hello@example.com", label: "Email" },
    { icon: Phone, text: "+1 (555) 000-0000", label: "Phone" },
    { icon: MapPin, text: "San Francisco, CA", label: "Location" },
  ];

  return (
    <PageTransition>
      <div className="py-12 max-w-6xl mx-auto min-h-[calc(100vh-180px)] flex flex-col md:flex-row gap-16 lg:gap-24 items-center justify-center">
        {/* Contact Information */}
        <div ref={infoRef} className="w-full md:w-1/2 space-y-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Let's build something <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                amazing together.
              </span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Have a project in mind, a question, or just want to say hi? I'm
              currently open to new opportunities and would love to hear from
              you.
            </p>
          </div>

          <div className="space-y-6">
            {contactDetails.map(({ icon: Icon, text, label }) => (
              <div
                key={label}
                className="flex items-center space-x-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/50 group-hover:scale-110 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-xl border border-slate-200 p-8 rounded-3xl shadow-2xl transition-all duration-300 focus-within:border-indigo-500/50"
          >
            <div className="space-y-6">
              <div className="form-input">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-600 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans"
                  placeholder="John Doe"
                />
              </div>

              <div className="form-input">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-600 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans"
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-input">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-600 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="pt-2 form-input">
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  className="group relative overflow-hidden"
                >
                  <span
                    className={`flex items-center transition-opacity ${isSubmitting ? "opacity-0" : "opacity-100"}`}
                  >
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>

                  {isSubmitting && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
