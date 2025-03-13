import axios from 'axios';

var url = '/api';
var url1 = '/locationApi';
var url2 = '/serverlms';
var urlcppo = '/servercpp';

var testAxios1 = function testAxios1(payload, config) {
    console.log("url1::", url1)
    axios.post(url1, payload, config)
        .then(response => {
            console.log('Response:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

var testAxiosrcpp = function testAxiosrcpp(payload, config) {
    console.log("urlcppo::", urlcppo)
    axios.post(urlcppo, payload, config)
        .then(response => {
            console.log('Response:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
var testAxioso = function testAxioso(payload, config) {
    console.log("url2::", url2)
    axios.post(url2, payload, config)
        .then(response => {
            console.log('Response:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

var testAxios2 = function testAxios2(payload, config) {
    console.log("url2::", url2, payload, config)
    axios.post(url2, payload, config)
        .then(response => {
            console.log('Response:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

var testAxios = function testAxios(payload, config) {
    console.log("url::", url, payload, config)
    fetch('/api/test')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

}
export { testAxios, testAxios1, testAxios2, testAxioso, testAxiosrcpp };
