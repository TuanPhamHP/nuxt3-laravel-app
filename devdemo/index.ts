interface User {
	name: string;
	id: number;
	email: string;
}

interface Auth {
	isAuth: boolean;
	user: null | User;
	token: string | null;
}

interface State {
	auth: Auth;
	counter: number;
}
const state: State = {
	auth: {
		user: null,
		isAuth: false,
		token: null,
	},
	counter: 1,
};
export default {
	state,
	mutations: {
		INCREASECOUNTER(state: State) {
			state.counter++;
		},
	},
};
