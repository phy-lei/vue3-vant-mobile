interface TableProps<T> {
  items: T[];
  renderItem: (item: T) => JSX.Element;
}

// 泛型组件
export const Table = <T,>(props: TableProps<T>) => {
  return <>{props.items.map(props.renderItem)}</>;
};

const Component = () => {
  return (
    <>
      <Table
        items={[
          { id: '1', name: 'kiana' },
          { id: '2', name: 'yayi' },
        ]}
        renderItem={(item) => {
          return <div>{item.name}</div>;
        }}
      ></Table>
    </>
  );
};

export default Component;
