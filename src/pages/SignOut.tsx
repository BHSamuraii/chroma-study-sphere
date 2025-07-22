
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut } from 'lucide-react';

const SignOut = () => {
  const { signOut, loading } = useAuth();

  useEffect(() => {
    const handleSignOut = async () => {
      console.log('SignOut page: Initiating logout...');
      await signOut();
      
      // Redirect to homepage after a brief delay
      setTimeout(() => {
        window.location.href = 'https://gcseanki.co.uk/home';
      }, 1000);
    };

    handleSignOut();
  }, [signOut]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <LogOut className="h-8 w-8 text-primary animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Signing Out</h1>
          <p className="text-foreground/70 mb-4">
            {loading ? 'Please wait while we sign you out...' : 'You have been signed out successfully.'}
          </p>
          
          <div className="text-sm text-foreground/60">
            Redirecting you to the homepage...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignOut;
