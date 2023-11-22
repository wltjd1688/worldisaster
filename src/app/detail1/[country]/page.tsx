import CountryInfo from "@/app/components/CountryInfo";
import LeftSidebar from "../../components/LeftSidebar";
import DisastersFilter from "@/app/components/DisastersFilter";
const Nation = () => {

  return (
      <>
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          <CountryInfo />
          <DisastersFilter/>
        </section>
      </main>
    </>
  );
};

export default Nation;
