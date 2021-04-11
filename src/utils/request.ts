export interface RequestOptions {
  url: string;
  method?: 'POST' | 'GET',
  headers?: Record<string, string>,
  data?: FormData | string,
  onProgress?: (e: ProgressEvent) => void
}

export function request(
    {
      url,
      method = 'POST',
      headers = {},
      data = '',
      onProgress = (e) => {}
    }: RequestOptions) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = onProgress
    xhr.open(method, url)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send(data)
    xhr.onload = (e: ProgressEvent) => {
      resolve({
        data: (e.target as any).response
      });
    }
  })
}