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
import { Github } from 'lucide-react';

const EdTechHomepage = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [signInMode, setSignInMode] = useState<'signin' | 'signup'>('signin');

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
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
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
