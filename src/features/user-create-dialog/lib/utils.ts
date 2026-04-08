import dayjs from 'dayjs';

const getChildrenYears = () => Array.from({ length: 63 }, (_, i) => dayjs().year() - i);

export { getChildrenYears };
