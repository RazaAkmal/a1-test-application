import React, { ReactElement, lazy, Suspense } from "react";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import AppDrawer from "./components/AppDrawer";
import Footer from "./components/Footer";

const ApplicationsList = lazy(() => import("./components/ApplicationLists/A1ApplicationsList"));
const CompletedList = lazy(() => import("./components/ApplicationLists/CompletedList"));
const SettingsPage = lazy(() => import("./components/Setting/Settings"));
const LoginForm = lazy(() => import("./components/LoginForm/Login"));
const MapView = lazy(() => import("./components/MapView/MapView"));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route without the drawer */}
        <Route
          path="/"
          element={
            <Suspense fallback={<div style={{ height: '100vh'}}>Loading</div>}>
              <LoginForm />
            </Suspense>
          }
        />
        {/* Routes with the drawer */}
        <Route
          path="/compliance"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div style={{ height: '100vh'}}>Loading</div>}>
                <AppDrawer>
                  <ApplicationsList />
                </AppDrawer>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/completed-application"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div style={{ height: '100vh'}}>Loading</div>}>
                <AppDrawer>
                  <CompletedList />
                </AppDrawer>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/map-view"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div style={{ height: '100vh'}}>Loading</div>}>
                <AppDrawer>
                  <MapView />
                </AppDrawer>
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Suspense fallback={<div style={{ height: '100vh'}}>Loading</div>}>
                <AppDrawer>
                  <SettingsPage />
                </AppDrawer>
              </Suspense>
            </ProtectedRoute>
          }
        />
        {/* Add more routes with the drawer as needed */}
      </Routes>
      <Footer />
    </Router>
  );
};

// A private route component to protect routes that require authentication
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = localStorage.getItem("accessToken");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children as ReactElement<any, any>;
};

export default App;
