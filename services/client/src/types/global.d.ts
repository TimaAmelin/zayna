export {};

declare global {
  interface TelegramWebAppInitDataUnsafe {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
    }
  }

  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: TelegramWebAppInitDataUnsafe;
        close: () => void;
        openTelegramLink: (x: string) => void;
        expand: () => void;
        platform: string;
        postEvent: any;
        HapticFeedback: any;
      };
      WebAppInitData: any;
    };
  }
}
