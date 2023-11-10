import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Streaming Test" },
  ];
};

export const loader = async () => {
  const image = new Promise(async (resolve) => {
    const response = await fetch("https://upload.wikimedia.org/wikipedia/commons/b/b6/TORTOR2.jpg")
    const data = Buffer.from(await response.arrayBuffer()).toString("base64");

    // make it artificially slow
    await new Promise((resolve) => setTimeout(resolve, 2000));

    resolve(data);
  });

  return defer({ image });
}

export default function Index() {
  const { image } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-center">
          Remix Streaming Test
        </h1>

        <div className="bg-white rounded-lg border p-1 mt-4 aspect-square flex items-center justify-center">
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={image}>
              {(image) => <img alt="Beeple" src={`data:image/jpeg;base64,${image}`} className="object-cover rounded" />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
