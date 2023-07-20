import NotificationStore from './NotificationStore';
import ThemeStore from './ThemeStore';
import UserStore from './UserStore';

const themeStore = new ThemeStore();
const userStore = new UserStore();
const notificationStore = new NotificationStore();

export { themeStore, userStore, notificationStore };
