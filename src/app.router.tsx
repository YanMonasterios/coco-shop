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
import { AdminUsersPage } from "./admin/pages/users/AdminUsersPage";
import { AdminUserCreatePage } from "./admin/pages/users/AdminUserCreatePage";
import { ChangePasswordPage } from "./auth/pages/password/ChangePasswordPage";
import { lazy } from "react";

// IMPORTAMOS EL COMPONENTE QUE ACABAMOS DE CREAR
import { PrivateRoute } from "./auth/components/PrivateRoute"; 

const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayouts = lazy(() => import("./admin/layouts/AdminLayouts"));

export const appRouter = createBrowserRouter([
    // Rutas Públicas (Tienda)
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'product/:idSlug', element: <ProductPages /> },
            { path: 'gender/:gender', element: <GenderPage /> }
        ]
    },

    // Rutas de Autenticación
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { index: true, element: <Navigate to="/auth/login" /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'change-password', element: <ChangePasswordPage /> }
        ]
    },

    // Rutas de Admin (Protegidas)
    {
        path: '/admin',
        element: <PrivateRoute />, // Usamos el componente importado
        children: [
            {
                element: <AdminLayouts />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: 'products', element: <AdminProductsPage /> },
                    { path: 'products/new', element: <AdminProductPage /> },
                    { path: 'products/:id', element: <AdminProductPage /> },
                    { path: 'users', element: <AdminUsersPage /> },
                    { path: 'users/new', element: <AdminUserCreatePage /> },
                ]
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    },
]);
