import { Metadata } from "next";
import { legalDocuments } from "@/data/legal";
import LegalLayout from "@/components/LegalLayout/LegalLayout";

export const metadata: Metadata = {
  title: "KVKK & GDPR Aydınlatma Metni",
  description: "Salev Tech uygulamaları ve web sitesi KVKK & GDPR Aydınlatma Metni dökümanı.",
};

export default function GDPRPage() {
  const doc = legalDocuments["gdpr"];
  return <LegalLayout document={doc} />;
}
