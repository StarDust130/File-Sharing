import Headers from "./_components/Header";
import HeroBanner from "./_components/HeroBanner";

import { UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
      <Headers />
      <HeroBanner />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
export default page;
