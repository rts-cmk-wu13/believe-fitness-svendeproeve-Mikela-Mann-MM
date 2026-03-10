

export default function Footer() {
  return (
    <footer className="content-wrapper py-10 text-center border-t border-(--grey-border)">
      {/* "Logo" */}


      <p className="text-2xl font-black leading-tight mb-1 text-(--brand-yellow)">
        Believe Fitness
      </p>
      <p className="text-sm font-bold mb-6 text-(--brand-black)">
        Train like a pro
      </p>

      {/* Contact info */}

      <div className="flex flex-col gap-1">
        <p className="text-sm text-(--grey-dark)">
          Rabalderstræde 48 · 4000 Roskilde
        </p>
        <p className="text-sm text-(--grey-dark)">
          hello@believe-fitness.com
        </p>
      </div>
    </footer>
  );
} 