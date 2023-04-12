import {clientAxiosClash} from '@/helpers/clienteAxios'
export default defineEventHandler(async (event) => {
  try { 
    const response = await clientAxiosClash.get("/cards")
    return response.data
  } catch (error) {
    console.log(error);
  }
});
