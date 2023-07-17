export type TProps = {
  expires: string | number | Date;
};

export const deleteCookie = (name: string) => {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
};

export const getCookie = (name: string) => {
  const regex = /([.$?*|{}()[\]\\/+^])/g;

  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(regex, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : deleteCookie(name);
};

export const setCookie = (
  name: string,
  value: string | number,
  props: TProps
) => {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};
