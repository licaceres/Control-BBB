/*
* Crea las urls para la consulta a la api de BBB 
*/

import sha1 from 'sha1';

export const checksum = (str) => {
  return sha1(str);
}

export const getMeetings = () => {
  return sessionStorage.getItem('url') + '/getMeetings?checksum=' + checksum('getMeetings' + sessionStorage.getItem('clave'))
}

export const endMeeting = (sala) => {
  var str = 'endmeetingID=' + sala.meetingID[0] + '&password=' + encodeURIComponent(sala.moderatorPW[0]) + sessionStorage.getItem('clave');
  return sessionStorage.getItem('url') + '/end?meetingID=' + sala.meetingID[0] + '&password=' + encodeURIComponent(sala.moderatorPW[0]) + '&checksum=' + checksum(str);
}

export const getMeetingInfo = (sala) => {
  var str = 'getMeetingInfomeetingID=' + sala.meetingID[0] + '&password=' + encodeURIComponent(sala.moderatorPW[0]) + sessionStorage.getItem('clave');
  return sessionStorage.getItem('url') + '/getMeetingInfo?meetingID=' + sala.meetingID[0] + '&password=' + encodeURIComponent(sala.moderatorPW[0]) + '&checksum=' + checksum(str);
}