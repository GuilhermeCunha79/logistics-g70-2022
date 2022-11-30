import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';

import Logger from './logger';
import config from '../../config';

export default async ({expressApp}) => {

	const mongoConnection = await mongooseLoader();
	Logger.info('DB loaded and connected!');

	const truckSchema = {
		name: 'truckSchema',
		schema: '../persistence/schemas/truckSchema',
	};

	const routeSchema = {
		name: 'routeSchema',
		schema: '../persistence/schemas/routeSchema',
	};

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
			routeSchema,
			truckSchema
		],
		controllers: [
			routeController,
			truckController
		],
		repos: [
			routeRepo,
			truckRepo
		],
		services: [
			routeService,
			truckService
		]
	});

	Logger.info('Schemas, Controllers, Repositories, Services, etc. loaded!');
	await expressLoader({app: expressApp});
	Logger.info('Express loaded!');
};
