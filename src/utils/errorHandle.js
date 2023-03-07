const requestErrorHandle = data => {
  if(data.code + 0 > 200){
    return {msg: data?.message || data.msg, success: false}
  }else{
    return {data: data.data, success: true}
  }
}

export {requestErrorHandle}