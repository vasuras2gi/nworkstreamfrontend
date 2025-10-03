import { Navigate, Route, Routes } from "react-router";
import React, { lazy, Suspense } from 'react'

const SignUpPage = lazy(() => import('./pages/SignUpPage.jsx'));
// import SignUpPage from "./pages/SignUpPage.jsx";

const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
// import LoginPage from "./pages/LoginPage.jsx";

const NotificationsPage = lazy(() => import('./pages/NotificationsPage.jsx'));
// import NotificationsPage from "./pages/NotificationsPage.jsx";

const CallPage = lazy(() => import('./pages/CallPage.jsx'));
// import CallPage from "./pages/CallPage.jsx";

const ChatPage = lazy(() => import('./pages/ChatPage.jsx'));
// import ChatPage from "./pages/ChatPage.jsx";

const OnboardingPage = lazy(() => import('./pages/OnboardingPage.jsx'));
// import OnboardingPage from "./pages/OnboardingPage.jsx";

const PageLoader = lazy(() => import('./components/PageLoader.jsx'));
// import PageLoader from "./components/PageLoader.jsx";

const Profilepage = lazy(() => import('./pages/Profilepage.jsx'));
// import Profilepage from "./pages/Profilepage.jsx";

const Layout = lazy(() => import('./components/Layout.jsx'));
// import Layout from "./components/Layout.jsx";

const Post = lazy(() => import('./pages/Post.jsx'));
// import Post from "./pages/Post.jsx";

const CompHomePage = lazy(() => import('./pages/CompHomePage.jsx'));
// import CompHomePage from "./pages/compHomePage.jsx";

import useAuthUser from "./hooks/useAuthUser.js";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";
// import UserSearchB from "./components/userSearchBar.jsx";


const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  const API = import.meta.env.VITE_API_URL;
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    // 1. Remove 'h-screen' here. This allows the content to dictate the page height.
    <div data-theme={theme} className="text-white min-h-screen"> 
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <Post/>
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <NotificationsPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/call/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <CallPage />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={false}>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/friends"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <CompHomePage/>
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <Profilepage/>
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
};
export default App;