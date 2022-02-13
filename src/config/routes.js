/**
 * Collection of all HTTP Endpoints to the backend
 */

// Routes Container
const routes = {};

routes.site = {
    getIndex: '/',
};

routes.admin = {
    create: '/api/admin/create',
    login: '/api/admin/login',
};

routes.patient = {
    create: '/api/patient/create',
    login: '/api/patient/login',
};

routes.posts = {};

export default routes;
