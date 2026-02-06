// http-status-code - Get HTTP status code information

const input = JSON.parse(process.argv[2] || '{}');
const { code } = input;

if (!code) {
  console.log(JSON.stringify({ error: 'Missing: code (HTTP status code number)' }));
  process.exit(1);
}

const statusCodes = {
  200: { message: 'OK', category: 'Success' },
  201: { message: 'Created', category: 'Success' },
  204: { message: 'No Content', category: 'Success' },
  301: { message: 'Moved Permanently', category: 'Redirect' },
  302: { message: 'Found', category: 'Redirect' },
  304: { message: 'Not Modified', category: 'Redirect' },
  400: { message: 'Bad Request', category: 'Client Error' },
  401: { message: 'Unauthorized', category: 'Client Error' },
  403: { message: 'Forbidden', category: 'Client Error' },
  404: { message: 'Not Found', category: 'Client Error' },
  500: { message: 'Internal Server Error', category: 'Server Error' },
  502: { message: 'Bad Gateway', category: 'Server Error' },
  503: { message: 'Service Unavailable', category: 'Server Error' }
};

const info = statusCodes[code];
if (!info) {
  // Determine category from code range
  let category = 'Unknown';
  if (code >= 200 && code < 300) category = 'Success';
  else if (code >= 300 && code < 400) category = 'Redirect';
  else if (code >= 400 && code < 500) category = 'Client Error';
  else if (code >= 500 && code < 600) category = 'Server Error';
  
  console.log(JSON.stringify({
    code: code,
    message: 'Unknown',
    category: category
  }));
} else {
  console.log(JSON.stringify({
    code: code,
    message: info.message,
    category: info.category
  }));
}
