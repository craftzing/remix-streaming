import { defer, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { loadImage } from "~/data/image";

export const meta: MetaFunction = () => {
  return [
    { title: "Awaited image" },
  ];
};

export const loader = async () => {
  const image = await loadImage();

  return defer({ image });
}

export default function Index() {
  const { image } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-center">
          Awaited image
        </h1>

        <div className="bg-white rounded-lg border p-1 mt-4 aspect-square flex items-center justify-center w-96">
          <img alt="base64 encoded visual" src={`data:image/jpeg;base64,${image}`} className="object-cover rounded" />
        </div>
        <div className="flex gap-3 text-white font-medium mt-4 items-center justify-center">
          <Link className="bg-slate-800 hover:bg-slate-900 rounded py-1.5 px-3" to="/">Back</Link>
        </div>
      </div>
    </div>
  );
}
