import React, { useState, useEffect } from 'react';import { Heart, RefreshCw, Loader2, PawPrint } from 'lucide-react';


// Теплые, спокойные градиенты в бежево-коричневых тонах
const BACKGROUND_GRADIENTS = [
  'from-[#F9F6F0] to-[#EAE4D3]',
  'from-[#FDF8F5] to-[#E8DACB]',
  'from-[#F5F0EA] to-[#DFD3C3]',
  'from-[#FCF5E3] to-[#E3D5C8]'
];


export default function App() {
  const [dogImage, setDogImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [currentGradient, setCurrentGradient] = useState(BACKGROUND_GRADIENTS[0]);


  const getRandomGradient = () => {
    const currentIndex = BACKGROUND_GRADIENTS.indexOf(currentGradient);
    let nextIndex = Math.floor(Math.random() * BACKGROUND_GRADIENTS.length);
    if (nextIndex === currentIndex) {
      nextIndex = (nextIndex + 1) % BACKGROUND_GRADIENTS.length;
    }
    return BACKGROUND_GRADIENTS[nextIndex];
  };


  const fetchDog = async () => {
    setIsLoading(true);
    setIsLiked(false);
    setCurrentGradient(getRandomGradient());


    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Ошибка при загрузке песика:", error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchDog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleImageClick = () => {
    const audio = new Audio('https://actions.google.com/sounds/v1/animals/dog_barking.ogg');
    audio.play().catch(err => {
      console.log('Браузер заблокировал звук:', err);
    });
    setTimeout(() => {
      audio.pause();
      audio.src = '';
    }, 500);
  };


  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentGradient} transition-colors duration-1000 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden`}>
      
      {/* Декоративные элементы на фоне */}
      <div className="absolute top-12 left-12 text-[#8C7A6B]/10">
        <PawPrint className="w-24 h-24 rotate-[-15deg]" />
      </div>
      <div className="absolute bottom-16 right-12 text-[#8C7A6B]/10">
        <PawPrint className="w-32 h-32 rotate-[15deg]" />
      </div>


      {/* Шапка сайта */}
      <header className="mb-8 text-center relative z-10">
        <h1 className="text-5xl font-light tracking-tight text-[#3E2723] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          U'r daily dog
        </h1>
        <div className="inline-block border-b border-[#3E2723]/20 pb-1">
          <p className="text-[#5C4A3D] text-xs font-medium tracking-[0.2em] uppercase">
            Твоя порция радости
          </p>
        </div>
      </header>


      {/* Главная карточка */}
      <main className="w-full max-w-md relative z-10">
        <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-[2rem] p-5 shadow-[0_20px_50px_-12px_rgba(78,59,49,0.15)] transition-all duration-300">
          
          {/* Контейнер для фото */}
          <div 
            className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-[#F5F0EA] cursor-pointer group border-4 border-white/80 active:scale-95 transition-transform duration-200"
            onClick={handleImageClick}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#8C7A6B] animate-spin mb-3" />
                <span className="text-sm text-[#8C7A6B] font-medium tracking-wide">Ищем песика...</span>
              </div>
            ) : (
              <img 
                src={dogImage} 
                alt="Daily Dog" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            )}
            
            {/* Оверлей-подсказка */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-[#3E2723]/10 transition-colors duration-500 flex items-end justify-center pb-6">
              <span className="text-white opacity-0 group-hover:opacity-100 bg-[#3E2723]/60 px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                Нажми для лая
              </span>
            </div>
          </div>


          {/* Панель действий */}
          <div className="flex items-center justify-between mt-6 mb-2 px-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="group flex items-center gap-3 focus:outline-none"
            >
              <div className={`p-3.5 rounded-2xl transition-all duration-300 ${
                isLiked 
                  ? 'bg-[#E8DACB] text-[#A0522D]' 
                  : 'bg-white/60 hover:bg-white text-[#8C7A6B] hover:text-[#5C4A3D]'
              }`}>
                <Heart 
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isLiked ? 'fill-current scale-110' : 'active:scale-90'
                  }`} 
                />
              </div>
              <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isLiked ? 'text-[#A0522D]' : 'text-[#8C7A6B]'}`}>
                {isLiked ? 'В сердечке' : 'Нравится'}
              </span>
            </button>


            {/* Кнопка обновления */}
            <button 
              onClick={fetchDog}
              disabled={isLoading}
              className="p-3.5 rounded-2xl bg-white/60 text-[#8C7A6B] hover:text-[#5C4A3D] hover:bg-white transition-all duration-300 focus:outline-none disabled:opacity-50 active:scale-95"
              title="Следующий пёсик"
            >
              <RefreshCw className={`w-6 h-6 ${isLoading ? 'animate-spin text-[#A0522D]' : ''}`} />
            </button>
          </div>
        </div>
      </main>


      {/* Подвал */}
      <footer className="mt-12 text-[#8C7A6B] text-xs tracking-wider uppercase font-medium relative z-10">
        <p className="mb-1">
          понравилось? <a href="https://maxxmoto.github.io/cat-daily/" className="underline hover:text-[#3E2723] transition-colors">кошки ждут вас здесь</a>
        </p>
        <p>&copy; {new Date().getFullYear()} U'r daily dog</p>
      </footer>
    </div>
  );
}
