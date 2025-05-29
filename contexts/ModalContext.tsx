import React, { createContext, useContext, useState } from "react";
import CustomModal, { ModalType } from "../components/ui/CustomModal";

interface ModalContextProps {
  showModal: (props: {
    title: string;
    message: string;
    type?: ModalType;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => void;
  hideModal: () => void;
  // Shorthand methods
  showSuccess: (title: string, message: string, onClose?: () => void) => void;
  showError: (title: string, message: string, onClose?: () => void) => void;
  showInfo: (title: string, message: string, onClose?: () => void) => void;
  showConfirm: (
    title: string,
    message: string,
    onConfirm: () => void,
    options?: {
      confirmText?: string;
      cancelText?: string;
    }
  ) => void;
}

interface ModalState {
  visible: boolean;
  title: string;
  message: string;
  type: ModalType;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const initialState: ModalState = {
  visible: false,
  title: "",
  message: "",
  type: "info",
};

export const ModalContext = createContext<ModalContextProps>(
  {} as ModalContextProps
);

export const useModal = () => useContext(ModalContext);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalState>(initialState);

  const showModal = ({
    title,
    message,
    type = "info",
    onConfirm,
    confirmText,
    cancelText,
  }: {
    title: string;
    message: string;
    type?: ModalType;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => {
    setModalState({
      visible: true,
      title,
      message,
      type,
      onConfirm,
      confirmText,
      cancelText,
    });
  };

  const hideModal = () => {
    setModalState({ ...modalState, visible: false });
  };

  // Shorthand methods for different modal types
  const showSuccess = (
    title: string,
    message: string,
    onClose?: () => void
  ) => {
    showModal({
      title,
      message,
      type: "success",
      onConfirm: onClose,
    });
  };

  const showError = (title: string, message: string, onClose?: () => void) => {
    showModal({
      title,
      message,
      type: "error",
      onConfirm: onClose,
    });
  };

  const showInfo = (title: string, message: string, onClose?: () => void) => {
    showModal({
      title,
      message,
      type: "info",
      onConfirm: onClose,
    });
  };

  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    options?: { confirmText?: string; cancelText?: string }
  ) => {
    showModal({
      title,
      message,
      type: "confirm",
      onConfirm,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
        showSuccess,
        showError,
        showInfo,
        showConfirm,
      }}
    >
      {children}
      <CustomModal
        visible={modalState.visible}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
        onClose={hideModal}
        onConfirm={modalState.onConfirm}
        confirmText={modalState.confirmText}
        cancelText={modalState.cancelText}
      />
    </ModalContext.Provider>
  );
};

export default ModalProvider;
