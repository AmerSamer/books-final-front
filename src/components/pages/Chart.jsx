import React from 'react';
import axios from 'axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };

// let labels = ["f"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     // {
//     //   label: 'Dataset 2',
//     //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//     //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     // },
//   ],
// };

function Chart({ account , allBooksByUser , allBooksByUserPurchase }) {
  // const [booksNameChart, setBooksNameChart] = React.useState([]);
  let labels = allBooksByUser;
  let x = allBooksByUserPurchase
  // React.useEffect(() => {
  //   getBooksNameChart();
  // }, [])
  // const getBooksNameChart = async () => {
  //   const response = await axios.get(`https://books-store-back.herokuapp.com/books/store/getAllBooksUser/${account._id}`);
  //   let arrHelper = []
    
  //   arrHelper.push(response.data)
  //   for (let i = 0; i < arrHelper[0].length; i++) {
  //     labels.push((arrHelper[0][i].name))
  //   }
  //   setBooksNameChart(response.data);

  // }
//////////////////

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Books/Purchased Chart',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Quantity of Purchases per Book',
        data: labels.map((i, index) => x[index]),
        backgroundColor: 'rgba(51, 83, 212, 0.5)',
      },
    ],
  };

  

/////////////////////

  return (
    <>
    {console.log(allBooksByUser)}
      <Bar options={options} data={data} />
    </>
  )
}
export default Chart