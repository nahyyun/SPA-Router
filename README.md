## React와 History API 사용하여 SPA Router 기능 구현하기

## 요구사항

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```tsx
const { push } = useRouter();
```


<br/>


## 구현 내용

**1) Router Component**
- Context로 location path 상태 관리
- popState 이벤트 발생 시마다 location path 변경

```tsx
export default function Router({ children }: RouterProps) {
  const [locationPath, setLocationPath] = useState(location.pathname);

  useEffect(() => {
    const onPopStateHandler = () => {
      setLocationPath(location.pathname);
    };

    window.addEventListener("popstate", onPopStateHandler);

    return () => window.removeEventListener("popstate", onPopStateHandler);
  }, []);

  return (
    <LocationContext.Provider value={{ locationPath }}>
      {children}
    </LocationContext.Provider>
  );
}
```
**2) Route Component**

- 올바르지 않은 Path, React Element 인 경우 에러 처리
- 현재 location path와 일치하는 Route path 인 경우 해당 Component 렌더링

```tsx
export default function Route({ path, component }: RouteProps) {
  if (!path) {
    throw new Error("required valid route path");
  }

  if (!React.isValidElement(component)) {
    throw new Error("required valid react element");
  }

  const { locationPath } = useContext(LocationContext);

  return path === locationPath ? component : null;
}
```

**3) useRouter custom hook**
- 페이지 이동 시 pushState를 통해 url 변경
- popState 이벤트를 trigger하여 location path 상태 변경

```tsx
export function useRouter() {
  const push = (path: string, state?: unknown) => {
    history.pushState(state, "", path);

    dispatchEvent(new PopStateEvent("popstate", { state }));
  };

  return { push };
}
```

**4) 결과**

<img width="400" height="350" alt="image" src="https://github.com/nahyyun/SPA-Router/assets/86196026/0b4197c5-2932-472d-9fe3-90a9cc57d22b">
<img width="400" height="350" alt="image" src="https://github.com/nahyyun/SPA-Router/assets/86196026/86ec3d62-a345-43df-be1d-75f5879d1e84">
