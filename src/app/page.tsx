'use client'
import React, { useState } from 'react';
import { Button, message, Steps, theme, Select, InputNumber } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { incremented, store } from './storage';

let order: any = {}
const Step1 = () => {
  const [meal, setMeal] = useState<string>('Please select a meal')
  const [numberPeople, setNumberPeople] = useState<number>(0)
  const handleChange = (value: string) => {
    const valueMeal = store.dispatch(incremented({ meal: value })).payload;
    order = {
      ...valueMeal,
      ...order
    }
  };

  const onChange = (value: number) => {
    const valueNumPeople = store.dispatch(incremented({ numberPeople: value })).payload
    order = {
      ...valueNumPeople,
      ...order
    }
  };


  return (
    <div>
      <div>
        <label htmlFor="meal">Please select a meal:</label>
        <Select dropdownStyle={{ width: '100px' }}
          defaultValue={meal}
          style={{ width: 120 }}
          allowClear
          options={[{ value: 'breakfast', label: 'breakfast' }, { value: 'lunch', label: 'lunch' }, { value: 'dinner', label: 'dinner' }]}
          onChange={(pre) => handleChange(pre)}
        />
      </div>
      <div>
        <label htmlFor="people">Please enter number of people:</label>
        <InputNumber style={{ width: '50px' }} min={1} max={10} defaultValue={numberPeople}
          onChange={(pre: any) => onChange(pre)} />
      </div>
    </div>
  )
}
const Step2 = () => {
  const [restaurant, setRestaurant] = useState<string>('Please select a restaurant')
  const handleChange = (value: string) => {
    setRestaurant(value)
    const valueRes = store.dispatch(incremented({ restaurant: value })).payload
    order = {
      ...valueRes,
      ...order
    }
  };

  return (
    <div>

      <div>
        <label htmlFor="res">Please select a restaurant:</label>
        <Select dropdownStyle={{ width: '100px' }}
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

let newOrder: any[] = []
const Step3 = () => {
  const [dish, setDish] = useState<string>('Please select a dish')
  const [numberServing, setNumberServing] = useState<number>(0)
  const handleChange = (value: string) => {
    setDish(value);
  };

  const onChange = (value: number) => {
    setNumberServing(value);
  };

  const saveDish = () => {
    newOrder.push({ dish, numberServing })
    order = {
      ...order,
      'dishes': newOrder.map((item: any) => {
        console.log('item', item)
        return {
          ...item
        }
      })
    }
  }
  return (
    <div>
      <div>
        <label htmlFor="dish">Please select a dish:</label>
        <Select dropdownStyle={{ width: '200px' }}
          defaultValue={dish}
          style={{ width: 120 }}
          allowClear
          options={[{ value: 'dishA', label: 'dishA' }, { value: 'dishB', label: 'dishB' }, { value: 'dishC', label: 'dishC' }]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="serings">Please enter no. of servings:</label>
        <InputNumber style={{ width: '50px' }} min={1} max={10} defaultValue={numberServing} onChange={(pre: any) => onChange(pre)} />
      </div>
      <SaveOutlined onClick={() => saveDish()} />
    </div>
  )
}

const Priview = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 5 }}>
        <div>
          <label htmlFor="meal">Meal</label>
        </div>
        <div style={{ fontWeight: '900', marginLeft: 5 }}>{order?.meal || ''}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 5 }}>
        <div>
          <label htmlFor="people">No. of People</label>
        </div>
        <div style={{ fontWeight: '900', marginLeft: 5 }}>{order?.numberPeople || ''}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 5 }}>
        <div>
          <label htmlFor="restaurant">Restaurant</label>
        </div>
        <div style={{ fontWeight: '900', marginLeft: 5 }}>{order?.restaurant || ''}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
        <div>
          <label htmlFor="Dishes">Dishes</label>
        </div>
        {
          order?.dishes ? order.dishes.map((item: any) => (
            <div key={item.dish} style={{ fontWeight: '900', marginLeft: 5 }}>{item.dish + '-' + item.numberServing}</div>
          )) : (
            <div style={{ fontWeight: '900', marginLeft: 5 }}>{' '}</div>
          )
        }
      </div>
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
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
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
          <Button type="primary" onClick={() => {
            message.success('Processing complete!')
            console.log(order)
          }}>
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default Home;