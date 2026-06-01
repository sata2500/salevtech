"use client";

import { useEffect, useRef } from "react";
import styles from "./AdminModal.module.css";

export interface AdminModalProps {
  isOpen: boolean;
  type?: "confirm" | "alert";
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "primary" | "danger" | "success" | "warning";
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
}

export default function AdminModal({
  isOpen,
  type = "confirm",
  title,
  message,
  confirmText = "Onayla",
  cancelText = "İptal",
  variant = "primary",
  onConfirm,
  onCancel,
  onClose,
  closeOnOverlayClick = true,
}: AdminModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus modal container on open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const getVariantButtonClass = () => {
    switch (variant) {
      case "danger":
        return styles.btnDanger;
      case "success":
        return styles.btnSuccess;
      case "warning":
        return styles.btnWarning;
      default:
        return styles.btnPrimary;
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`${styles.modal} glass`}
        id="admin-confirm-modal"
      >
        <div className={styles.header}>
          <h2 id="admin-modal-title" className={styles.title}>
            {title}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Kapat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.message}>{message}</p>
        </div>

        <div className={styles.footer}>
          {type === "confirm" ? (
            <>
              <button
                type="button"
                className={styles.btnCancel}
                onClick={onCancel || onClose}
              >
                {cancelText}
              </button>
              <button
                type="button"
                className={`${styles.btnAction} ${getVariantButtonClass()}`}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              type="button"
              className={`${styles.btnAction} ${getVariantButtonClass()}`}
              onClick={onClose}
            >
              Tamam
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
