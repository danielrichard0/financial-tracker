import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

export default function Authenticator({ isRegister = false }: { isRegister: boolean }) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        fetch("/api/session").then((data) => {
            setAuthorized(data.ok)
            setLoading(false)
        }).catch(() => {
            setAuthorized(false)
            setLoading(false)
        })
    })
    if (loading) return null

    if (!isRegister) {
        return authorized ? <Outlet /> : <Navigate to="/login" />
    } else {
        return authorized ? <Navigate to="/" /> : <Outlet />
    }

}
