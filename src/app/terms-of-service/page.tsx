import { Metadata } from "next";
import { legalDocuments } from "@/data/legal";
import LegalLayout from "@/components/LegalLayout/LegalLayout";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "Salev Tech uygulamaları ve web sitesi Kullanım Koşulları dökümanı.",
};

export default function TermsOfServicePage() {
  const doc = legalDocuments["terms-of-service"];
  return <LegalLayout document={doc} />;
}
