/** Public files live under Vite's base, so /skeptic/ on GitHub Pages is included. */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
