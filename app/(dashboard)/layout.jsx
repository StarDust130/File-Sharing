import SideNav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";

const layout = ({ children }) => {
  return (
    <>
      <div className="hidden md:block h-full md:w-60 flex-col fixed inset-y-0 z-50">
        <SideNav />
      </div>

      <div className="md:ml-64 ">
        <TopHeader />
        {children}
      </div>
    </>
  );
};
export default layout;

//Todo: Add sidebar for small devices
