export const debounce = <T extends (...args: any) => void>(
  func: T,
  timeout = 300,
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
