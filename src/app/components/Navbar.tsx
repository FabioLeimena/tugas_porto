import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-8 fixed top-0 left-0 z-50
      bg-black/30 backdrop-blur backdrop-saturate-150 shadow-md">
      <div className="flex items-center gap-2">
        <Image src="/next.svg" alt="Logo" width={60} height={20} />
      </div>
       <ul className="flex gap-10">
        <li>
          <a href="/" className="hover:text-blue-600 font-medium">Home</a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-600 font-medium">About</a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-600 font-medium">Project</a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-600 font-medium">Contact</a>
        </li>
      </ul>
     {/* <button
  className="text-white font-semibold py-2 px-10 rounded backdrop-blur"
  style={{ backgroundColor: "#567c8d" }}>
  oke
</button> */}

    </nav>
  );
}