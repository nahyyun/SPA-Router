import { useRouter } from "../hooks/useRouter";

export default function AboutPage() {
  const { push } = useRouter();

  return (
    <>
      <h1>about</h1>
      <button onClick={() => push("/")}>go main</button>
    </>
  );
}
