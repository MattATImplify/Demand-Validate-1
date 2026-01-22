import { motion } from "framer-motion";
import { pricingPlans } from "@shared/schema";
import { RegisterDialog } from "@/components/RegisterDialog";
import { PricingCard } from "@/components/PricingCard";
import { ArrowRight, Coffee, Wifi, Users, MapPin, Train } from "lucide-react";

export default function Landing() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 px-4 overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                Coming Soon to Staplehurst
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 text-foreground">
                Work Near Home, <br />
                <span className="text-primary">Not From Home.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Professional desk space, high-speed fibre, and fresh coffee—right on your doorstep. Join the waitlist for a local workspace.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <RegisterDialog />
                <a href="#details" className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-foreground font-semibold hover:bg-black/5 transition-colors">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              {/* Unsplash image: Modern small office interior with plants and natural light */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                {/* Modern bright coworking space */}
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" 
                  alt="Modern Office Space" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-border z-20 max-w-xs">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-green-100 text-green-700 rounded-full">
                    <Train className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Save 2 Hours</p>
                    <p className="text-sm text-muted-foreground">Average daily commute saved</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="details" className="py-24 bg-white relative">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Everything you need to be productive</h2>
            <p className="text-lg text-muted-foreground">
              Forget the kitchen table. We provide a professional environment where you can focus, meet clients, and separate work from home.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Wifi,
                title: "Reliable Fibre Internet",
                desc: "Enterprise-grade connectivity that won't drop out during your Zoom calls."
              },
              {
                icon: Coffee,
                title: "Unlimited Fresh Coffee",
                desc: "Fuel your day with locally roasted coffee and a selection of teas, always included."
              },
              {
                icon: Users,
                title: "Community & Networking",
                desc: "Connect with other local professionals, freelancers, and business owners."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-secondary/30 border border-secondary hover:bg-secondary/50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-secondary/20 relative">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Simple, Local Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible options designed for hybrid workers. Cheaper than a train ticket to London.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <PricingCard key={plan.id} plan={plan} popular={idx === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h3 className="text-2xl font-display font-bold mb-4">Staplehurst Workspace Project</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            A new professional hub in the heart of Staplehurst.
          </p>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Staplehurst Workspace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
