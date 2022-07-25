declare module NodeJS {
  interface Process extends NodeJS.Process {
    browser?: string;
  }
}

interface Window {
  gtag: (...args: any[]) => void;
  fbq: (...args: any[]) => void;
}

declare module 'react-grid-carousel';
declare module '@darkblock.io/sol-widget';
declare module '@cardinal/namespaces-components';
