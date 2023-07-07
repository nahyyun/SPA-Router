import { useRouter } from "../hooks/useRouter";

export default function MainPage() {
  const { push } = useRouter();

  return (
    <>
      <h1>root</h1>
      <button onClick={() => push("/about")}>about</button>
    </>
  );
}
