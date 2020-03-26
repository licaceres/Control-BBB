export const isMobile = window.innerWidth < 768;
export const date_format = 'HH:mm DD/MM/YYYY';
export const getHeader = () => {
  return {
    headers: { 
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    }
  }
}
