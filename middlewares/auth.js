export function auth (req, res, next) {
  if (req.session?.email) {
    return next()
  }
  return res.redirect('/login')
}
