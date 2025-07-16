
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sanitizeUrl, setSecureCookie, deleteSecureCookie } from '@/utils/authSecurity';
import { createSecureRedirect, handleOAuthSecurity } from '@/utils/authRedirect';

// WordPress sync function
const syncTokenWithWordPress = async (session: Session | null) => {
  try {
    const response = await fetch('https://xcibkpxhyivgfvrojrbw.supabase.co/functions/v1/wordpress-auth-bridge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': session ? `Bearer ${session.access_token}` : '',
      },
      body: JSON.stringify({
        action: session ? 'set_token' : 'clear_token',
        token: session?.access_token || null,
        user: session?.user || null,
      }),
    });

    if (!response.ok) {
      console.warn('Failed to sync token with WordPress:', response.statusText);
    }
  } catch (error) {
    console.warn('Error syncing token with WordPress:', error);
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Immediately sanitize URL on load
    sanitizeUrl();
    
    // Handle OAuth callback with security measures
    const initializeSecureAuth = async () => {
      // Handle OAuth callback securely
      const oauthSession = await handleOAuthSecurity(supabase);
      
      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('Auth state changed:', event, session?.user?.email);
          
          // Sanitize URL on any auth state change
          sanitizeUrl();
          
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);

          // Secure token storage
          if (session?.access_token) {
            setSecureCookie('supabase_token', session.access_token, 7);
            setSecureCookie('supabase_user', JSON.stringify({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email
            }), 7);
          } else {
            deleteSecureCookie('supabase_token');
            deleteSecureCookie('supabase_user');
          }

          // Sync with WordPress
          await syncTokenWithWordPress(session);

          // Secure redirect after successful login
          if (event === 'SIGNED_IN' && session) {
            console.log('User signed in, securing redirect...');
            createSecureRedirect();
          }
        }
      );

      // Check for existing session
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          console.log('Initial session check:', session?.user?.email);
          setSession(session);
          setUser(session?.user ?? null);

          if (session?.access_token) {
            setSecureCookie('supabase_token', session.access_token, 7);
            setSecureCookie('supabase_user', JSON.stringify({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email
            }), 7);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }

      return subscription;
    };

    let subscription: any;
    initializeSecureAuth().then((sub) => {
      subscription = sub;
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      const redirectUrl = 'https://gcseanki.co.uk/test-dashboard';
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: name ? { full_name: name } : undefined
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      if (data.user && !data.session) {
        toast({
          title: "Check Your Email",
          description: "Please check your email for a confirmation link to complete your registration.",
        });
      } else {
        toast({
          title: "Welcome!",
          description: "Your account has been created successfully.",
        });
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign Up Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign In Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Sign Out Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      // Clear secure cookies
      deleteSecureCookie('supabase_token');
      deleteSecureCookie('supabase_user');

      toast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
      });

      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign Out Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const redirectUrl = 'https://gcseanki.co.uk/test-dashboard';
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        console.error('Password reset error:', error);
        toast({
          title: "Password Reset Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      toast({
        title: "Check Your Email",
        description: "Password reset instructions have been sent to your email.",
      });

      return { error: null };
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Password Reset Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const redirectUrl = 'https://gcseanki.co.uk/test-dashboard';
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          // Enable PKCE for enhanced security
          flowType: 'pkce'
        }
      });

      if (error) {
        console.error('Google sign in error:', error);
        toast({
          title: "Google Sign In Error",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Google sign in error:', error);
      toast({
        title: "Google Sign In Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    signInWithGoogle,
  };
};
