import { makeAutoObservable } from 'mobx';

import { type IUser } from 'Interfaces';

class UserStore {
	isAuth = false;
	user: IUser | undefined;

	constructor() {
		makeAutoObservable(this);
	}

	setIsAuth(auth: boolean, user?: IUser) {
		if (auth && user) {
			this.isAuth = true;
			this.user = user;
		} else {
			this.isAuth = false;
			this.user = undefined;
		}
	}

	logout() {
		this.setIsAuth(false);
		localStorage.removeItem('token');
	}
}

export default UserStore;
