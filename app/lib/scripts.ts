import { prisma } from "./prisma"

async function main() {
  // Criar mapa com POI
  const mapas = await prisma.mapas.create({
    data: {
        name: 'Rio de Janeiro',
        pontos: {
            create: {
                titulo: 'BRT Taquara',
                lat: 20000,
                long: 30000,
            }
        }
    },
    include: {
      pontos: true,
    },
  })
  console.log('Mapa criado: ', mapas)

  // Pega todos os mapas com seus respectivos POIs
  const allMapas = await prisma.mapas.findMany({
    include: {
      pontos: true,
    },
  })
  console.log('All users:', JSON.stringify(allMapas, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })