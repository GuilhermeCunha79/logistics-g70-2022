import 'reflect-metadata';
import * as sinon from 'sinon';
import {Response, Request, NextFunction} from 'express';

import config from '../../../config';
import {Container} from 'typedi';
import {Result} from '../../../src/core/logic/Result';
import RouteController from "../../../src/controllers/routeController";
import IRouteDTO from "../../../src/dto/IRouteDTO";
import IRouteService from "../../../src/services/IServices/IRouteService";

describe('Route controller', function () {
	beforeEach(() => {
		let routeSchemaInstance = require("../../../src/persistence/routeSchema").default;
		Container.set("RouteSchema", routeSchemaInstance);

		let routeRepoInstance = require('../../../src/repos/truckRepo').default;
		Container.set("RouteRepo", routeRepoInstance);

		let routeServiceClass = require('../../../src/services/routeService').default;
		let routeServiceInstance = Container.get(routeServiceClass);
		Container.set("RouteService", routeServiceInstance);
	});

	afterEach(() => {
		sinon.restore();
	});

	it('Create a Route', async function () {
		let body = {
			routeId: "111",
			origin: "ABC",
			destination: "DEF",
			distance: 10,
			timeDistance: 10,
			energySpent: 10,
			extraBatteryTime: 10
		};

		let req: Partial<Request> = {};
		req.body = body;
		let res: Partial<Response> = {
			json: sinon.spy(),
		};
		let next: Partial<NextFunction> = () => {
		};

		let routeServiceInstance = Container.get(config.services.route.name);

		const obj = sinon.stub(routeServiceInstance, 'createRoute').returns(Result.ok<IRouteDTO>(req.body as IRouteDTO));

		const ctrl = new RouteController(routeServiceInstance as IRouteService);
		await ctrl.createRoute(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(body));
	});

	it('Update a Route', async function () {
		let body = {
			routeId: "111",
			origin: "ABC",
			destination: "DEF",
			distance: 88,
			timeDistance: 88,
			energySpent: 88,
			extraBatteryTime: 88
		};

		let req: Partial<Request> = {};
		req.body = body;
		let res: Partial<Response> = {
			json: sinon.spy(),
		};
		let next: Partial<NextFunction> = () => {
		};

		let routeServiceInstance = Container.get(config.services.route.name);

		const obj = sinon.stub(routeServiceInstance, 'updateRoute').returns(Result.ok<IRouteDTO>(req.body as IRouteDTO));

		const ctrl = new RouteController(routeServiceInstance as IRouteService);
		await ctrl.updateRoute(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match({
			routeId: "111",
			origin: "ABC",
			destination: "DEF",
			distance: 88,
			timeDistance: 88,
			energySpent: 88,
			extraBatteryTime: 88
		}));
	});

	it('List Route by ID', async function () {
		let body = [ {
			routeId: "111",
			origin: "ABC",
			destination: "DEF",
			distance: 10,
			timeDistance: 10,
			energySpent: 10,
			extraBatteryTime: 10
		} ];

		let req: Partial<Request> = {
			params: {
				ls: "111"
			}
		};
		let res: Partial<Response> = {
			json: sinon.spy(),
		};
		let next: Partial<NextFunction> = () => { };

		let routeServiceInstance = Container.get(config.services.route.name);

		const obj = sinon.stub(routeServiceInstance, 'getRoutes').returns(Result.ok<IRouteDTO[]>(body as IRouteDTO[]));

		const ctrl = new RouteController(routeServiceInstance as IRouteService);
		await ctrl.findRoutes(<Request>req, <Response>res, <NextFunction>next);

		//sinon.assert.calledOnce(obj);
		//sinon.assert.calledWith(obj, sinon.match(body));
	});

	it('List all routes', async function () {
		let body = [ {
			routeId: "111",
			origin: "ABC",
			destination: "DEF",
			distance: 10,
			timeDistance: 10,
			energySpent: 10,
			extraBatteryTime: 10
		} ];

		let req: Partial<Request> = {};
		let res: Partial<Response> = {
			json: sinon.spy(),
		};
		let next: Partial<NextFunction> = () => { };

		let routeServiceInstance = Container.get(config.services.route.name);

		const obj = sinon.stub(routeServiceInstance, 'getRoutes').returns(Result.ok<IRouteDTO[]>(body as IRouteDTO[]));

		const ctrl = new RouteController(routeServiceInstance as IRouteService);
		await ctrl.findRoutes(<Request>req, <Response>res, <NextFunction>next);

		//sinon.assert.calledOnce(obj);
		//sinon.assert.calledWith(obj, sinon.match(body));
	});
});
