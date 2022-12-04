import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';

import Logger from './logger';
import config from '../../config';

export default async ({expressApp}) => {

	const mongoConnection = await mongooseLoader();
	Logger.info('DB loaded and connected!');

	const planningSchema = {
		name: 'planningSchema',
		schema: '../persistence/planningSchema',
	};

	const truckSchema = {
		name: 'truckSchema',
		schema: '../persistence/truckSchema',
	};

	const routeSchema = {
		name: 'routeSchema',
		schema: '../persistence/routeSchema',
	};

	const planningController = {
		name: config.controllers.planning.name,
		path: config.controllers.planning.path
	}

	const planningRepo = {
		name: config.repos.planning.name,
		path: config.repos.planning.path
	}

	const planningService = {
		name: config.services.planning.name,
		path: config.services.planning.path
	}

	const routeController = {
		name: config.controllers.route.name,
		path: config.controllers.route.path
	}

	const routeRepo = {
		name: config.repos.route.name,
		path: config.repos.route.path
	}

	const routeService = {
		name: config.services.route.name,
		path: config.services.route.path
	}

	const truckController = {
		name: config.controllers.truck.name,
		path: config.controllers.truck.path
	}

	const truckRepo = {
		name: config.repos.truck.name,
		path: config.repos.truck.path
	}

	const truckService = {
		name: config.services.truck.name,
		path: config.services.truck.path
	}

	await dependencyInjectorLoader({
		mongoConnection,
		schemas: [
			planningSchema,
			routeSchema,
			truckSchema
		],
		controllers: [
			planningController,
			routeController,
			truckController
		],
		repos: [
			planningRepo,
			routeRepo,
			truckRepo
		],
		services: [
			planningService,
			routeService,
			truckService
		]
	});

	Logger.info('Schemas, Controllers, Repositories, Services, etc. loaded!');
	await expressLoader({app: expressApp});
	Logger.info('Express loaded!');
};
