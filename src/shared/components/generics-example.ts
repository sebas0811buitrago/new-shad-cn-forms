const printIncommingData = (data: any) => {
  return data;
};

const r1 = printIncommingData({ x: 5 });

const printIncommingDataGeneric = <TData>(data: TData) => {
  return data;
};

const r2 = printIncommingDataGeneric({ x: 5 });

const control = {
  name: "sebas",
  email: "sebas@gmail.com",
};

type PrintNeededValueProps<TData> = {
  data: TData;
  keyToPrint: keyof TData;
};

const printNeededValue = <TData>({
  data,
  keyToPrint,
}: PrintNeededValueProps<TData>) => {
  return data[keyToPrint];
};

const r3 = printNeededValue({ data: control, keyToPrint: "name" });
