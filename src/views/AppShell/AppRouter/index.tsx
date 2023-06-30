import { Routes, Route } from 'react-router-dom';
import NotFound from '../../NotFound';
import Home from '../../Home';
import './app-router.scss';

function AppRouter() {
    return (
        <div className="AppRouter">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default AppRouter;
