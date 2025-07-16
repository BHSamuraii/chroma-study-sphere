
// Secure authentication redirect utilities
export const createSecureRedirect = () => {
  // Clean URL immediately to prevent token exposure
  if (window.location.hash) {
    const cleanUrl = window.location.origin + window.location.pathname + window.location.search;
    window.history.replaceState(null, '', cleanUrl);
  }
  
  // Use replace instead of href to prevent back button access to token URLs
  const redirectToSecurePage = () => {
    window.location.replace('https://gcseanki.co.uk/test-dashboard');
  };
  
  // Small delay to ensure session is processed
  setTimeout(redirectToSecurePage, 50);
};

export const handleOAuthSecurity = async (supabase: any) => {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  
  if (hashParams.get('access_token')) {
    console.log('OAuth callback detected - securing tokens...');
    
    // Immediately sanitize URL to prevent token exposure
    const cleanUrl = window.location.origin + window.location.pathname + window.location.search;
    window.history.replaceState(null, '', cleanUrl);
    
    // Get session data securely
    try {
      const { data, error } = await supabase.auth.getSession();
      if (data.session && !error) {
        console.log('OAuth session secured successfully');
        return data.session;
      }
    } catch (error) {
      console.error('Error securing OAuth session:', error);
    }
  }
  
  return null;
};
