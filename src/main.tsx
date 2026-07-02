import { createRoot } from 'react-dom/client';
import { App } from './app';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

createRoot(document.getElementById('root')!).render(
    <App />
);
