import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Streaming Test" },
  ];
};

export default function Index() {
  return (
    <div className="p-12">
      <h1>Welcome to Remix</h1>
    </div>
  );
}
