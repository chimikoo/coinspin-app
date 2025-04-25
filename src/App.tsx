import CoinFlip from './components/CoinFlip';

export default function Home() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-200 via-white to-purple-200 px-4"
      role="main"
      aria-label="Main section containing the Coin Flip game"
    >
      <section
        className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-2xl h-[650px] flex flex-col items-center justify-start animate-fade-in sm:px-8"
        aria-labelledby="coinflip-heading"
      >
        <header className="flex items-center justify-center mb-6">
          <h1
            id="coinflip-heading"
            className="text-4xl font-bold text-gray-800 text-center"
          >
            Coin Spin Showdown
          </h1>
        </header>

        <CoinFlip />
      </section>
    </main>
  );
}
