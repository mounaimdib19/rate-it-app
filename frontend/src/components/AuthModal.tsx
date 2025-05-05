import React from 'react';
import Modal from 'react-modal';
import { X } from 'lucide-react';
import './AuthModal.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="auth-modal"
      overlayClassName="auth-modal-overlay"
    >
      <button onClick={onClose} className="auth-close-button">
        <X />
      </button>
      
      <h2 className="auth-title">Sign in to post your review</h2>
      
      <div className="auth-buttons">
        <button className="auth-button auth-button-google">
          Continue with Google
        </button>
        <button className="auth-button auth-button-apple">
          Continue with Apple
        </button>
        <button className="auth-button auth-button-facebook">
          Continue with Facebook
        </button>
        
        <div className="auth-divider">
          <span className="auth-divider-text">or</span>
        </div>
        
        <button className="auth-button auth-button-email">
          Continue with email
        </button>
      </div>
      
      <p className="auth-terms">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </Modal>
  );
};