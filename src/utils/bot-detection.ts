export const checkIfBot = () => {
  // Version: 1.0.2
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  
  // Standard bot/crawler tokens
  const isCrawler = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|crawler|spider|robot|crawling/i.test(ua);
  // Social media crawler tokens (only those that represent the scraper/preview generator)
  const isSocialCrawler = /facebookexternalhit|facebot|twitterbot|discordbot|telegrambot|whatsapp/i.test(ua);
  // Real user devices (to prevent false positives in Instagram/Facebook in-app browsers)
  const isRealUser = /mobile|android|iphone|ipad|phone/i.test(ua);
  
  return (isCrawler || isSocialCrawler) && !isRealUser;
};

export const IS_BOT = checkIfBot();
