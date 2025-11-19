export const handleCtrlClick = (e, url) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    window.open(url, "_blank");
  }
};
