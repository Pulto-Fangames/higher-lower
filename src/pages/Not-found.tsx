import Button from "../components/Button";

function NotFound() {
  return (
    <div className="h-screen justify-center text-center">
      <div className="grid justify-center box-border text-center items-baseline pt-52">
        <span className="text-gray-200 text-4xl md:text-6xl hentai">4 0 4</span>
        <span className="mt-1 text-gray-200 text-lg md:text-xl hentai">
          존재하지 않는 페이지에요.
        </span>
      </div>
      <Button
        style="none"
        className="mt-2"
        onClick={() => {
          window.location.href = "/";
        }}
        >
        <span>돌아가기</span>
      </Button>
    </div>
  );
}

export default NotFound;