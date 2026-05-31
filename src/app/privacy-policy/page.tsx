import { Metadata } from "next";
import { legalDocuments } from "@/data/legal";
import LegalLayout from "@/components/LegalLayout/LegalLayout";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Salev Tech uygulamaları ve web sitesi Gizlilik Politikası dökümanı.",
};

export default function PrivacyPolicyPage() {
  const doc = legalDocuments["privacy-policy"];
  return <LegalLayout document={doc} />;
}
