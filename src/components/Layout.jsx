import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useEffect} from 'react';

const Layout = () => {
  const {user} = useUserContext();
  const {handleAutoLogin} = useUserContext();
  useEffect(() => {
    handleAutoLogin();
  }, []);
  return (
    <div>
      <nav>
        <ul className="flex justify-end overflow-hidden bg-stone-700">
          <li>
            <Link
              className="block bg-stone-700 p-4 text-center text-stone-50 hover:bg-stone-950"
              to="/"
            >
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  className="block bg-stone-700 p-4 text-center text-stone-50 hover:bg-stone-950"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="block bg-stone-700 p-4 text-center text-stone-50 hover:bg-stone-950"
                  to="/upload"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  className="block bg-stone-700 p-4 text-center text-stone-50 hover:bg-stone-950"
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                className="block bg-stone-700 p-4 text-center text-stone-50 hover:bg-stone-950"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
