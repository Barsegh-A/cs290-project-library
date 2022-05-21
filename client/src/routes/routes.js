import Home from '../components/user/pages/Home'
import Login from "../components/global/pages/Login";
import Signup from "../components/global/pages/Signup";
import BooksList from "../components/admin/pages/BooksList";

const routes = [
    {
        id: 1,
        route: '/home',
        component: <Home />,
        public: false,
        permissions: ['reader','admin']
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
        route: '/book/create',
        component: <Signup />,
        public: false,
        permissions: ['admin']
    },
    {
        id: 5,
        route: '/book/list',
        component: <BooksList />,
        public: false,
        permissions: ['admin']
    },
    {
        id: 6,
        route: '/book/:id/edit',
        component: <Signup />,
        public: false,
        permissions: ['admin']
    },
    {
        id: 7,
        route: '/books',
        component: <Signup />,
        public: false,
        permissions: ['reader']
    },
]

export default routes