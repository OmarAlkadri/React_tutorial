/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from 'antd'
import './notification.css'
import { INotification } from './types/global'
import { Slide, SlideProps, Snackbar } from '@mui/material'
import { toast } from 'react-toastify';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}
type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';
type Theme = 'light' | 'dark' | 'colored';
type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';

export function showNotification(
  type: TypeOptions,
  position: ToastPosition,
  theme: Theme,
  message: String,
  autoClose: number = 3000
): void {

  toast(message, {
    type,
    position,
    theme,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

const position = 'top-right'
const theme = 'light'

export function showSuccessMessage({ message, duration }: INotification): void {
  showNotification('success',
    position,
    theme,
    message,
    duration,
  )
}
export function showWarningMessage({ message, duration }: INotification): void {
  showNotification('warning',
    position,
    theme,
    message,
    duration,)
}
export function showErrorMessage({ message, duration }: INotification): void {
  showNotification('error',
    position,
    theme,
    message,
    duration,)
}
export function showInfoMessage({ message, duration }: INotification): void {
  showNotification('info',
    position,
    theme,
    message,
    duration,)
}
