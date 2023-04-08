import { clientAxiosClash } from "@/helpers/clienteAxios";

export default defineEventHandler(async (event) => {
  const { tag  } = getQuery(event);
  console.log("tag", tag)

  if (!tag) {
    throw createError({
      statusCode: 400,
      message: "tag is required",
      stack: "tag is required",
    });
  }


 // %23QPYJPJ20
  try {
    //TODO: esta validacion se tiene que hacer en el front
    const response = await clientAxiosClash.get(`/players/%23${tag}`);

    return response.data;
  } catch (error:any) {
    throw createError({
        statusCode: error.response?.status,
        message: error.response?.data?.reason,
    });
    console.log(error);
  }
});
