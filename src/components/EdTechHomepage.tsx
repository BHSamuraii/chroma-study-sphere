import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { ModeToggle } from '@/components/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Github, Google } from 'lucide-react';

const EdTechHomepage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [signInMode, setSignInMode<'signin' | 'signup'>>('signin');

  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && isHeaderVisible) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY && !isHeaderVisible) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isHeaderVisible]);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleEnrolClick = () => {
    if (user) {
      // User is already logged in, navigate to dashboard
      const hostname = window.location.hostname;
      if (hostname.includes('gcseanki.co.uk')) {
        window.location.href = 'https://gcseanki.co.uk/dashboard';
      } else {
        window.location.href = '/dashboard';
      }
      return;
    }
    setSignInMode('signup');
    setIsSignInOpen(true);
  };

  const handleDashboardClick = () => {
    const hostname = window.location.hostname;
    if (hostname.includes('gcseanki.co.uk')) {
      window.location.href = 'https://gcseanki.co.uk/dashboard';
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-20 transition-transform duration-300 bg-background border-b ${isHeaderVisible ? 'header-show' : 'header-hide'
          }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">GCSE Anki</h1>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button variant="secondary" size="sm" onClick={handleDashboardClick}>
                  Dashboard
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" onClick={handleSignOut} disabled={loading}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={handleEnrolClick}>
                Get Started
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-purple-yellow text-white py-24 relative">
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Unlock Your GCSE Potential
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Master your GCSEs with our comprehensive Anki courses.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" onClick={handleEnrolClick}>
            Start Learning Now
          </Button>
        </div>
        <div className="absolute inset-0 bg-fixed" style={{ backgroundImage: 'url(/hero-bg.svg)', opacity: 0.2, zIndex: -1 }}></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 pattern-dots">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="edtech-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Comprehensive Courses
              </h3>
              <p className="text-gray-400">
                In-depth Anki courses covering all major GCSE subjects.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="edtech-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Expertly Crafted Content
              </h3>
              <p className="text-gray-400">
                Curated content designed by experienced educators.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="edtech-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Interactive Learning
              </h3>
              <p className="text-gray-400">
                Engaging and interactive Anki flashcards for effective revision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white pattern-grid">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial Card 1 */}
            <div className="edtech-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-400 italic mb-3">
                "GCSE Anki helped me boost my grades and feel confident during
                exams!"
              </p>
              <p className="text-sm font-semibold text-foreground">
                - Sarah K., GCSE Student
              </p>
            </div>

            {/* Testimonial Card 2 */}
            <div className="edtech-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-400 italic mb-3">
                "The courses are well-structured and easy to follow. Highly
                recommend!"
              </p>
              <p className="text-sm font-semibold text-foreground">
                - John M., Parent
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg mb-8 text-gray-700">
            Join our community of successful GCSE students today!
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" onClick={handleEnrolClick}>
            Get Started Now
          </Button>
        </div>
      </section>

      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{signInMode === 'signin' ? 'Sign In' : 'Create Account'}</DialogTitle>
            <DialogDescription>
              {signInMode === 'signin'
                ? 'Enter your email and password to access your account.'
                : 'Create an account to start your learning journey today.'}
            </DialogDescription>
          </DialogHeader>
          <AuthForm signInMode={signInMode} onClose={() => setIsSignInOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface AuthFormProps {
  signInMode: 'signin' | 'signup';
  onClose: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ signInMode, onClose }) => {
  const { signUp, signIn, signInWithGoogle, loading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (signInMode === 'signup') {
      if (!name) {
        toast({
          title: "Missing Name",
          description: "Please enter your name to sign up.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await signUp(email, password, name);
      if (!error) {
        onClose();
      }
    } else {
      const { error } = await signIn(email, password);
      if (!error) {
        onClose();
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (!error) {
      onClose();
    }
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="w-full justify-center" onClick={handleGoogleSignIn} disabled={loading}>
          <Google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" className="w-full justify-center" disabled>
          <Github className="mr-2 h-4 w-4" />
          Github
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        {signInMode === 'signup' && (
          <div className="grid gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              type="text"
              disabled={loading}
            />
          </div>
        )}
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            type="email"
            disabled={loading}
          />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            type="password"
            disabled={loading}
          />
        </div>
        <Button disabled={loading} onClick={handleSubmit}>
          {signInMode === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>
      </div>
    </div>
  );
};

export default EdTechHomepage;
