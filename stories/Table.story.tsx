/* eslint-disable no-console,react/no-this-in-sfc */
import React, { useState, useEffect } from 'react';
import { Table, Button, PaginationProps, Space, Switch, TableColumnProps, Input } from '@self';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const allData = Array(200)
  .fill('')
  .map((_, index) => ({
    key: `${index}`,
    name: `Kevin Sandra ${index}`,
    salary: 22000,
    address: `${index} Park Road, London`,
    email: `kevin.sandra_${index}@example.com`,
  }));

function DemoTable() {
  const [data, setData] = useState(allData);
  const [pagination, setPagination] = useState<PaginationProps>({
    total: allData.length,
    current: 1,
  });

  const changeData = () => {
    setData((data) => {
      return data.map((item) => ({
        ...item,
        name: `!!!${item.name}`,
      }));
    });
  };

  const deleteData = () => {
    const newData = data.length > 10 ? data.slice(10) : allData;
    const total = newData.length;
    setPagination({
      ...pagination,
      total,
    });
    setData(newData);
  };

  return (
    <>
      <Button onClick={changeData}>改变数据</Button>
      <Button onClick={deleteData}>减少数据</Button>
      <Table
        columns={columns}
        data={data}
        pagination={pagination}
        onChange={(pagination) => {
          setPagination(pagination);
        }}
      />
    </>
  );
}

export const DataChange = () => <DemoTable />;

function DemoVirtualList() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 140,
      fixed: 'left' as const,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      width: 100,
      fixed: 'left' as const,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
      fixed: 'right' as const,
    },
  ];

  const originData = Array(100000)
    .fill('')
    .map((_, index) => ({
      key: `${index}`,
      name: `Kevin ${index}`,
      salary: 22000,
      address: `${index} Park Road, London`,
      email: `kevin.sandra_${index}@example.com`,
    }));

  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setTimeout(() => {
      setData(originData);
    }, 2000);
  }, []);

  return (
    <Table
      virtualized
      scroll={{ x: 1600, y: 500 }}
      border
      columns={columns}
      data={data}
      pagination={false}
      rowSelection={{}}
    />
  );
}

export const VirtualList = () => <DemoVirtualList />;

function DemoTreeData() {
  const [checkStrictly, setCheckStrictly] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (col: any, item: any) => {
        console.log('column.render', col, item);
        if (col === 'Tom Jerry') {
          return <Input defaultValue={col} />;
        } else {
          return col;
        }
        // return col;
      },
      sorter: (a: any, b: any) => a - b,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      children: [
        {
          key: '1-1',
          name: 'Christina',
          address: '332 Park Road, London',
          email: 'christina@example.com',
        },
      ],
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
      children: [
        {
          key: '2-1',
          name: 'Ed Hellen',
          salary: 17000,
          address: '42 Park Road, London',
          email: 'ed.hellen@example.com',
          children: [
            {
              key: '2-1-1',
              name: 'Eric Miller',
              salary: 23000,
              address: '67 Park Road, London',
              email: 'eric.miller@example.com',
            },
            {
              key: '2-1-2',
              name: 'Tom Jerry',
              salary: 666,
              address: '67 Park Road, London',
              email: 'tom.jerry@example.com',
            },
          ],
        },
        {
          key: '2-2',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com',
        },
        {
          key: '2-3',
          name: 'George Bush',
          salary: 24000,
          address: '62 Park Road, London',
          email: 'george.bush@example.com',
        },
      ],
    },
    {
      key: '7',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
  ];

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        checkStrictly:
        <Switch onChange={(checked) => setCheckStrictly(checked)} checked={checkStrictly} />
      </Space>
      <Table
        onExpand={(r) => {
          console.log('rrrr', r);
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: (_, selectedRows) => {
            console.log('selectedRows', selectedRows);
          },
          checkStrictly,
          checkboxProps: (r) => {
            return { disabled: false };
          },
        }}
        onChange={(p, s, f, extra) => {
          console.log(extra.currentData);
        }}
        columns={columns}
        data={data}
      />
    </div>
  );
}

export const TreeData = () => <DemoTreeData />;

export const DefaultExpand = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  const data2 = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      children: [
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
      ],
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
      children: [
        {
          key: '4',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
      ],
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
      children: [
        {
          key: '6',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
      ],
    },
  ];

  return (
    <>
      <Table
        pagination={{
          sizeCanChange: true,
          showTotal: true,
        }}
        border={false}
        columns={columns}
        data={data}
        expandedRowRender={(record) => {
          return `This is No.${record.key} description.`;
        }}
        onExpand={(detail, expanded) => {
          console.log(detail, expanded);
        }}
        onExpandedRowsChange={(expandedRows) => {
          console.log(expandedRows);
        }}
        rowKey="key"
        defaultExpandAllRows
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: [],
        }}
        expandProps={{
          expandRowByClick: true,
          rowExpandable: (record) => record.key !== '4',
        }}
      />
      <Table
        pagination={false}
        border={false}
        columns={columns}
        data={data2}
        rowKey="key"
        expandProps={{
          expandRowByClick: true,
        }}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: [],
        }}
      />
    </>
  );
};

const DemoDataClass = () => {
  class Klass {
    key: string;

    name: string;

    salary: number;

    address: string;

    email: string;

    children: any;

    constructor({ key, name, salary, address, email, children }: any) {
      this.key = key;
      this.name = name;
      this.salary = salary;
      this.address = address;
      this.email = email;
      this.children = children;
    }

    fn() {}
  }

  const columns: TableColumnProps[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render(col: any, item: any, index: number) {
        // 2.31.2 -> 2.36.0
        // item被复制了一份，没有保留原来的数据结构
        // 以前是Klass实例
        // 现在是一个普通对象
        console.log({ col, item, index });
        return <span>{col}</span>;
      },
    },
  ];
  const data = [
    new Klass({
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      children: [
        new Klass({
          key: '3',
          name: 'Jane Doe',
          salary: 23000,
          address: '32 Park Road, London',
          email: 'jane.doe@example.com',
        }),
      ],
    }),
    new Klass({
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    }),
  ];
  return <Table columns={columns} data={data} />;
};

