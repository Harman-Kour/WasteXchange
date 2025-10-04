import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, Recycle, TrendingUp, Users, Leaf, Zap, Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const stats = [
    { icon: Factory, value: "500+", label: "Active Companies", color: "text-emerald-600" },
    { icon: Recycle, value: "10K+", label: "Tons Recycled", color: "text-blue-600" },
    { icon: Leaf, value: "25K", label: "Tons CO₂ Saved", color: "text-green-600" },
  ];

  const features = [
    {
      icon: Users,
      title: "Smart Matching",
      description: "Connect with the right partners using our intelligent waste-resource matching system."
    },
    {
      icon: TrendingUp,
      title: "Impact Tracking",
      description: "Monitor your environmental contribution with real-time metrics and detailed reports."
    },
    {
      icon: Shield,
      title: "Verified Network",
      description: "Trade with confidence in our network of verified industrial partners."
    },
    {
      icon: Globe,
      title: "Circular Economy",
      description: "Be part of the sustainable revolution by closing the loop on industrial waste."
    },
    {
      icon: Zap,
      title: "Quick Exchange",
      description: "Streamlined process from listing to exchange with minimal friction."
    },
    {
      icon: Leaf,
      title: "Zero Landfill",
      description: "Help achieve zero-landfill goals by finding use for every material."
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="py-20 md:py-32">
            <motion.div
              
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                B2B Circular Economy Platform
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Transform Waste Into
                <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Valuable Resources
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect with industries to exchange waste materials as usable resources. 
                Reduce pollution, save costs, and build a sustainable circular economy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Browse")}>
                  <Button size="lg" className="brand-gradient text-white hover:opacity-90 text-lg px-8">
                    Start Exchanging
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Impact")}>
                  <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                    View Impact
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${stat.color} to-${stat.color}/60 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need for
              <span className="block text-emerald-600">Industrial Symbiosis</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools to transform your waste into someone else's treasure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                
                className="group"
              >
                <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Join the Circular Economy?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Start exchanging waste materials today and make a positive environmental impact.
            </p>
            <Link to={createPageUrl("Browse")}>
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}