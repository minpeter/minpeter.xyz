"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// 사용자가 입력해야 할 문장들
const sentences = [
  "또 한 발짝 가지런히 발을 옮긴다",
  "햇살에 첫 이파리 내밀던 순간의 떨림",
  "너의 값진 말들로 희망을 노래하라",
  "햇볕이 유달리 맑은 하늘의 푸른 길을 밟고",
  "흙 내음 빗소리 아름다운 여름날",
  "머지않아 열매 맺는 가을을 향하여",
  "그것들이 내 삶의 거름이 되어",
  "빨갛게 익어 가는 감을 닮아서",
  "넓은 하늘로의 비상을 꿈꾸며",
  "아롱져 반짝이는 수천 개의 빛",
  "내게 환한 불 밝혀 주는 사랑의 말들",
  "겨울이 길면 봄은 더욱 따뜻하리",
  "희망 속 삶은 보석처럼 반짝이리",
  "젊은이여 그 길은 너의 것이다",
  "사람이 하늘처럼 맑아 보일 때가 있다",
  "가을에는 마음이 거울처럼 맑아지고",
  "별이 더욱 밝은 빛으로 반짝일 때",
  "가지 끝에 매달린 붉은 감 하나",
  "나의 꿈은 맑은 바람이 되어서",
  "빛을 찾아가는 길의 나의 노래",
  "온 세상이 너를 닮은 꽃빛으로 반짝일 때",
  "따스한 강물에 흔들리는 노을",
  "꿈을 지닌 넌 누구보다 밝게 빛나",
  "하늘 향해 우뚝 솟은 젊음으로",
  "드넓은 바다로 달려가는 바람처럼",
  "삶의 결이 빚어내는 다채로움",
  "맑은 웃음 머금은 네가 있었음 좋겠다",
  "사과알은 햇살에 볼이 붉어지고",
  "가장 넓은 길은 언제나 내 마음속에",
  "그리운 우리 님의 맑은 노래",
  "징검다리 선들선들 밟고 오는 봄바람",
  "멀리서 밝혀져 오는 불빛의 따뜻함",
  "삶이 나를 춤추게 하는 곳으로",
  "희망을 속삭이는 아침이 밝아오니",
  "밝은 햇살 가득한 너의 웃음",
  "맑아진 마음으로 그윽하기를",
  "싱그럽고 푸르른 젊음이어라",
  "가을이 슬쩍 노란 손을 얹어 놓을 때",
  "사람들 가슴엔 별이 살고 있다",
  "저 넓은 세상에서 큰 꿈을 펼쳐라",
];

