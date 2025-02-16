export async function checkRole() {
    const res = await fetch("/api/check-role");
    const data = await res.json();
    return data.isAdmin;
}
