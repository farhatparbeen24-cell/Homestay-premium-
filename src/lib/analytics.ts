// Lightweight Google Analytics 4 event helper with graceful no-op fallback
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      eventNameOrTarget: string,
      eventParams?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(
  eventName: 'wa_click' | 'call_click' | 'enquiry_submit',
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}
