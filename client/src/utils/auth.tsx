import { Outlet } from "react-router";

export default async function Authenticator() {
    const res = await fetch("/api/login", {
        credentials: "include",
        method: "GET",
    })
}