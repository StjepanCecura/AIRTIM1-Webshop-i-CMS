export const getLoginStatus = () => {
  return localStorage.getItem("loginStatus")
}

export const setLoginStatus = (status: boolean) => {
  console.log("TU SAM - > ", status)
  localStorage.setItem("loginStatus", "" + status)
}

export const removeLoginStatus = () => {
  localStorage.removeItem("loginStatus")
}
