import {Router} from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import truck from './routes/truckRoute';
import route from "./routes/routeRoute";


export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	truck(app);
	route(app);

	return app
}
