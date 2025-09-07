import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Users, 
  Shield, 
  Heart,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "24/7 AI Support Chat",
      description: "Get immediate, empathetic first-aid support when you need it most. Our AI companion is trained to listen and guide you through difficult moments.",
      link: "/chat",
      color: "text-primary"
    },
    {
      icon: Calendar,
      title: "Confidential Counseling",
      description: "Book private, one-on-one sessions with licensed mental health professionals. Completely confidential and judgment-free.",
      link: "/booking",
      color: "text-success"
    },
    {
      icon: BookOpen,
      title: "Self-Help Resources",
      description: "Access evidence-based articles, guided meditations, and tools to manage stress, anxiety, and academic pressure.",
      link: "/resources",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "Peer Support Community",
      description: "Connect anonymously with fellow students who understand your challenges. Share experiences in a safe, moderated space.",
      link: "/forum",
      color: "text-primary-glow"
    }
  ];

  const benefits = [
    "Completely confidential and anonymous",
    "Available 24/7 for immediate support",
    "Culturally sensitive and student-focused",
    "Evidence-based mental health resources",
    "No stigma, no judgment - just support"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Your Mental Health
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent block">
                Matters & We're Here
              </span>
            </h1>
            <p className="text-xl text-calm max-w-2xl mx-auto">
              A safe, confidential space for students to access mental health support, 
              connect with counselors, and find resources - completely stigma-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-4">
                <Link to="/chat">
                  Start Chat Support
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-secondary text-lg px-8 py-4">
                <Link to="/booking">
                  Book Counseling
                  <Calendar className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How We Support You
            </h2>
            <p className="text-xl text-calm max-w-2xl mx-auto">
              Multiple ways to access mental health support, all designed with your privacy and comfort in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gentle group hover:scale-105 transition-all duration-300">
                <CardHeader className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-calm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <Button asChild variant="ghost" className="group-hover:bg-primary/5 transition-colors p-0 h-auto">
                    <Link to={feature.link} className="flex items-center text-primary font-medium">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-primary font-semibold">Safe & Confidential</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Your Privacy is Our Priority
              </h2>
              <p className="text-lg text-calm leading-relaxed">
                We understand that seeking mental health support can feel vulnerable. 
                That's why every aspect of our platform is designed with your privacy, 
                safety, and comfort at the forefront.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-calm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-gentle p-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Heart className="h-10 w-10 text-primary-foreground" />
              </div>
              <blockquote className="text-lg text-calm italic">
                "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
              </blockquote>
              <div className="text-center">
                <p className="font-medium text-foreground">Student Wellness Principle</p>
                <p className="text-sm text-muted-foreground">Supporting your journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              You Don't Have to Face This Alone
            </h2>
            <p className="text-xl text-calm max-w-2xl mx-auto">
              Take the first step towards better mental health. Our support is always here when you're ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-4">
                <Link to="/chat">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;