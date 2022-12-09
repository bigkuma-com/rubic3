import axios from "axios";

export function toHTTPS(str) {
  if (str.includes("http")) {
    return str.replace("http://", "https://");
  } else {
    return "https://" + str;
  }
}

export function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export function arrayChunk(array, chunkSize = 4) {
  const resultArray = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);

    resultArray.push(chunk);
  }

  return resultArray;
}

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_CMS,
  timeout: 20000,
});

export const objectToParams = (obj) => new URLSearchParams(obj).toString();

export const fetcherSWR = (...args) => fetch(...args).then((res) => res.json());

export function makeBold(input, wordsToBold) {
  return input.replace(
    new RegExp("(\\b)(" + wordsToBold.join("|") + ")(\\b)", "ig"),
    "$1<b>$2</b>$3"
  );
}