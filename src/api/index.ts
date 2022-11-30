import {Router} from 'express';

import route from "./routes/routeRoute";
import truck from './routes/truckRoute';

export default () => {
	const app = Router();

	route(app);
	truck(app);

	return app;
}
