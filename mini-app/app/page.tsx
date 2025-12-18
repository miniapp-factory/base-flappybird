import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import Head from 'next/head';

export { generateMetadata };

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return (
    <>
      <Head>
        <meta name="base:app_id" content="693fbbf1d19763ca26ddc2f7" />
      </Head>
      <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
        <span className="text-2xl">{title}</span>
        <span className="text-muted-foreground">{description}</span>
      </main>
    </>
  );
}
