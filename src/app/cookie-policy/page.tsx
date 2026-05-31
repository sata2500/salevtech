import { Metadata } from "next";
import { legalDocuments } from "@/data/legal";
import LegalLayout from "@/components/LegalLayout/LegalLayout";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Salev Tech uygulamaları ve web sitesi Çerez Politikası dökümanı.",
};

export default function CookiePolicyPage() {
  const doc = legalDocuments["cookie-policy"];
  return <LegalLayout document={doc} />;
}
