export function toHTTPS(str) {
  if (str.includes("http")) {
    return str.replace("http://", "https://");
  } else {
    return "https://" + str;
  }
}
