import * as R from "ramda";

export const asyncTap = R.curry((func, arg) => {
  return func(arg)
    .then(R.always(arg))
    .catch(R.always(arg));
});
