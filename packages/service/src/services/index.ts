import keyRoutes from './key/routes';
import feedbackRoutes from './feedback/routes';
import { Route } from '../utils';

export default [...keyRoutes, ...feedbackRoutes] as Route[];
