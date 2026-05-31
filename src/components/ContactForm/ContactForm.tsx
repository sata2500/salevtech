"use client";

import React, { useState } from "react";
import { submitContactMessageAction } from "@/app/admin/actions";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await submitContactMessageAction(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.contactCard} glass`} id="contact-form-container">
      {submitted ? (
        <div className={styles.successMsg} id="contact-success-msg">
          Mesajınız başarıyla iletildi! En kısa sürede sizinle iletişime geçeceğiz.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="contact-name" className={styles.label}>
              Adınız / Firma Adı
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınızı girin"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-email" className={styles.label}>
              E-posta Adresi
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="contact-message" className={styles.label}>
              Mesajınız
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              className={styles.textarea}
              value={formData.message}
              onChange={handleChange}
              placeholder="Bize nasıl yardımcı olabileceğimizi anlatın..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
            id="contact-submit-btn"
          >
            {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
          </button>
        </form>
      )}
    </div>
  );
}
