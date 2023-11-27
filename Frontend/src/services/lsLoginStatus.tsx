export const getLoginStatus = () => {
  return localStorage.getItem("loginStatus")
}

export const setLoginStatus = (status: boolean) => {
  localStorage.setItem("loginStatus", "" + status)
}

export const removeLoginStatus = () => {
  localStorage.removeItem("loginStatus")
}
