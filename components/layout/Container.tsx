"use client"

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
      {children}
    </div>
  );
}