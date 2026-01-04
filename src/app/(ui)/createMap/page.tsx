import CreateMapPageBar from "@/src/components/features/CreateMapPageBar/CreateMapPageBar";
import NavBar from "../../../components/layouts/NavBar";

export default function createMapPage() {

    return(
        <div className="min-h-screen bg-[#232121] text-white font-sans p-2 sm:p-6">
          <NavBar/>
          <main className="grow flex items-center justify-center w-full">
            <CreateMapPageBar/>
          </main>
        </div>
    )
}