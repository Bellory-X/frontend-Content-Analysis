import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userApi } from '../redux/api/userApi';
import FullScreenLoader from './FullScreenLoader';


/**
 * Сравнивает роль текущего пользователя и проверяет разрешена ли она для компонента.
 *
 * allowedRoles -- массив разрешенных полей
 */

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const [cookies] = useCookies(['logged_in']);
    const logged_in = cookies.logged_in;

    const { data: user } = userApi.endpoints.getMe.useQuery(null, {
        skip: !logged_in,       // если пользователь не вошел в систему, то запрос пропускается.
    });

    const location = useLocation();

    // Если данные о пользователе еще не подгружены, то отображаем процесс загрузки.
    if (logged_in && !user) {
        return <FullScreenLoader />;
    }

    return logged_in ? (
        <Outlet />
    ) : logged_in && user ? (
        <Navigate to='/unauthorized' state={{ from: location }} replace />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default RequireUser;