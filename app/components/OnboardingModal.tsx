'use client';

/**
 * Onboarding Modal Component
 * First-time user tutorial with step-by-step guide
 */

import { useState, useEffect, useCallback } from 'react';
import { X, MapPin, Sparkles, Users, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: '명당 지도 탐색',
    description: '전국 로또 1등 당첨 판매점을 지도에서 확인하세요. 당첨 횟수가 많을수록 큰 마커로 표시됩니다.',
    highlight: '내 주변 명당을 찾아보세요!',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'AI 번호 추출',
    description: '꿈해몽, 오늘의 운세, 과학적 분석 등 다양한 방법으로 행운의 번호를 추출해보세요.',
    highlight: 'AI가 분석한 맞춤 번호를 받아보세요!',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: '커뮤니티',
    description: '다른 사용자들의 당첨 후기와 명당 방문 인증을 확인하고, 함께 행운을 나눠보세요.',
    highlight: '실제 당첨자들의 이야기를 들어보세요!',
  },
];

const STORAGE_KEY = 'lottoshrine-onboarding-complete';

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if onboarding should be shown
  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;

    // Check if user has completed onboarding
    const hasCompleted = localStorage.getItem(STORAGE_KEY);
    if (!hasCompleted) {
      // Small delay to let the main app render first
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating) return;

    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 150);
    }
  }, [currentStep, isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;

    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsAnimating(false);
      }, 150);
    }
  }, [currentStep, isAnimating]);

  const handleComplete = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  }, []);

  const handleSkip = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleSkip();
      if (e.key === 'Enter' && currentStep === ONBOARDING_STEPS.length - 1) handleComplete();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, handleNext, handlePrev, handleSkip, handleComplete]);

  if (!isOpen) return null;

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
          aria-label="건너뛰기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 pt-12">
          {/* Icon */}
          <div
            className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center transition-opacity duration-150 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {step.icon}
          </div>

          {/* Title */}
          <h2
            id="onboarding-title"
            className={`text-2xl font-black text-center text-slate-900 mb-3 transition-opacity duration-150 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {step.title}
          </h2>

          {/* Description */}
          <p
            className={`text-slate-600 text-center mb-4 transition-opacity duration-150 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {step.description}
          </p>

          {/* Highlight */}
          <div
            className={`bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 transition-opacity duration-150 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <p className="text-amber-800 text-center text-sm font-medium">
              {step.highlight}
            </p>
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {ONBOARDING_STEPS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentStep(index);
                      setIsAnimating(false);
                    }, 150);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-6 bg-amber-500'
                    : index < currentStep
                      ? 'bg-amber-300'
                      : 'bg-slate-200'
                }`}
                aria-label={`${index + 1}단계로 이동`}
                aria-current={index === currentStep ? 'step' : undefined}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 text-slate-600 font-medium rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>이전</span>
              </button>
            )}

            {isLastStep ? (
              <button
                onClick={handleComplete}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-2xl hover:shadow-lg transition-shadow"
              >
                <Check className="w-5 h-5" />
                <span>시작하기</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-2xl hover:shadow-lg transition-shadow"
              >
                <span>다음</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
