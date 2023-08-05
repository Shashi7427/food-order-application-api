const createTokenUser = (user) => {
  return { name: user.name,userId:user._id, _id: user._id, role: user.role,email:user.email };
};

module.exports = createTokenUser;
