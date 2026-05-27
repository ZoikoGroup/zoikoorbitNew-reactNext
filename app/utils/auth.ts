export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("zoikoorbit_token");
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("zoikoorbit_user");
  return user ? JSON.parse(user) : null;
};

export const logout = async () => {
  localStorage.removeItem("zoikoorbit_token");
  localStorage.removeItem("zoikoorbit_user");
  try {
    const { signOut } = await import('next-auth/react');
    await signOut({ callbackUrl: '/login' });
  } catch (e) {
    window.location.href = '/login';
  }
};
