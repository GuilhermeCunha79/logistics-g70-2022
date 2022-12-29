import {Router} from 'express';

import planning from "./routes/planningRoute"
import route from "./routes/routeRoute";
import truck from './routes/truckRoute';
import user from './routes/userRoute';

export default () => {
	const app = Router();

	planning(app);
	route(app);
	truck(app);
	user(app);

	return app;
}
