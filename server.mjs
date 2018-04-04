function pagemodule(env){
    if(!env.althea.allowOrigin(env.envVars,env.request.headers.origin))
        return 403
    if(env.request.method=='GET')
        return get(env)
    env.headers.allow='GET'
    return{
        status:405,
        headers:env.headers,
    }
}
function get(env){
    env.headers['content-type']='text/plain'
    return{
        status:200,
        headers:env.headers,
        content:
            env.request.headers['x-forwarded-for']||
            env.request.connection.remoteAddress
    }
}
export default althea=>{
    althea.addPagemodule('/ipa',pagemodule)
}
