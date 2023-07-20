import { makeAutoObservable } from 'mobx';

class NotificationStore {
	unreadMessages = false;

	constructor() {
		makeAutoObservable(this);
	}

	setUnreadMessages(value: boolean) {
		this.unreadMessages = value;
	}
}

export default NotificationStore;
