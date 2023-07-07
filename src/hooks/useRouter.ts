export function useRouter() {
  const push = (path: string, state?: unknown) => {
    history.pushState(state, "", path);

    dispatchEvent(new PopStateEvent("popstate", { state }));
  };

  return { push };
}
