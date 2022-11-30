import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
	throw new Error("Couldn't find .env file.");
}

export default {
	/**
	 * Your favorite port
	 */
	port: parseInt(process.env.PORT, 10) || 3000,

	/**
	 * That long string from mlab
	 */
	databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:5d57dcafba86f32d4172093e@vsgate-s1.dei.isep.ipp.pt:10337/admin",

	/**
	 * Your secret sauce
	 */
	jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

	/**
	 * Used by winston logger
	 */
	logs: {
		level: process.env.LOG_LEVEL || 'info'
	},

	/**
	 * API configs
	 */
	api: {
		prefix: '/api'
	},

	controllers: {
		route: {
			name: "RouteController",
			path: "../controllers/routeController"
		},
		truck: {
			name: "TruckController",
			path: "../controllers/truckController"
		}
	},

	repos: {
		route: {
			name: "RouteRepo",
			path: "../repos/routeRepo"
		},
		truck: {
			name: "TruckRepo",
			path: "../repos/truckRepo"
		}
	},

	services: {
		route: {
			name: "RouteService",
			path: "../services/routeService"
		},
		truck: {
			name: "TruckService",
			path: "../services/truckService"
		}
	}
};
