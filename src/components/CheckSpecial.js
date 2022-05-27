const CheckSpecial = (str) => {
  const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

  return regExp.test(str);
};

export default CheckSpecial;
