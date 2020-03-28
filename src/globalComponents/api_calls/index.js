import sha1 from 'sha1';
export const checksum = (str) => {
    return sha1(str);
}
export const getMeetings = () => {
    return localStorage.getItem('url') + '/getMeetings?checksum=' + checksum('getMeetings' + localStorage.getItem('clave'))
}