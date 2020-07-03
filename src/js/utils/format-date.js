const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export const formatDate = (date) => {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

export default formatDate;
