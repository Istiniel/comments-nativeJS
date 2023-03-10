function formattedDate(dayBefore = 0) {
  let currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() - dayBefore
  );

  const options12 = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  currentDate = currentDate.toLocaleDateString('en-EN', options12).split('/');

  return [currentDate[2], currentDate[0], currentDate[1]]
    .map((e) => e.padStart(2, '0'))
    .join('-');
}

function decodeDate(str) {
  let date = str
    .replace(/(Вчера)/, `${formattedDate(1)}`)
    .replace(/(Сегодня)/, `${formattedDate()}`);

  console.log(date);
  return date;
}

export { formattedDate, decodeDate };
