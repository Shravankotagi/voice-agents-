'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Message } from '@/types';

interface ConversationState {
  visibleMessages: Message[];
  isTyping: boolean;
  isComplete: boolean;
  start: () => void;
  reset: () => void;
}

export function useConversation(script: Message[]): ConversationState {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stepRef = useRef<number>(0);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    stepRef.current = 0;
    setVisibleMessages([]);
    setIsTyping(false);
    setIsComplete(false);
    setIsRunning(false);
  }, [clearTimer]);

  useEffect(() => {
    if (!isRunning) return;

    const processStep = () => {
      const currentStep = stepRef.current;
      if (currentStep >= script.length) {
        setIsComplete(true);
        setIsRunning(false);
        return;
      }

      const currentMessage = script[currentStep];

      if (currentMessage.role === 'user') {
        setVisibleMessages((prev) => [...prev, currentMessage]);
        stepRef.current += 1;
        timeoutRef.current = setTimeout(processStep, 1200);
      } else {
        setIsTyping(true);
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages((prev) => [...prev, currentMessage]);
          stepRef.current += 1;
          timeoutRef.current = setTimeout(processStep, 800);
        }, 1500);
      }
    };

    processStep();

    return () => clearTimer();
  }, [isRunning, script, clearTimer]);

  const start = useCallback(() => {
    reset();
    setIsRunning(true);
  }, [reset]);

  return { visibleMessages, isTyping, isComplete, start, reset };
}

