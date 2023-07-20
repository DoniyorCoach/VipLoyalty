import { makeAutoObservable } from 'mobx';

class ThemeStore {
	darkMode: boolean = JSON.parse(localStorage.getItem('darkmode') ?? 'false') as boolean;

	constructor() {
		makeAutoObservable(this);
	}

	toggleDarkMode() {
		this.darkMode = !this.darkMode;
		localStorage.setItem('darkmode', this.darkMode.toString());
	}
}

export default ThemeStore;
