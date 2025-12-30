import { prisma } from "./lib/prisma";

export default async function Home() {
  const maps = await prisma.mapas.findMany({
    include:{
      pontos: true,
    }
  });
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 text-black">
      <h1 className="text-4xl font-bold mb-8 font-sans">
        Meus Mapas
      </h1>
      <ol className="list-decimal list-inside font-sans">
        {maps.map((mapas) => (
          <li key={mapas.id} className="mb-2">
            {mapas.name}

          </li>
        ))}
      </ol>
    </div>
  );
}