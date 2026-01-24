export const getUserFromLocalStorage = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
};
