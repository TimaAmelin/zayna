export {};

declare global {
  interface TelegramWebAppInitDataUnsafe {
    user_id: number;
    username: string;
  }

  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: TelegramWebAppInitDataUnsafe;
        close: () => void;
        openTelegramLink: (x: string) => void;
        expand: () => void;
        platform: string;
      };
    };
  }
}
