export const helpHTTP = () => {

  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      "Content-type": 'application/json',
    };

    //*uso del objeto AbortController
    const controller = new AbortController();
    options.signal = controller.signal;


    options.method = options.method || "GET"
    options.headers = options.headers ? { ...options.headers, ...defaultHeader } : defaultHeader

    options.body = JSON.stringify(options.body) || null;
    /*if(!options.body) delete options.body;*/

    console.log(options)
    setTimeout(() => controller.abort(), 3500)

    //?
    return fetch(endpoint, options)
      .then(res => res.ok ? res.json() : Promise.reject(
      {
          err: true,
          status : res.status || "error 01",
          statusText : res.statusText || "ocurrió un error"
        }
      ))
      .catch(err => {
        console.log(err)
        return err})
  }

  const get = (url, options = {}) => customFetch(url,options)

  const post = (url, options = {}) => {
    options.method = 'POST';
    return customFetch(url,options)
  }
  const put = (url, options = {}) => {
    options.method = 'PUT';
    return customFetch(url,options)
  }
  const del = (url, options = {}) => {
    options.method = 'DELETE';
    return customFetch(url,options)
  }

  return {
    get,
    post,
    put,
    del,
  }
}

//! uso del abortController
// ! ej: el servidor está caido me permite que la ui reaccione y no quede solicitando la petición de manera infinita