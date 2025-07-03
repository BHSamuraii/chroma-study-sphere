
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Star, 
  ChevronRight, 
  Play, 
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';

const EdTechHomepage = () => {
  const subjects = [
    {
      title: "Mathematics",
      description: "Master calculus, algebra, and advanced mathematical concepts",
      icon: <TrendingUp className="h-8 w-8" />,
      courses: 24,
      students: "15K+",
      rating: 4.9,
      price: "$89"
    },
    {
      title: "Computer Science",
      description: "Learn programming, algorithms, and software development",
      icon: <BookOpen className="h-8 w-8" />,
      courses: 32,
      students: "22K+",
      rating: 4.8,
      price: "$129"
    },
    {
      title: "Physics",
      description: "Explore quantum mechanics, thermodynamics, and more",
      icon: <Trophy className="h-8 w-8" />,
      courses: 18,
      students: "8K+",
      rating: 4.7,
      price: "$99"
    },
    {
      title: "Chemistry",
      description: "Understand molecular structures and chemical reactions",
      icon: <Award className="h-8 w-8" />,
      courses: 21,
      students: "12K+",
      rating: 4.8,
      price: "$94"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "The interactive courses helped me land my dream internship at Google!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Mathematics Major",
      content: "Amazing explanations and practice problems. My grades improved by 40%!",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Physics Student",
      content: "Complex concepts made simple. The best learning platform I've used.",
      rating: 5,
      avatar: "ER"
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "$29",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "Access to 5 courses",
        "Basic progress tracking",
        "Community forum access",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      description: "Most popular for serious learners",
      features: [
        "Access to all courses",
        "Advanced analytics",
        "1-on-1 mentoring sessions",
        "Priority support",
        "Downloadable resources",
        "Certificate of completion"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Custom learning paths",
        "API access",
        "Dedicated support",
        "Advanced reporting"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gradient">EduMaster</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#courses" className="text-foreground hover:text-primary transition-colors">Courses</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
              <Button variant="outline" className="mr-2">Log In</Button>
              <Button className="animate-pulse-glow">Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-purple-yellow py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 animate-float">🚀 New AI-Powered Learning Experience</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient leading-tight">
              Master Any Subject
              <br />
              <span className="text-primary">With Expert Guidance</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students who've transformed their academic performance with our interactive courses and personalized learning paths.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-12 flex justify-center items-center space-x-8 text-sm text-foreground/60">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                50K+ Students
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-primary" />
                4.9/5 Rating
              </div>
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-primary" />
                95% Success Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects/Courses Section */}
      <section id="courses" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Choose Your Subject
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Explore our comprehensive catalog of subjects taught by industry experts and top educators.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects.map((subject, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {subject.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{subject.title}</CardTitle>
                  <CardDescription className="text-sm">{subject.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex justify-between items-center text-sm text-foreground/60 mb-4">
                    <span>{subject.courses} courses</span>
                    <span>{subject.students} students</span>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <Star className="h-4 w-4 text-primary mr-1" />
                    <span className="font-semibold">{subject.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{subject.price}</span>
                    <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      Enroll Now
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              What Students Say
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Real success stories from students who've transformed their academic journey with us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-primary fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Choose Your Plan
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Flexible pricing options to fit your learning needs and budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary scale-105' : ''} bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-foreground/60">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'animate-pulse-glow' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-purple-yellow relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students and start your journey to academic excellence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/20 py-12 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-gradient">EduMaster</span>
              </div>
              <p className="text-foreground/60">Empowering students worldwide with quality education and innovative learning experiences.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-primary">Subjects</h4>
              <ul className="space-y-2 text-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">Mathematics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Computer Science</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Physics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Chemistry</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-primary">Company</h4>
              <ul className="space-y-2 text-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-primary">Support</h4>
              <ul className="space-y-2 text-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-foreground/60">
            <p>&copy; 2024 EduMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EdTechHomepage;
