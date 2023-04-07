export const dateFormater = (dateF: string) => {
// Creamos una nueva fecha a partir de la cadena que nos das
const date = new Date(dateF);

// Utilizamos el método toLocaleString para formatear la fecha y hora
const formattedDate = date.toLocaleString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});
return formattedDate;
}