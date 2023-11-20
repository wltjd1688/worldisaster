import LeftSidebar from "../components/LeftSidebar"

export default function Nation() {
  return (
    <>
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          <div className='w-full max-w-7xl'>국가 별 페이지 입니다.</div>
        </section>
      </main>
    </>
  )
}