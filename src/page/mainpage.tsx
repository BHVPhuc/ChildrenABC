import { useState, useEffect } from 'react';
import { Volume2, RefreshCcw, Trophy, Star, Sparkles } from 'lucide-react';

// Danh sách từ vựng đầy đủ kèm Emoji minh họa và nghĩa Tiếng Việt
const VOCABULARY_DATA = [
  // A
  { word: 'apple', image: '🍎', meaning: 'Quả táo' },
  { word: 'alligator', image: '🐊', meaning: 'Con cá sấu' },
  { word: 'ax', image: '🪓', meaning: 'Cái rìu' },
  { word: 'ant', image: '🐜', meaning: 'Con kiến' },
  // B
  { word: 'bed', image: '🛏️', meaning: 'Cái giường' },
  { word: 'bear', image: '🐻', meaning: 'Con gấu' },
  { word: 'banana', image: '🍌', meaning: 'Quả chuối' },
  { word: 'bird', image: '🐦', meaning: 'Con chim' },
  // C
  { word: 'cat', image: '🐱', meaning: 'Con mèo' },
  { word: 'cup', image: '☕', meaning: 'Cái cốc' },
  { word: 'car', image: '🚗', meaning: 'Xe hơi' },
  { word: 'computer', image: '💻', meaning: 'Máy tính' },
  // D
  { word: 'duck', image: '🦆', meaning: 'Con vịt' },
  { word: 'desk', image: '🪑', meaning: 'Cái bàn' },
  { word: 'dog', image: '🐶', meaning: 'Con chó' },
  { word: 'doll', image: '🎎', meaning: 'Búp bê' },
  // E
  { word: 'egg', image: '🥚', meaning: 'Quả trứng' },
  { word: 'elbow', image: '💪', meaning: 'Khuỷu tay' },
  { word: 'envelope', image: '✉️', meaning: 'Phong bì' },
  { word: 'elephant', image: '🐘', meaning: 'Con voi' },
  // F
  { word: 'fish', image: '🐟', meaning: 'Con cá' },
  { word: 'fan', image: '💨', meaning: 'Cái quạt' },
  { word: 'farm', image: '🚜', meaning: 'Nông trại' },
  { word: 'fork', image: '🍴', meaning: 'Cái nĩa' },
  // G
  { word: 'gorilla', image: '🦍', meaning: 'Con khỉ đột' },
  { word: 'girl', image: '👧', meaning: 'Bé gái' },
  { word: 'goat', image: '🐐', meaning: 'Con dê' },
  { word: 'gift', image: '🎁', meaning: 'Hộp quà' },
  // H
  { word: 'hotdog', image: '🌭', meaning: 'Bánh mì xúc xích' },
  { word: 'horse', image: '🐴', meaning: 'Con ngựa' },
  { word: 'house', image: '🏠', meaning: 'Ngôi nhà' },
  { word: 'hat', image: '🎩', meaning: 'Cái mũ' },
  // I
  { word: 'insect', image: '🐞', meaning: 'Côn trùng' },
  { word: 'ink', image: '✒️', meaning: 'Mực' },
  { word: 'iguana', image: '🦎', meaning: 'Kỳ nhông' },
  { word: 'igloo', image: '🛖', meaning: 'Lều tuyết' },
  // J
  { word: 'jet', image: '✈️', meaning: 'Máy bay' },
  { word: 'jam', image: '🍯', meaning: 'Mứt' },
  { word: 'juice', image: '🧃', meaning: 'Nước ép' },
  { word: 'jacket', image: '🧥', meaning: 'Áo khoác' },
  // K
  { word: 'kite', image: '🪁', meaning: 'Con diều' },
  { word: 'kangaroo', image: '🦘', meaning: 'Chuột túi' },
  { word: 'king', image: '👑', meaning: 'Vua' },
  { word: 'key', image: '🔑', meaning: 'Chìa khóa' },
  // L
  { word: 'lion', image: '🦁', meaning: 'Sư tử' },
  { word: 'lemon', image: '🍋', meaning: 'Quả chanh' },
  { word: 'leaf', image: '🍃', meaning: 'Chiếc lá' },
  { word: 'lamp', image: '🛋️', meaning: 'Đèn ngủ' },
  // M
  { word: 'monkey', image: '🐵', meaning: 'Con khỉ' },
  { word: 'money', image: '💰', meaning: 'Tiền' },
  { word: 'milk', image: '🥛', meaning: 'Sữa' },
  { word: 'mouse', image: '🐭', meaning: 'Con chuột' },
  // N
  { word: 'nose', image: '👃', meaning: 'Cái mũi' },
  { word: 'nut', image: '🥜', meaning: 'Hạt' },
  { word: 'net', image: '🥅', meaning: 'Cái lưới' },
  { word: 'nest', image: '🪹', meaning: 'Cái tổ' },
  // O
  { word: 'ostrich', image: '🐦', meaning: 'Đà điểu' },
  { word: 'octopus', image: '🐙', meaning: 'Bạch tuộc' },
  { word: 'olive', image: '🫒', meaning: 'Quả ô liu' },
  { word: 'ox', image: '🐂', meaning: 'Con bò tót' },
  // P
  { word: 'peach', image: '🍑', meaning: 'Quả đào' },
  { word: 'pineapple', image: '🍍', meaning: 'Quả dứa' },
  { word: 'pen', image: '🖊️', meaning: 'Cái bút' },
  { word: 'panda', image: '🐼', meaning: 'Gấu trúc' },
  // Q
  { word: 'queen', image: '👸', meaning: 'Nữ hoàng' },
  { word: 'question', image: '❓', meaning: 'Câu hỏi' },
  // R
  { word: 'rose', image: '🌹', meaning: 'Hoa hồng' },
  { word: 'rice', image: '🍚', meaning: 'Cơm' },
  { word: 'robot', image: '🤖', meaning: 'Người máy' },
  { word: 'rabbit', image: '🐰', meaning: 'Con thỏ' },
  // S
  { word: 'seal', image: '🦭', meaning: 'Hải cẩu' },
  { word: 'sun', image: '☀️', meaning: 'Mặt trời' },
  { word: 'sock', image: '🧦', meaning: 'Chiếc tất' },
  { word: 'soap', image: '🧼', meaning: 'Xà phòng' },
  // T
  { word: 'turtle', image: '🐢', meaning: 'Con rùa' },
  { word: 'tent', image: '⛺', meaning: 'Cái lều' },
  { word: 'teacher', image: '👩‍🏫', meaning: 'Giáo viên' },
  { word: 'tiger', image: '🐯', meaning: 'Con hổ' },
  // U
  { word: 'up', image: '⬆️', meaning: 'Lên' },
  { word: 'umbrella', image: '☔', meaning: 'Cái ô' },
  { word: 'uncle', image: '👨', meaning: 'Chú/Bác' },
  // V
  { word: 'violin', image: '🎻', meaning: 'Đàn vĩ cầm' },
  { word: 'vet', image: '👨‍⚕️', meaning: 'Bác sĩ thú y' },
  { word: 'van', image: '🚐', meaning: 'Xe tải nhỏ' },
  // W
  { word: 'wolf', image: '🐺', meaning: 'Chó sói' },
  { word: 'water', image: '💧', meaning: 'Nước' },
  { word: 'watch', image: '⌚', meaning: 'Đồng hồ' },
  // Words often associated with ending sounds or X
  { word: 'fox', image: '🦊', meaning: 'Con cáo' },
  { word: 'box', image: '📦', meaning: 'Cái hộp' },
  { word: 'six', image: '6️⃣', meaning: 'Số sáu' }, 
  // Y
  { word: 'yoyo', image: '🪀', meaning: 'Cái yoyo' },
  { word: 'yogurt', image: '🥣', meaning: 'Sữa chua' },
  { word: 'yacht', image: '🛥️', meaning: 'Du thuyền' },
  // Z
  { word: 'zoo', image: '🦁', meaning: 'Sở thú' },
  { word: 'zebra', image: '🦓', meaning: 'Ngựa vằn' },
  { word: 'zero', image: '0️⃣', meaning: 'Số không' },
  { word: 'zipper', image: '🤐', meaning: 'Khóa kéo' }
];

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

