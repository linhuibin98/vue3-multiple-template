export interface RequestOptions {
  url: string;
  method?: 'POST' | 'GET',
  headers?: Record<string, string>,
  data?: Record<string, any>
}

export function request({
                          url,
                          method = 'POST',
                          headers = {},
                          data = {}
                        }: RequestOptions) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send(JSON.stringify(data))
    xhr.onload = (e: ProgressEvent) => {
      resolve({
        data: e.target.response
      });
    }
  })
}