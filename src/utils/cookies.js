export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, time) => {
  const date = new Date();
  date.setTime(date.getTime() + time * 1000);
  const expires = "expires=" + date.toUTCString();
  //console.log(document.cookie);
  document.cookie = name + "=" + (value || "") + "; " + expires + "; path=/";
  //console.log(name + "=" + (value || "") + "; " + expires + "; path=/");
};
