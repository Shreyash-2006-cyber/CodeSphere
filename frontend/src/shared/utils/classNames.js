// Tiny classnames helper — joins truthy class values, skips the rest.
export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
