import React from "react";
import HeroSinglePost from "./HeroSinglePost";
import { Possibilities } from "./Possibilities";
import { ConnectTools } from "./ConnectTools";
import { PopularIntegrations } from "./PopularIntegrations";
import FAQ from "../FAQ";

const SinglePost = ({ post }) => {
  // Supondo que post tem post.acf
  const { acf } = post;

  console.log(acf.app_title);
  console.log(acf.app_trigger);

  return (
    // Transformamos o fundo bg-white no fundo oficial da FiqOn Dark
    <div className="min-h-screen w-full bg-[#0A0F0D] text-white font-['Poppins',sans-serif] overflow-hidden">

      <section className="w-full flex justify-center pb-10">
        <div className="w-full flex flex-col">
          <HeroSinglePost post={post} />
        </div>
      </section>

      {/* Section veja as possibilidades  */}
      <section className="w-full flex justify-center pb-10">
        <div className="max-w-[1280px] w-full flex flex-col px-[24px] md:px-[40px] xl:px-[60px]">
          <Possibilities />
        </div>
      </section>

      {/* Section Conecte qualquer ferramenta  */}
      <section className="w-full flex justify-center pb-10">
        <div className="max-w-[1280px] w-full flex flex-col px-[24px] md:px-[40px] xl:px-[60px]">
          <ConnectTools />
        </div>
      </section>

      {/* Section Integrações populares  */}
      {/* <section className="w-full flex justify-center pb-10">
        <div className="max-w-[1280px] w-full flex flex-col">
          <PopularIntegrations />
        </div>
      </section> */}

      {/* Section FAQ (Adicionada borda sutil no topo) */}
      <section className="w-full flex justify-center py-10 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] w-full flex flex-col px-[24px] md:px-[40px] xl:px-[60px]">
          <FAQ />
        </div>
      </section>

    </div>
  );
};

export default SinglePost;