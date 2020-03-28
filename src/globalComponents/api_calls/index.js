import sha1 from 'sha1';
import axios from 'axios';
import parseString from 'xml2js';

export const checksum = (str) => {
    return sha1(str);
}

export const getMeetings = () => {
    return localStorage.getItem('url') + '/getMeetings?checksum=' + checksum('getMeetings' + localStorage.getItem('clave'))
}

export const endMeeting = (sala) => {
    var str = 'endmeetingID=' + sala.meetingID[0] + '&password=' + encodeURIComponent(sala.moderatorPW[0]) + localStorage.getItem('clave');
    return localStorage.getItem('url') + '/end?meetingID=' + sala.meetingID[0] + '&password=' + encodeURIComponent(sala.moderatorPW[0]) + '&checksum=' + checksum(str);
}