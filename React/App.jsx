import React, { Suspense, useState, useEffect, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import BlankLayout from "./layouts/BlankLayout";
import DashboardLayout from "./layouts/Dashboard";
import googleAnalytics from "./components/siteanalytics/googleAnalytics";
import userService from "./services/userService";

import {
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
} from "./routes/index";

const DEFAULT_USER = {
  id: 0,
  roles: [],
  email: "",
  isLoggedIn: false,
  organizationId: 0,
};

const loading = () => <div className="">loading....</div>;
const _logger = logger.extend("App");
_logger("publicProtectedFlattenRoutes", publicProtectedFlattenRoutes);
_logger("authProtectedFlattenRoutes", authProtectedFlattenRoutes);

export default function App(props) {
  const { pathname } = useLocation();
  let [currentUser, setCurrentUser] = useState(() => {
    return DEFAULT_USER;
  });

  const { state } = useLocation();

  useEffect(() => {
    if (state?.type === "LOGOUT") {
      _logger("LOGOUT");
      setCurrentUser(DEFAULT_USER);
    }
    if (state?.type === "LOGIN") {
      const user = state.payload;
      _logger("LOGIN", user);
      setCurrentUser((prevState) => {
        let update = { ...prevState };
        update.id = user.id;
        update.email = user.name;
        update.roles = user.roles;
        update.isLoggedIn = true;
        update.organizationId = parseInt(user.organizationId, 10);
        return update;
      }, []);
    }
  }, [state?.type]);

  useEffect(() => {
    userService.getCurrent().then(onGetCurrentSuccess).catch(onGetCurrentError);
  }, []);

  const onGetCurrentSuccess = (response) => {
    _logger("currentUser Success", response);
    setCurrentUser((prevState) => {
      let update = { ...prevState };
      update.id = response.item.id;
      update.email = response.item.name;
      update.roles = response.item.roles;
      update.isLoggedIn = response.isSuccessful;
      update.organizationId = parseInt(response.item.organizationId, 10);
      return update;
    }, []);
  };

  const onGetCurrentError = (error) => {
    _logger("currentUser Error", error);
  };

  useEffect(() => {
    googleAnalytics();
  }, []);

  const [currentPath, setCurrentPath] = useState({
    isPublic: false,
    isSecured: false,
    isUnknown: false,
  });

  const getRouteMapper = useCallback(
    (user) => (routeData) =>
      (
        <Route
          key={routeData.path}
          path={routeData.path}
          exact={routeData.exact}
          name={routeData.name}
          element={<routeData.element currentUser={user} />}
        />
      ),
    []
  );

  const getMappedRoutes = useCallback(
    (arrOfRouteData, user) => {
      let theseRoutes = arrOfRouteData.map(getRouteMapper(user));
      _logger("getMappedRoutes.", theseRoutes);
      return theseRoutes;
    },
    [getRouteMapper]
  );

  const currentPathCheck = (pp) => {
    let ppPath = pp?.path?.split("/").filter((el) => el !== "");
    let pathNameCheck = pathname.split("/").filter((el) => el !== "");
    let result = false;
    if (ppPath?.length === pathNameCheck.length) {
      if (pathNameCheck.length === 0) {
        result = true;
      } else {
        for (let a = 0; a < pathNameCheck.length; a++) {
          if (pathNameCheck[a] !== ppPath[a]) {
            if (
              ppPath[a].startsWith(":") &&
              pathNameCheck[a].match(/^[0-9]+$/)
            ) {
              result = true;
            } else {
              return false;
            }
          } else {
            result = true;
          }
        }
      }
    }
    return result;
  };
  //_logger(currentPathCheck(pp));

  // ensure that currentPath.path is set to true, but only if it is false AND it should be true
  useEffect(() => {
    if (publicProtectedFlattenRoutes.some((pp) => currentPathCheck(pp))) {
      if (!currentPath.isPublic) {
        setCurrentPath(() => {
          return { isSecured: false, isPublic: true };
        });
      }
    } else if (authProtectedFlattenRoutes.some((pp) => currentPathCheck(pp))) {
      if (!currentPath.isSecured) {
        setCurrentPath(() => {
          return { isPublic: false, isSecured: true };
        });
      }
    } else if (!currentPath.isUnknown) {
      setCurrentPath(() => {
        return { isUnknown: true };
      });
    }
  }, [pathname, currentPath]);

  const generateDynamicRoutes = (currentUser) => {
    _logger("generateDynamicRoutes", authProtectedFlattenRoutes);
    let routes = authProtectedFlattenRoutes.filter((route) => {
      if (route.roles?.length === 0) {
        return true; //all any loggedIn user to see routes that have empty roles
      }
      return route.roles?.some((role) => currentUser.roles?.includes(role));
    });
    _logger("generateDynamicRoutes", routes);

    return getMappedRoutes(routes, currentUser);
  };

  const getLast = (arr) => {
    return [arr[arr.length - 1]];
  };

  _logger("render", {
    pathname,
    currentUser,
    currentPath: JSON.stringify(currentPath),
  });
  return (
    <div>
      <Suspense fallback={loading()}>
        {/* if the path is public we do not care about the current User  */}
        {currentPath.isPublic && (
          <BlankLayout {...props} currentUser={currentUser}>
            <Routes>
              {getMappedRoutes(publicProtectedFlattenRoutes, currentUser)}
            </Routes>
          </BlankLayout>
        )}

        {/* if the user is logged in and attempting to go to an KNOWN page, that is is also secure/not public  */}
        {currentUser.isLoggedIn &&
          !currentPath.isPublic &&
          !currentPath.isUnknown && (
            <DashboardLayout {...props} currentUser={currentUser}>
              <Routes>{generateDynamicRoutes(currentUser)}</Routes>
            </DashboardLayout>
          )}

        {/* if the user is not logged in and attempting to go to an KNOWN page, that is is also secure/not public  */}
        {!currentUser.isLoggedIn &&
          !currentPath.isPublic &&
          !currentPath.isUnknown && (
            <BlankLayout {...props} currentUser={currentUser}>
              <Routes>{generateDynamicRoutes(currentUser)}</Routes>
            </BlankLayout>
          )}

        {/* we do not know this url , and so the user status does not matter */}
        {currentPath.isUnknown && (
          <BlankLayout {...props} currentUser={currentUser}>
            <Routes>
              {getMappedRoutes(
                getLast(publicProtectedFlattenRoutes),
                currentUser
              )}
            </Routes>
          </BlankLayout>
        )}
      </Suspense>
    </div>
  );
}
