const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div
        className="h-20 w-20 animate-spin rounded-full 
        border-b-2 border-t-2 border-blue-500 border-opacity-80
      "
      ></div>
    </div>
  );
};

export default Loading;
