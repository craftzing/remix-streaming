import { defer, type MetaFunction } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { loadImage } from "~/data/image";

export const meta: MetaFunction = () => {
  return [
    { title: "Deferred image" },
  ];
};

export const loader = async () => {
  const image = loadImage();

  return defer({ image });
}

export default function Index() {
  const { image } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div>
        <h1 className="text-2xl font-semibold text-center">
          Deferred image
        </h1>

        <div className="bg-white rounded-lg border p-1 mt-4 aspect-square flex items-center justify-center w-80">
          <Suspense fallback={<p className="text-slate-500">Loading image...</p>}>
            <Await resolve={image}>
              {(image) => <img alt="base64 encoded visual" src={`data:image/jpeg;base64,${image}`} className="object-cover rounded" />}
            </Await>
          </Suspense>
        </div>
        <div className="flex gap-3 text-white font-medium mt-4 items-center justify-center">
          <Link className="bg-slate-800 hover:bg-slate-900 rounded py-1.5 px-3" to="/">Back</Link>
        </div>
      </div>
    </div>
  );
}
