
// Auth security utilities for safe token handling
export const sanitizeUrl = () => {
  // Immediately clean any auth tokens from URL
  if (window.location.hash.includes('access_token') || window.location.hash.includes('refresh_token')) {
    // Use replaceState to remove tokens from history
    const cleanUrl = window.location.origin + window.location.pathname + window.location.search;
    window.history.replaceState(null, '', cleanUrl);
    
    // Also clear any potential token fragments from browser history
    if (window.history.length > 1) {
      window.history.replaceState(null, '', cleanUrl);
    }
  }
};

// Secure cookie settings for token storage
export const getSecureCookieOptions = () => {
  const domain = window.location.hostname.includes('gcseanki.co.uk') ? '.gcseanki.co.uk' : '';
  return {
    domain,
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'Lax' as const,
    httpOnly: false // Client-side access needed for auth checks
  };
};

export const setSecureCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  const options = getSecureCookieOptions();
  
  let cookieString = `${name}=${value};expires=${expires.toUTCString()};path=${options.path}`;
  
  if (options.domain) {
    cookieString += `;domain=${options.domain}`;
  }
  
  if (options.secure) {
    cookieString += `;Secure`;
  }
  
  cookieString += `;SameSite=${options.sameSite}`;
  
  document.cookie = cookieString;
};

export const deleteSecureCookie = (name: string) => {
  const options = getSecureCookieOptions();
  let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${options.path}`;
  
  if (options.domain) {
    cookieString += `;domain=${options.domain}`;
  }
  
  document.cookie = cookieString;
};
