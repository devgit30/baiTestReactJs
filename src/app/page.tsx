'use client'
import React, { useState } from 'react';
import { Button, message, Steps, theme, Select, InputNumber } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const Step1 = () => {
  const [meal, setMeal] = useState<string>('Please select a meal')
  const [numberPeople, setNumberPeople] = useState<number>(0)
  const handleChange = (value: string) => {
    setMeal(value);
  };

  const onChange = (value: number) => {
    setNumberPeople(value);
  };

  
  return (
    <div>

      <div>
        <label htmlFor="meal">Please select a meal:</label>
        <Select dropdownStyle={{width: '100px'}}
          defaultValue={meal}
          style={{ width: 120 }}
          allowClear
          options={[{ value: 'breakfast', label: 'breakfast' }, { value: 'lunch', label: 'lunch' }, { value: 'dinner', label: 'dinner' }]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="people">Please enter number of people:</label>
        <InputNumber style={{width: '50px'}} min={1} max={10} defaultValue={numberPeople} onChange={(pre: any) => onChange(pre)} />
      </div>
    </div>
  )
}
const Step2 = () => {
  const [restaurant, setRestaurant] = useState<string>('Please select a restaurant')
  const handleChange = (value: string) => {
    setRestaurant(value);
  };

  return (
    <div>

      <div>
        <label htmlFor="res">Please select a restaurant:</label>
        <Select dropdownStyle={{width: '100px'}}
          defaultValue={restaurant}
          style={{ width: 120 }}
          allowClear
          options={[{ value: 'anhbeo', label: 'anhbeo' }, { value: 'anhgay', label: 'anhgay' }, { value: 'anhmap', label: 'anhmap' }]}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

const Step3 = () => {
  const [dish, setDish] = useState<string>('Please select a dish')
  const [numberPeople, setNumberPeople] = useState<number>(0)
  const handleChange = (value: string) => {
    setDish(value);
  };

  const onChange = (value: number) => {
    setNumberPeople(value)
  };
  return (
    <div>

      <div>
        <label htmlFor="dish">Please select a dish:</label>
        <Select dropdownStyle={{width: '100px'}}
          defaultValue={dish}
          style={{ width: 120 }}
          allowClear
          options={[{ value: 'breakfast', label: 'breakfast' }, { value: 'lunch', label: 'lunch' }, { value: 'dinner', label: 'dinner' }]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="serings">Please enter no. of servings:</label>
        <InputNumber style={{width: '50px'}} min={1} max={10} defaultValue={numberPeople} onChange={(pre: any) => onChange(pre)} />
      </div>
      <SaveOutlined />
    </div>
  )
}

const Priview = () => {
  return (
    <div>
      priview
    </div>
  )
}

const Home: React.FC = () => {
  const steps = [
    {
      title: 'Step 1',
      content: <Step1 />,
    },
    {
      title: 'Step 2',
      content: <Step2 />,
    },
    {
      title: 'Step 3',
      content: <Step3 />,
    },
    {
      title: 'Priview',
      content: <Priview />,
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    // lineHeight: '260px',
    // textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default Home;