export const DataClass = () => <DemoDataClass />;

export const SortTable = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
    },
    {
      title: 'Age',
      // dataIndex: 'age',
      render: (_: any, record: any) => record.age,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const columnsSorter = (function () {
    return columns.map((d) => {
      if (d.title === 'Age') {
        return {
          ...d,
          defaultSortOrder: 'ascend' as const,
          sorter: (a: any, b: any) => a.age - b.age,
        };
      }
      return d;
    });
  })();

  const data = [
    {
      key: '1',
      name: 'Name1',
      address: 'Address1',
      sex: 'male',
      age: 20,
      email: 'email1@123.com',
    },
    {
      key: '2',
      name: 'Name2',
      address: 'Address2',
      sex: 'male',
      age: 26,
      email: 'email2@123.com',
    },
    {
      key: '3',
      name: 'Name3',
      address: 'Address3',
      sex: 'female',
      age: 19,
      email: 'email3@123.com',
    },
    {
      key: '4',
      name: 'Name4',
      address: 'Address4',
      sex: 'male',
      age: 30,
      email: 'email4@123.com',
    },
    {
      key: '5',
      name: 'Name5',
      address: 'Address5',
      sex: 'female',
      age: 24,
      email: 'email5@123.com',
    },
  ];

  return <Table columns={columnsSorter} data={data} />;
};

// export const SortTable = () => {
//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       // sortOrder: 'descend',
//       sorter: (a, b) => {
//         if (a.name > b.name) {
//           return 1;
//         }
//         if (a.name < b.name) {
//           return -1;
//         }
//         return 0;
//       },
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       sorter: (a, b) => a.age - b.age,
//     },
//     {
//       title: 'Chinese Score',
//       dataIndex: 'chinese',
//       // defaultSortOrder: 'descend',
//       sorter: {
//         compare: (a, b) => a.chinese - b.chinese,
//         multiple: 3,
//       },
//     },
//     {
//       title: 'Math Score',
//       dataIndex: 'math',
//       // defaultSortOrder: 'ascend',
//       sorter: {
//         compare: (a, b) => a.math - b.math,
//         multiple: 2,
//       },
//     },
//     {
//       title: 'English Score',
//       dataIndex: 'english',
//       sorter: {
//         compare: (a, b) => a.english - b.english,
//         multiple: 1,
//       },
//     },
//   ];
//   const data = [
//     {
//       key: '1',
//       name: 'Aohn Brown',
//       age: 18,
//       chinese: 100,
//       math: 60,
//       english: 70,
//     },
//     {
//       key: '2',
//       name: 'Bim Green',
//       age: 17,
//       chinese: 100,
//       math: 90,
//       english: 80,
//     },
//     {
//       key: '3',
//       name: 'Coe Black',
//       age: 19,
//       chinese: 100,
//       math: 70,
//       english: 60,
//     },
//     {
//       key: '4',
//       name: 'Dim Red',
//       age: 15,
//       chinese: 80,
//       math: 70,
//       english: 100,
//     },
//     {
//       key: '5',
//       name: 'Eim Blue',
//       age: 20,
//       chinese: 80,
//       math: 70,
//       english: 90,
//     },
//   ];
//   return (
//     <Table
//       columns={columns}
//       data={data}
//     />
//   );
// };

export const FixedTable = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 140,
      colSpan: 2,
    },
    {
      title: 'Test2',
      dataIndex: 'test2',
      width: 100,
      colSpan: 0,
    },
    {
      title: 'Test3',
      dataIndex: 'test3',
      width: 100,
    },
    {
      title: 'Test4',
      dataIndex: 'test4',
      width: 100,
    },
    {
      title: 'Information',
      children: [
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
        },
      ],
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      // fixed: 'right',
      width: 120,
    },
    {
      title: 'User Info',
      fixed: 'right',
      children: [
        {
          title: 'Birthday',
          dataIndex: 'birthday',
          fixed: 'right',
          width: 120,
        },
        {
          title: 'Address',
          fixed: 'right',
          children: [
            {
              title: 'City',
              dataIndex: 'city',
              fixed: 'right',
              width: 120,
            },
            {
              title: 'Road',
              dataIndex: 'road',
              fixed: 'right',
              width: 120,
            },
            {
              title: 'No.',
              dataIndex: 'no',
              fixed: 'right',
              width: 120,
            },
          ],
        },
      ],
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      birthday: '1994-04-21',
      city: 'London',
      road: 'Park',
      no: '34',
      phone: '12345678',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      birthday: '1994-05-21',
      city: 'London',
      road: 'Park',
      no: '37',
      phone: '12345678',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      birthday: '1992-02-11',
      city: 'Paris',
      road: 'Arco',
      no: '67',
      phone: '12345678',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      birthday: '1991-06-21',
      city: 'London',
      road: 'Park',
      no: '317',
      phone: '12345678',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      birthday: '1996-08-21',
      city: 'Paris',
      road: 'Park',
      no: '114',
      phone: '12345678',
      email: 'william.smith@example.com',
    },
  ];
  return (
    <Table
      scroll={{
        x: 1200,
      }}
      // expandedRowRender={(record) => `${record.name}'s address is ${record.address}`}
      // rowSelection={{}}
      border={{
        wrapper: true,
        cell: true,
      }}
      columns={columns as any}
      data={data}
    />
  );
};

export default {
  title: 'Table',
};
