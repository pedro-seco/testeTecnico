import CreateMapPageBar from "@/src/components/features/CreateMapPageBar/CreateMapPageBar";

export default function createMapPage() {
    return(
        <div className="h-screen p-2 sm:p-6">
          <main className="flex h-full w-full items-center justify-center ">
            <CreateMapPageBar/>
          </main>
        </div>
    );
}