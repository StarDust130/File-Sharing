import { UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
      page
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
export default page;
