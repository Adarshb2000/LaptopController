export const websitePassword = 'Lazy.'

export const checkPassword = () => {
  if (localStorage.getItem('password') !== websitePassword)
    window.location.href = '/login'
}
