export const navigateTo = (to) => {
  const element = document.getElementById(to);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
