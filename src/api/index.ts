import {Router} from 'express';

import planning from "./routes/planningRoute"
import route from "./routes/routeRoute";
import truck from './routes/truckRoute';

export default () => {
	const app = Router();

	planning(app);
	route(app);
	truck(app);

	return app;
}
