import { User } from './userInterface';

export interface response {
	status: number;
	data?: Record<string, any>;
}
export interface errorResponse extends response {
	status: number;
	data: {
		message: string;
		error?: string;
	}; // use for default error
}

export interface userResponse extends response {
	data: {
		user: User;
		access_token: string;
	};
}
