import Home from '../components/global/pages/Home'
import Login from "../components/global/pages/Login";
import Signup from "../components/global/pages/Signup";

const routes = [
    {
        id: 1,
        route: '/home',
        component: <Home />,
        public: false,
        permissions: ['user','admin']
    },
    {
        id: 2,
        route: '/',
        component: <Login />,
        public: true,
        permissions: []
    },
    {
        id: 3,
        route: '/signup',
        component: <Signup />,
        public: true,
        permissions: []
    },
    {
        id: 4,
        route: '/category/create',
        component: <Signup />,
        public: false,
        permissions: ['admin']
    },
    {
        id: 5,
        route: '/category/list',
        component: <Signup />,
        public: false,
        permissions: ['admin']
    },
    {
        id: 6,
        route: '/category/:id/edit',
        component: <Signup />,
        public: false,
        permissions: ['admin']
    },
    {
        id: 7,
        route: '/book/create',
        component: <Signup />,
        public: false,
        permissions: ['admin']
    },
    {
        id: 8,
        route: '/book/list',
        component: <Signup />,
        public: false,
        permissions: ['admin']
    },
    {
        id: 9,
        route: '/book/:id/edit',
        component: <Signup />,
        public: false,
        permissions: ['admin']
    },
    {
        id: 10,
        route: '/books',
        component: <Signup />,
        public: false,
        permissions: ['user']
    },
]

export default routes