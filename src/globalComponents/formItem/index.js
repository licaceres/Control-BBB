import React from 'react';
import { Form, Input } from 'antd';
import { capitalize, startCase } from 'lodash';

const FormItem = ({ value, error, prefix, placeholder, type, name, label, suffix, onChange, maxLength }) => {

  let autocomplete = 'off';
  let isPassword = name.indexOf('assword') > 0;

  return (
    <Form.Item
      label={startCase(label)}
      hasFeedback
      validateStatus={error ? 'error' : null}
      help={capitalize(error)}>
      
      {
        isPassword
          ? <Input.Password
              prefix={prefix}
              size='large'
              placeholder={startCase(placeholder)}
              value={value}
              onChange={event => onChange(event.target.value, name)}
              autoComplete='new-password'
              suffix={suffix} />
          : <Input
              prefix={prefix}
              type={type}
              size='large'
              maxLength={maxLength}
              placeholder={startCase(placeholder)}
              value={value}
              onChange={event => onChange(event.target.value, name)}
              autoComplete={autocomplete}
              suffix={suffix} />
      }
      
    </Form.Item>
  );
}

export default FormItem;