import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, type = 'success') => {
  const toastType = type === 'failed' ? 'error' : 'success';
  toast(message, {
    type: toastType,
  });
};
