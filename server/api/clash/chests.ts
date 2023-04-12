import { clientAxiosClash } from '~/helpers/clienteAxios'
export default defineEventHandler(async(event) => {
    const { tag } = getQuery(event);
    if(!tag) {
        throw createError({
            statusCode: 400,
            message: "tag is required",
            stack: "tag is required",
        });
    }
    try {

        const response =  await clientAxiosClash.get(`/players/%23${tag}/upcomingchests`)
        return response.data
        
    } catch (error) {
        console.log(error)
    }
})