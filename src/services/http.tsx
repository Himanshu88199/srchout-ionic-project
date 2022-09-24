function joinUrl(baseUrl: string, url: string) {
    return `${baseUrl}/${url}`;
}
interface LooseObject {
    [key: string]: any
};

class Service {
    request(url: string, method = "POST", data = null) {
        const baseUrl = 'https://taskerr-api.herokuapp.com/api/v1';
        url = joinUrl(baseUrl, url);
        const token = sessionStorage.getItem("token");

        let options: LooseObject = {
            method: method,
            headers: {
                "api-token": token,
                "Content-Type": "application/json",
            }
        };
        if (data) options.body = JSON.stringify(data);
        return fetch(url, options);
    }

    get(url: string) {
        return this.request(url, 'GET')
            .then((res) => {
                //console.log(res)
                if (res.status >= 200 && res.status <= 299) {
                    return res.json();
                } else if (res.status === 400) {
                    return res.json().then((data: any) => {
                        throw Error(data.message);
                    });
                } else {
                    throw Error(res.statusText);
                }
            })
            .then((res) => {
                if (res) {
                    return { err: null, data: res };
                }
            })
            .catch((err) => {
                return { err: err, data: null };
            });
    }

    post(url: string, data: any) {
        return this.request(url, 'POST', data)
            .then((res) => {
                //console.log(res)
                if (res.status >= 200 && res.status <= 299) {
                    return res.json();
                } else if (res.status === 400) {
                    return res.json().then((data: any) => {
                        throw Error(data.message);
                    });
                } else {
                    throw Error(res.statusText);
                }
            })
            .then((res) => {
                if (res) {
                    return { err: null, data: res };
                }
            })
            .catch((err) => {
                return { err: err, data: null };
            });
    }
    put(url: string, data: any) {
        return this.request(url, 'PUT', data)
            .then((res) => {
                //console.log(res)
                if (res.status >= 200 && res.status <= 299) {
                    return res.json();
                } else if (res.status === 400) {
                    return res.json().then((data: any) => {
                        throw Error(data.message);
                    });
                } else {
                    throw Error(res.statusText);
                }
            })
            .then((res) => {
                if (res) {
                    return { err: null, data: res };
                }
            })
            .catch((err) => {
                return { err: err, data: null };
            });
    }

}

export default Service;