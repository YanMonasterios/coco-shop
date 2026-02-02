import { createBrowserRouter, Navigate } from "react-router";

import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPages } from "./shop/pages/product/ProductPages";
import { GenderPage } from "./shop/pages/gender/GenderPage";

import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";

import { Dashboard } from "./admin/pages/Dashboard/Dashboard";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";

import { lazy } from "react";


const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayouts = lazy(() => import("./admin/layouts/AdminLayouts"));

export const appRouter = createBrowserRouter([
    // public routes
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'product/:idSlug',
                element: <ProductPages />
            },
            {
                path: 'gender/:gender',
                element: <GenderPage />
            }
        ]
    },

    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/auth/login" /> 
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
        ]
    },
    // Admin routes 
    {
        path: '/admin',
        element: <AdminLayouts />,
        children: [
            {
                index: true,   
                element: <Dashboard />
            },
            {
                path: 'products',   
                element: <AdminProductsPage />
            },
            {
                path: 'products/:id',   
                element: <AdminProductPage />
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    },
])