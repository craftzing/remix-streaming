import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Streaming Test" },
  ];
};

export const loader = async () => {
  return defer({
    something: "else",
    foo: new Promise((resolve) => setTimeout(() => resolve("bar"), 2000)),
  });
}

export default function Index() {
  const { foo, something } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-center">
          Remix Streaming Test
        </h1>

        <div className="bg-white rounded-lg border p-1 mt-4 aspect-square flex items-center justify-center w-96">
          <p>something: {something}</p>
          <Suspense fallback={<p className="text-slate-500">Loading foo...</p>}>
            <Await resolve={foo}>
              {(foo) => <p className="text-slate-500">Foo: {foo as string}</p>}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
