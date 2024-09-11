// utils.js
export function getLinkPath(relativePath) {
  // Get the current page URL
  let currentPath = window.location.pathname;

  // Check how deep the current page is in the folder structure
  if (
    currentPath.includes("/pages/") ||
    currentPath.includes("/detail-pages/")
  ) {
    // If the current page is inside a subfolder, add "../" to the link
    return "../" + relativePath;
  } else {
    // If the current page is in the root (index.html), keep the link as "./"
    return "./" + relativePath;
  }
}
