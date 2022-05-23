import { useEffect } from 'react';

const createNotification = (message: string) => {
  if (Notification.permission === 'granted') {
    new Notification(message);
  }
};

export const useNotification = () => {
  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }
    if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return {
    createNotification,
  };
};
