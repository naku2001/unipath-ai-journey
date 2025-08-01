import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Search, Calendar, GraduationCap, Users, Globe, Award, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/unipath-hero.jpg";

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Assistant",
      description: "Get instant answers about applications, deadlines, visa requirements, and more",
      path: "/chat",
      color: "bg-primary",
    },
    {
      icon: Search,
      title: "School Matcher",
      description: "Find universities that match your profile, budget, and preferences",
      path: "/matcher",
      color: "bg-secondary",
    },
    {
      icon: Calendar,
      title: "Timeline Generator",
      description: "Get a personalized checklist and timeline for your application journey",
      path: "/timeline",
      color: "bg-accent",
    },
  ];

  const stats = [
    { icon: GraduationCap, label: "Universities in Database", value: "20+" },
    { icon: Globe, label: "Application Pathways", value: "Multiple" },
    { icon: Calendar, label: "Timeline Templates", value: "Personalized" },
    { icon: MessageCircle, label: "AI-Powered Support", value: "24/7" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your AI-Powered Path to
                <span className="block text-accent-light">U.S. Universities</span>
              </h1>
              <p className="text-xl text-gray-100 max-w-xl">
                Navigate the complex world of U.S. university applications with confidence. 
                Get personalized guidance, find the perfect schools, and never miss a deadline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/chat">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    <MessageCircle className="w-5 h-5" />
                    Start with AI Assistant
                  </Button>
                </Link>
                <Link to="/matcher">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Search className="w-5 h-5" />
                    Find My Schools
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Students celebrating graduation" 
                className="rounded-2xl shadow-strong w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need in One Place</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From initial research to final application submission, UniPath AI guides you through every step
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-medium transition-smooth group cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {feature.description}
                    </CardDescription>
                    <Link to={feature.path}>
                      <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary-dark">
                        Get Started →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Take the first step towards your U.S. university journey with AI-powered guidance and personalized support
          </p>
          <Link to="/chat">
            <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-gray-100">
              <MessageCircle className="w-5 h-5" />
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">UniPath AI</h3>
              <p className="text-muted-foreground">
                Your AI-powered companion for navigating U.S. university applications with confidence.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/chat" className="block text-muted-foreground hover:text-primary transition-colors">
                  AI Assistant
                </Link>
                <Link to="/matcher" className="block text-muted-foreground hover:text-primary transition-colors">
                  School Matcher
                </Link>
                <Link to="/timeline" className="block text-muted-foreground hover:text-primary transition-colors">
                  Timeline Generator
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://linkedin.com/company/unipath-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://twitter.com/unipathAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a 
                  href="https://instagram.com/unipath.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://tiktok.com/@unipath.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg 
                    className="w-6 h-6 fill-current" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 UniPath AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;