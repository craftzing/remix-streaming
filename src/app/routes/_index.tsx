import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Streaming Test" },
  ];
};

export default function Index() {

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-center">
          Remix Streaming Test
        </h1>
        <div className="flex gap-3 text-white font-medium mt-4 items-center justify-center">
          <Link className="bg-slate-800 hover:bg-slate-900 rounded py-1.5 px-3" to="/defer">Defer</Link>
          <Link className="bg-slate-800 hover:bg-slate-900 rounded py-1.5 px-3" to="/await">Await</Link>
        </div>
      </div>
    </div>
  );
}