type VocabularyItem = {
  word: string;
  image: string;
  meaning: string;
};

export default function MainPage() {
  const [questions, setQuestions] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'correct', 'finished'
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  // Khởi tạo game
  const startNewGame = () => {
    // Trộn ngẫu nhiên danh sách từ vựng
    const shuffled = [...VOCABULARY_DATA].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setGameStatus('playing');
    setSelectedLetter(null);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLetterClick = (letter: string) => {
    if (gameStatus === 'correct' || gameStatus === 'finished') return;

    const currentQuestion = questions[currentIndex];
    const correctLetter = currentQuestion.word[0].toLowerCase();

    setSelectedLetter(letter);

    if (letter === correctLetter) {
      setGameStatus('correct');
      setScore((prev) => prev + 1);
      speakWord(currentQuestion.word);
      
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setGameStatus('playing');
          setSelectedLetter(null);
        } else {
          setGameStatus('finished');
        }
      }, 1500);

    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleSkip = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setGameStatus('playing');
      setSelectedLetter(null);
    } else {
      setGameStatus('finished');
    }
  };

  if (questions.length === 0) return <div className="flex h-screen items-center justify-center text-2xl font-bold text-blue-600">Đang tải trò chơi...</div>;

  // MÀN HÌNH KẾT THÚC
  if (gameStatus === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 flex flex-col items-center justify-center p-4 text-center animate-fade-in">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4 animate-bounce" />
          <h1 className="text-3xl font-bold text-purple-600 mb-2">Hoàn thành xuất sắc!</h1>
          <p className="text-gray-600 mb-6">Bé thật là giỏi!</p>
          
          <div className="flex justify-center items-center gap-4 mb-8 bg-blue-50 p-4 rounded-xl">
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
            <span className="text-4xl font-bold text-blue-600">{score} / {questions.length}</span>
          </div>

          <button 
            onClick={startNewGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCcw /> Chơi lại từ đầu
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const correctLetter = currentQuestion.word[0];
  const progressPercentage = ((currentIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-blue-50 font-sans selection:bg-pink-200 flex flex-col">
      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="h-2 w-full bg-gray-100">
          <div 
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white p-1.5 rounded-lg">
              <Sparkles size={20} />
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-700 hidden xs:block">English Kids</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={handleSkip}
                className="text-gray-400 text-sm hover:text-gray-600 font-medium px-2 py-1 rounded hover:bg-gray-100"
              >
                Bỏ qua
              </button>
            <div className="bg-blue-100 px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-blue-700 flex items-center gap-1 shadow-sm">
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-current text-yellow-400" />
              <span>{score}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-start pt-4 pb-2 px-2 md:px-4 max-w-4xl mx-auto w-full">
        
        {/* CARD CÂU HỎI */}
        <div className="w-full bg-white rounded-3xl shadow-xl p-4 md:p-8 mb-4 flex flex-col items-center relative overflow-hidden transition-all duration-300 min-h-[300px] md:min-h-[400px]">
          
          {/* Hiệu ứng nền khi đúng */}
          {gameStatus === 'correct' && (
            <div className="absolute inset-0 bg-green-50 z-0 animate-pulse flex items-center justify-center overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300 via-transparent to-transparent"></div>
            </div>
          )}

          <div className="z-10 flex flex-col items-center w-full">
            
            {/* HÌNH ẢNH */}
            <div 
              className="text-[100px] sm:text-[120px] md:text-[150px] leading-none mb-1 transform transition hover:scale-110 cursor-pointer select-none drop-shadow-lg"
              onClick={() => speakWord(currentQuestion.word)}
            >
              {currentQuestion.image}
            </div>

            {/* NGHĨA TIẾNG VIỆT (Mới thêm vào) */}
            <div className="text-lg md:text-2xl text-gray-600 font-semibold mb-2 bg-gray-100 px-4 py-1 rounded-full shadow-sm border border-gray-200">
              {currentQuestion.meaning}
            </div>

            {/* KHU VỰC TỪ VỰNG & LOA */}
            <div className={`flex items-center gap-3 md:gap-6 mt-1 mb-4 p-2 rounded-2xl ${gameStatus === 'correct' ? 'bg-white/80 shadow-sm' : ''}`}>
              
              {/* Từ vựng */}
              <div className={`flex items-end gap-1 text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800 tracking-wider ${shake ? 'animate-shake' : ''}`}>
                {gameStatus === 'correct' ? (
                  <span className="text-green-600 animate-bounce">{correctLetter}</span>
                ) : (
                  <span className="text-blue-500 border-b-4 border-blue-500 min-w-[0.8ch] text-center inline-block h-[1.1em] leading-none bg-blue-50 rounded-t-lg">?</span>
                )}
                <span>{currentQuestion.word.slice(1)}</span>
              </div>

              {/* Nút Loa */}
              <button 
                onClick={() => speakWord(currentQuestion.word)}
                className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full flex items-center justify-center shadow-lg transform transition active:scale-95 hover:rotate-12 focus:outline-none focus:ring-4 focus:ring-yellow-200"
                title="Nghe phát âm"
                aria-label="Nghe phát âm"
              >
                <Volume2 className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            {/* THÔNG BÁO TRẠNG THÁI */}
            <div className="h-8">
              {gameStatus === 'correct' ? (
                <div className="text-green-600 font-bold text-xl md:text-2xl flex items-center gap-2 animate-fade-in-up">
                  <span>🎉</span> Chính xác!
                </div>
              ) : selectedLetter && selectedLetter !== correctLetter ? (
                <div className="text-red-500 font-bold text-lg md:text-xl animate-bounce">
                  Sai rồi, bé thử lại nhé!
                </div>
              ) : (
                 <div className="text-gray-400 text-sm md:text-base italic">Chọn chữ cái đầu tiên</div>
              )}
            </div>
          </div>
        </div>

        {/* BÀN PHÍM */}
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-9 gap-2 md:gap-3 px-1 pb-4">
            {ALPHABET.map((letter) => {
              let btnClass = "bg-white hover:bg-blue-50 border-b-4 border-gray-300 text-gray-600 shadow-sm";
              
              if (gameStatus === 'correct') {
                if (letter === correctLetter) {
                   btnClass = "bg-green-500 border-green-700 text-white transform scale-110 shadow-lg ring-4 ring-green-200 z-10";
                } else {
                   btnClass = "bg-gray-100 border-gray-200 text-gray-300 opacity-50";
                }
              } else if (selectedLetter === letter && letter !== correctLetter) {
                btnClass = "bg-red-500 border-red-700 text-white opacity-50";
              }

              return (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  disabled={gameStatus === 'correct'}
                  className={`
                    ${btnClass}
                    h-12 sm:h-14 md:h-14 rounded-xl font-extrabold text-2xl md:text-3xl uppercase
                    transition-all duration-150 active:border-b-0 active:translate-y-1 active:shadow-none
                    flex items-center justify-center select-none touch-manipulation
                  `}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

      </main>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}