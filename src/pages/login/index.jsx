
import React from 'react';
import { Form, Icon, Input, Button  } from 'antd';
import { reqLogin } from "../../api";

//引入图片资源：在react脚手架中图片必须引入才会打包
import logo from './logo.png';
import './index.less'

const Item = Form.Item;

function Login(props) {


  const login = (e) => {
    e.preventDefault();
    //用来校验表单并获取表单的值
    props.form.validateFields(async (error, values) => {
      // console.log(error,values);
      /*
      * error 代表表单验证结果
      * null 校验通过
      * {} 校验失败*/
      if (!error) {
        //校验通过
        const { username, password } = values;
        // console.log(username, password);
        //发送请求  请求登录
        const result = await reqLogin(username, password);

        if (result) {
          //登录成功
          props.history.replace('/');
        } else {
          //登录失败
          props.form.resetFields(['password'])
        }

      } else {
        //校验失败
        console.log('登录表单校验失败：',error);
      }

    })

  };

  //自定义校验规则函数
  const validator = (rule, value, callback) => {
    //callback 必须调用
    // console.log(rule, value);
    const name = rule.fullField === 'username' ? '用户名': '密码';

    if (!value) {
      //没有输入
      callback(`必须输入${name}`);
    } else if (value.length < 4) {
      callback(`${name}必须大于4位`);
    } else if (value.length > 15) {
      callback(`${name}必须小于15位`);
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback(`${name}只能包含英文字母、数字和下划线`);
    } else {
      //不传参代表校验通过，传参代表校验失败
      callback();
    }

  };


    //getFieldDecorator 也是一个高阶组件
    const { getFieldDecorator } = props.form;

    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form onSubmit={login} className="login-form">
          <Item>
            {
              getFieldDecorator(
                'username',
                {
                  rules: [
                    /*{ required: true, message: '请输入您的用户名!' },
                    {min: 4, message: '用户名必须大于4位'},
                    {max: 15, message: '用户名必须小于15位'},
                    {pattern: /^[a-zA-Z_0-9]+$/,message: '用户名只能包含英文字母、数字和下划线'}*/
                  {   //自定义校验
                      validator: validator
                    }
                    ]
                 }
                 )(
                    <Input className="login-input" prefix={<Icon type="user" />} placeholder="用户名"/>,
                )
              }
          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules: [
                    {
                      validator: validator
                    }
                  ]
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder="密码"/>
              )
            }
          </Item>
          <Item>
            <Button className="login-input" prefix={<Icon type="lock" />} placeholder="密码" type="primary" htmlType="submit">登录</Button>
          </Item>
        </Form>
      </section>
    </div>


}

//返回值是一个包装组件 <Form(login)><Form(login)>
//通过Form(Login) 包装组件向Login组件中传递form 属性
// 经过 Form.create 包装的组件将会自带 this.props.form 属性，this.props.form 提供的 API 如下：
export default Form.create()(Login);

