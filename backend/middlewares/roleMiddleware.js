const roleAuthorised = (...role)=>{
  return (req, res, next) => {
    const userMatch = role.includes(req.user.role)
    if (!userMatch) {
      return res.status(403).json({ message: "Forbidden-role mismatch" });
    }
    next()
  }

}

module.exports = roleAuthorised