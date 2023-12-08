
import Link from "next/link";

export default async function NotFound() {

  return (<section >
    <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
      <div className="max-w-screen-sm mx-auto text-center">
        <div className="max-w-sm mx-auto text-center mt-7 card">
          <p className="font-bold mt-7 text-7xl text-md " />404 - Page Not Found<p />
          <Link className="text-sm text-gray-900 " href="/">Go to home page</Link>
        </div>
      </div>
    </div>
  </section>)


}
