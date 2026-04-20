import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getWorkDuration = (startedWorkAt: string): string => {
  const start = dayjs(startedWorkAt);
  const now = dayjs();

  const diffMs = now.diff(start);

  const dur = dayjs.duration(diffMs);

  const years = Math.floor(dur.asYears());
  const months = dur.months();
  const days = dur.days();

  return `${years}г ${months}м ${days}д`;
};

export { getWorkDuration };
