import sha1 from 'sha1';
export const checksum = (str) => {
    return sha1(str);
}
