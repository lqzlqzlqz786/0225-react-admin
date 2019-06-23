
import axios from 'axios';
import { message } from "antd";

export default function ajax(url, data = {}, method = 'get') {

  //初始化请求参数
  let reqParams = data;
  //转化为大写 再进行比较
  method = method.toLowerCase();

  if (method === 'GET') {
    reqParams = {
      params: data
    }
  }

  return axios[method](url, reqParams)
    .then((res) => {
      const { data } = res;

      if (data.status === 0) {
        //请求成功 跳转至主页面admin
        return data.data;
      } else {
        //请求失败 给用户提示错误信息
        message.error(data.msg, 2);

      }
    })
    .catch((err) => {

      message.error('网络出现故障，刷新试试',2);

    });






}