export default function Page() {
  // 상태 관리
  const [userInput, setUserInput] = useState(""); // 사용자가 입력한 텍스트
  const [isComposing, setIsComposing] = useState(false); // 한글 조합 중인지 여부
  const [composingText, setComposingText] = useState(""); // 현재 조합 중인 한글
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // 현재 문장 인덱스
  const [isAllSelected, setIsAllSelected] = useState(false); // 전체 선택 상태
  const [isTransitioning, setIsTransitioning] = useState(false); // 다음 문장으로 전환 중인지 여부
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드 참조
  const [startTime, setStartTime] = useState<number | null>(null); // 타이핑 시작 시간
  const [wpm, setWpm] = useState(0); // 분당 타이핑 속도

  const currentSentence = sentences[currentSentenceIndex];

  // 입력 상태 초기화 함수
  const resetInputStates = () => {
    setUserInput("");
    setComposingText("");
    setIsComposing(false);
    setIsAllSelected(false);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.blur();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
    setStartTime(null);
    setWpm(0);
  };

  // WPM 계산 함수
  const calculateWPM = useCallback((input: string, elapsedSeconds: number) => {
    const wordsTyped = (input.length * 2.5) / 5;
    const minutes = elapsedSeconds / 60;
    return Math.round(wordsTyped / minutes);
  }, []);

  // 문장 완료 체크 효과
  useEffect(() => {
    const checkCompletion = () => {
      // 현재 입력된 텍스트 확인 (조합 중인 텍스트 포함)
      const currentInput = isComposing ? userInput + composingText : userInput;

      // 문장이 완성되고 다음 문장이 있을 경우 전환
      if (
        !isTransitioning &&
        currentInput === currentSentence &&
        currentSentenceIndex < sentences.length - 1
      ) {
        setIsTransitioning(true);
        setTimeout(() => {
          resetInputStates();
          setCurrentSentenceIndex((prev) => prev + 1);
          setIsTransitioning(false);
        }, 300);
      }
    };

    checkCompletion();
  }, [
    userInput,
    composingText,
    currentSentence,
    currentSentenceIndex,
    isComposing,
    isTransitioning,
  ]);

  // WPM 계산 효과
  useEffect(() => {
    // 첫 입력 시작 시 타이머 시작
    if (!startTime && (userInput.length > 0 || composingText.length > 0)) {
      setStartTime(Date.now());
      return;
    }

    // WPM 계산 (composingText도 길이에 포함)
    if (startTime && (userInput.length > 0 || composingText.length > 0)) {
      const currentInput = userInput + composingText;
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      const currentWPM = calculateWPM(currentInput, elapsedSeconds);
      setWpm(currentWPM);
    }
  }, [userInput, composingText, startTime, calculateWPM]);

  // 입력 처리 함수
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    // 전환 중일 때는 입력 무시
    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    const input = e.currentTarget.value;
    // 한글 조합 중이 아닐 때
    if (!isComposing) {
      setUserInput((prev) => {
        // 전체 선택 상태에서 새로운 입력이 들어온 경우
        if (isAllSelected && input.length === 1) {
          setIsAllSelected(false);
          return input;
        }
        // 일반적인 입력 처리
        if (input.length === 1) {
          return prev + input;
        }
        return input;
      });

      e.currentTarget.value = "";
    } else {
      // 한글 조합 중일 때
      setComposingText(input);
    }
  };

  // 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!isComposing && userInput.length > 0) {
        e.preventDefault();
        if (isAllSelected) {
          setUserInput("");
          setIsAllSelected(false);
        } else {
          setUserInput((prev) => prev.slice(0, -1));
        }
      }
    } else if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setIsAllSelected(true);
    }
  };

  // UI 렌더링
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative gap-4"
      onClick={() => !isTransitioning && inputRef.current?.focus()}
    >
      {/* 숨겨진 입력 필드 */}
      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute"
        onCompositionStart={() => {
          // 한글 입력 시작
          if (!isTransitioning) {
            setIsComposing(true);
            setComposingText("");
          }
        }}
        onCompositionUpdate={(e) => {
          // 한글 조��� 진행 중
          if (!isTransitioning) {
            setComposingText(e.data || "");
          }
        }}
        onCompositionEnd={(e) => {
          // 한글 조합 완료
          if (!isTransitioning && e.currentTarget) {
            setIsComposing(false);
            setComposingText("");
            setUserInput((prev) => prev + e.data);
            e.currentTarget.value = "";
          }
        }}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        autoFocus
      />

      {/* 타이핑 텍스트 표시 */}
      <div className="text-2xl font-mono">
        {currentSentence.split("").map((char, index) => {
          // 기본 상태 정의
          const isTyped = index < userInput.length;
          const isCorrect = userInput[index] === char;
          const isCurrentTyping = index === userInput.length;
          const isComposingHere = isCurrentTyping && isComposing;

          // 입력 시작 여부는 현재 입력 위치가 해당 인덱스보다 큰 경우에만 true
          const hasPassedThisIndex = userInput.length > index;

          return (
            <span
              key={index}
              className={`transition-all ${
                isTyped
                  ? isCorrect
                    ? "opacity-100 text-emerald-400" // 입력 완료 & 정확
                    : "opacity-100 text-pink-400" // 입력 완료 & 부정확
                  : isCurrentTyping
                  ? "text-white opacity-100" // 현재 입력 위치
                  : "opacity-30" // 미입력 상태
              } ${isComposingHere ? "border-b-2" : ""}`}
            >
              {isComposingHere
                ? composingText || char
                : userInput[index] || char}
            </span>
          );
        })}
      </div>

      {/* 진행 상황과 WPM 표시를 함께 표시 */}
      <div className="text-sm text-gray-400 flex items-center gap-2">
        <span>
          {currentSentenceIndex + 1} / {sentences.length}
        </span>
        {wpm > 0 && (
          <>
            <span className="text-gray-500">•</span>
            <span>{wpm} WPM</span>
          </>
        )}
      </div>
    </div>
  );
}
