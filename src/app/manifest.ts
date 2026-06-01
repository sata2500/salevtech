import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Salev Tech — Android Uygulamalar",
    short_name: "Salev Tech",
    description: "Salev Tech tarafından geliştirilen yenilikçi Android uygulamalarını keşfedin.",
    start_url: "/",
    display: "standalone",
    background_color: "hsl(222, 28%, 7%)",
    theme_color: "hsl(190, 100%, 50%)",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["technology", "utilities"],
    lang: "tr",
  };
}
