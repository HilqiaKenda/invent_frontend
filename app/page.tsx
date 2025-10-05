"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { useState } from "react";
import { HomePage } from "@/components/HomePage";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      {/* <CartProvider> */}
      <div className="min-h-screen bg-gray-50">
        {/* <Header onOpenAuth={() => setIsAuthModalOpen(true)} /> */}
        <main>
          <HomePage />
        </main>

        {/* <CartSidebar /> */}
        {/* <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        /> */}
        {/* <Footer /> */}
      </div>
      {/* </CartProvider> */}
    </AuthProvider>
  );
}
