

import { getSession } from "@/lib/session";
import Header from "@/components/ui/Header";

export const metadata = {
  title: "Believe Fitness",
  description: "Your fitness journey starts here. Join us at Believe Fitness for expert-led classes, personalized training, and a supportive community. Achieve your goals with us today!",
};

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <Header isLoggedIn={!!session} />
        {children}
        </>
    );
} 