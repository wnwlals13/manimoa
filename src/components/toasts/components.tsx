'use client';

import { ICustomToastMotionProps } from '@/store/toast/types';
import { useToast } from '@/store/toast/useToast';
import clsx from 'clsx';
import { HTMLAttributes, useEffect, useState } from 'react';

export enum CustomToastProps {
  BOTTOM = 'bottom',
}

interface IPositionProps {
  position: CustomToastProps;
}

const PositionContainer = ({
  position,
  children,
}: HTMLAttributes<HTMLDivElement> & IPositionProps) => {
  return (
    <div
      className={clsx(`fixed left-1/2 transform -translate-x-1/2 z-50`, {
        'bottom-[50px] top-auto': position === CustomToastProps.BOTTOM,
      })}
    >
      {children}
    </div>
  );
};

const MotionContainer = ({
  visible,
  children,
}: ICustomToastMotionProps & IPositionProps) => {
  return (
    <div
      className={`${
        visible ? 'opacity-100' : 'opacity-0'
      } animate-[toast-updown_2s_ease-in-out]  flex items-center justify-center w-[300px]å rounded-xl bg-main bg-opacity-90 text-white px-[30px]`}
    >
      {children}
    </div>
  );
};

export const CustomToastContainer = () => {
  const { items } = useToast();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const renderItems = (pos: CustomToastProps) => {
    return items.map(({ id, message, type }) => (
      <MotionContainer key={id} position={pos} visible={visible}>
        <span>{message}</span>
      </MotionContainer>
    ));
  };

  return Object.values(CustomToastProps).map((position) => (
    <PositionContainer key={position} position={position as CustomToastProps}>
      {renderItems(position)}
    </PositionContainer>
  ));
};
