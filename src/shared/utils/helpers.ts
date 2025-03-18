import moment from 'moment';

export const parseJSON = (jsonString: string) => {
  try {
    var o = JSON.parse(jsonString);

    if (o) {
      return o;
    }
  } catch (e) {
    if (!!jsonString) {
      return jsonString;
    }
  }
};

export const convertTo12HourFormat = (time: string) => {
  var timeParts = time.split(':');
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1]);

  var period = hours >= 12 ? ' PM' : ' AM';

  hours = hours % 12;
  hours = hours || 12;

  var time12hr = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + period;

  return time12hr;
};

export const initialCase = (string: string) => {
  const words = string.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }

  return words.join(' ');
};

export const formatTimestamp = (timestamp: number) => {
  const formattedDate = moment(timestamp).format('DD/MM/YYYY HH:mm');

  return formattedDate;
};

export const getBrowserName = () => {
  const userAgent = navigator.userAgent;
  let browserName = 'Unknown';

  if (userAgent.includes('Firefox')) {
    browserName = 'Firefox';
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    browserName = 'Opera';
  } else if (userAgent.includes('Chrome')) {
    browserName = 'Chrome';
  } else if (userAgent.includes('Safari')) {
    browserName = 'Safari';
  } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    browserName = 'Internet Explorer';
  }

  return browserName;
};
