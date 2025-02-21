import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import ConsumptionMethodOption from "./components/Consumption-method-option";

//poderia exportar e criar essa pagina por boas praticas, por agora não ha necessidade
//import { getRestaurantBySlug } from "../data/get-restaurant-by-slgu";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}
//nome nao precisa ser slug, mas deve estar entre conchetes
// os componentes podem async
// server componentes nçao podem ter interantividade
// não pode usar hooks
const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await db.restaurant.findFirst({ where: { slug: slug } });
  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          height={82}
          width={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="space-y-2 pt-24 text-center ">
        <h3 className="text-2xl font-semibold">Seja Bem vindo!</h3>
        <p className="opacity-55">
          Escolha como quer aproveitar sua refeição. Estamos oferecendo
          praticidade e sabor em cada detalhe.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          option="DINE_IN"
          buttonText="Para comer aqui"
          imageAlt="Comer aqui"
          imageUrl="/dine_in.png"
        />
        <ConsumptionMethodOption
          slug={slug}
          option="TAKEAWAY"
          buttonText="Para levar"
          imageAlt="Para levar"
          imageUrl="/takeaway.png"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
