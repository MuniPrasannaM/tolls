import HomePage from './views/HomePage/HomePage';
import TollsPage from './views/TollsPage/TollsPage';
import EntryForm from './WidgetComponents/EntryForm/EntryForm';

const routes = [
    {
        path:'/home',
        component:HomePage,
        layout:"/admin"
    },
    {
        path:"/tolls",
        component: TollsPage,
        layout:"/admin"
    },
    {
        path:"/entry",
        component: EntryForm,
        layout:"/admin"
    }
];

export default routes;