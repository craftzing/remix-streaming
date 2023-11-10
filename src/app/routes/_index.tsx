import { defer, type MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { sleep } from "radash";
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
    await sleep(2000);

    resolve(data);
  });

  return defer({ image, alt: 'Beeple' });
}

export default function Index() {
  const { image, alt } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-center">
          Remix Streaming Test
        </h1>

        <div className="bg-white rounded-lg border p-1 mt-4 aspect-square flex items-center justify-center w-96">
          <Suspense fallback={<p className="text-slate-500">Loading {alt} image...</p>}>
            <Await resolve={image}>
              {(image) => <img alt={alt} src={`data:image/jpeg;base64,${image}`} className="object-cover rounded" />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
