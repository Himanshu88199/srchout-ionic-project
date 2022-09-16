const header ={
    "Accept":"application/json",
    "Content-type":"application/json",
    "api-token":sessionStorage.getItem("token")
}
function joinUrl(baseUrl , url){
    return `${baseUrl}/${url}`;
}
class Service{
    constructor(){
        this.domain = "https://taskerr-api.herokuapp.com/api/v1";
    }

    request(url , method="POST",data=null){
        url = joinUrl(this.domain,url);
        const options = {
            header,method
        }

        if(data){
            options.body = JSON.stringify({...data});
        }

        return fetch(url,options);
    }

    get(url,id){
        const method = 'GET';
        return this.request(url,method).then(res=>res.json());
    }

    post(url,data){
        const method = 'POST';
        return this.request(url,method,data).then(res=>res.json());
    }

}

export default Service;