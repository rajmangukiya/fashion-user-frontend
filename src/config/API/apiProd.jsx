const protocol = 'https';
const host = 'fashion-backend-yzxd.onrender.com';
const port = '';
const trailUrl = 'api/v1/consumer';

const hostUrl = `${protocol}://${host}${port ? ':' + port : ''}/`;
const endpoint = `${protocol}://${host}${(port ? ':' + port : '')}/${trailUrl}`;

export default {
    protocol: protocol,
    host: host,
    port: port,
    apiUrl: trailUrl,
    endpoint: endpoint,
    hostUrl: hostUrl
};
