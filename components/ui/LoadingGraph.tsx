export default function LoadingGraph() {
  return (
    <div className="flex justify-center items-center h-calc-mobile md:h-calc">
      <div
        role="status"
        className=" bg-white max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6"
      >
        <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2.5"></div>
        <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full "></div>
        <div className="flex items-baseline mt-4 space-x-6">
          <div className="w-full bg-gray-200 rounded-t-lg h-72 "></div>
          <div className="w-full h-56 bg-gray-200 rounded-t-lg "></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 "></div>
          <div className="w-full h-64 bg-gray-200 rounded-t-lg "></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-80 "></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 "></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-80 "></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
